import type { ComponentSpec } from "../../../hooks/useSpecs";
import { DrawerDemo } from "./DrawerDemo";
import { ToastDemo } from "./ToastDemo";
import { StaggerDemo } from "./StaggerDemo";
import { SkeletonDemo } from "./SkeletonDemo";
import { StackedCarouselDemo } from "./StackedCarouselDemo";

interface DemoRouterProps {
  componentId: string | null;
  spec: ComponentSpec | null;
}

function extractParams(spec: ComponentSpec | null): Record<string, unknown> {
  if (!spec || !("parameters" in spec)) return {};
  const params = (spec as unknown as { parameters?: Record<string, { value: unknown }> }).parameters;
  if (!params) return {};
  const result: Record<string, unknown> = {};
  for (const [key, def] of Object.entries(params)) {
    result[key] = def.value;
  }
  return result;
}

export function DemoRouter({ componentId, spec }: DemoRouterProps) {
  const params = extractParams(spec);

  if (!componentId) {
    return (
      <div className="flex items-center justify-center h-64 text-center">
        <div>
          <p className="text-lg font-heading font-semibold text-[var(--neutral-700)] mb-1">Select a component</p>
          <p className="text-sm text-[var(--neutral-400)]">Click on a component in the sidebar to see its live demo</p>
        </div>
      </div>
    );
  }

  const demos: Record<string, () => React.ReactNode> = {
    drawer: () => <DrawerDemo params={params as { duration?: number; width?: number; scrimOpacity?: number; easing?: string }} />,
    toast: () => <ToastDemo params={params as { duration?: number; autoDismiss?: number; position?: string }} />,
    "staggered-entrance": () => <StaggerDemo params={params as { duration?: number; staggerDelay?: number; distance?: number; easing?: string }} />,
    skeleton: () => <SkeletonDemo params={params as { shimmerDuration?: number; baseColor?: string; highlightColor?: string }} />,
    "stacked-carousel": () => <StackedCarouselDemo params={params as Record<string, number>} />,
  };

  const demoRenderer = demos[componentId];

  return (
    <div className="flex flex-col gap-6">
      {/* Spec summary */}
      {spec && (
        <div className="bg-[var(--neutral-50)] rounded-lg p-4 border border-[var(--neutral-100)]">
          <h3 className="font-heading text-base font-semibold text-[var(--foreground)] mb-1">{spec.name}</h3>
          {spec.description && <p className="text-sm text-[var(--neutral-600)]">{spec.description}</p>}
        </div>
      )}

      {/* Live demo */}
      {demoRenderer ? (
        demoRenderer()
      ) : (
        <div className="bg-[var(--neutral-50)] rounded-xl border border-[var(--neutral-200)] p-8 text-center">
          <p className="text-sm text-[var(--neutral-500)]">No interactive demo available for this component yet.</p>
          <p className="text-xs text-[var(--neutral-400)] mt-1">The spec text will be used as build instructions.</p>
        </div>
      )}

      {/* Spec details */}
      {spec && (spec.behavior || spec.appearance || spec.doUse || spec.dontUse) && (
        <div className="grid grid-cols-2 gap-4">
          {spec.behavior && (
            <div className="bg-white rounded-lg border border-[var(--neutral-100)] p-4">
              <p className="text-xs font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-2">Behavior</p>
              <p className="text-sm text-[var(--neutral-700)] whitespace-pre-line">{spec.behavior}</p>
            </div>
          )}
          {spec.appearance && (
            <div className="bg-white rounded-lg border border-[var(--neutral-100)] p-4">
              <p className="text-xs font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-2">Appearance</p>
              <p className="text-sm text-[var(--neutral-700)] whitespace-pre-line">{spec.appearance}</p>
            </div>
          )}
          {spec.doUse && (
            <div className="bg-white rounded-lg border border-[var(--neutral-100)] p-4">
              <p className="text-xs font-medium text-[var(--success)] uppercase tracking-wider mb-2">When to use</p>
              <p className="text-sm text-[var(--neutral-700)] whitespace-pre-line">{spec.doUse}</p>
            </div>
          )}
          {spec.dontUse && (
            <div className="bg-white rounded-lg border border-[var(--neutral-100)] p-4">
              <p className="text-xs font-medium text-[var(--error)] uppercase tracking-wider mb-2">When NOT to use</p>
              <p className="text-sm text-[var(--neutral-700)] whitespace-pre-line">{spec.dontUse}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
