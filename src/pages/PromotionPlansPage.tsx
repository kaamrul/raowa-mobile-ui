import { useNavigate } from "react-router-dom";
import PromotionPlanCard from "@/components/PromotionPlanCard";
import { promotionPlans } from "@/data/promotion";

const PromotionPlansPage = () => {
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
        <h1 className="text-xl font-bold text-[#111827]">Promotion Plans</h1>
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
    </div>
  );
};

export default PromotionPlansPage;