import * as class_variance_authority_types from 'class-variance-authority/types';
import * as React from 'react';
import { VariantProps } from 'class-variance-authority';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as SelectPrimitive from '@radix-ui/react-select';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { ClassValue } from 'clsx';

declare const buttonVariants: (props?: ({
    variant?: "primary" | "secondary" | "accent" | "ghost" | "danger" | "outline" | "link" | null | undefined;
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "icon" | "icon-sm" | "icon-lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "elevated" | "outlined";
    padding?: "none" | "sm" | "md" | "lg";
    hoverable?: boolean;
    clickable?: boolean;
}
declare const Card: React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>>;
declare const CardHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CardTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLHeadingElement>>;
declare const CardDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const CardContent: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CardFooter: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;

declare const badgeVariants: (props?: ({
    variant?: "primary" | "accent" | "default" | "error" | "success" | "warning" | "info" | "hot" | "qualified" | "engaged" | "warming" | "cold" | "LEAD" | "NURTURING" | "APPLICATION" | "PROCESSING" | "CLOSED_WON" | "CLOSED_LOST" | null | undefined;
    size?: "xs" | "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
    icon?: React.ReactNode;
    dot?: boolean;
}
declare function Badge({ className, variant, size, icon, dot, children, ...props }: BadgeProps): react_jsx_runtime.JSX.Element;
type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>["variant"]>;

declare const Select: React.FC<SelectPrimitive.SelectProps>;
declare const SelectGroup: React.ForwardRefExoticComponent<SelectPrimitive.SelectGroupProps & React.RefAttributes<HTMLDivElement>>;
declare const SelectValue: React.ForwardRefExoticComponent<SelectPrimitive.SelectValueProps & React.RefAttributes<HTMLSpanElement>>;
declare const SelectTrigger: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectTriggerProps & React.RefAttributes<HTMLButtonElement>, "ref"> & {
    size?: "sm" | "md";
} & React.RefAttributes<HTMLButtonElement>>;
declare const SelectContent: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SelectLabel: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectLabelProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SelectItem: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SelectSeparator: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectSeparatorProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SelectScrollUpButton: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectScrollUpButtonProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SelectScrollDownButton: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectScrollDownButtonProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    hint?: string;
}
declare const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;

declare const Label: React.ForwardRefExoticComponent<Omit<LabelPrimitive.LabelProps & React.RefAttributes<HTMLLabelElement>, "ref"> & React.RefAttributes<HTMLLabelElement>>;

declare const Checkbox: React.ForwardRefExoticComponent<Omit<CheckboxPrimitive.CheckboxProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;

declare const Avatar: React.ForwardRefExoticComponent<Omit<AvatarPrimitive.AvatarProps & React.RefAttributes<HTMLSpanElement>, "ref"> & {
    size?: "xs" | "sm" | "md" | "lg" | "xl";
} & React.RefAttributes<HTMLSpanElement>>;
declare const AvatarImage: React.ForwardRefExoticComponent<Omit<AvatarPrimitive.AvatarImageProps & React.RefAttributes<HTMLImageElement>, "ref"> & React.RefAttributes<HTMLImageElement>>;
declare const AvatarFallback: React.ForwardRefExoticComponent<Omit<AvatarPrimitive.AvatarFallbackProps & React.RefAttributes<HTMLSpanElement>, "ref"> & React.RefAttributes<HTMLSpanElement>>;

declare const Dialog: React.FC<DialogPrimitive.DialogProps>;
declare const DialogTrigger: React.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const DialogPortal: React.FC<DialogPrimitive.DialogPortalProps>;
declare const DialogClose: React.ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & React.RefAttributes<HTMLButtonElement>>;
declare const DialogOverlay: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogOverlayProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DialogContent: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
    showCloseButton?: boolean;
} & React.RefAttributes<HTMLDivElement>>;
declare const DialogHeader: ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => react_jsx_runtime.JSX.Element;
declare const DialogFooter: ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => react_jsx_runtime.JSX.Element;
declare const DialogTitle: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogTitleProps & React.RefAttributes<HTMLHeadingElement>, "ref"> & React.RefAttributes<HTMLHeadingElement>>;
declare const DialogDescription: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>, "ref"> & React.RefAttributes<HTMLParagraphElement>>;

interface SpinnerProps {
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    className?: string;
}
declare function Spinner({ size, className }: SpinnerProps): react_jsx_runtime.JSX.Element;
declare function LoadingOverlay({ message }: {
    message?: string;
}): react_jsx_runtime.JSX.Element;
declare function InlineLoading({ message }: {
    message?: string;
}): react_jsx_runtime.JSX.Element;
declare function ButtonSpinner(): react_jsx_runtime.JSX.Element;
declare function PageLoader({ message }: {
    message?: string;
}): react_jsx_runtime.JSX.Element;
declare function CardLoader({ message }: {
    message?: string;
}): react_jsx_runtime.JSX.Element;

interface EmptyStateProps {
    icon?: React.ReactNode;
    title: string;
    description?: string;
    action?: {
        label: string;
        onClick: () => void;
    };
    className?: string;
}
declare function EmptyState({ icon, title, description, action, className }: EmptyStateProps): react_jsx_runtime.JSX.Element;

interface PaginationProps {
    page: number;
    totalPages: number;
    total: number;
    onPageChange: (page: number) => void;
    className?: string;
    showTotal?: boolean;
}
declare function Pagination({ page, totalPages, total, onPageChange, className, showTotal }: PaginationProps): react_jsx_runtime.JSX.Element | null;

interface Column<T> {
    key: string;
    header: string;
    sortable?: boolean;
    className?: string;
    render?: (item: T) => React.ReactNode;
}
interface TableProps<T> {
    columns: Column<T>[];
    data: T[];
    keyField: keyof T;
    onRowClick?: (item: T) => void;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    onSort?: (key: string) => void;
    isLoading?: boolean;
    emptyMessage?: string;
    className?: string;
}
declare function Table<T>({ columns, data, keyField, onRowClick, sortBy, sortOrder, onSort, isLoading, emptyMessage, className }: TableProps<T>): react_jsx_runtime.JSX.Element;

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
    variant?: "default" | "success" | "warning" | "error" | "hot" | "cold";
    size?: "sm" | "md" | "lg";
}
declare const Progress: React.ForwardRefExoticComponent<ProgressProps & React.RefAttributes<HTMLDivElement>>;

interface SurveyQuestion {
    /** Unique key for the question (used for tracking selections) */
    key: string;
    /** Accent color hex for this step (e.g. "#5B9EA6") */
    accent: string;
    /** Question text displayed as the heading */
    question: string;
    /** Helper text below the question */
    helper?: string;
    /** Answer options */
    options: string[];
    /** Number of grid columns for options (default 2) */
    columns?: number;
    /** Illustration element rendered in the branded illustration box */
    illustration?: React.ReactNode;
    /** Decorative background pattern rendered behind the illustration */
    pattern?: React.ReactNode;
}
interface SurveyStepCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
    /** Array of survey questions/steps */
    questions: SurveyQuestion[];
    /** Currently active step index (controlled) */
    step: number;
    /** Called when step changes (via option select or back navigation) */
    onStepChange?: (step: number) => void;
    /** Record of selections keyed by question key */
    selections?: Record<string, string>;
    /** Called when an option is selected */
    onSelect?: (questionKey: string, option: string) => void;
    /** Auto-advance to next step after selection (default true) */
    autoAdvance?: boolean;
    /** Delay in ms before auto-advancing (default 400) */
    advanceDelay?: number;
    /** Whether to show progress bar (default true) */
    showProgress?: boolean;
    /** Whether to show back button (default true) */
    showBack?: boolean;
    /** Footer content rendered below the options grid */
    footer?: React.ReactNode;
}
declare const SurveyStepCard: React.ForwardRefExoticComponent<SurveyStepCardProps & React.RefAttributes<HTMLDivElement>>;

/** Concentric circles pattern — radiating rings from center */
declare function ConcentricCircles({ accent }: {
    accent: string;
}): react_jsx_runtime.JSX.Element;
/** Dot grid pattern — 5x5 evenly spaced dots */
declare function DotGrid({ accent }: {
    accent: string;
}): react_jsx_runtime.JSX.Element;
/** Orbital rings pattern — dashed concentric orbits with satellite dot */
declare function OrbitalRings({ accent }: {
    accent: string;
}): react_jsx_runtime.JSX.Element;
/** Cross hatch pattern — diagonal lines */
declare function CrossHatch({ accent }: {
    accent: string;
}): react_jsx_runtime.JSX.Element;
/** Diamond grid pattern — rotated squares */
declare function DiamondGrid({ accent }: {
    accent: string;
}): react_jsx_runtime.JSX.Element;
/** Radial burst pattern — lines radiating from center */
declare function RadialBurst({ accent }: {
    accent: string;
}): react_jsx_runtime.JSX.Element;
/** Registry of all available patterns by key */
declare const PATTERNS: Record<string, React.ComponentType<{
    accent: string;
}>>;

type ToastVariant = "success" | "warning" | "error" | "info";
type ToastPosition = "top-right" | "top-center" | "bottom-right" | "bottom-center";
interface ToastData {
    id: string;
    variant: ToastVariant;
    title: string;
    description?: string;
}
interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
    toast: ToastData;
    /** Animation duration in ms (default 250) */
    duration?: number;
    /** Whether the toast is visible (controls enter/exit animation) */
    visible?: boolean;
    /** Called when the dismiss button is clicked */
    onDismiss?: (id: string) => void;
}
declare const Toast: React.ForwardRefExoticComponent<ToastProps & React.RefAttributes<HTMLDivElement>>;

