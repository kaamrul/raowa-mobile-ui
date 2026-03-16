export type PromotionPlanId = "basic" | "premium" | "featured";

export type PromotionDuration = "month" | "year";

export type PromotionAdStatus = "Active" | "Pending" | "Expired" | "Rejected";

export type PromotionPlanStatus = "Active" | "Inactive" | "Expired" | "Pending";

export type PaymentMethod = "bkash" | "nagad" | "card" | "cash";

export type SubscribeStep =
  | "select-plan"
  | "confirm-price"
  | "payment-method"
  | "success";

export interface PromotionPlan {
  id: PromotionPlanId;
  name: string;
  price: number;
  duration: PromotionDuration;
  features: string[];
  badge: string;
  listingLimit: number | null;
}

export interface PromotionAd {
  id: string;
  title: string;
  category: string;
  status: PromotionAdStatus;
  promoted: boolean;
  plan: PromotionPlanId | null;
  createdAt: string;
  expiresAt: string | null;
}

export interface MyPromotionPlan {
  active: boolean;
  planId: PromotionPlanId;
  name: string;
  price: number;
  startedAt: string;
  expiresAt: string;
  status: PromotionPlanStatus;
}