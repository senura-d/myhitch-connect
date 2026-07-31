# MYHitch Connect Front-End Implementation Plan

> **For agentic workers:** This plan is executed inline by the primary agent in this session (not dispatched to fresh subagents) because early phases are tightly coupled (shared tokens/components consumed by every later page). Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the full front-end-only MYHitch Connect marketplace UI against a typed mock API layer, per `docs/superpowers/specs/2026-07-31-myhitch-connect-design.md`.

**Architecture:** Next.js 15 App Router + TypeScript app. Route groups per persona (`(public)`, `(auth)`, `(onboarding)`, `(dashboard-customer)`, `(dashboard-provider)`, `(admin)`). All data flows through React Query hooks → `lib/mock-api/*` → in-memory store seeded from JSON. shadcn/ui-derived `components/ui/`.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4, shadcn/ui (Radix), React Hook Form + Zod, TanStack React Query, @tabler/icons-react, Recharts, Playwright.

## Global Constraints

- No real network calls to payment/SMS/email providers anywhere (brief §11, §13).
- Every screen responsive (mobile/tablet/desktop) and works in light + dark mode (brief §13).
- All data via `lib/mock-api/`, no hardcoded fetch() to real endpoints.
- Package manager: npm.
- Icons: `@tabler/icons-react` outline set only.
- One accent color for primary CTAs; status colors reserved for state (brief §3).

---

## Phase 1 — Scaffold, tokens, component library

### Task 1.1: Scaffold Next.js app + Tailwind + base tooling

**Files:**
- Create: Next.js app at repo root via `create-next-app` (TS, App Router, Tailwind, ESLint, `src/` off, import alias `@/*`)
- Create: `.gitignore` additions if needed, `docs/` preserved

- [ ] Run `npx create-next-app@latest . --typescript --tailwind --eslint --app --import-alias "@/*" --use-npm --yes` in the project root
- [ ] Verify `npm run dev` boots and default page loads
- [ ] `git init`, initial commit "chore: scaffold Next.js app"

### Task 1.2: Design tokens + shadcn/ui init

**Files:**
- Create: `app/globals.css` (tokens as CSS variables: color, radius, spacing scale, font)
- Create: `components.json` (shadcn config)
- Modify: `tailwind.config.ts` to map tokens

**Interfaces:**
- Produces: CSS vars `--background --foreground --primary --primary-foreground --success --warning --danger --muted --border --radius` etc., consumed by every component from here on.

- [ ] Run `npx shadcn@latest init -y` targeting `components/ui`
- [ ] Define light/dark token pairs in `app/globals.css` under `:root` and `.dark` (neutral base, single blue/teal accent, semantic success/warning/danger)
- [ ] Add `next-themes` for dark mode toggling, wrap root layout in `ThemeProvider`
- [ ] Commit "feat: design tokens + shadcn init"

### Task 1.3: Install and generate shadcn primitives

**Files:**
- Create: `components/ui/{button,input,select,dialog,tabs,badge,card,avatar,toast,popover,calendar,textarea,checkbox,radio-group,switch,label,separator,skeleton,table}.tsx` (via CLI)

- [ ] Run `npx shadcn@latest add button input select dialog tabs badge card avatar toast popover calendar textarea checkbox radio-group switch label separator skeleton table dropdown-menu`
- [ ] Commit "feat: add shadcn primitives"

### Task 1.4: Hand-built components

**Files:**
- Create: `components/ui/rating-stars.tsx` — `RatingStars({ value, onChange?, readOnly, size })`
- Create: `components/ui/stepper.tsx` — `Stepper({ steps, currentStep })`, `StepperStep`
- Create: `components/ui/empty-state.tsx` — `EmptyState({ icon, title, description, action? })`
- Create: `components/ui/file-upload.tsx` — `FileUpload({ accept, multiple, onFilesChange, mockProgress })` drag-and-drop with simulated progress bar
- Create: `components/ui/date-picker.tsx` — `DatePicker({ value, onChange, disabledDates? })` wraps shadcn Calendar+Popover
- Create: `components/ui/status-badge.tsx` — `StatusBadge({ status })` covering every enum in the design doc (provider verification, booking, quote, listing moderation) mapped to Badge variant + label