interface ToastContext {
    toast: (options: {
        variant?: ToastVariant;
        title: string;
        description?: string;
    }) => void;
    success: (title: string, description?: string) => void;
    error: (title: string, description?: string) => void;
    warning: (title: string, description?: string) => void;
    info: (title: string, description?: string) => void;
    dismiss: (id: string) => void;
    dismissAll: () => void;
}
declare const ToastContext: React.Context<ToastContext | null>;
interface ToasterProps {
    /** Position on screen (default "top-right") */
    position?: ToastPosition;
    /** Animation duration in ms (default 250) */
    duration?: number;
    /** Auto-dismiss time in ms (default 4000). Set 0 to disable. */
    autoDismiss?: number;
    /** Max visible toasts (default 5) */
    maxVisible?: number;
}
declare function ToastProvider({ children, position, duration, autoDismiss, maxVisible, }: React.PropsWithChildren<ToasterProps>): react_jsx_runtime.JSX.Element;
declare function useToast(): ToastContext;

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Shimmer animation duration in ms (default 1800) */
    shimmerDuration?: number;
    /** Base color (default "var(--neutral-100)") */
    baseColor?: string;
    /** Highlight color (default "var(--neutral-50)") */
    highlightColor?: string;
    /** Width — CSS value (default "100%") */
    width?: string | number;
    /** Height — CSS value (default "1rem") */
    height?: string | number;
    /** Border radius — CSS value (default "0.25rem") */
    radius?: string | number;
}
declare const Skeleton: React.ForwardRefExoticComponent<SkeletonProps & React.RefAttributes<HTMLDivElement>>;
interface SkeletonCircleProps extends Omit<SkeletonProps, "width" | "height" | "radius"> {
    /** Diameter in pixels (default 40) */
    size?: number;
}
declare const SkeletonCircle: React.ForwardRefExoticComponent<SkeletonCircleProps & React.RefAttributes<HTMLDivElement>>;
interface SkeletonTextProps extends Omit<SkeletonProps, "width" | "height"> {
    /** Number of text lines (default 3) */
    lines?: number;
    /** Line height in px (default 12) */
    lineHeight?: number;
    /** Gap between lines in px (default 8) */
    gap?: number;
    /** Width of the last line as percentage (default 60) */
    lastLineWidth?: number;
}
declare const SkeletonText: React.ForwardRefExoticComponent<SkeletonTextProps & React.RefAttributes<HTMLDivElement>>;
declare function SkeletonStyles(): null;

interface CardIllustrationProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Accent color hex (e.g. "#5B9EA6") */
    accent: string;
    /** Container size in px (default 88) */
    size?: number;
    /** Border radius in px (default 18) */
    radius?: number;
    /** Container background opacity 0-1 (default 0.14) */
    bgOpacity?: number;
    /** Pattern SVG element (Layer 2) — rendered at low opacity inside the container */
    pattern?: React.ReactNode;
    /** Pattern opacity 0-1 (default 0.12) */
    patternOpacity?: number;
    /** Icon/illustration element (Layer 3) — rendered centered on top */
    icon?: React.ReactNode;
    /** Dark mode variant — adjusts opacities per spec */
    dark?: boolean;
}
/**
 * Branded Card Illustration — 3-layer construction
 *
 * Layer 1: Tinted container (accent at 6-10% opacity)
 * Layer 2: Decorative SVG pattern (3-12% opacity)
 * Layer 3: Primary icon/illustration (centered)
 *
 * Used on dashboard cards, survey steps, and track cards.
 */
declare const CardIllustration: React.ForwardRefExoticComponent<CardIllustrationProps & React.RefAttributes<HTMLDivElement>>;

interface TrackIllustrationDef {
    /** Creative codename */
    codename: string;
    /** What this card covers */
    section: string;
    /** Accent color hex */
    accent: string;
    /** Pattern component */
    pattern: React.ComponentType<{
        accent: string;
    }>;
    /** Icon component */
    icon: React.ComponentType<{
        accent: string;
        size?: number;
    }>;
}
/** Pre-defined track card illustrations — permanently assigned */
declare const TRACK_ILLUSTRATIONS: Record<string, TrackIllustrationDef>;
interface TrackCardIllustrationProps extends Omit<CardIllustrationProps, "accent" | "pattern" | "icon"> {
    /** Registry key (e.g. "daily-credit-score") */
    illustrationKey: string;
    /** Override accent color */
    accentOverride?: string;
    /** Icon size in px (default 48) */
    iconSize?: number;
}
declare function TrackCardIllustration({ illustrationKey, accentOverride, iconSize, ...props }: TrackCardIllustrationProps): react_jsx_runtime.JSX.Element | null;

interface TrackIconProps {
    accent: string;
    size?: number;
    className?: string;
}
declare function CreditScoreIcon({ accent, size, className }: TrackIconProps): react_jsx_runtime.JSX.Element;
declare function SavingsIcon({ accent, size, className }: TrackIconProps): react_jsx_runtime.JSX.Element;
declare function DtiIcon({ accent, size, className }: TrackIconProps): react_jsx_runtime.JSX.Element;
declare function DreamHomeIcon({ accent, size, className }: TrackIconProps): react_jsx_runtime.JSX.Element;
declare function MortgageTermsIcon({ accent, size, className }: TrackIconProps): react_jsx_runtime.JSX.Element;
declare function BudgetIcon({ accent, size, className }: TrackIconProps): react_jsx_runtime.JSX.Element;
declare function TimelineIcon({ accent, size, className }: TrackIconProps): react_jsx_runtime.JSX.Element;
declare function StreakIcon({ accent, size, className }: TrackIconProps): react_jsx_runtime.JSX.Element;
declare function DailyExerciseIcon({ accent, size, className }: TrackIconProps): react_jsx_runtime.JSX.Element;
declare function WeeklyChallengeIcon({ accent, size, className }: TrackIconProps): react_jsx_runtime.JSX.Element;
declare function SelfPacedIcon({ accent, size, className }: TrackIconProps): react_jsx_runtime.JSX.Element;
declare function CelebrationIcon({ accent, size, className }: TrackIconProps): react_jsx_runtime.JSX.Element;
declare function DownPaymentIcon({ accent, size, className }: TrackIconProps): react_jsx_runtime.JSX.Element;
declare function PreApprovalIcon({ accent, size, className }: TrackIconProps): react_jsx_runtime.JSX.Element;
declare function NeighborhoodIcon({ accent, size, className }: TrackIconProps): react_jsx_runtime.JSX.Element;
declare const TRACK_ICONS: Record<string, React.ComponentType<TrackIconProps>>;

declare function DawnIcon({ accent, size, className }: TrackIconProps): react_jsx_runtime.JSX.Element;
declare function SignalIcon({ accent, size, className }: TrackIconProps): react_jsx_runtime.JSX.Element;
declare function PulseIcon({ accent, size, className }: TrackIconProps): react_jsx_runtime.JSX.Element;
declare function AtlasIcon({ accent, size, className }: TrackIconProps): react_jsx_runtime.JSX.Element;
declare const DASHBOARD_ICONS: Record<string, React.ComponentType<TrackIconProps>>;

declare function AccountabilityTrackerIcon({ accent, size, className }: TrackIconProps): react_jsx_runtime.JSX.Element;
declare function DrumbeatIcon({ accent, size, className }: TrackIconProps): react_jsx_runtime.JSX.Element;
declare function HarvestHomeIcon({ accent, size, className }: TrackIconProps): react_jsx_runtime.JSX.Element;
declare function OpenHouseHubIcon({ accent, size, className }: TrackIconProps): react_jsx_runtime.JSX.Element;
declare function HomeStretchIcon({ accent, size, className }: TrackIconProps): react_jsx_runtime.JSX.Element;
declare function HomeReadyIcon({ accent, size, className }: TrackIconProps): react_jsx_runtime.JSX.Element;
declare function NewsletterStudioIcon({ accent, size, className }: TrackIconProps): react_jsx_runtime.JSX.Element;
declare function MarketIntelIcon({ accent, size, className }: TrackIconProps): react_jsx_runtime.JSX.Element;
declare function OvenIcon({ accent, size, className }: TrackIconProps): react_jsx_runtime.JSX.Element;
declare function LeadCaptureFormsIcon({ accent, size, className }: TrackIconProps): react_jsx_runtime.JSX.Element;
declare const APP_ICONS: Record<string, React.ComponentType<TrackIconProps>>;

