# MYHitch Connect — Front-End Build Design

## Summary

UI-only build of MYHitch Connect, a services marketplace, per the full brief supplied by the user (reproduced in `docs/superpowers/specs/2026-07-31-brief.md`). This doc captures the implementation decisions not already fixed by that brief.

## Confirmed decisions

- **Framework**: Next.js 15 App Router + TypeScript, npm as package manager.
- **Styling**: Tailwind CSS v4 + CSS-variable design tokens (`app/tokens.css`), light/dark via `data-theme`/`prefers-color-scheme`.
- **Component base**: shadcn/ui (Radix primitives) for Button, Input, Select, Dialog(Modal), Tabs, Badge, Card, Avatar, Toast, Popover, Calendar-primitive. Hand-built on top: DatePicker (wraps shadcn Calendar+Popover), RatingStars, FileUpload (drag-and-drop, mock progress), Stepper, EmptyState.
- **Forms**: React Hook Form + Zod resolvers, one schema per form co-located under `lib/validation/`.
- **Data**: TanStack React Query hooks in `hooks/` calling typed functions in `lib/mock-api/`, backed by seed JSON in `lib/mock-api/data/`. Mutations write back into an in-memory store (Zustand-less — plain module-level store reset per session) so the UI reflects "created"/"updated" records without persistence.
- **Icons**: `@tabler/icons-react` (outline set only).
- **Charts**: Recharts, admin/provider analytics screens only.
- **Testing**: Playwright, smoke tests only for the flow in brief §12 step 7.

## Folder structure

```
app/                       routes per brief §4 IA, route groups: (public), (auth), (onboarding), (dashboard-customer), (dashboard-provider), (admin)
components/ui/              shadcn-derived primitives + hand-built ones
components/marketing/       homepage/category/search presentational blocks
components/booking/         booking pathway components
components/forms/           shared form building blocks (FormField wrapper etc.)
lib/mock-api/                typed mock endpoints + data/*.json seeds
lib/mock-api/store.ts        in-memory mutable store (bookings, quotes, messages)
lib/validation/              zod schemas
hooks/                       react-query hooks wrapping lib/mock-api
types/                       shared domain types (Provider, Listing, Booking, Quote, Review, User)
tests/                       Playwright specs
```

## Taxonomy & seed data

Mock taxonomy (Main Category > Subcategory > Service Type) covers 5 main categories to give the "professional / personal / commercial / community" spread the brief calls for:
- Home & Trade Services (plumbing, electrical, cleaning, landscaping)
- Professional Services (accounting, legal consult, business consulting)
- Personal Care & Wellness (personal training, massage therapy, tutoring)
- Events & Creative (photography, catering, DJ/entertainment)
- Community & Government-adjacent (non-profit volunteering coordination, community hall booking)

18 mock providers spread across these, mixed provider types (individual/sole trader/company/non-profit), 1-3 listings each, mixed pricing methods, mixed booking pathways (instant/quote/enquiry) so all three flows have live data, reviews and bookings seeded across every status enum.

## Status enums (shared, drive StatusBadge + moderation queues)

- Provider verification: Draft, Pending Review, Action Required, Approved, Conditionally Approved, Suspended, Rejected, Expired Verification
- Booking: Pending, Confirmed, In Progress, Completed, Cancelled, Disputed
- Quote: Requested, Quoted, Accepted, Declined, Expired
- Listing moderation: Draft, Pending, Published, Paused, Rejected, Archived

## Build phases (mirrors brief §12, executed straight through)

1. Scaffold Next.js app, tokens, shadcn install, `components/ui/` library
2. Public site: homepage, search/discovery, category pages, provider profile
3. Auth (mock) + provider onboarding wizard + service listing form
4. Booking pathways (instant/quote/enquiry), messaging UI, reviews
5. Payment UI, customer + provider dashboards
6. Admin & moderation screens
7. Responsive/dark-mode pass + Playwright smoke test for register→list→book→accept→review

## Out of scope (unchanged from brief §11)

No real backend, payments, verification, matching algorithms, or delivery infra. Everything resolves against `lib/mock-api`.

## Explicitly deferred / assumptions

- No CI setup, no deployment — local dev only unless asked.
- No real auth provider wiring (NextAuth etc.) — mock session in a React context, good enough for gating dashboard routes in the UI.
- Map placeholders are static illustrative components, no real map SDK/key.