**Interfaces:**
- Produces: `StatusBadge` status prop type `ProviderVerificationStatus | BookingStatus | QuoteStatus | ListingStatus` — imported from `types/status.ts` (created this task).

- [ ] Create `types/status.ts` with the four status union types from the design doc
- [ ] Implement each component above with Tailwind + tokens, mobile-first
- [ ] Add a `/dev/components` route rendering every `components/ui` component in both themes for visual QA during the build (deleted or left as internal-only in final pass)
- [ ] `npm run dev`, visually check `/dev/components` in light + dark via the browser tool
- [ ] Commit "feat: hand-built ui components (rating, stepper, empty-state, file-upload, date-picker, status-badge)"

---

## Phase 2 — Domain types + mock API layer

### Task 2.1: Domain types

**Files:**
- Create: `types/taxonomy.ts` — `MainCategory, Subcategory, ServiceType`
- Create: `types/provider.ts` — `ProviderType, Provider, ProviderProfile`
- Create: `types/listing.ts` — `PricingMethod, DeliveryMode, ServiceListing`
- Create: `types/booking.ts` — `Booking, QuoteRequest, Enquiry`
- Create: `types/review.ts` — `Review`
- Create: `types/user.ts` — `Role, User, Session`

- [ ] Define every type per brief §6/§7 fields exactly (title, category, pricing method enum, delivery mode enum, coverage, duration/capacity, availability, media, terms, compliance attributes, publishing status)
- [ ] Commit "feat: domain types"

### Task 2.2: Seed data

**Files:**
- Create: `lib/mock-api/data/taxonomy.json` (5 main categories per design doc, subcategories, service types)
- Create: `lib/mock-api/data/providers.json` (18 providers, mixed types/statuses)
- Create: `lib/mock-api/data/listings.json` (1-3 per provider, mixed pricing/delivery/status)
- Create: `lib/mock-api/data/bookings.json`, `quotes.json`, `enquiries.json` (spread across every status enum)
- Create: `lib/mock-api/data/reviews.json`
- Create: `lib/mock-api/data/users.json` (customers, providers, admin)

- [ ] Author seed JSON conforming to Phase 2.1 types
- [ ] Commit "feat: seed mock data"

### Task 2.3: Mock API functions + in-memory store

**Files:**
- Create: `lib/mock-api/store.ts` — module-level mutable store hydrated from seed JSON, `resetStore()`
- Create: `lib/mock-api/providers.ts` — `getProviders(filters?)`, `getProvider(id)`
- Create: `lib/mock-api/listings.ts` — `searchListings(filters)`, `getListing(providerId, serviceId)`
- Create: `lib/mock-api/bookings.ts` — `createBooking(payload)`, `getBookingsForCustomer(userId)`, `getBookingsForProvider(providerId)`, `updateBookingStatus(id, status)`
- Create: `lib/mock-api/quotes.ts` — `submitQuoteRequest(payload)`, `respondToQuote(id, action)`
- Create: `lib/mock-api/messages.ts` — `getThread(id)`, `sendMessage(threadId, payload)`
- Create: `lib/mock-api/reviews.ts` — `createReview(payload)`, `getReviewsForProvider(providerId)`, `respondToReview(id, text)`
- Create: `lib/mock-api/admin.ts` — moderation queue getters/actions

**Interfaces:**
- Produces: every function returns `Promise<T>` (simulated latency via `setTimeout`) so React Query hooks in Phase 3+ can wrap them uniformly.

- [ ] Implement each function against `store.ts`, all mutations update the store so refetches reflect changes
- [ ] Commit "feat: mock API layer"

### Task 2.4: React Query hooks

