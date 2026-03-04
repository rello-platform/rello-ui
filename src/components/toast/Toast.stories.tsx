import type { Meta, StoryObj } from "@storybook/react";
import { Toast, type ToastData } from "./Toast";
import { ToastProvider, useToast } from "./ToastProvider";

const meta = {
  title: "Components/Toast",
  component: Toast,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ==========================================
   STATIC VARIANTS
   ========================================== */

const variants: ToastData[] = [
  { id: "1", variant: "success", title: "Lead saved successfully" },
  { id: "2", variant: "info", title: "New lead assigned to your pipeline" },
  { id: "3", variant: "warning", title: "3 leads need follow-up today" },
  { id: "4", variant: "error", title: "Failed to sync with MLS" },
];

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {variants.map((t) => (
        <Toast key={t.id} toast={t} onDismiss={() => {}} />
      ))}
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <Toast
      toast={{
        id: "desc",
        variant: "success",
        title: "Lead saved successfully",
        description: "John Smith has been added to your Hot pipeline.",
      }}
      onDismiss={() => {}}
    />
  ),
};

/* ==========================================
   INTERACTIVE (with Provider)
   ========================================== */

function InteractiveDemo() {
  const { success, error, warning, info } = useToast();

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <p className="text-sm text-[var(--neutral-500)]">Click buttons to trigger toasts (top-right)</p>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => success("Lead saved successfully")}
          className="px-3 py-1.5 text-xs rounded-md bg-[var(--success)] text-white font-medium hover:opacity-90 transition-opacity"
        >
          Success
        </button>
        <button
          onClick={() => info("New lead assigned to your pipeline")}
          className="px-3 py-1.5 text-xs rounded-md bg-[var(--info)] text-white font-medium hover:opacity-90 transition-opacity"
        >
          Info
        </button>
        <button
          onClick={() => warning("3 leads need follow-up today")}
          className="px-3 py-1.5 text-xs rounded-md bg-[var(--warning)] text-white font-medium hover:opacity-90 transition-opacity"
        >
          Warning
        </button>
        <button
          onClick={() => error("Failed to sync with MLS")}
          className="px-3 py-1.5 text-xs rounded-md bg-[var(--error)] text-white font-medium hover:opacity-90 transition-opacity"
        >
          Error
        </button>
      </div>
    </div>
  );
}

export const Interactive: Story = {
  render: () => (
    <ToastProvider position="top-right" autoDismiss={4000}>
      <InteractiveDemo />
    </ToastProvider>
  ),
};
