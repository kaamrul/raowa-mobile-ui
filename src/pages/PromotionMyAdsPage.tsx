import { useNavigate } from "react-router-dom";
import { myAds } from "@/data/promotion";

const PromotionMyAdsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white px-4 pb-24 pt-4">
      <div className="mb-5 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="rounded-xl border px-3 py-2 text-sm"
        >
          Back
        </button>
        <h1 className="text-xl font-bold text-[#111827]">My Ads</h1>
      </div>

      <button
        onClick={() => navigate("/promotion/create-ad")}
        className="mb-4 w-full rounded-2xl bg-[#111827] px-4 py-3 text-sm font-medium text-white"
      >
        Create New Ad
      </button>

      <div className="space-y-3">
        {myAds.map((ad) => (
          <div key={ad.id} className="rounded-3xl border border-[#e5e7eb] p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[#111827]">{ad.title}</p>
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

            <div className="mt-4 space-y-1 text-xs text-[#4b5563]">
              <p>Status: {ad.status}</p>
              <p>Created: {ad.createdAt}</p>
              <p>
                Promotion Plan: {ad.plan ? ad.plan : "Not linked to any active plan"}
              </p>
              <p>
                Listing Type: {ad.promoted ? "Business Promotion" : "Normal Ad"}
              </p>
              <p>Expires: {ad.expiresAt ?? "N/A"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromotionMyAdsPage;