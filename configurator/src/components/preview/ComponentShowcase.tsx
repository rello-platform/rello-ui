import { Button } from "@rello-ui/components/button/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@rello-ui/components/card/Card";
import { Badge } from "@rello-ui/components/badge/Badge";
import { Input } from "@rello-ui/components/input/Input";
import { Progress } from "@rello-ui/components/progress/Progress";
import { Spinner } from "@rello-ui/components/spinner/Spinner";
import { Search, Mail, Plus, ArrowRight } from "iconoir-react";

export function ComponentShowcase() {
  return (
    <div className="p-8 flex flex-col gap-8">
      {/* Section: Buttons */}
      <section>
        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3" style={{ fontFamily: "var(--font-heading)" }}>Buttons</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="link">Link</Button>
        </div>
        <div className="flex flex-wrap items-center gap-3 mt-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button leftIcon={<Mail width={16} height={16} />}>With Icon</Button>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      {/* Section: Cards */}
      <section>
        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3" style={{ fontFamily: "var(--font-heading)" }}>Cards</h2>
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Lead Overview</CardTitle>
              <CardDescription>Recent pipeline activity this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-[var(--brand-primary)]" style={{ fontFamily: "var(--font-stat)" }}>47</p>
                  <p className="text-xs text-[var(--neutral-500)]">Active</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[var(--hot)]" style={{ fontFamily: "var(--font-stat)" }}>12</p>
                  <p className="text-xs text-[var(--neutral-500)]">Hot</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[var(--success)]" style={{ fontFamily: "var(--font-stat)" }}>8</p>
                  <p className="text-xs text-[var(--neutral-500)]">Closed</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end gap-2">
              <Button variant="ghost" size="sm">Details</Button>
              <Button size="sm" rightIcon={<ArrowRight width={14} height={14} />}>View All</Button>
            </CardFooter>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Add New Contact</CardTitle>
              <CardDescription>Enter the contact details below</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                <Input label="Full Name" placeholder="John Doe" />
                <Input label="Email" placeholder="john@example.com" leftIcon={<Mail width={16} height={16} />} />
                <Input label="Phone" placeholder="(555) 123-4567" />
              </div>
            </CardContent>
            <CardFooter className="justify-end gap-2">
              <Button variant="ghost" size="sm">Cancel</Button>
              <Button size="sm">Save Contact</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Section: Badges */}
      <section>
        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3" style={{ fontFamily: "var(--font-heading)" }}>Pipeline Badges</h2>
        <div className="flex flex-wrap gap-2">
          <Badge variant="hot" dot>Hot</Badge>
          <Badge variant="qualified" dot>Qualified</Badge>
          <Badge variant="engaged" dot>Engaged</Badge>
          <Badge variant="warming" dot>Warming</Badge>
          <Badge variant="cold" dot>Cold</Badge>
        </div>
        <h3 className="text-sm font-medium text-[var(--neutral-700)] mt-4 mb-2">Status Badges</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="success">Active</Badge>
          <Badge variant="warning">Pending</Badge>
          <Badge variant="error">Overdue</Badge>
          <Badge variant="info">New</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="accent">Accent</Badge>
          <Badge variant="default">Default</Badge>
        </div>
      </section>

      {/* Section: Inputs */}
      <section>
        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3" style={{ fontFamily: "var(--font-heading)" }}>Form Elements</h2>
        <div className="grid grid-cols-2 gap-4 max-w-2xl">
          <Input label="Search" placeholder="Search leads..." leftIcon={<Search width={16} height={16} />} />
          <Input label="Email" placeholder="you@example.com" hint="We'll never share your email" />
          <Input label="With Error" defaultValue="bad input" error="This field is required" />
          <Input label="Disabled" defaultValue="Read only" disabled />
        </div>
      </section>

      {/* Section: Progress */}
      <section>
        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3" style={{ fontFamily: "var(--font-heading)" }}>Progress</h2>
        <div className="flex flex-col gap-3 max-w-md">
          <div className="flex items-center gap-3">
            <span className="text-xs text-[var(--neutral-500)] w-16">Default</span>
            <Progress value={65} className="flex-1" />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[var(--neutral-500)] w-16">Success</span>
            <Progress variant="success" value={85} className="flex-1" />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[var(--neutral-500)] w-16">Warning</span>
            <Progress variant="warning" value={45} className="flex-1" />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[var(--neutral-500)] w-16">Hot</span>
            <Progress variant="hot" value={92} className="flex-1" />
          </div>
        </div>
      </section>

      {/* Section: App Title Preview */}
      <section>
        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3" style={{ fontFamily: "var(--font-heading)" }}>App Title & Subtitle</h2>
        <Card>
          <CardContent>
            <div className="flex items-start gap-4">
              <div className="size-14 rounded-2xl flex items-center justify-center shrink-0 bg-[var(--brand-accent-light)]">
                <div className="size-8 rounded-xl bg-[var(--brand-accent)] opacity-50" />
              </div>
              <div>
                <p className="text-3xl font-bold tracking-tight leading-tight text-[var(--foreground)]" style={{ fontFamily: "var(--font-app-title)" }}>APP TITLE FONT</p>
                <p className="text-base text-[var(--neutral-500)]" style={{ fontFamily: "var(--font-app-subtitle)" }}>App subtitle font — this is the tagline under the app name</p>
                <p className="text-sm text-[var(--neutral-400)] mt-1" style={{ fontFamily: "var(--font-app-subtitle)" }}>Welcome to the app! You have 12 hot leads and 3 pending closings.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Section: Typography Preview — uses CSS variable fonts so changes are live */}
      <section>
        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3" style={{ fontFamily: "var(--font-heading)" }}>Typography</h2>
        <Card>
          <CardContent>
            <div className="flex flex-col gap-3">
              <div className="pb-3 border-b border-[var(--neutral-100)]">
                <p className="text-[10px] text-[var(--neutral-400)] uppercase tracking-wider mb-1">Heading Font</p>
                <p className="text-3xl font-bold text-[var(--foreground)]" style={{ fontFamily: "var(--font-heading)" }}>The quick brown fox jumps</p>
                <p className="text-2xl font-semibold text-[var(--foreground)]" style={{ fontFamily: "var(--font-heading)" }}>over the lazy dog — H2</p>
                <p className="text-xl font-semibold text-[var(--foreground)]" style={{ fontFamily: "var(--font-heading)" }}>Heading 3 — Section titles</p>
                <p className="text-base font-semibold text-[var(--foreground)]" style={{ fontFamily: "var(--font-heading)" }}>Heading 4 — Card titles</p>
              </div>
              <div className="pb-3 border-b border-[var(--neutral-100)]">
                <p className="text-[10px] text-[var(--neutral-400)] uppercase tracking-wider mb-1">Body Font</p>
                <p className="text-sm text-[var(--neutral-700)]" style={{ fontFamily: "var(--font-body)" }}>Body text is used for descriptions, paragraphs, and general content throughout the application. It should be highly readable at 14px with a comfortable 1.5 line height.</p>
                <p className="text-xs text-[var(--neutral-500)] mt-1" style={{ fontFamily: "var(--font-body)" }}>Small text — helper text, hints, timestamps, and secondary information at 12px.</p>
              </div>
              <div className="pb-3 border-b border-[var(--neutral-100)]">
                <p className="text-[10px] text-[var(--neutral-400)] uppercase tracking-wider mb-1">UI Font</p>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center px-3.5 py-[5px] text-[13px] font-semibold leading-none rounded-lg bg-[var(--brand-primary)] text-white" style={{ fontFamily: "var(--font-ui)" }}>Button Label</span>
                  <span className="inline-flex items-center justify-center px-3.5 py-[5px] text-[13px] font-semibold leading-none rounded-lg bg-[var(--success-light)] text-[var(--success)]" style={{ fontFamily: "var(--font-ui)" }}>Badge Text</span>
                  <span className="text-xs font-medium text-[var(--neutral-500)] uppercase tracking-wider" style={{ fontFamily: "var(--font-ui)" }}>LABEL / NAV ITEM</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-[var(--neutral-400)] uppercase tracking-wider mb-1">Stat Font</p>
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-4xl font-bold text-[var(--brand-primary)]" style={{ fontFamily: "var(--font-stat)" }}>$425,000</p>
                    <p className="text-xs text-[var(--neutral-400)]">Price / large metric</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[var(--hot)]" style={{ fontFamily: "var(--font-stat)" }}>92</p>
                    <p className="text-xs text-[var(--neutral-400)]">Lead score</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[var(--success)]" style={{ fontFamily: "var(--font-stat)" }}>1,247</p>
                    <p className="text-xs text-[var(--neutral-400)]">Contact count</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Section: Color Palette */}
      <section>
        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3" style={{ fontFamily: "var(--font-heading)" }}>Color Palette</h2>
        <div className="grid grid-cols-10 gap-1">
          {["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"].map((n) => (
            <div key={n} className="flex flex-col items-center">
              <div className="w-full h-10 rounded" style={{ backgroundColor: `var(--neutral-${n})` }} />
              <span className="text-[9px] text-[var(--neutral-500)] mt-1">{n}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Spinners */}
      <section>
        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3" style={{ fontFamily: "var(--font-heading)" }}>Loading</h2>
        <div className="flex items-center gap-4">
          <Spinner size="xs" />
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
        </div>
      </section>
    </div>
  );
}
