import { useNavigate } from "react-router-dom";
import PromotionPlanCard from "@/components/PromotionPlanCard";
import { myAds, myPromotionPlan, promotionPlans } from "@/data/promotion";
import {
  canPromoteNewAd,
  getPlanById,
  getPromotedAdsCount,
  getRemainingListingCount,
} from "@/utils/promotion";

const PromotionPage = () => {
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

  return (
    <div className="min-h-screen bg-white px-4 pb-24 pt-4">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Promotion</h1>
          <p className="mt-1 text-sm text-[#6b7280]">
            Create ads and boost your business with promotion plans.
          </p>
        </div>

        {subscribedPlan && currentPlan ? (
          <section className="rounded-3xl border border-[#e5e7eb] bg-[#f9fafb] p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium text-[#6b7280]">
                  Subscribed Plan
                </p>
                <h2 className="mt-1 text-lg font-semibold text-[#111827]">
                  {currentPlan.name}
                </h2>
                <p className="mt-1 text-sm text-[#4b5563]">
                  Status: {subscribedPlan.status}
                </p>
                <p className="text-sm text-[#4b5563]">
                  Expires: {subscribedPlan.expiresAt}
                </p>
              </div>

              <button
                onClick={() => navigate("/promotion/my-plan")}
                className="rounded-2xl border border-[#d1d5db] px-4 py-2 text-sm font-medium text-[#111827]"
              >
                My Plan
              </button>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-white p-3 text-center">
                <p className="text-xs text-[#6b7280]">Limit</p>
                <p className="mt-1 text-base font-semibold text-[#111827]">
                  {currentPlan.listingLimit === null
                    ? "Unlimited"
                    : currentPlan.listingLimit}
                </p>
              </div>

              <div className="rounded-2xl bg-white p-3 text-center">
                <p className="text-xs text-[#6b7280]">Promoted Used</p>
                <p className="mt-1 text-base font-semibold text-[#111827]">
                  {promotedUsed}
                </p>
              </div>

              <div className="rounded-2xl bg-white p-3 text-center">
                <p className="text-xs text-[#6b7280]">Remaining</p>
                <p className="mt-1 text-base font-semibold text-[#111827]">
                  {remainingListings === Infinity
                    ? "Unlimited"
                    : remainingListings}
                </p>
              </div>
            </div>

            <div
              className={`mt-4 rounded-2xl border p-3 text-sm ${
                canPromote
                  ? "border-green-200 bg-green-50 text-green-700"
                  : "border-orange-200 bg-orange-50 text-orange-700"
              }`}
            >
              {canPromote
                ? "If you create a new ad, it will also be counted as a promoted business listing."
                : "You can create an ad, but it will not be a promoted listing because your plan limit has been reached."}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
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
          </section>
        ) : (
          <section className="rounded-3xl border border-[#e5e7eb] bg-[#f9fafb] p-4">
            <p className="text-xs font-medium text-[#6b7280]">Subscribed Plan</p>
            <h2 className="mt-1 text-lg font-semibold text-[#111827]">
              No active plan
            </h2>
            <p className="mt-2 text-sm text-[#4b5563]">
              You can create an ad, but to display it in the promotion listing, you need to subscribe to a plan first.
            </p>

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
          </section>
        )}

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#111827]">
              Available Plans
            </h2>
            <button
              onClick={() => navigate("/promotion/plans")}
              className="text-sm font-medium text-[#111827]"
            >
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {promotionPlans.map((plan) => (
              <PromotionPlanCard
                key={plan.id}
                plan={plan}
                onClick={(planId) => navigate(`/promotion/subscribe/${planId}`)}
              />
            ))}
          </div>
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#111827]">My Ads</h2>
            <button
              onClick={() => navigate("/promotion/my-ads")}
              className="text-sm font-medium text-[#111827]"
            >
              View All
            </button>
          </div>

          <div className="space-y-3">
            {myAds.slice(0, 2).map((ad) => (
              <div
                key={ad.id}
                className="rounded-3xl border border-[#e5e7eb] p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-[#111827]">
                      {ad.title}
                    </p>
                    <p className="mt-1 text-xs text-[#6b7280]">{ad.category}</p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      ad.promoted
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {ad.promoted ? "Promoted" : "Normal"}
                  </span>
                </div>

                <div className="mt-3 space-y-1 text-xs text-[#4b5563]">
                  <p>Status: {ad.status}</p>
                  <p>Created: {ad.createdAt}</p>
                  <p>
                    Listing Type: {ad.promoted ? "Business Promotion" : "Normal Ad"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PromotionPage;