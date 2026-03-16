import { promotionPlans } from "@/data/promotion";
import type { MyPromotionPlan, PromotionAd, PromotionPlan } from "@/types/promotion";

export const getPlanById = (planId: PromotionPlan["id"]) => {
  return promotionPlans.find((plan) => plan.id === planId) || null;
};

export const getPromotedAdsCount = (
  ads: PromotionAd[],
  planId: PromotionPlan["id"]
) => {
  return ads.filter(
    (ad) => ad.promoted && ad.plan === planId && ad.status !== "Expired"
  ).length;
};

export const getRemainingListingCount = (
  subscribedPlan: MyPromotionPlan | null,
  ads: PromotionAd[]
) => {
  if (!subscribedPlan || !subscribedPlan.active) return 0;

  const plan = getPlanById(subscribedPlan.planId);
  if (!plan) return 0;

  if (plan.listingLimit === null) return Infinity;

  const used = getPromotedAdsCount(ads, subscribedPlan.planId);
  return Math.max(0, plan.listingLimit - used);
};

export const canPromoteNewAd = (
  subscribedPlan: MyPromotionPlan | null,
  ads: PromotionAd[]
) => {
  if (!subscribedPlan || !subscribedPlan.active) return false;

  const remaining = getRemainingListingCount(subscribedPlan, ads);
  return remaining > 0;
};

export const getNewAdPromotionMeta = (
  subscribedPlan: MyPromotionPlan | null,
  ads: PromotionAd[]
) => {
  const promotable = canPromoteNewAd(subscribedPlan, ads);

  if (!subscribedPlan || !subscribedPlan.active) {
    return {
      promoted: false,
      plan: null,
      reason: "no-active-plan" as const,
    };
  }

  if (!promotable) {
    return {
      promoted: false,
      plan: null,
      reason: "limit-reached" as const,
    };
  }

  return {
    promoted: true,
    plan: subscribedPlan.planId,
    reason: "eligible" as const,
  };
};