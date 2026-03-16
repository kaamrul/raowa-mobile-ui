import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { myAds, myPromotionPlan } from "@/data/promotion";
import {
  canPromoteNewAd,
  getNewAdPromotionMeta,
  getPlanById,
  getRemainingListingCount,
} from "@/utils/promotion";

const PromotionCreateAdPage = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const subscribedPlan = myPromotionPlan;
  const currentPlan =
    subscribedPlan && subscribedPlan.active
      ? getPlanById(subscribedPlan.planId)
      : null;

  const remainingListings = getRemainingListingCount(subscribedPlan, myAds);
  const canPromote = canPromoteNewAd(subscribedPlan, myAds);
  const promotionMeta = getNewAdPromotionMeta(subscribedPlan, myAds);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      id: String(Date.now()),
      title,
      category,
      description,
      promoted: promotionMeta.promoted,
      plan: promotionMeta.plan,
      status: "Pending",
      createdAt: new Date().toISOString().slice(0, 10),
      expiresAt: promotionMeta.promoted ? subscribedPlan?.expiresAt ?? null : null,
    };

    console.log("New ad payload:", payload);

    navigate("/promotion/my-ads");
  };

  return (
    <div className="min-h-screen bg-white px-4 pb-24 pt-4">
      <div className="mb-5 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="rounded-xl border px-3 py-2 text-sm"
        >
          Back
        </button>
        <h1 className="text-xl font-bold text-[#111827]">Create Ad</h1>
      </div>

      {!subscribedPlan || !currentPlan ? (
        <div className="mb-4 rounded-3xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-xs font-medium text-amber-700">No Active Plan</p>
          <h2 className="mt-1 text-lg font-semibold text-[#111827]">
            Ads can be created, but promoted listings will not be available.
          </h2>
          <p className="mt-2 text-sm text-[#6b7280]">
            Your ads will be saved as regular listings, but won't appear in promoted sections without an active promotion plan.
          </p>

          <button
            type="button"
            onClick={() => navigate("/promotion/plans")}
            className="mt-4 rounded-2xl bg-[#111827] px-4 py-3 text-sm font-medium text-white"
          >
            Explore Plans
          </button>
        </div>
      ) : !canPromote ? (
        <div className="mb-4 rounded-3xl border border-orange-200 bg-orange-50 p-4">
          <p className="text-xs font-medium text-orange-700">Listing Limit Reached</p>
          <h2 className="mt-1 text-lg font-semibold text-[#111827]">
            New Ads can be created, but promoted listings will not be available.
          </h2>
          <p className="mt-2 text-sm text-[#6b7280]">
            Your {currentPlan.name} promotion limit has been reached. New ads can still be saved, but they will not appear in the business promotion listings.
          </p>

          <button
            type="button"
            onClick={() => navigate("/promotion/plans")}
            className="mt-4 rounded-2xl bg-[#111827] px-4 py-3 text-sm font-medium text-white"
          >
            Upgrade Plan
          </button>
        </div>
      ) : (
        <div className="mb-4 rounded-3xl border border-[#e5e7eb] bg-[#f9fafb] p-4">
          <p className="text-xs font-medium text-[#6b7280]">Subscribed Plan</p>
          <h2 className="mt-1 text-lg font-semibold text-[#111827]">
            {currentPlan.name}
          </h2>

          <div className="mt-3 space-y-1 text-sm text-[#4b5563]">
            <p>
              Listing limit:{" "}
              {currentPlan.listingLimit === null ? "Unlimited" : currentPlan.listingLimit}
            </p>
            <p>
              Remaining promoted listings:{" "}
              {remainingListings === Infinity ? "Unlimited" : remainingListings}
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Business title"
          className="w-full rounded-2xl border border-[#e5e7eb] px-4 py-3 text-sm outline-none"
          required
        />

        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          type="text"
          placeholder="Category"
          className="w-full rounded-2xl border border-[#e5e7eb] px-4 py-3 text-sm outline-none"
          required
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="min-h-[130px] w-full rounded-2xl border border-[#e5e7eb] px-4 py-3 text-sm outline-none"
          required
        />

        <button
          type="submit"
          className="w-full rounded-2xl bg-[#111827] px-4 py-3 text-sm font-medium text-white"
        >
          Submit Ad
        </button>
      </form>
    </div>
  );
};

export default PromotionCreateAdPage;