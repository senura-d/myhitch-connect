"use client";

import * as React from "react";
import { IconHome } from "@tabler/icons-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { RatingStars } from "@/components/ui/rating-stars";
import { Stepper } from "@/components/ui/stepper";
import { EmptyState } from "@/components/ui/empty-state";
import { FileUpload } from "@/components/ui/file-upload";
import { DatePicker } from "@/components/ui/date-picker";
import { StatusBadge } from "@/components/ui/status-badge";
import { toast } from "sonner";
import type {
  ProviderVerificationStatus,
  BookingStatus,
  QuoteStatus,
  ListingStatus,
} from "@/types/status";

const PROVIDER_STATUSES: ProviderVerificationStatus[] = [
  "draft",
  "pending_review",
  "action_required",
  "approved",
  "conditionally_approved",
  "suspended",
  "rejected",
  "expired_verification",
];
const BOOKING_STATUSES: BookingStatus[] = [
  "pending",
  "confirmed",
  "in_progress",
  "completed",
  "cancelled",
  "disputed",
];
const QUOTE_STATUSES: QuoteStatus[] = ["requested", "quoted", "accepted", "declined", "expired"];
const LISTING_STATUSES: ListingStatus[] = [
  "draft",
  "pending",
  "published",
  "paused",
  "rejected",
  "archived",
];

export default function DevComponentsPage() {
  const [rating, setRating] = React.useState(3);
  const [date, setDate] = React.useState<Date | undefined>();

  return (
    <div className="mx-auto max-w-5xl space-y-10 p-6 md:p-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Component Library — Dev QA</h1>
        <ThemeToggle />
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Buttons</h2>
        <div className="flex flex-wrap gap-2">
          <Button>Default</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
          <Button size="icon" aria-label="home">
            <IconHome className="size-4" />
          </Button>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Status badges</h2>
        <div className="flex flex-wrap gap-2">
          {PROVIDER_STATUSES.map((s) => (
            <StatusBadge key={s} status={s} />
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {BOOKING_STATUSES.map((s) => (
            <StatusBadge key={s} status={s} />
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {QUOTE_STATUSES.map((s) => (
            <StatusBadge key={s} status={s} />
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {LISTING_STATUSES.map((s) => (
            <StatusBadge key={s} status={s} />
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Form controls</h2>
        <div className="grid max-w-md gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="qa-input">Input</Label>
            <Input id="qa-input" placeholder="Business name" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="qa-textarea">Textarea</Label>
            <Textarea id="qa-textarea" placeholder="Describe your service..." />
          </div>
          <div className="space-y-1.5">
            <Label>Select</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="home">Home & Trade Services</SelectItem>
                <SelectItem value="professional">Professional Services</SelectItem>
                <SelectItem value="personal">Personal Care & Wellness</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Date picker</Label>
            <DatePicker value={date} onChange={setDate} />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="qa-checkbox" />
            <Label htmlFor="qa-checkbox">I agree to the terms</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="qa-switch" />
            <Label htmlFor="qa-switch">Instant booking enabled</Label>
          </div>
          <div className="space-y-1.5">
            <Label>Rating stars (interactive)</Label>
            <RatingStars value={rating} onChange={setRating} readOnly={false} />
          </div>
          <div className="space-y-1.5">
            <Label>Rating stars (read only)</Label>
            <RatingStars value={4.5} />
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">File upload</h2>
        <FileUpload hint="PNG, JPG or PDF up to 10MB" />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Stepper</h2>
        <Stepper
          currentStep={1}
          steps={[
            { id: "account", label: "Account" },
            { id: "type", label: "Provider type" },
            { id: "business", label: "Business info" },
            { id: "categories", label: "Categories" },
          ]}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Card, Avatar, Tabs</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Sunrise Plumbing Co.</CardTitle>
              <CardDescription>Home & Trade Services</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="" alt="Sunrise Plumbing" />
                <AvatarFallback>SP</AvatarFallback>
              </Avatar>
              <RatingStars value={4.8} size="sm" />
            </CardContent>
          </Card>
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">Overview content</TabsContent>
            <TabsContent value="reviews">Reviews content</TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Dialog & Toast</h2>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Open modal</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Cancel booking?</DialogTitle>
                <DialogDescription>This action cannot be undone.</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline">Back</Button>
                <Button variant="destructive">Cancel booking</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline" onClick={() => toast.success("Booking confirmed")}>
            Fire toast
          </Button>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Empty state & skeleton</h2>
        <EmptyState
          icon={IconHome}
          title="No saved providers yet"
          description="Providers you save will show up here."
          action={<Button size="sm">Browse providers</Button>}
        />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </section>

      <Separator />
      <p className="text-xs text-muted-foreground">Internal QA route — not linked from the product nav.</p>
    </div>
  );
}
