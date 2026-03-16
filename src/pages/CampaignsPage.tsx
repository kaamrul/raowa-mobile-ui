import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Clock3, ChevronRight, Wallet } from "lucide-react";
import { campaigns, myDonations } from "@/data/mockData";
import CampaignProgress from "@/components/CampaignProgress";

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.2, 0, 0, 1] as const },
  },
};

const CampaignsPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const tabs = ["All Campaigns", "My Donations"];

  return (
    <div className="min-h-screen bg-[#f6f7fb] pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-black/5">
        <div className="px-4 pt-12 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[24px] font-bold text-[#111827]">Campaigns</h1>
              <p className="text-[13px] text-[#6b7280] mt-0.5">
                Support causes and track your contributions
              </p>
            </div>

            <div className="w-10 h-10 rounded-full bg-[#00a884]/10 flex items-center justify-center text-[#008069]">
              <Heart size={18} />
            </div>
          </div>

          <div className="flex gap-1 mt-4 bg-[#eef1f4] rounded-full p-1">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`flex-1 py-2.5 rounded-full text-[13px] font-medium transition-all ${
                  activeTab === i
                    ? "bg-white text-[#111827] shadow-sm"
                    : "text-[#6b7280]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        className="px-4 pt-4 space-y-4"
        initial="hidden"
        animate="show"
        key={activeTab}
        variants={{ show: { transition: { staggerChildren: 0.05 } } }}
      >
        {activeTab === 0 &&
          campaigns.map((campaign) => {
            const percent = Math.min(
              100,
              Math.round((campaign.raised / campaign.goal) * 100)
            );

            return (
              <motion.div
                key={campaign.id}
                variants={fadeUp}
                onClick={() => navigate(`/campaigns/${campaign.id}`)}
                className="rounded-3xl bg-white p-4 shadow-sm border border-black/5 cursor-pointer active:scale-[0.995] transition"
              >
                <div className="w-full h-40 rounded-2xl bg-gradient-to-br from-[#dcfce7] via-[#e0f2fe] to-[#fce7f3] flex items-center justify-center mb-4 overflow-hidden">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🤝</div>
                    <p className="text-[13px] font-medium text-[#4b5563]">
                      Community Support Campaign
                    </p>
                  </div>
                </div>

                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-[18px] font-semibold text-[#111827] leading-snug">
                      {campaign.title}
                    </h3>
                    <p className="text-[13px] text-[#6b7280] mt-1 line-clamp-2">
                      {campaign.story}
                    </p>
                  </div>

                  <div className="shrink-0 w-10 h-10 rounded-full bg-[#00a884]/10 text-[#008069] flex items-center justify-center">
                    <ChevronRight size={18} />
                  </div>
                </div>

                <CampaignProgress
                  raised={campaign.raised}
                  goal={campaign.goal}
                  className="mt-4"
                />

                <div className="mt-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[16px] font-semibold text-[#111827]">
                      ৳{campaign.raised.toLocaleString()}
                      <span className="text-[13px] font-normal text-[#6b7280]">
                        {" "}
                        raised of ৳{campaign.goal.toLocaleString()}
                      </span>
                    </p>
                    <div className="flex items-center gap-1 mt-1 text-[12px] text-[#6b7280]">
                      <Clock3 size={13} />
                      <span>{campaign.daysLeft} days left</span>
                      <span className="mx-1">•</span>
                      <span>{percent}% funded</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/campaigns/${campaign.id}`);
                    }}
                    className="shrink-0 rounded-full bg-[#00a884] text-white text-[13px] font-semibold px-4 py-2.5 shadow-sm hover:opacity-95 transition"
                  >
                    Donate
                  </button>
                </div>
              </motion.div>
            );
          })}

        {activeTab === 1 &&
          (myDonations.length > 0 ? (
            myDonations.map((donation) => (
              <motion.div
                key={donation.id}
                variants={fadeUp}
                className="rounded-3xl bg-white p-4 shadow-sm border border-black/5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-11 h-11 rounded-2xl bg-[#00a884]/10 text-[#008069] flex items-center justify-center shrink-0">
                      <Wallet size={18} />
                    </div>

                    <div className="min-w-0">
                      <h4 className="text-[15px] font-semibold text-[#111827] truncate">
                        {donation.campaign}
                      </h4>
                      <p className="text-[12px] text-[#6b7280] mt-1">
                        {donation.date}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-[16px] font-semibold text-[#111827]">
                      ৳{donation.amount.toLocaleString()}
                    </p>
                    <span
                      className={`inline-flex mt-1 text-[10px] font-semibold uppercase px-2.5 py-1 rounded-full ${
                        donation.status === "completed"
                          ? "bg-[#00a884]/10 text-[#008069]"
                          : "bg-amber-500/10 text-amber-600"
                      }`}
                    >
                      {donation.status}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              variants={fadeUp}
              className="rounded-3xl bg-white p-8 shadow-sm border border-black/5 text-center"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-[#00a884]/10 flex items-center justify-center text-2xl mb-4">
                💸
              </div>
              <h3 className="text-[17px] font-semibold text-[#111827]">
                No donations yet
              </h3>
              <p className="text-[13px] text-[#6b7280] mt-1">
                Start supporting a campaign to see your donation history here.
              </p>
              <button
                onClick={() => setActiveTab(0)}
                className="mt-4 rounded-full bg-[#00a884] text-white text-[13px] font-semibold px-4 py-2.5"
              >
                Browse campaigns
              </button>
            </motion.div>
          ))}
      </motion.div>
    </div>
  );
};

export default CampaignsPage;