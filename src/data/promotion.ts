import type { MyPromotionPlan, PromotionAd, PromotionPlan } from "@/types/promotion";

export const promotionPlans: PromotionPlan[] = [
  {
    id: "basic",
    name: "Basic Plan",
    price: 200,
    duration: "month",
    features: [
      "5 business listing",
      "Basic visibility",
      "Standard support",
    ],
    badge: "Starter",
    listingLimit: 5,
  },
  {
    id: "premium",
    name: "Premium Plan",
    price: 500,
    duration: "month",
    features: [
      "15 business listings",
      "Priority visibility",
      "Promotion badge",
    ],
    badge: "Popular",
    listingLimit: 15,
  },
  {
    id: "featured",
    name: "Featured Plan",
    price: 1000,
    duration: "month",
    features: [
      "Unlimited listings",
      "Top featured placement",
      "Priority support",
    ],
    badge: "Best Value",
    listingLimit: null,
  },
];

export const myAds: PromotionAd[] = [
  {
    id: "1",
    title: "Hasan Electronics",
    category: "Electronics",
    status: "Active",
    promoted: true,
    plan: "premium",
    createdAt: "2025-08-01",
    expiresAt: "2025-09-01",
  },
  {
    id: "2",
    title: "Rafiq Properties",
    category: "Real Estate",
    status: "Pending",
    promoted: true,
    plan: "premium",
    createdAt: "2025-08-10",
    expiresAt: "2025-09-10",
  },
];

export const myPromotionPlan: MyPromotionPlan | null = {
  active: true,
  planId: "premium",
  name: "Premium Plan",
  price: 500,
  startedAt: "2025-08-01",
  expiresAt: "2025-09-01",
  status: "Active",
};