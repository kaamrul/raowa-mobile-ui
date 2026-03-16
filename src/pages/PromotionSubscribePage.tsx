import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { promotionPlans } from "@/data/promotion";
import type { PaymentMethod, SubscribeStep } from "@/types/promotion";

const steps: { key: SubscribeStep; label: string }[] = [
  { key: "select-plan", label: "Select Plan" },
  { key: "confirm-price", label: "Confirm Price" },
  { key: "payment-method", label: "Payment" },
  { key: "success", label: "Success" },
];

const paymentMethods: PaymentMethod[] = ["bkash", "nagad", "card", "cash"];

const PromotionSubscribePage = () => {
  const navigate = useNavigate();
  const { planId } = useParams<{ planId: string }>();

  const selectedPlan = promotionPlans.find((plan) => plan.id === planId) || null;

  const [step, setStep] = useState<SubscribeStep>("select-plan");
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod | null>(null);

  if (!selectedPlan) {
    return (
      <div className="min-h-screen bg-white px-4 pb-24 pt-4">
        <div className="rounded-3xl border border-[#e5e7eb] p-5 text-center">
          <p className="text-sm text-[#6b7280]">Plan not found.</p>
          <button
            onClick={() => navigate("/promotion/plans")}
            className="mt-4 rounded-2xl bg-[#111827] px-4 py-3 text-sm font-medium text-white"
          >
            Go to Plans
          </button>
        </div>
      </div>
    );
  }

  const handleNext = () => {
    if (step === "select-plan") {
      setStep("confirm-price");
      return;
    }

    if (step === "confirm-price") {
      setStep("payment-method");
      return;
    }

    if (step === "payment-method" && selectedPaymentMethod) {
      setStep("success");
    }
  };

  const handleBack = () => {
    if (step === "confirm-price") {
      setStep("select-plan");
      return;
    }

    if (step === "payment-method") {
      setStep("confirm-price");
      return;
    }

    if (step === "success") {
      setStep("payment-method");
    }
  };

  const activeStepIndex = steps.findIndex((item) => item.key === step);

  return (
    <div className="min-h-screen bg-white px-4 pb-24 pt-4">
      <div className="mb-5 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="rounded-xl border px-3 py-2 text-sm"
        >
          Back
        </button>
        <h1 className="text-xl font-bold text-[#111827]">Subscribe Plan</h1>
      </div>

      <div className="mb-6 grid grid-cols-4 gap-2">
        {steps.map((item, index) => (
          <div key={item.key} className="space-y-2">
            <div
              className={`h-2 rounded-full ${
                index <= activeStepIndex ? "bg-[#111827]" : "bg-[#e5e7eb]"
              }`}
            />
            <p className="text-[11px] text-[#6b7280]">{item.label}</p>
          </div>
        ))}
      </div>

      {step === "select-plan" && (
        <div className="rounded-3xl border border-[#e5e7eb] p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-[#111827]">
                {selectedPlan.name}
              </h2>
              <p className="mt-1 text-sm text-[#6b7280]">{selectedPlan.badge}</p>
            </div>
            <p className="text-2xl font-bold text-[#111827]">
              ৳{selectedPlan.price}
            </p>
          </div>

          <ul className="mt-5 space-y-2">
            {selectedPlan.features.map((feature) => (
              <li key={feature} className="text-sm text-[#4b5563]">
                • {feature}
              </li>
            ))}
          </ul>
        </div>
      )}

      {step === "confirm-price" && (
        <div className="rounded-3xl border border-[#e5e7eb] p-5">
          <h2 className="text-lg font-semibold text-[#111827]">Confirm Price</h2>

          <div className="mt-5 space-y-3 text-sm text-[#4b5563]">
            <div className="flex justify-between gap-3">
              <span>Plan</span>
              <span>{selectedPlan.name}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span>Duration</span>
              <span>1 {selectedPlan.duration}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span>Price</span>
              <span>৳{selectedPlan.price}</span>
            </div>
            <div className="flex justify-between gap-3 border-t pt-3 font-semibold text-[#111827]">
              <span>Total</span>
              <span>৳{selectedPlan.price}</span>
            </div>
          </div>
        </div>
      )}

      {step === "payment-method" && (
        <div className="rounded-3xl border border-[#e5e7eb] p-5">
          <h2 className="text-lg font-semibold text-[#111827]">
            Select Payment Method
          </h2>

          <div className="mt-5 grid gap-3">
            {paymentMethods.map((method) => {
              const selected = selectedPaymentMethod === method;

              return (
                <button
                  key={method}
                  type="button"
                  onClick={() => setSelectedPaymentMethod(method)}
                  className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium capitalize transition ${
                    selected
                      ? "border-[#111827] bg-[#f9fafb] text-[#111827]"
                      : "border-[#e5e7eb] text-[#4b5563]"
                  }`}
                >
                  {method}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {step === "success" && (
        <div className="rounded-3xl border border-[#e5e7eb] p-5 text-center">
          <h2 className="text-xl font-bold text-[#111827]">
            Subscription Successful
          </h2>
          <p className="mt-2 text-sm text-[#6b7280]">
            Your {selectedPlan.name} has been activated successfully.
          </p>

          <div className="mt-6 grid gap-3">
            <button
              onClick={() => navigate("/promotion/my-plan")}
              className="rounded-2xl bg-[#111827] px-4 py-3 text-sm font-medium text-white"
            >
              View My Plan
            </button>

            <button
              onClick={() => navigate("/promotion/create-ad")}
              className="rounded-2xl border border-[#d1d5db] px-4 py-3 text-sm font-medium text-[#111827]"
            >
              Create Ad
            </button>
          </div>
        </div>
      )}

      {step !== "success" && (
        <div className="mt-5 flex gap-3">
          {step !== "select-plan" && (
            <button
              onClick={handleBack}
              className="flex-1 rounded-2xl border border-[#d1d5db] px-4 py-3 text-sm font-medium text-[#111827]"
            >
              Back
            </button>
          )}

          <button
            onClick={handleNext}
            disabled={step === "payment-method" && !selectedPaymentMethod}
            className="flex-1 rounded-2xl bg-[#111827] px-4 py-3 text-sm font-medium text-white disabled:opacity-50"
          >
            {step === "payment-method" ? "Pay Now" : "Continue"}
          </button>
        </div>
      )}
    </div>
  );
};

export default PromotionSubscribePage;