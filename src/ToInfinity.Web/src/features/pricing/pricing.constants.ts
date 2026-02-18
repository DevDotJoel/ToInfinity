import type { PricingPlan, TrustItem } from "./types";

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "basic",
    number: 1,
    name: "Basic",
    price: "713",
    bestFor: ["Small venues", "Venues starting online visibility"],
    features: [
      "1 wedding venue profile",
      "Venue description and services",
      "Up to 10 photos",
      "Public reviews and ratings",
      "Reply to reviews",
      "Appears in search results",
      "Up to 5 inquiries per month",
      "Contact via email form",
    ],
    cta: "Start Basic",
    highlighted: false,
    extras: null,
  },
  {
    id: "professional",
    number: 2,
    name: "Professional",
    price: "1,353",
    bestFor: ["Active venues", "Venue groups with multiple locations"],
    features: [
      "1 wedding venue profile",
      "Higher search ranking than Basic",
      "Unlimited inquiries",
      "Up to 25 photos",
      "Video enabled",
      "Featured in regional listings",
      "Reviews highlighted first",
      "Direct contact buttons",
      "Analytics for views and inquiries",
    ],
    cta: "Start Professional",
    highlighted: true,
    extras: {
      label: "Add up to 2 extra venues",
      price: "554€ per extra venue per year",
      note: "Each venue has its own profile, reviews, and inquiries",
    },
  },
  {
    id: "elite",
    number: 3,
    name: "Elite",
    price: "1,900",
    bestFor: ["Venues that want maximum visibility in their region"],
    features: [
      "1 wedding venue profile",
      "Priority placement at the top of search results",
      "Always shown before Professional and Basic venues",
      "Featured Elite badge on profile and listings",
      "Included in homepage or regional spotlight rotation",
      "Unlimited photos and video",
      "Advanced analytics dashboard",
      "Priority support response",
    ],
    cta: "Request Elite",
    highlighted: false,
    extras: null,
  },
];

export const TRUST_ITEMS: TrustItem[] = [
  {
    title: "12,000+ couples",
    description:
      "Active couples searching for their perfect venue every month.",
  },
  {
    title: "98% satisfaction",
    description: "Venue owners rate their experience with us highly.",
  },
  {
    title: "24h response time",
    description: "We answer your questions within one business day.",
  },
  {
    title: "No hidden fees",
    description: "Simple annual pricing. No commissions, no surprises.",
  },
];
