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
        <h2 className="font-heading text-lg font-semibold text-[var(--foreground)] mb-3">Buttons</h2>
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
        <h2 className="font-heading text-lg font-semibold text-[var(--foreground)] mb-3">Cards</h2>
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Lead Overview</CardTitle>
              <CardDescription>Recent pipeline activity this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="font-stat text-2xl font-bold text-[var(--brand-primary)]">47</p>
                  <p className="text-xs text-[var(--neutral-500)]">Active</p>
                </div>
                <div className="text-center">
                  <p className="font-stat text-2xl font-bold text-[var(--hot)]">12</p>
                  <p className="text-xs text-[var(--neutral-500)]">Hot</p>
                </div>
                <div className="text-center">
                  <p className="font-stat text-2xl font-bold text-[var(--success)]">8</p>
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
        <h2 className="font-heading text-lg font-semibold text-[var(--foreground)] mb-3">Pipeline Badges</h2>
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
        <h2 className="font-heading text-lg font-semibold text-[var(--foreground)] mb-3">Form Elements</h2>
        <div className="grid grid-cols-2 gap-4 max-w-2xl">
          <Input label="Search" placeholder="Search leads..." leftIcon={<Search width={16} height={16} />} />
          <Input label="Email" placeholder="you@example.com" hint="We'll never share your email" />
          <Input label="With Error" defaultValue="bad input" error="This field is required" />
          <Input label="Disabled" defaultValue="Read only" disabled />
        </div>
      </section>

      {/* Section: Progress */}
      <section>
        <h2 className="font-heading text-lg font-semibold text-[var(--foreground)] mb-3">Progress</h2>
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

      {/* Section: Typography Preview */}
      <section>
        <h2 className="font-heading text-lg font-semibold text-[var(--foreground)] mb-3">Typography</h2>
        <Card>
          <CardContent>
            <div className="flex flex-col gap-2">
              <p className="font-heading text-3xl font-bold text-[var(--foreground)]">Heading 1 — Montserrat</p>
              <p className="font-heading text-2xl font-semibold text-[var(--foreground)]">Heading 2 — Montserrat</p>
              <p className="font-heading text-xl font-semibold text-[var(--foreground)]">Heading 3 — Montserrat</p>
              <p className="font-body text-sm text-[var(--neutral-600)]">Body text — Open Sans. The quick brown fox jumps over the lazy dog. This is what most of your app content looks like.</p>
              <p className="font-ui text-xs font-medium text-[var(--neutral-500)]">UI LABEL — Hind — Used for buttons, badges, and small interface elements</p>
              <p className="font-stat text-4xl font-bold text-[var(--brand-primary)]">$425,000</p>
              <p className="text-xs text-[var(--neutral-400)]">Stat font — Mina — Used for numbers, scores, and metrics</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Section: Color Palette */}
      <section>
        <h2 className="font-heading text-lg font-semibold text-[var(--foreground)] mb-3">Color Palette</h2>
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
        <h2 className="font-heading text-lg font-semibold text-[var(--foreground)] mb-3">Loading</h2>
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
