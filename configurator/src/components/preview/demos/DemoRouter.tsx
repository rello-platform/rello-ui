import type { ComponentSpec } from "../../../hooks/useSpecs";
import { DrawerDemo } from "./DrawerDemo";
import { ToastDemo } from "./ToastDemo";
import { StaggerDemo } from "./StaggerDemo";
import { SkeletonDemo } from "./SkeletonDemo";
import { StackedCarouselDemo } from "./StackedCarouselDemo";
import { DialogDemo } from "./DialogDemo";
import { EmptyStateDemo } from "./EmptyStateDemo";
import { CardTiersDemo } from "./CardTiersDemo";
import { BrandedIllustrationDemo } from "./BrandedIllustrationDemo";
import { ButtonDemo } from "./ButtonDemo";
import { BadgeDemo } from "./BadgeDemo";
import { TableDemo } from "./TableDemo";
import { InputDemo } from "./InputDemo";
import { PaginationDemo } from "./PaginationDemo";
import { PageTransitionDemo } from "./PageTransitionDemo";
import { MiloChatDemo } from "./MiloChatDemo";
import { SurveyStepDemo } from "./SurveyStepDemo";
import { IconCatalogDemo } from "./IconCatalogDemo";
import { ColorPickerDemo } from "./ColorPickerDemo";
import { PipelineThermometerDemo } from "./PipelineThermometerDemo";
import { StatCardDemo } from "./StatCardDemo";
import { TimelineDemo } from "./TimelineDemo";
import { StepperDemo } from "./StepperDemo";
import { SelectDemo } from "./SelectDemo";
import { CheckboxRadioDemo, ToggleSwitchDemo, TextareaDemo } from "./FormControlsDemo";
import { DatePickerDemo } from "./DatePickerDemo";
import { FileUploadDemo } from "./FileUploadDemo";
import { SearchInputDemo, TagChipDemo, AvatarDemo, ProgressBarDemo } from "./SearchTagAvatarDemo";
import { TabNavigationDemo, BreadcrumbsDemo, SidebarAppShellDemo, DropdownMenuDemo } from "./NavigationDemos";
import { SpinnerDemo, AlertBannerDemo, ConfirmationDialogDemo, TooltipDemo } from "./FeedbackDemos";
import { DividerDemo, AccordionDemo, ListItemDemo, AppCardDemo, WhiteLabelPreviewDemo } from "./LayoutDemos";
import { DashboardShellDemo, AppHeaderDemo, PageContainerDemo, TodayScheduleDemo, CategorySectionDemo, DragHintDemo } from "./DashboardDemos";

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

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const demos: Record<string, () => React.ReactNode> = {
    "drawer": () => <DrawerDemo params={params as any} />,
    "dialog": () => <DialogDemo params={params as any} />,
    "toast": () => <ToastDemo params={params as any} />,
    "skeleton": () => <SkeletonDemo params={params as any} />,
    "empty-state": () => <EmptyStateDemo />,
    "spinner": () => <SpinnerDemo />,
    "alert-banner": () => <AlertBannerDemo />,
    "confirmation-dialog": () => <ConfirmationDialogDemo />,
    "tooltip": () => <TooltipDemo />,
    "card": () => <CardTiersDemo params={params as any} />,
    "branded-card-illustration": () => <BrandedIllustrationDemo params={params as any} />,
    "icon-catalog": () => <IconCatalogDemo />,
    "stacked-carousel": () => <StackedCarouselDemo params={params as any} />,
    "divider": () => <DividerDemo />,
    "accordion": () => <AccordionDemo />,
    "button": () => <ButtonDemo params={params as any} />,
    "badge": () => <BadgeDemo />,
    "table": () => <TableDemo />,
    "stat-card": () => <StatCardDemo />,
    "tag-chip": () => <TagChipDemo />,
    "avatar-user": () => <AvatarDemo />,
    "progress-bar": () => <ProgressBarDemo />,
    "timeline": () => <TimelineDemo />,
    "list-item": () => <ListItemDemo />,
    "input": () => <InputDemo />,
    "select": () => <SelectDemo />,
    "textarea": () => <TextareaDemo />,
    "checkbox-radio": () => <CheckboxRadioDemo />,
    "toggle-switch": () => <ToggleSwitchDemo />,
    "date-picker": () => <DatePickerDemo />,
    "file-upload": () => <FileUploadDemo />,
    "search-input": () => <SearchInputDemo />,
    "color-picker": () => <ColorPickerDemo />,
    "survey-step": () => <SurveyStepDemo />,
    "pagination": () => <PaginationDemo />,
    "tab-navigation": () => <TabNavigationDemo />,
    "breadcrumbs": () => <BreadcrumbsDemo />,
    "sidebar-app-shell": () => <SidebarAppShellDemo />,
    "dropdown-menu": () => <DropdownMenuDemo />,
    "stepper-wizard": () => <StepperDemo />,
    "staggered-entrance": () => <StaggerDemo params={params as any} />,
    "page-transition": () => <PageTransitionDemo params={params as any} />,
    "pipeline-thermometer": () => <PipelineThermometerDemo />,
    "app-card": () => <AppCardDemo />,
    "white-label-preview": () => <WhiteLabelPreviewDemo />,
    "milo-chat": () => <MiloChatDemo />,
    "app-header": () => <AppHeaderDemo />,
    "page-container": () => <PageContainerDemo />,
    "today-schedule": () => <TodayScheduleDemo />,
    "category-section": () => <CategorySectionDemo />,
    "drag-hint": () => <DragHintDemo />,
    "dashboard-shell": () => <DashboardShellDemo />,
  };
  /* eslint-enable @typescript-eslint/no-explicit-any */

  const demoRenderer = demos[componentId];

  return (
    <div className="flex flex-col gap-6">
      {spec && (
        <div className="bg-[var(--neutral-50)] rounded-lg p-4 border border-[var(--neutral-100)]">
          <h3 className="font-heading text-base font-semibold text-[var(--foreground)] mb-1">{spec.name}</h3>
          {spec.description && <p className="text-sm text-[var(--neutral-600)]">{spec.description}</p>}
        </div>
      )}

      {demoRenderer ? demoRenderer() : (
        <div className="bg-[var(--neutral-50)] rounded-xl border border-[var(--neutral-200)] p-8 text-center">
          <p className="text-sm text-[var(--neutral-500)]">No interactive demo available for this component yet.</p>
        </div>
      )}

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