interface DashboardIllustrationDef {
    /** Creative codename */
    codename: string;
    /** What card this is for */
    section: string;
    /** Accent color hex */
    accent: string;
    /** Pattern component */
    pattern: React.ComponentType<{
        accent: string;
    }>;
    /** Icon component */
    icon: React.ComponentType<TrackIconProps>;
    /** Whether this should render in dark mode */
    dark?: boolean;
}
declare const DASHBOARD_ILLUSTRATIONS: Record<string, DashboardIllustrationDef>;
interface DashboardCardIllustrationProps extends Omit<CardIllustrationProps, "accent" | "pattern" | "icon" | "dark"> {
    /** Registry key (e.g. "market-intel", "before-9") */
    illustrationKey: string;
    /** Override accent color */
    accentOverride?: string;
    /** Icon size in px (default 48) */
    iconSize?: number;
}
declare function DashboardCardIllustration({ illustrationKey, accentOverride, iconSize, ...props }: DashboardCardIllustrationProps): react_jsx_runtime.JSX.Element | null;

interface AppIllustrationDef {
    /** Creative codename */
    codename: string;
    /** What app this is for */
    section: string;
    /** Accent color hex */
    accent: string;
    /** Pattern component */
    pattern: React.ComponentType<{
        accent: string;
    }>;
    /** Icon component */
    icon: React.ComponentType<TrackIconProps>;
}
declare const APP_ILLUSTRATIONS: Record<string, AppIllustrationDef>;
interface AppCardIllustrationProps extends Omit<CardIllustrationProps, "accent" | "pattern" | "icon"> {
    /** Registry key (e.g. "home-ready", "drumbeat") */
    illustrationKey: string;
    /** Override accent color */
    accentOverride?: string;
    /** Icon size in px (default 24 for app cards) */
    iconSize?: number;
}
declare function AppCardIllustration({ illustrationKey, accentOverride, iconSize, ...props }: AppCardIllustrationProps): react_jsx_runtime.JSX.Element | null;

interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> {
    header?: React.ReactNode;
}
declare const AppShell: React.ForwardRefExoticComponent<AppShellProps & React.RefAttributes<HTMLDivElement>>;

interface AppHeaderProps extends React.HTMLAttributes<HTMLElement> {
    logo?: React.ReactNode;
    title?: string;
    leftSlot?: React.ReactNode;
    rightSlot?: React.ReactNode;
}
declare const AppHeader: React.ForwardRefExoticComponent<AppHeaderProps & React.RefAttributes<HTMLElement>>;
interface AppHeaderActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    dot?: boolean;
}
declare const AppHeaderAction: React.ForwardRefExoticComponent<AppHeaderActionProps & React.RefAttributes<HTMLButtonElement>>;
declare const AppHeaderDivider: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;

interface SlidePanelProps {
    isOpen: boolean;
    onClose: () => void;
    position?: "left" | "right";
    width?: string;
    children?: React.ReactNode;
    className?: string;
}
declare function SlidePanel({ isOpen, onClose, position, width, children, className, }: SlidePanelProps): react_jsx_runtime.JSX.Element;
declare const SlidePanelHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const SlidePanelBody: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const SlidePanelFooter: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const SlidePanelClose: React.ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & React.RefAttributes<HTMLButtonElement>>;

