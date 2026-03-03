import { useState } from "react";

export function CheckboxRadioDemo() {
  const [checks, setChecks] = useState({ email: true, sms: false, push: true });
  const [radio, setRadio] = useState("qualified");

  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)]">
        <span className="text-sm font-medium text-[var(--neutral-700)]">Checkbox & Radio — Click to toggle</span>
      </div>
      <div className="p-4 grid grid-cols-2 gap-6">
        <div>
          <p className="text-xs font-medium text-[var(--neutral-600)] mb-3">Notification Preferences (Checkbox)</p>
          {(["email", "sms", "push"] as const).map(key => (
            <label key={key} className="flex items-center gap-2.5 mb-2.5 cursor-pointer">
              <button onClick={() => setChecks(p => ({ ...p, [key]: !p[key] }))}
                className="size-4 rounded-[4px] border-2 flex items-center justify-center transition-colors shrink-0"
                style={{ borderColor: checks[key] ? "var(--brand-primary)" : "var(--neutral-300)", backgroundColor: checks[key] ? "var(--brand-primary)" : "white" }}>
                {checks[key] && <span className="text-white text-[10px] font-bold">✓</span>}
              </button>
              <span className="text-sm text-[var(--neutral-700)]">{key === "email" ? "Email notifications" : key === "sms" ? "SMS notifications" : "Push notifications"}</span>
            </label>
          ))}
          <label className="flex items-center gap-2.5 opacity-50 cursor-not-allowed">
            <div className="size-4 rounded-[4px] border-2 border-[var(--neutral-300)]" />
            <span className="text-sm text-[var(--neutral-700)]">Disabled option</span>
          </label>
        </div>
        <div>
          <p className="text-xs font-medium text-[var(--neutral-600)] mb-3">Pipeline Stage (Radio)</p>
          {["hot", "qualified", "engaged", "warming", "cold"].map(stage => (
            <label key={stage} className="flex items-center gap-2.5 mb-2.5 cursor-pointer">
              <button onClick={() => setRadio(stage)}
                className="size-4 rounded-full border-2 flex items-center justify-center transition-colors shrink-0"
                style={{ borderColor: radio === stage ? "var(--brand-primary)" : "var(--neutral-300)" }}>
                {radio === stage && <div className="size-2 rounded-full bg-[var(--brand-primary)]" />}
              </button>
              <span className="text-sm text-[var(--neutral-700)] capitalize">{stage}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ToggleSwitchDemo() {
  const [toggles, setToggles] = useState({ darkMode: false, notifications: true, autoSync: true, beta: false });

  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)]">
        <span className="text-sm font-medium text-[var(--neutral-700)]">Toggle / Switch — Click to toggle</span>
      </div>
      <div className="p-4 space-y-3">
        {Object.entries(toggles).map(([key, on]) => (
          <div key={key} className="flex items-center justify-between">
            <span className="text-sm text-[var(--neutral-700)]">{key === "darkMode" ? "Dark Mode" : key === "notifications" ? "Push Notifications" : key === "autoSync" ? "Auto-Sync Contacts" : "Beta Features"}</span>
            <button onClick={() => setToggles(p => ({ ...p, [key]: !on }))}
              className="relative w-9 h-5 rounded-full transition-colors duration-150"
              style={{ backgroundColor: on ? "var(--brand-primary)" : "var(--neutral-200)" }}>
              <div className="absolute top-0.5 size-4 rounded-full bg-white shadow-xs transition-transform duration-150"
                style={{ transform: on ? "translateX(17px)" : "translateX(2px)" }} />
            </button>
          </div>
        ))}
        <div className="flex items-center justify-between opacity-50">
          <span className="text-sm text-[var(--neutral-700)]">Disabled Toggle</span>
          <div className="relative w-9 h-5 rounded-full bg-[var(--neutral-200)]">
            <div className="absolute top-0.5 left-0.5 size-4 rounded-full bg-white shadow-xs" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function TextareaDemo() {
  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)]">
        <span className="text-sm font-medium text-[var(--neutral-700)]">Textarea — All States</span>
      </div>
      <div className="p-4 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[var(--neutral-700)] mb-1.5">Contact Notes</label>
          <textarea placeholder="Add notes about this lead..." rows={3} className="w-full rounded-md border border-[var(--neutral-200)] bg-white px-3 py-2 text-sm shadow-xs outline-none resize-y focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20 placeholder:text-[var(--neutral-400)]" />
          <p className="mt-1 text-xs text-[var(--neutral-500)]">Visible to your team</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--neutral-700)] mb-1.5">With Error</label>
          <textarea defaultValue="x" rows={3} className="w-full rounded-md border border-[var(--error)] bg-white px-3 py-2 text-sm shadow-xs outline-none resize-y focus:ring-2 focus:ring-[var(--error)]/20" />
          <p className="mt-1 text-xs text-[var(--error)]">Notes must be at least 10 characters</p>
        </div>
      </div>
    </div>
  );
}
