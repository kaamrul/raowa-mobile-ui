import { useMemo } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Home,
  RotateCcw,
  Heart,
  Receipt,
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

const statusConfig = {
  success: {
    icon: CheckCircle2,
    iconColor: "text-[#059669]",
    bgColor: "bg-[#ecfdf5]",
    ringColor: "border-[#10b981]/20",
    title: "Donation Successful!",
    subtitle: "জাযাকাল্লাহ খাইরান। আপনার দানের জন্য ধন্যবাদ।",
  },
  failed: {
    icon: XCircle,
    iconColor: "text-[#dc2626]",
    bgColor: "bg-[#fef2f2]",
    ringColor: "border-[#ef4444]/20",
    title: "Payment Failed",
    subtitle: "Something went wrong. Please try again.",
  },
  cancelled: {
    icon: AlertTriangle,
    iconColor: "text-[hsl(40,90%,45%)]",
    bgColor: "bg-[hsl(40,90%,96%)]",
    ringColor: "border-[hsl(40,90%,55%)]/20",
    title: "Payment Cancelled",
    subtitle: "You cancelled the payment. No amount was deducted.",
  },
};

const DonationStatusPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const amount = parseInt(searchParams.get("amount") || "0", 10);
  const method = searchParams.get("method") || "";
  const result =
    (searchParams.get("result") || "success") as keyof typeof statusConfig;

  const campaign = campaigns.find((c) => c.id === id);
  const config = statusConfig[result] || statusConfig.success;
  const StatusIcon = config.icon;

  const txId = useMemo(
    () => `TXN${Date.now().toString().slice(-8)}`,
    []
  );

  return (
    <div className="min-h-screen bg-[#f6f7fb] px-4 pt-10 pb-[190px]">
      <div className="max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", duration: 0.45 }}
          className="text-center"
        >
          {/* Status hero */}
          <div className="bg-white rounded-[32px] border border-black/5 shadow-sm px-5 py-8">
            <div
              className={`w-24 h-24 rounded-full ${config.bgColor} ${config.ringColor} border flex items-center justify-center mx-auto shadow-sm`}
            >
              <StatusIcon size={42} className={config.iconColor} />
            </div>

            <div className="mt-5">
              <h1 className="text-[28px] leading-tight font-bold text-[#111827]">
                {config.title}
              </h1>
              <p className="text-[15px] leading-7 text-[#6b7280] mt-2 max-w-[300px] mx-auto">
                {config.subtitle}
              </p>
            </div>

            {result === "success" && (
              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#ecfdf5] border border-[#10b981]/10 px-4 py-2">
                <Heart size={15} className="text-[#059669]" />
                <span className="text-[12px] font-semibold text-[#047857]">
                  Your support makes a real difference
                </span>
              </div>
            )}
          </div>

          {/* Success receipt */}
          {result === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="mt-5 bg-white rounded-[28px] p-5 border border-black/5 shadow-sm text-left"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-2xl bg-[#00a884]/10 flex items-center justify-center shrink-0">
                  <Receipt size={20} className="text-[#00a884]" />
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold text-[#111827]">
                    Donation Receipt
                  </h3>
                  <p className="text-[12px] text-[#6b7280]">
                    Payment completed successfully
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between gap-4 text-[15px]">
                  <span className="text-[#6b7280]">Campaign</span>
                  <span className="font-semibold text-[#111827] text-right max-w-[58%] truncate">
                    {campaign?.title}
                  </span>
                </div>

                <div className="flex justify-between gap-4 text-[15px]">
                  <span className="text-[#6b7280]">Amount</span>
                  <span className="font-semibold text-[#00a884]">
                    ৳{amount.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between gap-4 text-[15px]">
                  <span className="text-[#6b7280]">Method</span>
                  <span className="font-semibold text-[#111827]">
                    {methodNames[method] || method}
                  </span>
                </div>

                <div className="flex justify-between gap-4 text-[15px]">
                  <span className="text-[#6b7280]">Transaction ID</span>
                  <span className="font-semibold text-[#111827] text-[13px]">
                    {txId}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Failed/cancelled info */}
          {result !== "success" && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="mt-5 bg-white rounded-[28px] p-5 border border-black/5 shadow-sm text-left"
            >
              <h3 className="text-[16px] font-semibold text-[#111827] mb-3">
                Donation Summary
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between gap-4 text-[15px]">
                  <span className="text-[#6b7280]">Campaign</span>
                  <span className="font-semibold text-[#111827] text-right max-w-[58%] truncate">
                    {campaign?.title}
                  </span>
                </div>

                <div className="flex justify-between gap-4 text-[15px]">
                  <span className="text-[#6b7280]">Amount</span>
                  <span className="font-semibold text-[#111827]">
                    ৳{amount.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between gap-4 text-[15px]">
                  <span className="text-[#6b7280]">Method</span>
                  <span className="font-semibold text-[#111827]">
                    {methodNames[method] || method}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Sticky CTA - bottom nav safe */}
      <div className="fixed left-0 right-0 z-30 px-4 pt-3 bottom-[88px]">
        <div className="max-w-lg mx-auto">
          {result !== "success" ? (
            <div className="space-y-3">
              <button
                onClick={() => navigate(`/campaigns/${id}/donate`)}
                className="w-full rounded-full bg-[#00a884] text-white px-5 py-4 font-bold text-[16px] shadow-sm"
              >
                <div className="flex items-center justify-center gap-2">
                  <RotateCcw size={18} />
                  <span>Try Again</span>
                </div>
              </button>

              <button
                onClick={() => navigate("/")}
                className="w-full rounded-full bg-white text-[#111827] px-5 py-4 font-bold text-[16px] border border-black/5 shadow-sm"
              >
                <div className="flex items-center justify-center gap-2">
                  <Home size={18} />
                  <span>Back to Home</span>
                </div>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="rounded-2xl bg-white border border-black/5 shadow-sm px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-[12px] text-[#6b7280]">Donation completed</p>
                  <p className="text-[17px] font-bold text-[#111827]">
                    ৳{amount.toLocaleString()}
                  </p>
                </div>

                <div className="px-3 py-1.5 rounded-full bg-[#ecfdf5] text-[#047857] text-[12px] font-semibold">
                  Success
                </div>
              </div>

              <button
                onClick={() => navigate("/")}
                className="w-full rounded-full bg-[#00a884] text-white px-5 py-4 font-bold text-[16px] shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span>Back to Home</span>
                  <div className="flex items-center gap-2">
                    <Home size={18} />
                  </div>
                </div>
              </button>

              <button
                onClick={() => navigate(`/campaigns/${id}`)}
                className="w-full rounded-full bg-white text-[#111827] px-5 py-4 font-semibold text-[15px] border border-black/5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span>View Campaign</span>
                  <ArrowRight size={18} />
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonationStatusPage;