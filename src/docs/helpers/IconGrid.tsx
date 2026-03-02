"use client";

import * as React from "react";
import * as Iconoir from "iconoir-react";

const iconMap: Record<string, { component: string; context: string }> = {
  Home: { component: "Home", context: "Navigation, listings" },
  Group: { component: "Group", context: "People, team" },
  User: { component: "User", context: "Profile, agent" },
  Calendar: { component: "Calendar", context: "Schedule" },
  Search: { component: "Search", context: "Global search" },
  Phone: { component: "Phone", context: "Call actions" },
  Mail: { component: "Mail", context: "Email actions" },
  MessageText: { component: "MessageText", context: "SMS, messaging" },
  ChatBubble: { component: "ChatBubble", context: "Conversations" },
  TrendingUp: { component: "TrendingUp", context: "Pipeline, stats" },
  Target: { component: "Target", context: "Goals" },
  VideoCamera: { component: "VideoCamera", context: "Video" },
  SendDiagonal: { component: "SendDiagonal", context: "Send, campaigns" },
  Bell: { component: "Bell", context: "Notifications" },
  Settings: { component: "Settings", context: "Configuration" },
  Menu: { component: "Menu", context: "Navigation" },
  StatsReport: { component: "StatsReport", context: "Analytics" },
  CheckCircle: { component: "CheckCircle", context: "Completed" },
  Star: { component: "Star", context: "Reviews, favorites" },
  Gift: { component: "Gift", context: "Referrals, rewards" },
  Heart: { component: "Heart", context: "Retention, favorites" },
  Rocket: { component: "Rocket", context: "Launch" },
  Activity: { component: "Activity", context: "Journey engine" },
  MapPin: { component: "MapPin", context: "Location" },
  OpenNewWindow: { component: "OpenNewWindow", context: "Open house" },
  QrCode: { component: "QrCode", context: "Lead capture" },
  Sparks: { component: "Sparks", context: "AI Assistant" },
  LightBulb: { component: "LightBulb", context: "Insights" },
  Building: { component: "Building", context: "Broker" },
  ClipboardCheck: { component: "ClipboardCheck", context: "Checklists" },
  ShareAndroid: { component: "ShareAndroid", context: "Share" },
  Handshake: { component: "Handshake", context: "Partnerships" },
  UserPlus: { component: "UserPlus", context: "Recruiting" },
  Award: { component: "Award", context: "Achievements" },
  NavArrowDown: { component: "NavArrowDown", context: "Dropdowns" },
  NavArrowRight: { component: "NavArrowRight", context: "Navigation" },
  ArrowUpRight: { component: "ArrowUpRight", context: "External links" },
  LogOut: { component: "LogOut", context: "Sign out" },
  RefreshDouble: { component: "RefreshDouble", context: "Sync, reload" },
  Xmark: { component: "Xmark", context: "Close, cancel" },
  Plus: { component: "Plus", context: "Add new" },
  EditPencil: { component: "EditPencil", context: "Edit" },
  Trash: { component: "Trash", context: "Delete" },
};

function IconCell({ name, context }: { name: string; context: string }) {
  const IconComponent = (Iconoir as Record<string, React.ComponentType<{ width?: number; height?: number; strokeWidth?: number }>>)[name];

  if (!IconComponent) return null;

  return (
    <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-[var(--neutral-100)] hover:border-[var(--brand-primary)] hover:bg-[var(--brand-primary-light)] transition-all cursor-default">
      <IconComponent width={24} height={24} strokeWidth={1.5} />
      <div className="text-xs font-mono text-[var(--foreground)] text-center">{name}</div>
      <div className="text-[10px] text-[var(--muted-foreground)] text-center">{context}</div>
    </div>
  );
}

export function IconGrid() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
      {Object.entries(iconMap).map(([name, { context }]) => (
        <IconCell key={name} name={name} context={context} />
      ))}
    </div>
  );
}