declare const pageContainerVariants: (props?: ({
    maxWidth?: "sm" | "md" | "lg" | "xl" | "full" | null | undefined;
    padding?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof pageContainerVariants> {
}
declare const PageContainer: React.ForwardRefExoticComponent<PageContainerProps & React.RefAttributes<HTMLDivElement>>;

interface DashboardNavItem {
    icon: React.ReactNode;
    label: string;
    href?: string;
    onClick?: () => void;
}
interface DashboardNavGroup {
    label?: string | null;
    items: DashboardNavItem[];
}
interface DashboardShellProps {
    /** Logo element (top-left, beside title) */
    logo: React.ReactNode;
    /** App title — renders in heading font at 30px */
    appTitle: string;
    /** Subtitle below the title */
    appSubtitle: string;
    /** Dynamic highlight paragraph (numbers auto-bolded if string) */
    highlightText?: React.ReactNode;
    /** Agent name shown in top-right card */
    agentName: string;
    /** Two-letter initials for the avatar circle */
    agentInitials: string;
    /** Role/title shown below agent name */
    agentSubtitle?: string;
    /** Sidebar navigation groups */
    navGroups: DashboardNavGroup[];
    /** Label of the currently active nav item */
    activeNavLabel?: string;
    /** Called when a nav item is clicked */
    onNavClick?: (item: DashboardNavItem) => void;
    /** Left 50% of main content area */
    heroContent?: React.ReactNode;
    /** Right 50% of main content area (omit for full-width hero) */
    rightCard?: React.ReactNode;
    /** Content below the hero row */
    children?: React.ReactNode;
    /** Content rendered inside the agent card (left-justified) — card expands to fill top bar */
    headerActions?: React.ReactNode;
    /** Content rendered to the left of the agent card in the top-right area */
    headerRightSlot?: React.ReactNode;
    /** Extra className for the header left area (logo + title) — useful for animations */
    headerClassName?: string;
    className?: string;
}
declare function DashboardShell({ logo, appTitle, appSubtitle, highlightText, agentName, agentInitials, agentSubtitle, navGroups, activeNavLabel, onNavClick, heroContent, rightCard, children, headerActions, headerRightSlot, headerClassName, className, }: DashboardShellProps): react_jsx_runtime.JSX.Element;

interface PipelineData {
    cold: number;
    warming: number;
    engaged: number;
    qualified: number;
    hot: number;
}
interface QuickStat {
    value: string | number;
    label: string;
}
interface PipelineThermometerProps {
    title?: string;
    data: PipelineData;
    stats?: QuickStat[];
    totalLabel?: string;
    className?: string;
}
declare const STAGES: readonly ["cold", "warming", "engaged", "qualified", "hot"];
declare const STAGE_LABELS: Record<keyof PipelineData, string>;
declare const STAGE_COLORS: Record<keyof PipelineData, string>;
declare function PipelineThermometer({ title, data, stats, totalLabel, className, }: PipelineThermometerProps): react_jsx_runtime.JSX.Element;

interface AppCardProps {
    icon: React.ReactNode;
    title: string;
    status: string;
    statusVariant: BadgeVariant;
    value: string | number;
    valueLabel: string;
    description: string;
    subtext?: string;
    large?: boolean;
    /** Accent color for the branded icon illustration */
    accentColor?: string;
    /** Registry key for full branded illustration (pattern + custom icon) */
    illustrationKey?: string;
    onClick?: () => void;
    className?: string;
}
declare function AppCard({ icon, title, status, statusVariant, value, valueLabel, description, subtext, large, accentColor, illustrationKey, onClick, className, }: AppCardProps): react_jsx_runtime.JSX.Element;

interface CategoryApp {
    icon: React.ReactNode;
    title: string;
    status: string;
    statusVariant: AppCardProps["statusVariant"];
    value: string | number;
    valueLabel: string;
    description: string;
    subtext?: string;
    large?: boolean;
    href?: string;
    /** Override accent color for this app's icon illustration */
    accentColor?: string;
    /** Registry key for full branded illustration (pattern + custom icon) */
    illustrationKey?: string;
}
interface CategorySectionProps {
    id: string;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    iconBg: string;
    iconColor: string;
    apps: CategoryApp[];
    defaultExpanded?: boolean;
    onAppClick?: (app: CategoryApp) => void;
    className?: string;
}
declare function CategorySection({ id, title, subtitle, icon, iconBg, iconColor, apps, defaultExpanded, onAppClick, className, }: CategorySectionProps): react_jsx_runtime.JSX.Element;

interface ScheduleItem {
    time: string;
    event: string;
}
interface TodayScheduleProps {
    date?: string;
    items: ScheduleItem[];
    onViewAll?: () => void;
    className?: string;
}
declare function TodaySchedule({ date, items, onViewAll, className, }: TodayScheduleProps): react_jsx_runtime.JSX.Element;

interface DragHintProps extends React.HTMLAttributes<HTMLDivElement> {
    message?: string;
}
declare function DragHint({ message, className, ...props }: DragHintProps): react_jsx_runtime.JSX.Element;

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
    label: string;
    value: string | number;
    icon?: React.ReactNode;
    color?: string;
    subtitle?: string;
}
declare function StatCard({ label, value, icon, color, subtitle, className, ...props }: StatCardProps): react_jsx_runtime.JSX.Element;

interface ProgressSegment {
    /** How many units this segment represents */
    value: number;
    /** CSS color for the segment */
    color: string;
}
interface SegmentedProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Segments to display (each with a value and color) */
    segments: ProgressSegment[];
    /** Total number of units */
    total: number;
    /** Bar height */
    size?: "sm" | "md" | "lg";
}
declare function SegmentedProgress({ segments, total, size, className, ...props }: SegmentedProgressProps): react_jsx_runtime.JSX.Element | null;

type TaskTemperature = "hot" | "qualified" | "engaged" | "warming" | "cold" | "sphere";
type TaskActionType = "call" | "text" | "email" | "review" | "send";
interface HeroActionTask {
    id: string;
    contactName: string;
    contextLine: string;
    temperature: TaskTemperature;
    completed: boolean;
    actionType?: TaskActionType;
}
interface HeroActionCardProps {
    /** Card title, e.g. "FIVE BEFORE 9" */
    title: string;
    /** Main heading, e.g. "Your calls today" */
    heading: string;
    /** Motivational subtitle */
    subtitle?: string;
    /** Progress: completed / total */
    completedCount: number;
    totalCount: number;
    /** The task items */
    tasks: HeroActionTask[];
    /** Called when a task is checked/unchecked */
    onTaskToggle?: (taskId: string, completed: boolean) => void;
    /** Called when a task row is clicked (e.g., open contact) */
    onTaskClick?: (taskId: string) => void;
    /** Footer action */
    onViewFullPlan?: () => void;
    /** Footer button text */
    footerText?: string;
    /** Optional branded illustration rendered next to the header */
    illustration?: React.ReactNode;
    className?: string;
}
declare function HeroActionCard({ title, heading, subtitle, completedCount, totalCount, tasks, onTaskToggle, onTaskClick, onViewFullPlan, footerText, illustration, className, }: HeroActionCardProps): react_jsx_runtime.JSX.Element;

interface AudioPlayerCardProps {
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
declare function AudioPlayerCard({ src, title, subtitle, icon, className, }: AudioPlayerCardProps): react_jsx_runtime.JSX.Element;

type NewsTagType = "new" | "sold" | "price" | "update" | "alert" | "report";
interface NewsItem {
    id: string;
    /** Tag label, e.g. "NEW", "SOLD" */
    tag: NewsTagType;
    /** Headline text */
    headline: string;
    /** Short summary */
    summary?: string;
    /** URL to open on click */
    href?: string;
    /** Timestamp string, e.g. "2h ago" */
    timestamp?: string;
}
interface NewsRowProps {
    /** News items to display */
    items: NewsItem[];
    /** Called when an item is clicked */
    onItemClick?: (item: NewsItem) => void;
    /** Max number of items to show */
    maxItems?: number;
    /** Additional class names */
    className?: string;
}
declare function NewsRow({ items, onItemClick, maxItems, className, }: NewsRowProps): react_jsx_runtime.JSX.Element;

interface MiniKanbanItem {
    id: string;
    /** Primary label (e.g. contact name) */
    label: string;
    /** Secondary text (e.g. loan amount, status) */
    subtitle?: string;
    /** Optional color for the left accent */
    color?: string;
}
interface MiniKanbanColumn {
    /** Column identifier */
    id: string;
    /** Column header label */
    title: string;
    /** Color for the column header accent */
    color: string;
    /** Items in this column */
    items: MiniKanbanItem[];
    /** Count override — if provided, shown instead of items.length */
    count?: number;
}
interface MiniKanbanProps {
    /** Columns to display */
    columns: MiniKanbanColumn[];
    /** Called when an item is clicked */
    onItemClick?: (itemId: string, columnId: string) => void;
    /** Max items to show per column before truncating */
    maxItemsPerColumn?: number;
    /** Additional class names */
    className?: string;
}
declare function MiniKanban({ columns, onItemClick, maxItemsPerColumn, className, }: MiniKanbanProps): react_jsx_runtime.JSX.Element;

interface ConversionScoreProps extends React.HTMLAttributes<HTMLDivElement> {
    score: number;
    temperature: "hot" | "warm" | "cold";
    trend?: {
        direction: "up" | "down";
        value: string;
    };
    label?: string;
}
declare function ConversionScore({ score, temperature, trend, label, className, ...props }: ConversionScoreProps): react_jsx_runtime.JSX.Element;

type FactorVariant = "hot" | "qualified" | "engaged" | "warming" | "cold" | "success";
interface DecisionFactor {
    label: string;
    weight: number;
    variant?: FactorVariant;
}
interface DecisionExplanationCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    subtitle?: string;
    explanation: string;
    factors: DecisionFactor[];
    confidence?: {
        level: string;
        score: number;
    };
    illustration?: React.ReactNode;
    showMiloBadge?: boolean;
}
declare function DecisionExplanationCard({ title, subtitle, explanation, factors, confidence, illustration, showMiloBadge, className, ...props }: DecisionExplanationCardProps): react_jsx_runtime.JSX.Element;

interface BehavioralTagProps extends BadgeProps {
    onRemove?: () => void;
}
declare function BehavioralTag({ onRemove, children, className, ...badgeProps }: BehavioralTagProps): react_jsx_runtime.JSX.Element;

interface WasThisHelpfulProps extends React.HTMLAttributes<HTMLDivElement> {
    onFeedback: (helpful: boolean) => void;
    label?: string;
    variant?: "default" | "compact" | "inline";
}
declare function WasThisHelpful({ onFeedback, label, variant, className, ...props }: WasThisHelpfulProps): react_jsx_runtime.JSX.Element;

declare function cn(...inputs: ClassValue[]): string;

export { APP_ICONS, APP_ILLUSTRATIONS, AccountabilityTrackerIcon, AppCard, AppCardIllustration, type AppCardIllustrationProps, type AppCardProps, AppHeader, AppHeaderAction, type AppHeaderActionProps, AppHeaderDivider, type AppHeaderProps, type AppIllustrationDef, AppShell, type AppShellProps, AtlasIcon, AudioPlayerCard, type AudioPlayerCardProps, Avatar, AvatarFallback, AvatarImage, Badge, type BadgeProps, type BadgeVariant, BehavioralTag, type BehavioralTagProps, BudgetIcon, Button, type ButtonProps, ButtonSpinner, Card, CardContent, CardDescription, CardFooter, CardHeader, CardIllustration, type CardIllustrationProps, CardLoader, type CardProps, CardTitle, type CategoryApp, CategorySection, type CategorySectionProps, CelebrationIcon, Checkbox, type Column, ConcentricCircles, ConversionScore, type ConversionScoreProps, CreditScoreIcon, CrossHatch, DASHBOARD_ICONS, DASHBOARD_ILLUSTRATIONS, DailyExerciseIcon, DashboardCardIllustration, type DashboardCardIllustrationProps, type DashboardIllustrationDef, type DashboardNavGroup, type DashboardNavItem, DashboardShell, type DashboardShellProps, DawnIcon, DecisionExplanationCard, type DecisionExplanationCardProps, type DecisionFactor, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger, DiamondGrid, DotGrid, DownPaymentIcon, DragHint, type DragHintProps, DreamHomeIcon, DrumbeatIcon, DtiIcon, EmptyState, type EmptyStateProps, type FactorVariant, HarvestHomeIcon, HeroActionCard, type HeroActionCardProps, type HeroActionTask, HomeReadyIcon, HomeStretchIcon, InlineLoading, Input, type InputProps, Label, LeadCaptureFormsIcon, LoadingOverlay, MarketIntelIcon, MiniKanban, type MiniKanbanColumn, type MiniKanbanItem, type MiniKanbanProps, MortgageTermsIcon, NeighborhoodIcon, type NewsItem, NewsRow, type NewsRowProps, type NewsTagType, NewsletterStudioIcon, OpenHouseHubIcon, OrbitalRings, OvenIcon, PATTERNS, PageContainer, type PageContainerProps, PageLoader, Pagination, type PaginationProps, type PipelineData, PipelineThermometer, type PipelineThermometerProps, PreApprovalIcon, Progress, type ProgressProps, type ProgressSegment, PulseIcon, type QuickStat, RadialBurst, STAGES, STAGE_COLORS, STAGE_LABELS, SavingsIcon, type ScheduleItem, SegmentedProgress, type SegmentedProgressProps, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue, SelfPacedIcon, SignalIcon, Skeleton, SkeletonCircle, type SkeletonCircleProps, type SkeletonProps, SkeletonStyles, SkeletonText, type SkeletonTextProps, SlidePanel, SlidePanelBody, SlidePanelClose, SlidePanelFooter, SlidePanelHeader, type SlidePanelProps, Spinner, type SpinnerProps, StatCard, type StatCardProps, StreakIcon, type SurveyQuestion, SurveyStepCard, type SurveyStepCardProps, TRACK_ICONS, TRACK_ILLUSTRATIONS, Table, type TableProps, type TaskActionType, type TaskTemperature, Textarea, type TextareaProps, TimelineIcon, Toast, type ToastData, type ToastPosition, type ToastProps, ToastProvider, type ToastVariant, type ToasterProps, TodaySchedule, type TodayScheduleProps, TrackCardIllustration, type TrackCardIllustrationProps, type TrackIconProps, type TrackIllustrationDef, WasThisHelpful, type WasThisHelpfulProps, WeeklyChallengeIcon, badgeVariants, buttonVariants, cn, useToast };
