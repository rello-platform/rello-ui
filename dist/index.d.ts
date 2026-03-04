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
    className?: string;
}
declare function DashboardShell({ logo, appTitle, appSubtitle, highlightText, agentName, agentInitials, agentSubtitle, navGroups, activeNavLabel, onNavClick, heroContent, rightCard, children, className, }: DashboardShellProps): react_jsx_runtime.JSX.Element;

interface PipelineData {
    LEAD: number;
    NURTURING: number;
    APPLICATION: number;
    PROCESSING: number;
    CLOSED_WON: number;
    CLOSED_LOST: number;
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
declare const STAGES: readonly ["LEAD", "NURTURING", "APPLICATION", "PROCESSING", "CLOSED_WON", "CLOSED_LOST"];
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
    onClick?: () => void;
    className?: string;
}
declare function AppCard({ icon, title, status, statusVariant, value, valueLabel, description, subtext, large, onClick, className, }: AppCardProps): react_jsx_runtime.JSX.Element;

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

declare function cn(...inputs: ClassValue[]): string;

export { AppCard, type AppCardProps, AppHeader, AppHeaderAction, type AppHeaderActionProps, AppHeaderDivider, type AppHeaderProps, AppShell, type AppShellProps, Avatar, AvatarFallback, AvatarImage, Badge, type BadgeProps, type BadgeVariant, Button, type ButtonProps, ButtonSpinner, Card, CardContent, CardDescription, CardFooter, CardHeader, CardLoader, type CardProps, CardTitle, type CategoryApp, CategorySection, type CategorySectionProps, Checkbox, type Column, type DashboardNavGroup, type DashboardNavItem, DashboardShell, type DashboardShellProps, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger, DragHint, type DragHintProps, EmptyState, type EmptyStateProps, InlineLoading, Input, type InputProps, Label, LoadingOverlay, PageContainer, type PageContainerProps, PageLoader, Pagination, type PaginationProps, type PipelineData, PipelineThermometer, type PipelineThermometerProps, Progress, type ProgressProps, type QuickStat, STAGES, STAGE_COLORS, STAGE_LABELS, type ScheduleItem, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue, SlidePanel, SlidePanelBody, SlidePanelClose, SlidePanelFooter, SlidePanelHeader, type SlidePanelProps, Spinner, type SpinnerProps, StatCard, type StatCardProps, Table, type TableProps, Textarea, type TextareaProps, TodaySchedule, type TodayScheduleProps, badgeVariants, buttonVariants, cn };
