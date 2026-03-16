import { useNavigate } from "react-router-dom";
import { myAds, myPromotionPlan } from "@/data/promotion";
import {
  canPromoteNewAd,
  getPlanById,
  getPromotedAdsCount,
  getRemainingListingCount,
} from "@/utils/promotion";

const PromotionMyPlanPage = () => {
  const navigate = useNavigate();

  const subscribedPlan = myPromotionPlan;
  const currentPlan =
    subscribedPlan && subscribedPlan.active
      ? getPlanById(subscribedPlan.planId)
      : null;

  const promotedUsed =
    subscribedPlan && currentPlan
      ? getPromotedAdsCount(myAds, subscribedPlan.planId)
      : 0;

  const remainingListings = getRemainingListingCount(subscribedPlan, myAds);
  const canPromote = canPromoteNewAd(subscribedPlan, myAds);

  if (!subscribedPlan || !currentPlan) {
    return (
      <div className="min-h-screen bg-white px-4 pb-24 pt-4">
        <div className="mb-5 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="rounded-xl border px-3 py-2 text-sm"
          >
            Back
          </button>
          <h1 className="text-xl font-bold text-[#111827]">My Plan</h1>
        </div>

        <div className="rounded-3xl border border-[#e5e7eb] p-5 text-center">
          <p className="text-sm text-[#6b7280]">No active promotion plan found.</p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate("/promotion/create-ad")}
              className="rounded-2xl border border-[#d1d5db] px-4 py-3 text-sm font-medium text-[#111827]"
            >
              Create Ad
            </button>

            <button
              onClick={() => navigate("/promotion/plans")}
              className="rounded-2xl bg-[#111827] px-4 py-3 text-sm font-medium text-white"
            >
              Explore Plans
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 pb-24 pt-4">
      <div className="mb-5 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="rounded-xl border px-3 py-2 text-sm"
        >
          Back
        </button>
        <h1 className="text-xl font-bold text-[#111827]">My Plan</h1>
      </div>

      <div className="rounded-3xl border border-[#e5e7eb] p-5">
        <p className="text-xs font-medium text-[#6b7280]">Active Promotion Plan</p>

        <div className="mt-2 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-[#111827]">{currentPlan.name}</h2>
            <p className="mt-1 text-sm text-[#4b5563]">
              Status: {subscribedPlan.status}
            </p>
          </div>

          <p className="text-2xl font-bold text-[#111827]">
            ৳{subscribedPlan.price}
          </p>
        </div>

        <div className="mt-5 space-y-3 text-sm text-[#4b5563]">
          <div className="flex justify-between gap-3">
            <span>Started At</span>
            <span>{subscribedPlan.startedAt}</span>
          </div>
          <div className="flex justify-between gap-3">
            <span>Expires At</span>
            <span>{subscribedPlan.expiresAt}</span>
          </div>
          <div className="flex justify-between gap-3">
            <span>Promotion Limit</span>
            <span>
              {currentPlan.listingLimit === null
                ? "Unlimited"
                : currentPlan.listingLimit}
            </span>
          </div>
          <div className="flex justify-between gap-3">
            <span>Promoted Used</span>
            <span>{promotedUsed}</span>
          </div>
          <div className="flex justify-between gap-3">
            <span>Remaining</span>
            <span>
              {remainingListings === Infinity
                ? "Unlimited"
                : remainingListings}
            </span>
          </div>
        </div>

        <div
          className={`mt-5 rounded-2xl border p-3 text-sm ${
            canPromote
              ? "border-green-200 bg-green-50 text-green-700"
              : "border-orange-200 bg-orange-50 text-orange-700"
          }`}
        >
          {canPromote
            ? "Your next ad can be published as a promoted business listing."
            : "You can create an ad, but your next ad will not be promoted because your promotion limit has been reached."}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate("/promotion/create-ad")}
            className="rounded-2xl bg-[#111827] px-4 py-3 text-sm font-medium text-white"
          >
            Create Ad
          </button>
          <button
            onClick={() => navigate("/promotion/plans")}
            className="rounded-2xl border border-[#d1d5db] px-4 py-3 text-sm font-medium text-[#111827]"
          >
            Upgrade Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromotionMyPlanPage;