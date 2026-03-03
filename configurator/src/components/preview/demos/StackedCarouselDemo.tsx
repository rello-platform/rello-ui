import { useState } from "react";

interface StackedCarouselDemoProps {
  params: {
    transitionDuration?: number;
    shadowOffset1?: number;
    shadowOffset2?: number;
    shadowOpacity1?: number;
    shadowOpacity2?: number;
  };
}

const DEALS = [
  { name: "The Millers", address: "1842 Maple Drive", price: "$425,000", stage: "Under Contract", color: "var(--hot)" },
  { name: "Chen Family", address: "567 Oak Avenue", price: "$389,000", stage: "Active Showing", color: "var(--qualified)" },
  { name: "Sarah Thompson", address: "2100 Pine Street", price: "$515,000", stage: "Pending Inspection", color: "var(--engaged)" },
  { name: "David & Lisa Park", address: "890 Elm Court", price: "$340,000", stage: "Offer Submitted", color: "var(--warming)" },
];

export function StackedCarouselDemo({ params }: StackedCarouselDemoProps) {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const duration = params.transitionDuration ?? 275;
  const offset1 = params.shadowOffset1 ?? 4;
  const offset2 = params.shadowOffset2 ?? 8;
  const opacity1 = params.shadowOpacity1 ?? 0.8;
  const opacity2 = params.shadowOpacity2 ?? 0.5;

  const navigate = (dir: number) => {
    if (animating) return;
    const next = (active + dir + DEALS.length) % DEALS.length;
    setAnimating(true);
    setTimeout(() => {
      setActive(next);
      setAnimating(false);
    }, duration);
  };

  const deal = DEALS[active];

  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)]">
        <span className="text-sm font-medium text-[var(--neutral-700)]">Stacked Carousel Preview</span>
      </div>
      <div className="p-6 flex justify-center">
        <div className="relative w-72 h-48">
          {/* Shadow card 2 (deepest) — peeks out wider to the sides */}
          <div
            className="absolute bg-[var(--neutral-200)] rounded-[20px] border border-[var(--neutral-300)]"
            style={{
              top: offset2 + 2,
              left: -(offset2),
              right: -(offset2),
              bottom: offset2,
              opacity: opacity2,
            }}
          />
          {/* Shadow card 1 — peeks out slightly to the sides */}
          <div
            className="absolute bg-[var(--neutral-100)] rounded-[20px] border border-[var(--neutral-200)]"
            style={{
              top: offset1 + 1,
              left: -(offset1),
              right: -(offset1),
              bottom: offset1,
              opacity: opacity1,
            }}
          />
          {/* Active card */}
          <div
            className="absolute inset-0 bg-white rounded-[20px] border border-[var(--neutral-100)] shadow-md p-5 flex flex-col justify-between"
            style={{
              opacity: animating ? 0 : 1,
              transform: animating ? "scale(0.95)" : "scale(1)",
              transition: `all ${duration}ms ease-in-out`,
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="font-heading text-base font-semibold text-[var(--foreground)]">{deal.name}</p>
                <span className="text-xs text-[var(--neutral-400)]">{active + 1}/{DEALS.length}</span>
              </div>
              <p className="text-xs text-[var(--neutral-500)] mb-3">{deal.address}</p>
              <p className="font-stat text-2xl font-bold text-[var(--brand-primary)]">{deal.price}</p>
            </div>
            <div className="flex items-center justify-between">
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full"
                style={{ backgroundColor: `color-mix(in srgb, ${deal.color} 15%, transparent)`, color: deal.color }}
              >
                <span className="size-1.5 rounded-full" style={{ backgroundColor: deal.color }} />
                {deal.stage}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => navigate(-1)}
                  className="size-8 rounded-lg border border-[var(--neutral-200)] flex items-center justify-center text-[var(--neutral-600)] hover:bg-[var(--neutral-50)] text-sm"
                >
                  &larr;
                </button>
                <button
                  onClick={() => navigate(1)}
                  className="size-8 rounded-lg border border-[var(--neutral-200)] flex items-center justify-center text-[var(--neutral-600)] hover:bg-[var(--neutral-50)] text-sm"
                >
                  &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 pb-4">
        {DEALS.map((_, i) => (
          <div
            key={i}
            className="h-1.5 rounded-full transition-all duration-200"
            style={{
              width: i === active ? 20 : 6,
              backgroundColor: i === active ? "var(--brand-primary)" : "var(--neutral-300)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
