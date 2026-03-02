import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../button/Button";
import { Input } from "../input/Input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./Dialog";

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a description of the dialog content and purpose.
          </DialogDescription>
        </DialogHeader>
        <p className="text-sm text-[var(--neutral-600)]">
          Dialog body content goes here.
        </p>
        <DialogFooter>
          <Button variant="ghost">Cancel</Button>
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const DeleteConfirmation: Story = {
  name: "Delete Confirmation",
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="danger">Delete Lead</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Lead</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this lead? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost">Cancel</Button>
          <Button variant="danger">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const WithForm: Story = {
  name: "With Form Content",
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Contact</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Contact</DialogTitle>
          <DialogDescription>
            Enter the contact details below.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <Input label="Full Name" placeholder="John Doe" />
          <Input label="Email" type="email" placeholder="john@example.com" />
          <Input label="Phone" type="tel" placeholder="(555) 123-4567" />
        </div>
        <DialogFooter>
          <Button variant="ghost">Cancel</Button>
          <Button>Save Contact</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const NoCloseButton: Story = {
  name: "Without Close Button",
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open</Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>No Close Button</DialogTitle>
          <DialogDescription>
            This dialog hides the X button. Use the footer actions to dismiss.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost">Dismiss</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
