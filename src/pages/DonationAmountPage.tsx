import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Heart,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { campaigns } from "@/data/mockData";

const presets = [500, 1000, 2000, 5000, 10000, 25000];

const DonationAmountPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const campaign = campaigns.find((c) => c.id === id);

  const [amount, setAmount] = useState<number | null>(null);
  const [custom, setCustom] = useState("");

  const parsedCustom = custom ? parseInt(custom, 10) : null;
  const selectedAmount = parsedCustom && parsedCustom > 0 ? parsedCustom : amount;

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
          <h1 className="text-[18px] font-bold text-[#111827]">Donate</h1>
        </div>
      </div>

      <div className="px-4 pt-4 max-w-lg mx-auto space-y-5">
        {/* Campaign summary */}
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
              <h3 className="text-[16px] font-semibold text-[#111827] truncate">
                {campaign?.title}
              </h3>
              <p className="text-[13px] text-[#6b7280] mt-0.5">
                ৳{(campaign?.raised || 0).toLocaleString()} raised of ৳
                {(campaign?.goal || 0).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-2xl bg-[#f0fdf9] border border-[#00a884]/10 px-3 py-2">
            <ShieldCheck size={16} className="text-[#00a884]" />
            <p className="text-[12px] font-medium text-[#065f46]">
              Secure donation • No extra processing fee
            </p>
          </div>
        </motion.div>

        {/* Preset amounts */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.04 }}
          className="bg-white rounded-[28px] p-4 border border-black/5 shadow-sm"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[16px] font-semibold text-[#111827]">
              Select Amount
            </h3>
            <div className="flex items-center gap-1 text-[12px] text-[#00a884] font-medium">
              <Sparkles size={14} />
              <span>Popular</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {presets.map((p) => {
              const active = amount === p && !custom;

              return (
                <motion.button
                  key={p}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    setAmount(p);
                    setCustom("");
                  }}
                  className={`py-3 rounded-2xl text-[15px] font-semibold transition-all border ${
                    active
                      ? "bg-[#00a884] text-white border-[#00a884] shadow-md"
                      : "bg-[#f8fafc] text-[#111827] border-black/5 hover:bg-white"
                  }`}
                >
                  ৳{p.toLocaleString()}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Custom amount */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="bg-white rounded-[28px] p-4 border border-black/5 shadow-sm"
        >
          <h3 className="text-[16px] font-semibold text-[#111827] mb-3">
            Or Enter Custom Amount
          </h3>

          <div className="flex items-center gap-3 rounded-2xl border border-black/5 bg-[#f8fafc] px-4 py-4 focus-within:border-[#00a884]/40 focus-within:bg-white transition">
            <span className="text-[24px] font-bold text-[#00a884]">৳</span>
            <input
              type="number"
              inputMode="numeric"
              value={custom}
              onChange={(e) => {
                setCustom(e.target.value);
                setAmount(null);
              }}
              placeholder="Enter amount"
              className="flex-1 bg-transparent text-[22px] font-semibold text-[#111827] outline-none placeholder:text-[#9ca3af]"
            />
          </div>

          <p className="text-[12px] text-[#6b7280] mt-3">
            Enter any amount you’d like to contribute.
          </p>
        </motion.div>

        {/* Summary */}
        <AnimatePresence>
          {selectedAmount && selectedAmount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="bg-white rounded-[28px] p-4 border border-black/5 shadow-sm"
            >
              <h3 className="text-[16px] font-semibold text-[#111827] mb-3">
                Donation Summary
              </h3>

              <div className="flex justify-between text-[15px]">
                <span className="text-[#6b7280]">Donation Amount</span>
                <span className="font-semibold text-[#111827]">
                  ৳{selectedAmount.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between text-[15px] mt-2">
                <span className="text-[#6b7280]">Processing Fee</span>
                <span className="font-semibold text-[#111827]">৳0</span>
              </div>

              <div className="border-t border-black/5 my-3" />

              <div className="flex justify-between text-[17px]">
                <span className="font-bold text-[#111827]">Total</span>
                <span className="font-bold text-[#00a884]">
                  ৳{selectedAmount.toLocaleString()}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sticky CTA - bottom nav safe */}
      <div className="fixed left-0 right-0 z-30 px-4 pt-3 bottom-[88px] ">
        <div className="max-w-md mx-auto">

          <button
            disabled={!selectedAmount || selectedAmount <= 0}
            onClick={() =>
              navigate(`/campaigns/${id}/donate/payment?amount=${selectedAmount}`)
            }
            className="w-full rounded-full bg-[#00a884] text-white px-5 py-4 font-bold text-[16px] disabled:opacity-40 transition-all shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span>Continue to Payment</span>
              <div className="flex items-center gap-2">
                {selectedAmount && selectedAmount > 0 && (
                  <span className="text-[13px] font-semibold text-white/90">
                    ৳{selectedAmount.toLocaleString()}
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

export default DonationAmountPage;