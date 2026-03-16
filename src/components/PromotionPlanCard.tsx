import type { PromotionPlan } from "@/types/promotion";

interface PromotionPlanCardProps {
  plan: PromotionPlan;
  onClick: (planId: PromotionPlan["id"]) => void;
}

const badgeClassMap: Record<PromotionPlan["id"], string> = {
  basic: "bg-slate-100 text-slate-700",
  premium: "bg-blue-100 text-blue-700",
  featured: "bg-amber-100 text-amber-700",
};

const cardClassMap: Record<PromotionPlan["id"], string> = {
  basic: "border-slate-200 bg-white",
  premium: "border-blue-200 bg-blue-50/40",
  featured: "border-amber-200 bg-amber-50/40",
};

export default function PromotionPlanCard({
  plan,
  onClick,
}: PromotionPlanCardProps) {
  return (
    <div
      onClick={() => onClick(plan.id)}
      className={`cursor-pointer rounded-3xl border p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${cardClassMap[plan.id]}`}
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-[#111827]">{plan.name}</h3>
        <span
          className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${badgeClassMap[plan.id]}`}
        >
          {plan.badge}
        </span>
      </div>

      <p className="mt-4 text-2xl font-bold text-[#111827]">৳{plan.price}</p>
      <p className="text-xs text-[#6b7280]">per {plan.duration}</p>

      <ul className="mt-4 space-y-2">
        {plan.features.map((feature) => (
          <li key={feature} className="text-xs text-[#4b5563]">
            • {feature}
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="mt-5 w-full rounded-2xl bg-[#111827] px-4 py-3 text-sm font-medium text-white"
      >
        Subscribe Now
      </button>
    </div>
  );
}