**Files:**
- Create: `hooks/use-providers.ts`, `use-listings.ts`, `use-bookings.ts`, `use-quotes.ts`, `use-messages.ts`, `use-reviews.ts`, `use-admin.ts`
- Create: `app/providers.tsx` — QueryClientProvider + ThemeProvider wrapper, mounted in root layout

- [ ] One hook per mock-api module, standard `useQuery`/`useMutation` wrapping with query-key conventions (`['providers', filters]` etc.)
- [ ] Commit "feat: react-query hooks"

---

## Phase 3 — Public site (homepage, search, category, provider profile)

### Task 3.1: Homepage — `app/(public)/page.tsx`
Hero, category grid (icons from taxonomy), featured/promoted providers rail, how-it-works, CTA band. Uses `useProviders`.

### Task 3.2: Search — `app/(public)/search/page.tsx`
Autocomplete search bar, filter panel (category/location/price/availability/rating), sort control, results list using listing cards, "Promoted" labels, `EmptyState` fallback.

### Task 3.3: Category landing — `app/(public)/category/[slug]/page.tsx`
SEO-friendly static-ish shell, subcategory chips, provider grid filtered by category.

### Task 3.4: Provider profile — `app/(public)/provider/[id]/page.tsx`
Header (logo/cover/verification badge/rating), services list, gallery, availability summary, reviews, Contact/Book/Request-quote CTAs.

### Task 3.5: Service listing detail — `app/(public)/provider/[id]/service/[serviceId]/page.tsx`
Full listing fields rendered read-only, pricing breakdown, booking pathway CTA routed by `pricingMethod`/`deliveryMode`.

- [ ] Build all 5 routes with mobile-first responsive layout
- [ ] Verify each route in the browser tool at mobile/tablet/desktop, light+dark
- [ ] Commit "feat: public site pages" (one commit per task acceptable if reviewing incrementally)

---

## Phase 4 — Auth + provider onboarding + listing form

### Task 4.1: Auth UI — `app/(auth)/{register,login,verify}/page.tsx`
RHF+Zod forms, role selection (customer/provider) on register, mock OTP verify screen. Session stored in `lib/mock-api/session.ts` + React context, no real auth provider.

### Task 4.2: Onboarding wizard shell — `app/(onboarding)/provider/layout.tsx` + `components/onboarding/wizard-shell.tsx`
Uses `Stepper`, save-and-resume via localStorage draft, 10 steps per brief §5.

### Task 4.3: Onboarding steps — `app/(onboarding)/provider/{account,type,business-info,categories,documents,profile,listing,pricing,terms,review}/page.tsx`
Each step is its own route + RHF+Zod schema in `lib/validation/onboarding/*`. Final step submits to `lib/mock-api` and renders `StatusBadge` confirmation covering all 8 status states.

### Task 4.4: Service listing create/edit form — `app/(dashboard-provider)/services/new/page.tsx` + shared `components/forms/listing-form.tsx`
All fields from brief §6 with conditional compliance-attribute fields driven by selected category (`taxonomy.json` carries a `requiredAttributes` array per category to prove "new categories without code changes").

- [ ] Build auth, wizard shell, 10 steps, listing form
- [ ] Browser-verify full registration → submit-for-review flow end to end
- [ ] Commit incrementally per sub-area

---

## Phase 5 — Booking pathways, messaging, reviews, payments UI, dashboards

### Task 5.1: Instant booking flow — `components/booking/instant-booking-flow.tsx` used from listing detail
Service+options → date/time (DatePicker) → review → mock payment step → confirmation.

### Task 5.2: Request-a-quote flow — `components/booking/quote-request-flow.tsx`
Structured requirement form + FileUpload → "quote pending" state → quote-received screen (accept/decline/negotiate) at `app/(dashboard-customer)/bookings/[id]/page.tsx`.

### Task 5.3: Enquiry flow — `components/booking/enquiry-flow.tsx`
Simple message form → confirmation, creates a message thread.

### Task 5.4: Messaging UI — `app/(dashboard-customer)/messages/page.tsx`, `app/(dashboard-provider)/messages/page.tsx`, shared `components/messaging/thread-view.tsx`
Thread list, message view, attachments, canned templates, mock real-time via local state append (no socket).

