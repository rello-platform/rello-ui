"use client";

import * as React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, SoundHigh } from "iconoir-react";
import { cn } from "../../lib/cn";

/* ─── Types ─── */

export interface AudioPlayerCardProps {
  /** Audio source URL */
  src: string;
  /** Track title */
  title: string;
  /** Subtitle / description */
  subtitle?: string;
  /** Optional icon element to render left of the title */
  icon?: React.ReactNode;
  /** Additional class names */
  className?: string;
}

/* ─── Helpers ─── */

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/* ─── Component ─── */

function AudioPlayerCard({
  src,
  title,
  subtitle,
  icon,
  className,
}: AudioPlayerCardProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const handleSeek = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const audio = audioRef.current;
      if (!audio || !duration) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      audio.currentTime = ratio * duration;
    },
    [duration],
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    <div
      className={cn("rounded-xl p-4", className)}
      style={{
        backgroundColor: "var(--card-background)",
        border: "1px solid var(--card-border)",
      }}
    >
      <audio ref={audioRef} src={src} preload="metadata" />

      <div className="flex items-center gap-3">
        {/* Play/Pause button */}
        <button
          onClick={togglePlay}
          className="size-10 rounded-full flex items-center justify-center shrink-0 transition-colors"
          style={{
            backgroundColor: "var(--brand-primary)",
            color: "#FFFFFF",
          }}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause width={18} height={18} strokeWidth={2} />
          ) : (
            <Play width={18} height={18} strokeWidth={2} />
          )}
        </button>

        {/* Info + progress */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {icon && (
              <span style={{ color: "var(--brand-primary)" }}>{icon}</span>
            )}
            <p
              className="font-semibold text-sm truncate"
              style={{ color: "var(--foreground)" }}
            >
              {title}
            </p>
          </div>
          {subtitle && (
            <p
              className="text-xs truncate mb-2"
              style={{ color: "var(--neutral-500)" }}
            >
              {subtitle}
            </p>
          )}

          {/* Progress bar */}
          <div
            className="h-1.5 rounded-full cursor-pointer"
            style={{ backgroundColor: "var(--neutral-200)" }}
            onClick={handleSeek}
          >
            <div
              className="h-full rounded-full transition-all duration-100"
              style={{
                width: `${progress}%`,
                backgroundColor: "var(--brand-primary)",
              }}
            />
          </div>

          {/* Time */}
          <div className="flex justify-between mt-1">
            <span
              className="text-[10px]"
              style={{ color: "var(--neutral-400)" }}
            >
              {formatTime(currentTime)}
            </span>
            <span
              className="text-[10px]"
              style={{ color: "var(--neutral-400)" }}
            >
              {formatTime(duration)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export { AudioPlayerCard };
