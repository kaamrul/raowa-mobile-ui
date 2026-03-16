import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ShieldCheck,
  Heart,
  CreditCard,
  Smartphone,
  Building2,
  ArrowRight,
} from "lucide-react";
import { campaigns } from "@/data/mockData";

const methodNames: Record<string, string> = {
  bkash: "bKash",
  nagad: "Nagad",
  rocket: "Rocket",
  sslcommerz: "SSLCommerz",
  bank: "Bank Transfer",
};

const getMethodIcon = (method: string) => {
  if (method === "bkash" || method === "nagad" || method === "rocket") {
    return Smartphone;
  }
  if (method === "bank") {
    return Building2;
  }
  return CreditCard;
};

const DonationConfirmPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const amount = parseInt(searchParams.get("amount") || "0", 10);
  const method = searchParams.get("method") || "";
  const campaign = campaigns.find((c) => c.id === id);

  const methodLabel = methodNames[method] || method || "Not selected";
  const MethodIcon = getMethodIcon(method);

  const handlePay = () => {
    const outcomes = ["success", "failed", "cancelled"];
    const result = outcomes[0]; // default success for demo
    navigate(
      `/campaigns/${id}/donate/status?amount=${amount}&method=${method}&result=${result}`
    );
  };

  return (
    <div className="min-h-screen bg-[#f6f7fb] pb-[190px]">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-black/5">
        <div className="flex items-center gap-3 px-4 pt-12 pb-4 max-w-lg mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-[#f3f4f6] flex items-center justify-center text-[#111827]"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-[18px] font-bold text-[#111827]">
            Confirm Donation
          </h1>
        </div>
      </div>

      <div className="px-4 pt-4 max-w-lg mx-auto space-y-5">
        {/* Campaign */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[28px] p-4 border border-black/5 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#00a884]/10 flex items-center justify-center shrink-0">
              <Heart size={22} className="text-[#00a884]" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-[12px] text-[#6b7280] mb-1">Campaign</p>
              <h3 className="text-[16px] font-semibold text-[#111827] truncate">
                {campaign?.title}
              </h3>
            </div>
          </div>
        </motion.div>

        {/* Donation details */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.04 }}
          className="bg-white rounded-[28px] p-5 border border-black/5 shadow-sm space-y-4"
        >
          <h3 className="text-[16px] font-semibold text-[#111827]">
            Donation Details
          </h3>

          <div className="flex justify-between gap-4 text-[15px]">
            <span className="text-[#6b7280]">Amount</span>
            <span className="font-semibold text-[#111827]">
              ৳{amount.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between gap-4 text-[15px]">
            <span className="text-[#6b7280]">Payment Method</span>
            <span className="font-semibold text-[#111827] text-right">
              {methodLabel}
            </span>
          </div>

          <div className="flex justify-between gap-4 text-[15px]">
            <span className="text-[#6b7280]">Processing Fee</span>
            <span className="font-semibold text-[#111827]">৳0</span>
          </div>

          <div className="border-t border-black/5" />

          <div className="flex justify-between gap-4 text-[17px]">
            <span className="font-bold text-[#111827]">Total</span>
            <span className="font-bold text-[#00a884]">
              ৳{amount.toLocaleString()}
            </span>
          </div>
        </motion.div>

        {/* Secure payment note */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="flex items-start gap-3 bg-[#f0fdf9] border border-[#00a884]/10 rounded-[24px] px-4 py-4"
        >
          <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shrink-0">
            <ShieldCheck size={20} className="text-[#00a884]" />
          </div>

          <div>
            <p className="text-[14px] font-semibold text-[#065f46]">
              Secure payment
            </p>
            <p className="text-[13px] text-[#4b5563] mt-1 leading-6">
              Your payment is secure and encrypted. We do not store your payment
              details.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Sticky CTA - bottom nav safe */}
      <div className="fixed left-0 right-0 z-30 px-4 pt-3 bottom-[88px]">
        <div className="max-w-lg mx-auto">
          <AnimatePresence>
            {amount > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="mb-3 rounded-2xl bg-white border border-black/5 shadow-sm px-4 py-3 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-2xl bg-[#f8fafc] flex items-center justify-center shrink-0">
                    <MethodIcon size={18} className="text-[#00a884]" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[12px] text-[#6b7280]">Pay with</p>
                    <p className="text-[16px] font-bold text-[#111827] truncate">
                      {methodLabel}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-[12px] text-[#6b7280]">Total</p>
                  <p className="text-[16px] font-bold text-[#00a884]">
                    ৳{amount.toLocaleString()}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={handlePay}
            className="w-full rounded-full bg-[#00a884] text-white px-5 py-4 font-bold text-[16px] shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span>Pay ৳{amount.toLocaleString()}</span>
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-semibold text-white/90">
                  {methodLabel}
                </span>
                <ArrowRight size={18} />
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationConfirmPage;