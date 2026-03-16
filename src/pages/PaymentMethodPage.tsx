import { useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CreditCard,
  Smartphone,
  Building2,
  Check,
  ShieldCheck,
  ArrowRight,
  Heart,
} from "lucide-react";
import { campaigns } from "@/data/mockData";

const methods = [
  {
    id: "bkash",
    name: "bKash",
    desc: "Mobile banking",
    icon: Smartphone,
    color: "text-[hsl(340,80%,50%)]",
  },
  {
    id: "nagad",
    name: "Nagad",
    desc: "Mobile banking",
    icon: Smartphone,
    color: "text-[hsl(25,90%,50%)]",
  },
  {
    id: "rocket",
    name: "Rocket",
    desc: "Mobile banking",
    icon: Smartphone,
    color: "text-[hsl(270,60%,50%)]",
  },
  {
    id: "sslcommerz",
    name: "SSLCommerz",
    desc: "Card / Net banking",
    icon: CreditCard,
    color: "text-[#00a884]",
  },
  {
    id: "bank",
    name: "Bank Transfer",
    desc: "Direct transfer",
    icon: Building2,
    color: "text-[#0f766e]",
  },
];

const PaymentMethodPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const amount = parseInt(searchParams.get("amount") || "0", 10);
  const campaign = campaigns.find((c) => c.id === id);
  const [selected, setSelected] = useState<string | null>(null);

  const selectedMethod = methods.find((m) => m.id === selected);

  const handleConfirm = () => {
    if (!selected) return;
    navigate(`/campaigns/${id}/donate/confirm?amount=${amount}&method=${selected}`);
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
            Payment Method
          </h1>
        </div>
      </div>

      <div className="px-4 pt-4 max-w-lg mx-auto space-y-5 pb-14">
        {/* Donation summary */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[28px] p-4 border border-black/5 shadow-sm"
        >
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#00a884]/10 flex items-center justify-center shrink-0">
              <Heart size={22} className="text-[#00a884]" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-[12px] text-[#6b7280] mb-1">Donating to</p>
              <h3 className="text-[16px] font-semibold text-[#111827] truncate">
                {campaign?.title}
              </h3>
              <p className="text-[24px] font-bold text-[#00a884] mt-2">
                ৳{amount.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-2xl bg-[#f0fdf9] border border-[#00a884]/10 px-3 py-2">
            <ShieldCheck size={16} className="text-[#00a884]" />
            <p className="text-[12px] font-medium text-[#065f46]">
              Secure checkout • Your donation is encrypted
            </p>
          </div>
        </motion.div>

        {/* Methods */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.04 }}
          className="bg-white rounded-[28px] p-4 border border-black/5 shadow-sm"
        >
          <h3 className="text-[16px] font-semibold text-[#111827] mb-3">
            Choose Payment Method
          </h3>

          <div className="space-y-3">
            {methods.map((m) => {
              const active = selected === m.id;

              return (
                <motion.button
                  key={m.id}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => setSelected(m.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                    active
                      ? "bg-[#f0fdf9] border-[#00a884] shadow-sm"
                      : "bg-[#f8fafc] border-black/5 hover:bg-white"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      active ? "bg-white" : "bg-white/80"
                    }`}
                  >
                    <m.icon size={22} className={m.color} />
                  </div>

                  <div className="flex-1 text-left min-w-0">
                    <h4 className="text-[15px] font-semibold text-[#111827]">
                      {m.name}
                    </h4>
                    <p className="text-[13px] text-[#6b7280]">{m.desc}</p>
                  </div>

                  <div
                    className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                      active
                        ? "bg-[#00a884] border-[#00a884]"
                        : "border-black/10 bg-white"
                    }`}
                  >
                    {active && <Check size={14} className="text-white" />}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Sticky CTA - bottom nav safe */}
      <div className="fixed left-0 right-0 z-30 px-4 pt-3 bottom-[88px]">
        <div className="max-w-lg mx-auto">
          <AnimatePresence>
            {selectedMethod && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="mb-3 rounded-2xl bg-white border border-black/5 shadow-sm px-4 py-3 flex items-center justify-between"
              >
                <div>
                  <p className="text-[12px] text-[#6b7280]">Selected method</p>
                  <p className="text-[17px] font-bold text-[#111827]">
                    {selectedMethod.name}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[12px] text-[#6b7280]">Amount</p>
                  <p className="text-[16px] font-bold text-[#00a884]">
                    ৳{amount.toLocaleString()}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            disabled={!selected}
            onClick={handleConfirm}
            className="w-full rounded-full bg-[#00a884] text-white px-5 py-4 font-bold text-[16px] disabled:opacity-40 transition-all shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span>Continue</span>
              <div className="flex items-center gap-2">
                {selectedMethod && (
                  <span className="text-[13px] font-semibold text-white/90">
                    {selectedMethod.name}
                  </span>
                )}
                <ArrowRight size={18} />
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodPage;