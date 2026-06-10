import type { Request, Response, NextFunction } from "express";

/**
 * Minimal in-memory fixed-window rate limiter for the Configurator write
 * routes (SECURITY AUDIT PKG-L2 / commit-spam DoS against the GITHUB_TOKEN
 * rate budget). No external dependency — this is a single-process dev/operator
 * tool, so a per-process counter is sufficient. Defense-in-depth behind
 * requireOperator, not the primary control.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

export interface RateLimitOptions {
  windowMs: number;
  max: number;
}

export function rateLimit(opts: RateLimitOptions) {
  const buckets = new Map<string, Bucket>();

  // Opportunistic cleanup so the map cannot grow unbounded across many client
  // keys over a long-lived process.
  function sweep(now: number): void {
    for (const [key, b] of buckets) {
      if (b.resetAt <= now) buckets.delete(key);
    }
  }

  return function rateLimiter(req: Request, res: Response, next: NextFunction): void {
    const now = Date.now();
    if (buckets.size > 1000) sweep(now);

    const key = req.ip || req.socket.remoteAddress || "unknown";
    let bucket = buckets.get(key);
    if (!bucket || bucket.resetAt <= now) {
      bucket = { count: 0, resetAt: now + opts.windowMs };
      buckets.set(key, bucket);
    }

    bucket.count += 1;
    const remaining = Math.max(0, opts.max - bucket.count);
    res.setHeader("X-RateLimit-Limit", String(opts.max));
    res.setHeader("X-RateLimit-Remaining", String(remaining));

    if (bucket.count > opts.max) {
      const retryAfter = Math.ceil((bucket.resetAt - now) / 1000);
      res.setHeader("Retry-After", String(retryAfter));
      res.status(429).json({ error: "Too many requests. Please slow down." });
      return;
    }
    next();
  };
}