### Task 5.5: Reviews — `components/reviews/review-form.tsx` (5 sub-ratings), `components/reviews/review-list.tsx` with provider single-response + report action.

### Task 5.6: Payments UI — `components/payment/payment-method-selector.tsx`, `payment-form.tsx` (mock card/wallet, clearly stubbed submit), `fee-breakdown.tsx`, `app/(dashboard-customer)/bookings/[id]/receipt/page.tsx`, refund/cancellation request screens.

### Task 5.7: Customer dashboard — `app/(dashboard-customer)/{page,bookings,messages,saved-providers,reviews}/page.tsx`

### Task 5.8: Provider dashboard — `app/(dashboard-provider)/{page,profile,services,bookings,quotes,calendar,messages,reviews,analytics,staff}/page.tsx` (analytics uses Recharts; staff only shown for provider type = company/non-profit/government)

- [ ] Build all of the above
- [ ] Browser-verify: customer completes each of the 3 booking pathways against mock data; provider accepts a booking; customer leaves a review
- [ ] Commit incrementally per sub-area

---

## Phase 6 — Admin & moderation

### Task 6.1: Admin shell + dashboard — `app/(admin)/layout.tsx`, `app/(admin)/page.tsx` (mock stat cards + Recharts charts: registrations, active providers, bookings, revenue, disputes, verification backlog)

### Task 6.2: User management — `app/(admin)/users/page.tsx` — filterable table, role/status actions

### Task 6.3: Category management — `app/(admin)/categories/page.tsx` — tree editor for Main>Sub>ServiceType>Specialisation, attribute/required-document config per category (must visibly add a category without touching code — writes into the same in-memory taxonomy store Phase 2 seeded)

### Task 6.4: Listing moderation — `app/(admin)/listings/moderation/page.tsx` — queue with approve/reject/edit/pause/feature/archive actions

### Task 6.5: Verification review — `app/(admin)/providers/verification/page.tsx` — queue driving the 8 provider statuses

### Task 6.6: Booking/payment oversight — `app/(admin)/bookings-payments/page.tsx` — table with drill-in

### Task 6.7: Review moderation — `app/(admin)/reviews/moderation/page.tsx`

### Task 6.8: CMS — `app/(admin)/cms/page.tsx` — simple list+editor for landing/FAQ/policy mock content blocks

### Task 6.9: Audit log — `app/(admin)/settings/page.tsx` + `app/(admin)/audit-log/page.tsx`

- [ ] Build all admin screens
- [ ] Browser-verify: admin actions an item in listing moderation and verification queues
- [ ] Commit incrementally per sub-area

---

## Phase 7 — Responsive/dark-mode pass + Playwright smoke test

### Task 7.1: Responsive + dark-mode sweep
- [ ] Walk every route at mobile (375px), tablet (768px), desktop (1280px), both themes, in the browser tool; fix overflow/contrast issues found
- [ ] Commit fixes

### Task 7.2: Playwright smoke test
**Files:**
- Create: `playwright.config.ts`
- Create: `tests/core-flow.spec.ts`

- [ ] Install `@playwright/test`, config against `npm run dev` on localhost
- [ ] Write one spec covering: register provider → create listing → customer books → provider accepts → customer leaves review (brief §12 step 7 / §13)
- [ ] Run `npx playwright test`, confirm pass
- [ ] Commit "test: core flow smoke test"

---

## Self-review notes

- Spec coverage: every brief §4 route has an owning task above; §5 onboarding steps map 1:1 to Task 4.3 sub-routes; §6 listing fields covered by Task 4.4; §7/§8 covered by Phase 5; §9 covered by Phase 6; §10 covered by Phase 2; §11 enforced as a global constraint; §12 order matches phase order; §13 acceptance criteria covered by Phase 7 tasks plus the flows explicitly browser-verified in Phases 3-6.
- No payment SDK, no real auth provider, no map SDK anywhere in the plan — consistent with §11.
