import { useState } from "react";

export function TabNavigationDemo() {
  const [active, setActive] = useState("overview");
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "activity", label: "Activity", badge: 3 },
    { id: "files", label: "Files" },
    { id: "notes", label: "Notes", badge: 1 },
  ];

  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)]">
        <span className="text-sm font-medium text-[var(--neutral-700)]">Tab Navigation — Click tabs to switch</span>
      </div>
      <div className="bg-white">
        <div className="flex border-b border-[var(--neutral-200)]">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActive(tab.id)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${active === tab.id ? "text-[var(--brand-primary)] border-[var(--brand-primary)]" : "text-[var(--neutral-500)] border-transparent hover:text-[var(--neutral-700)]"}`}>
              {tab.label}
              {tab.badge && <span className={`ml-1.5 inline-flex items-center justify-center size-4 text-[10px] font-bold rounded-full ${active === tab.id ? "bg-[var(--brand-primary)] text-white" : "bg-[var(--neutral-200)] text-[var(--neutral-600)]"}`}>{tab.badge}</span>}
            </button>
          ))}
        </div>
        <div className="p-4" key={active} style={{ animation: "tab-in 200ms ease-out" }}>
          <style>{`@keyframes tab-in { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }`}</style>
          <p className="text-sm text-[var(--neutral-600)]">Content for <span className="font-medium text-[var(--foreground)]">{tabs.find(t => t.id === active)?.label}</span> tab</p>
        </div>
      </div>
    </div>
  );
}

export function BreadcrumbsDemo() {
  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)]">
        <span className="text-sm font-medium text-[var(--neutral-700)]">Breadcrumbs</span>
      </div>
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-1.5 text-[13px]">
          <a className="text-[var(--neutral-500)] hover:text-[var(--brand-primary)] cursor-pointer">Settings</a>
          <span className="text-[var(--neutral-400)]">/</span>
          <a className="text-[var(--neutral-500)] hover:text-[var(--brand-primary)] cursor-pointer">Branding</a>
          <span className="text-[var(--neutral-400)]">/</span>
          <span className="text-[var(--neutral-700)]">Colors</span>
        </div>
        <div className="flex items-center gap-1.5 text-[13px]">
          <a className="text-[var(--neutral-500)] hover:text-[var(--brand-primary)] cursor-pointer">Contacts</a>
          <span className="text-[var(--neutral-400)]">/</span>
          <a className="text-[var(--neutral-500)] hover:text-[var(--brand-primary)] cursor-pointer">Sarah Johnson</a>
          <span className="text-[var(--neutral-400)]">/</span>
          <span className="text-[var(--neutral-700)]">Activity</span>
        </div>
        <div className="flex items-center gap-1.5 text-[13px]">
          <a className="text-[var(--neutral-500)] hover:text-[var(--brand-primary)] cursor-pointer">Dashboard</a>
          <span className="text-[var(--neutral-400)]">/</span>
          <span className="text-[var(--neutral-400)]">...</span>
          <span className="text-[var(--neutral-400)]">/</span>
          <a className="text-[var(--neutral-500)] hover:text-[var(--brand-primary)] cursor-pointer">Compliance</a>
          <span className="text-[var(--neutral-400)]">/</span>
          <span className="text-[var(--neutral-700)]">Documents</span>
        </div>
      </div>
    </div>
  );
}

export function SidebarAppShellDemo() {
  const [activePage, setActivePage] = useState("dashboard");
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "◻" },
    { id: "pipeline", label: "Pipeline", icon: "◈" },
    { id: "contacts", label: "Contacts", icon: "◉" },
    { id: "campaigns", label: "Campaigns", icon: "◎" },
    { id: "settings", label: "Settings", icon: "⚙" },
  ];

  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)]">
        <span className="text-sm font-medium text-[var(--neutral-700)]">Sidebar / App Shell — Click nav items</span>
      </div>
      <div className="flex h-56">
        <div className="w-40 bg-white border-r border-[var(--neutral-200)] p-2">
          <div className="text-xs font-bold text-[var(--brand-primary)] px-3 py-2 mb-1">RELLO</div>
          {navItems.map(item => (
            <button key={item.id} onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center gap-2 px-3 py-2 text-xs rounded-lg mb-0.5 transition-colors ${activePage === item.id ? "bg-[var(--brand-primary-light)] text-[var(--brand-primary)] font-medium" : "text-[var(--neutral-600)] hover:bg-[var(--neutral-50)]"}`}>
              <span>{item.icon}</span> {item.label}
            </button>
          ))}
        </div>
        <div className="flex-1 p-3">
          <div className="bg-white border-b border-[var(--neutral-200)] px-3 py-2 -m-3 mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-[var(--foreground)] capitalize">{activePage}</span>
            <div className="size-7 rounded-full bg-[var(--brand-primary-light)] flex items-center justify-center text-[10px] font-bold text-[var(--brand-primary)]">KS</div>
          </div>
          <div className="bg-[var(--neutral-50)] rounded-lg p-3 text-center" key={activePage} style={{ animation: "shell-in 200ms ease-out" }}>
            <style>{`@keyframes shell-in { from { opacity: 0; } to { opacity: 1; } }`}</style>
            <p className="text-xs text-[var(--neutral-500)] capitalize">{activePage} content area</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DropdownMenuDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[var(--neutral-50)] rounded-xl border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)]">
        <span className="text-sm font-medium text-[var(--neutral-700)]">Dropdown / Context Menu — Click the dots</span>
      </div>
      <div className="p-4" style={{ minHeight: 220 }}>
        <div className="bg-white rounded-lg border border-[var(--neutral-100)] p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[var(--foreground)]">Sarah Johnson</p>
            <p className="text-xs text-[var(--neutral-500)]">Hot Lead — Score: 92</p>
          </div>
          <div className="relative">
            <button onClick={() => setOpen(!open)} className="size-8 rounded-md hover:bg-[var(--neutral-100)] flex items-center justify-center text-[var(--neutral-500)]">⋯</button>
            {open && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
                <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-[var(--neutral-200)] rounded-md shadow-lg z-20 py-1" style={{ animation: "dropdown-in 150ms ease-out" }}>
                  <style>{`@keyframes dropdown-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }`}</style>
                  {[
                    { label: "View Details", icon: "👁" },
                    { label: "Edit Lead", icon: "✏️" },
                    { label: "Assign Agent", icon: "👤" },
                  ].map(item => (
                    <button key={item.label} onClick={() => setOpen(false)} className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-[var(--neutral-700)] hover:bg-[var(--neutral-100)]">
                      <span className="text-xs">{item.icon}</span> {item.label}
                    </button>
                  ))}
                  <div className="my-1 h-px bg-[var(--neutral-100)]" />
                  <button onClick={() => setOpen(false)} className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-[var(--error)] hover:bg-[var(--neutral-100)]">
                    <span className="text-xs">🗑</span> Delete Lead
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
