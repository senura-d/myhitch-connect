// Deterministic-ish generator for lib/mock-api/data/*.json seed files.
// Run with: node scripts/generate-seed-data.mjs
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "lib", "mock-api", "data");
mkdirSync(OUT_DIR, { recursive: true });

// Simple seeded PRNG so re-runs are stable.
let seed = 42;
function rand() {
  seed = (seed * 1103515245 + 12345) & 0x7fffffff;
  return seed / 0x7fffffff;
}
function pick(arr) {
  return arr[Math.floor(rand() * arr.length)];
}
function pickSome(arr, min, max) {
  const n = Math.min(arr.length, min + Math.floor(rand() * (max - min + 1)));
  const shuffled = [...arr].sort(() => rand() - 0.5);
  return shuffled.slice(0, n);
}
function randInt(min, max) {
  return min + Math.floor(rand() * (max - min + 1));
}
function daysAgoISO(days) {
  const d = new Date("2026-07-31T09:00:00Z");
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString();
}
function daysFromNowISO(days) {
  return daysAgoISO(-days);
}
function slugify(s) {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ---------------------------------------------------------------------------
// Taxonomy
// ---------------------------------------------------------------------------

const taxonomy = [
  {
    id: "cat-home-trade",
    name: "Home & Trade Services",
    slug: "home-trade-services",
    icon: "IconHammer",
    description: "Licensed trades for repairs, installs and property upkeep.",
    complianceAttributes: [
      { key: "licenseNumber", label: "Trade licence number", type: "text", required: true },
      { key: "yearsExperience", label: "Years of experience", type: "number", required: false },
      { key: "insuranceCertificate", label: "Public liability insurance", type: "file", required: true },
    ],
    requiredDocuments: [
      { key: "trade-license", label: "Trade licence", required: true },
      { key: "public-liability-insurance", label: "Public liability insurance certificate", required: true },
    ],
    subcategories: [
      {
        id: "sub-plumbing",
        name: "Plumbing",
        slug: "plumbing",
        serviceTypes: [
          { id: "st-plumbing-repair", name: "Plumbing Repair", slug: "plumbing-repair" },
          { id: "st-plumbing-install", name: "Fixture Installation", slug: "fixture-installation" },
        ],
      },
      {
        id: "sub-electrical",
        name: "Electrical",
        slug: "electrical",
        serviceTypes: [
          { id: "st-electrical-repair", name: "Electrical Repair", slug: "electrical-repair" },
          { id: "st-electrical-safety", name: "Safety Inspection", slug: "electrical-safety-inspection" },
        ],
      },
      {
        id: "sub-cleaning",
        name: "Cleaning",
        slug: "cleaning",
        serviceTypes: [
          { id: "st-home-cleaning", name: "Home Cleaning", slug: "home-cleaning" },
          { id: "st-end-of-lease-cleaning", name: "End of Lease Cleaning", slug: "end-of-lease-cleaning" },
        ],
      },
      {
        id: "sub-landscaping",
        name: "Landscaping",
        slug: "landscaping",
        serviceTypes: [
          { id: "st-lawn-care", name: "Lawn Care", slug: "lawn-care" },
          { id: "st-garden-design", name: "Garden Design", slug: "garden-design" },
        ],
      },
    ],
  },
  {
    id: "cat-professional",
    name: "Professional Services",
    slug: "professional-services",
    icon: "IconBriefcase",
    description: "Accounting, legal and business advisory expertise.",
    complianceAttributes: [
      { key: "certificationNumber", label: "Professional certification number", type: "text", required: true },
      { key: "indemnityInsurance", label: "Professional indemnity insurance", type: "file", required: true },
    ],
    requiredDocuments: [
      { key: "professional-certification", label: "Professional certification", required: true },
      { key: "indemnity-insurance", label: "Professional indemnity insurance", required: true },
    ],
    subcategories: [
      {
        id: "sub-accounting",
        name: "Accounting",
        slug: "accounting",
        serviceTypes: [
          { id: "st-bookkeeping", name: "Bookkeeping", slug: "bookkeeping" },
          { id: "st-tax-prep", name: "Tax Preparation", slug: "tax-preparation" },
        ],
      },
      {
        id: "sub-legal",
        name: "Legal Consulting",
        slug: "legal-consulting",
        serviceTypes: [
          { id: "st-contract-review", name: "Contract Review", slug: "contract-review" },
          { id: "st-legal-consult", name: "General Legal Consultation", slug: "general-legal-consultation" },
        ],
      },
      {
        id: "sub-business-consulting",
        name: "Business Consulting",
        slug: "business-consulting",
        serviceTypes: [
          { id: "st-strategy-consulting", name: "Strategy Consulting", slug: "strategy-consulting" },
          { id: "st-process-improvement", name: "Process Improvement", slug: "process-improvement" },
        ],
      },
    ],
  },
  {
    id: "cat-personal-care",
    name: "Personal Care & Wellness",
    slug: "personal-care-wellness",
    icon: "IconHeartHandshake",
    description: "Training, therapy and tutoring for individual wellbeing.",
    complianceAttributes: [
      { key: "certification", label: "Certification", type: "text", required: true },
      { key: "firstAidCertificate", label: "First aid certificate", type: "file", required: false },
    ],
    requiredDocuments: [
      { key: "certification", label: "Certification", required: true },
      { key: "police-check", label: "Police check", required: true },
    ],
    subcategories: [
      {
        id: "sub-personal-training",
        name: "Personal Training",
        slug: "personal-training",
        serviceTypes: [
          { id: "st-one-on-one-training", name: "One-on-One Training", slug: "one-on-one-training" },
          { id: "st-group-fitness", name: "Group Fitness", slug: "group-fitness" },
        ],
      },
      {
        id: "sub-massage-therapy",
        name: "Massage Therapy",
        slug: "massage-therapy",
        serviceTypes: [
          { id: "st-remedial-massage", name: "Remedial Massage", slug: "remedial-massage" },
          { id: "st-relaxation-massage", name: "Relaxation Massage", slug: "relaxation-massage" },
        ],
      },
      {
        id: "sub-tutoring",
        name: "Tutoring",
        slug: "tutoring",
        serviceTypes: [
          { id: "st-maths-tutoring", name: "Maths Tutoring", slug: "maths-tutoring" },
          { id: "st-language-tutoring", name: "Language Tutoring", slug: "language-tutoring" },
        ],
      },
    ],
  },
  {
    id: "cat-events-creative",
    name: "Events & Creative",
    slug: "events-creative",
    icon: "IconCamera",
    description: "Photography, catering and entertainment for every occasion.",
    complianceAttributes: [
      { key: "portfolioUrl", label: "Portfolio link", type: "text", required: false },
      { key: "equipmentInsurance", label: "Equipment insurance", type: "file", required: false },
    ],
    requiredDocuments: [{ key: "portfolio-samples", label: "Portfolio samples", required: true }],
    subcategories: [
      {
        id: "sub-photography",
        name: "Photography",
        slug: "photography",
        serviceTypes: [
          { id: "st-event-photography", name: "Event Photography", slug: "event-photography" },
          { id: "st-portrait-photography", name: "Portrait Photography", slug: "portrait-photography" },
        ],
      },
      {
        id: "sub-catering",
        name: "Catering",
        slug: "catering",
        serviceTypes: [
          { id: "st-event-catering", name: "Event Catering", slug: "event-catering" },
          { id: "st-private-chef", name: "Private Chef", slug: "private-chef" },
        ],
      },
      {
        id: "sub-dj-entertainment",
        name: "DJ & Entertainment",
        slug: "dj-entertainment",
        serviceTypes: [
          { id: "st-wedding-dj", name: "Wedding DJ", slug: "wedding-dj" },
          { id: "st-party-entertainment", name: "Party Entertainment", slug: "party-entertainment" },
        ],
      },
    ],
  },
  {
    id: "cat-community",
    name: "Community & Government-Adjacent",
    slug: "community-government-adjacent",
    icon: "IconBuildingCommunity",
    description: "Non-profit and community-facing services and venue bookings.",
    complianceAttributes: [
      { key: "registrationNumber", label: "Organisation registration number", type: "text", required: true },
      { key: "isNonProfit", label: "Registered non-profit", type: "boolean", required: false },
    ],
    requiredDocuments: [{ key: "registration-certificate", label: "Registration certificate", required: true }],
    subcategories: [
      {
        id: "sub-volunteering",
        name: "Volunteering Coordination",
        slug: "volunteering-coordination",
        serviceTypes: [
          { id: "st-volunteer-matching", name: "Volunteer Matching", slug: "volunteer-matching" },
        ],
      },
      {
        id: "sub-community-hall",
        name: "Community Hall Booking",
        slug: "community-hall-booking",
        serviceTypes: [
          { id: "st-hall-hire", name: "Hall Hire", slug: "hall-hire" },
          { id: "st-meeting-room-hire", name: "Meeting Room Hire", slug: "meeting-room-hire" },
        ],
      },
    ],
  },
];

const allServiceTypes = taxonomy.flatMap((c) =>
  c.subcategories.flatMap((s) => s.serviceTypes.map((st) => ({ ...st, mainCategoryId: c.id, subcategoryId: s.id })))
);

// ---------------------------------------------------------------------------
// Providers
// ---------------------------------------------------------------------------

const SUBURBS = [
  { suburb: "Northbridge", state: "WA", postcode: "6003" },
  { suburb: "Fremantle", state: "WA", postcode: "6160" },
  { suburb: "Subiaco", state: "WA", postcode: "6008" },
  { suburb: "Bondi", state: "NSW", postcode: "2026" },
  { suburb: "Newtown", state: "NSW", postcode: "2042" },
  { suburb: "Fitzroy", state: "VIC", postcode: "3065" },
  { suburb: "St Kilda", state: "VIC", postcode: "3182" },
  { suburb: "West End", state: "QLD", postcode: "4101" },
  { suburb: "New Farm", state: "QLD", postcode: "4005" },
  { suburb: "Glenelg", state: "SA", postcode: "5045" },
];

const VERIFICATION_STATUSES = [
  "draft",
  "pending_review",
  "action_required",
  "approved",
  "approved",
  "approved",
  "conditionally_approved",
  "suspended",
  "rejected",
  "expired_verification",
];

const PROVIDER_SEEDS = [
  { name: "Sunrise Plumbing Co.", categoryId: "cat-home-trade", type: "sole_trader" },
  { name: "BrightSpark Electrical", categoryId: "cat-home-trade", type: "company" },
  { name: "CrystalClear Cleaning Services", categoryId: "cat-home-trade", type: "company" },
  { name: "GreenScape Landscaping", categoryId: "cat-home-trade", type: "sole_trader" },
  { name: "Harbor Plumbing & Gas", categoryId: "cat-home-trade", type: "individual" },
  { name: "Precision Tax & Bookkeeping", categoryId: "cat-professional", type: "company" },
  { name: "Whitfield Legal Consulting", categoryId: "cat-professional", type: "individual" },
  { name: "Meridian Business Advisory", categoryId: "cat-professional", type: "company" },
  { name: "Coastal Accounting Partners", categoryId: "cat-professional", type: "sole_trader" },
  { name: "Elevate Personal Training", categoryId: "cat-personal-care", type: "individual" },
  { name: "Zen Remedial Massage", categoryId: "cat-personal-care", type: "sole_trader" },
  { name: "BrightPath Tutoring", categoryId: "cat-personal-care", type: "company" },
  { name: "PulseFit Group Training", categoryId: "cat-personal-care", type: "company" },
  { name: "Golden Hour Photography", categoryId: "cat-events-creative", type: "individual" },
  { name: "Harvest Table Catering", categoryId: "cat-events-creative", type: "company" },
  { name: "Nightwave DJ Collective", categoryId: "cat-events-creative", type: "sole_trader" },
  { name: "Neighbourhood Volunteers Network", categoryId: "cat-community", type: "non_profit" },
  { name: "Civic Hall Bookings", categoryId: "cat-community", type: "government" },
];

const LANGUAGES_POOL = ["English", "Mandarin", "Vietnamese", "Arabic", "Italian", "Spanish"];
const DAY_KEYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

function buildOperatingHours() {
  return DAY_KEYS.map((day) => {
    const isWeekend = day === "sat" || day === "sun";
    const closed = isWeekend ? rand() < 0.4 : rand() < 0.05;
    return closed ? { day, open: null, close: null } : { day, open: "08:00", close: isWeekend ? "14:00" : "17:30" };
  });
}

const providers = PROVIDER_SEEDS.map((seed, i) => {
  const id = `prov-${String(i + 1).padStart(2, "0")}`;
  const location = pick(SUBURBS);
  return {
    id,
    slug: slugify(seed.name),
    businessName: seed.name,
    providerType: seed.type,
    verificationStatus: VERIFICATION_STATUSES[i % VERIFICATION_STATUSES.length],
    logoUrl: "",
    coverImageUrl: "",
    description: `${seed.name} is a trusted provider offering reliable, professional service across the local area.`,
    categoryIds: [seed.categoryId],
    locations: [location],
    serviceRadiusKm: pick([10, 15, 20, 25, 40]),
    languages: pickSome(LANGUAGES_POOL, 1, 2).concat("English").filter((v, idx, a) => a.indexOf(v) === idx),
    operatingHours: buildOperatingHours(),
    socialLinks: rand() > 0.5 ? [{ platform: "instagram", url: `https://instagram.com/${slugify(seed.name)}` }] : [],
    ratingAverage: Math.round((3.6 + rand() * 1.4) * 10) / 10,
    ratingCount: randInt(3, 120),
    responseTimeHours: pick([1, 2, 4, 8, 24]),
    isPromoted: i % 5 === 0,
    createdAt: daysAgoISO(randInt(30, 500)),
    staff:
      seed.type === "company" || seed.type === "non_profit" || seed.type === "government"
        ? Array.from({ length: randInt(2, 4) }, (_, si) => ({
            id: `${id}-staff-${si + 1}`,
            name: pick(["Alex Chen", "Priya Nair", "Jordan Smith", "Maria Lopez", "Sam Okafor", "Lena Novak"]),
            role: pick(["Technician", "Coordinator", "Account Manager", "Lead"]),
          }))
        : undefined,
  };
});

// ---------------------------------------------------------------------------
// Listings
// ---------------------------------------------------------------------------

const PRICING_METHODS = ["fixed", "starting_from", "hourly", "package", "free_consultation", "quote_required", "recurring_fee"];
const DELIVERY_MODES = ["at_provider_location", "at_customer_location", "online", "mobile", "hybrid", "nationwide"];
const LISTING_STATUSES = ["draft", "pending", "published", "published", "published", "paused", "rejected", "archived"];

let listingCounter = 1;
const listings = [];

for (const provider of providers) {
  const categoryServiceTypes = allServiceTypes.filter((st) => st.mainCategoryId === provider.categoryIds[0]);
  const count = randInt(1, 3);
  const chosen = pickSome(categoryServiceTypes, 1, Math.min(3, count));
  chosen.forEach((st) => {
    const id = `list-${String(listingCounter).padStart(3, "0")}`;
    listingCounter += 1;
    const pricingMethod = pick(PRICING_METHODS);
    const deliveryMode = pick(DELIVERY_MODES);
    const bookingPathway = pricingMethod === "quote_required" ? "quote" : pick(["instant", "instant", "quote", "enquiry"]);
    const category = taxonomy.find((c) => c.id === st.mainCategoryId);

    listings.push({
      id,
      providerId: provider.id,
      title: `${st.name} — ${provider.businessName}`,
      primaryCategoryId: st.id,
      secondaryCategoryId: undefined,
      description: `Professional ${st.name.toLowerCase()} delivered by ${provider.businessName.replace(/\.$/, "")}. Fully insured and highly rated by local customers.`,
      pricing: {
        method: pricingMethod,
        amount: pricingMethod === "free_consultation" || pricingMethod === "quote_required" ? undefined : randInt(45, 450),
        currency: "AUD",
        unit: pricingMethod === "hourly" ? "hour" : pricingMethod === "recurring_fee" ? "month" : undefined,
        recurringInterval: pricingMethod === "recurring_fee" ? "monthly" : undefined,
      },
      deliveryMode,
      bookingPathway,
      coverage:
        deliveryMode === "online"
          ? { type: "online", values: ["Australia-wide"] }
          : deliveryMode === "nationwide"
          ? { type: "states", values: ["WA", "NSW", "VIC", "QLD", "SA"] }
          : { type: "suburb_radius", values: [provider.locations[0].suburb], radiusKm: provider.serviceRadiusKm },
      durationMinutes: pick([30, 60, 90, 120, undefined]),
      capacity: rand() > 0.7 ? randInt(1, 10) : undefined,
      availability: {
        leadTimeHours: pick([2, 24, 48, 72]),
        blackoutDates: rand() > 0.7 ? [daysFromNowISO(randInt(5, 20)).slice(0, 10)] : [],
        bookableDays: pick([
          ["mon", "tue", "wed", "thu", "fri"],
          ["mon", "tue", "wed", "thu", "fri", "sat"],
          ["tue", "wed", "thu", "fri", "sat"],
        ]),
      },
      media: [{ id: `${id}-media-1`, type: "image", url: "", caption: `${st.name} example work` }],
      terms: {
        cancellationPolicy: "Free cancellation up to 24 hours before the scheduled time.",
        refundPolicy: "Full refund if cancelled outside the cancellation window.",
        travelCharges: deliveryMode === "at_customer_location" || deliveryMode === "mobile" ? "Included within service radius." : undefined,
        exclusions: "Parts and materials charged separately unless stated in the quote.",
      },
      complianceValues: Object.fromEntries(
        category.complianceAttributes.map((attr) => [
          attr.key,
          attr.type === "boolean" ? rand() > 0.5 : attr.type === "number" ? randInt(1, 15) : `${attr.key}-${provider.id}`,
        ])
      ),
      status: LISTING_STATUSES[listingCounter % LISTING_STATUSES.length],
      isFeatured: rand() > 0.85,
      createdAt: daysAgoISO(randInt(10, 300)),
    });
  });
}

// ---------------------------------------------------------------------------
// Users
// ---------------------------------------------------------------------------

const CUSTOMER_NAMES = [
  "Olivia Bennett", "Liam Carter", "Ava Thompson", "Noah Reyes", "Isla Martin",
  "Ethan Brooks", "Mia Johansson", "Lucas Ferreira",
];

const users = [
  { id: "user-admin-01", role: "admin", name: "Priya Admin", email: "admin@myhitchconnect.test" },
  ...CUSTOMER_NAMES.map((name, i) => ({
    id: `user-cust-${String(i + 1).padStart(2, "0")}`,
    role: "customer",
    name,
    email: `${slugify(name)}@example.test`,
  })),
  ...providers.map((p) => ({
    id: `user-prov-${p.id}`,
    role: "provider",
    name: p.businessName,
    email: `${p.slug}@example.test`,
    providerId: p.id,
  })),
];

const customerUsers = users.filter((u) => u.role === "customer");

// ---------------------------------------------------------------------------
// Bookings, Quotes, Enquiries
// ---------------------------------------------------------------------------

const BOOKING_STATUSES = [
  "pending",
  "confirmed",
  "in_progress",
  "completed",
  "completed",
  "completed",
  "completed",
  "completed",
  "cancelled",
  "disputed",
];
const publishedListings = listings.filter((l) => l.status === "published");

function priceBreakdownFor(listing) {
  const subtotal = listing.pricing.amount ?? randInt(60, 300);
  const serviceFee = Math.round(subtotal * 0.08 * 100) / 100;
  const tax = Math.round((subtotal + serviceFee) * 0.1 * 100) / 100;
  return {
    subtotal,
    serviceFee,
    tax,
    discount: 0,
    total: Math.round((subtotal + serviceFee + tax) * 100) / 100,
    currency: "AUD",
  };
}

const bookings = [];
const instantListings = publishedListings.filter((l) => l.bookingPathway === "instant");
for (let i = 0; i < 24 && instantListings.length; i++) {
  const listing = pick(instantListings);
  const customer = pick(customerUsers);
  const status = BOOKING_STATUSES[i % BOOKING_STATUSES.length];
  bookings.push({
    id: `book-${String(i + 1).padStart(3, "0")}`,
    listingId: listing.id,
    providerId: listing.providerId,
    customerId: customer.id,
    status,
    scheduledAt: status === "completed" || status === "cancelled" ? daysAgoISO(randInt(2, 60)) : daysFromNowISO(randInt(1, 21)),
    durationMinutes: listing.durationMinutes ?? 60,
    notes: rand() > 0.6 ? "Please call on arrival, side gate is unlocked." : undefined,
    breakdown: priceBreakdownFor(listing),
    paymentPlan: pick(["deposit", "full", "milestone"]),
    createdAt: daysAgoISO(randInt(3, 90)),
  });
}

const QUOTE_STATUSES = ["requested", "quoted", "quoted", "accepted", "declined", "expired"];
const quoteListings = publishedListings.filter((l) => l.bookingPathway === "quote");
const quotes = [];
for (let i = 0; i < 10 && quoteListings.length; i++) {
  const listing = pick(quoteListings);
  const customer = pick(customerUsers);
  const status = QUOTE_STATUSES[i % QUOTE_STATUSES.length];
  quotes.push({
    id: `quote-${String(i + 1).padStart(3, "0")}`,
    listingId: listing.id,
    providerId: listing.providerId,
    customerId: customer.id,
    status,
    requirements: `Looking for ${listing.title.split(" — ")[0].toLowerCase()} — please advise availability and cost.`,
    desiredDate: daysFromNowISO(randInt(5, 30)).slice(0, 10),
    attachments: [],
    quotedAmount: status === "requested" ? undefined : randInt(120, 900),
    quotedMessage: status === "requested" ? undefined : "Thanks for reaching out — here's our quote based on your requirements.",
    createdAt: daysAgoISO(randInt(1, 40)),
    respondedAt: status === "requested" ? undefined : daysAgoISO(randInt(0, 20)),
  });
}

const enquiryListings = publishedListings.filter((l) => l.bookingPathway === "enquiry");
const enquiries = [];
for (let i = 0; i < 8 && enquiryListings.length; i++) {
  const listing = pick(enquiryListings);
  const customer = pick(customerUsers);
  enquiries.push({
    id: `enq-${String(i + 1).padStart(3, "0")}`,
    listingId: listing.id,
    providerId: listing.providerId,
    customerId: customer.id,
    message: "Hi, I'd love to know more about this service before booking. Are you available next week?",
    threadId: `thread-enq-${String(i + 1).padStart(3, "0")}`,
    createdAt: daysAgoISO(randInt(1, 30)),
  });
}

// ---------------------------------------------------------------------------
// Message threads
// ---------------------------------------------------------------------------

const messageThreads = enquiries.map((enq) => ({
  id: enq.threadId,
  customerId: enq.customerId,
  providerId: enq.providerId,
  listingId: enq.listingId,
  subject: "Enquiry about your service",
  lastMessageAt: enq.createdAt,
  messages: [
    { id: `${enq.threadId}-m1`, threadId: enq.threadId, senderId: enq.customerId, senderRole: "customer", body: enq.message, createdAt: enq.createdAt },
  ],
}));

const completedBookingsForThreads = bookings.filter((b) => b.status === "completed" || b.status === "confirmed").slice(0, 6);
completedBookingsForThreads.forEach((b, i) => {
  const threadId = `thread-book-${String(i + 1).padStart(3, "0")}`;
  const providerReply = "Thanks for booking with us — we'll see you then. Let us know if anything changes.";
  messageThreads.push({
    id: threadId,
    customerId: b.customerId,
    providerId: b.providerId,
    listingId: b.listingId,
    subject: "Booking confirmation",
    lastMessageAt: b.createdAt,
    messages: [
      { id: `${threadId}-m1`, threadId, senderId: b.customerId, senderRole: "customer", body: "Looking forward to the appointment, thank you!", createdAt: b.createdAt },
      { id: `${threadId}-m2`, threadId, senderId: b.providerId, senderRole: "provider", body: providerReply, createdAt: daysAgoISO(0) },
    ],
  });
});

// ---------------------------------------------------------------------------
// Reviews
// ---------------------------------------------------------------------------

const REVIEW_BODIES = [
  "Excellent service from start to finish, would book again.",
  "Very professional and arrived right on time. Highly recommend.",
  "Good work overall, communication could have been a touch faster.",
  "Fantastic experience, exceeded expectations!",
  "Solid service, fair pricing, will use again.",
];

const completedBookings = bookings.filter((b) => b.status === "completed");
const reviews = completedBookings.map((b, i) => {
  const ratings = {
    quality: randInt(3, 5),
    communication: randInt(3, 5),
    punctuality: randInt(3, 5),
    value: randInt(3, 5),
    professionalism: randInt(3, 5),
  };
  const overall = Math.round(((ratings.quality + ratings.communication + ratings.punctuality + ratings.value + ratings.professionalism) / 5) * 10) / 10;
  const customer = users.find((u) => u.id === b.customerId);
  return {
    id: `rev-${String(i + 1).padStart(3, "0")}`,
    bookingId: b.id,
    listingId: b.listingId,
    providerId: b.providerId,
    customerId: b.customerId,
    customerName: customer?.name ?? "Customer",
    ratings,
    overallRating: overall,
    body: pick(REVIEW_BODIES),
    providerResponse: i % 3 === 0 ? { body: "Thank you so much for the kind words — see you next time!", createdAt: daysAgoISO(randInt(0, 5)) } : undefined,
    reported: i === completedBookings.length - 1,
    createdAt: daysAgoISO(randInt(1, 45)),
  };
});

// ---------------------------------------------------------------------------
// CMS + Audit log
// ---------------------------------------------------------------------------

const cmsPages = [
  { id: "cms-home-hero", slug: "landing-hero", title: "Homepage Hero", body: "Find trusted local pros for every job.", updatedAt: daysAgoISO(10) },
  { id: "cms-faq", slug: "faq", title: "Frequently Asked Questions", body: "How does booking work? ...", updatedAt: daysAgoISO(20) },
  { id: "cms-terms", slug: "terms-of-service", title: "Terms of Service", body: "By using MYHitch Connect you agree to...", updatedAt: daysAgoISO(60) },
  { id: "cms-privacy", slug: "privacy-policy", title: "Privacy Policy", body: "We respect your privacy...", updatedAt: daysAgoISO(60) },
];

const auditLog = Array.from({ length: 20 }, (_, i) => ({
  id: `audit-${String(i + 1).padStart(3, "0")}`,
  actorId: "user-admin-01",
  actorName: "Priya Admin",
  action: pick([
    "approved provider verification",
    "rejected listing",
    "paused listing",
    "resolved review report",
    "updated category taxonomy",
    "issued refund",
  ]),
  targetType: pick(["provider", "listing", "review", "booking", "category"]),
  targetId: pick(providers.map((p) => p.id).concat(listings.map((l) => l.id))),
  createdAt: daysAgoISO(randInt(0, 90)),
}));

// ---------------------------------------------------------------------------
// Write
// ---------------------------------------------------------------------------

const files = {
  "taxonomy.json": taxonomy,
  "providers.json": providers,
  "listings.json": listings,
  "users.json": users,
  "bookings.json": bookings,
  "quotes.json": quotes,
  "enquiries.json": enquiries,
  "message-threads.json": messageThreads,
  "reviews.json": reviews,
  "cms.json": cmsPages,
  "audit-log.json": auditLog,
};

for (const [name, data] of Object.entries(files)) {
  writeFileSync(path.join(OUT_DIR, name), JSON.stringify(data, null, 2) + "\n", "utf-8");
  console.log(`wrote ${name} (${Array.isArray(data) ? data.length : "n/a"} records)`);
}
