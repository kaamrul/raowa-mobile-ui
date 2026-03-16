import { useParams, useNavigate } from "react-router-dom";
import { campaigns } from "@/data/mockData";
import {
  ChevronLeft,
  Share2,
  Users,
  Clock3,
  BadgeCheck,
  HeartHandshake,
} from "lucide-react";
import CampaignProgress from "@/components/CampaignProgress";

const CampaignDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const campaign = campaigns.find((c) => c.id === id);

  if (!campaign) {
    return (
      <div className="min-h-screen bg-[#f6f7fb] px-4 pt-16">
        <div className="max-w-lg mx-auto rounded-3xl bg-white p-8 shadow-sm border border-black/5 text-center">
          <div className="text-4xl mb-3">😕</div>
          <h2 className="text-[20px] font-bold text-[#111827]">
            Campaign not found
          </h2>
          <p className="text-[14px] text-[#6b7280] mt-2">
            The campaign you are looking for does not exist or may have been removed.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-5 rounded-full bg-[#00a884] text-white px-5 py-2.5 text-[14px] font-semibold"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  const percent = Math.min(
    100,
    Math.round((campaign.raised / campaign.goal) * 100)
  );

  return (
    <div className="min-h-screen bg-[#f6f7fb] pb-40">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-black/5">
        <div className="px-4 pt-10 pb-3 max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full bg-[#f3f4f6] flex items-center justify-center text-[#111827]"
            >
              <ChevronLeft size={20} />
            </button>

            <h1 className="text-[18px] font-semibold text-[#111827] flex-1">
              Campaign
            </h1>

            <button className="w-10 h-10 rounded-full bg-[#f3f4f6] flex items-center justify-center text-[#111827]">
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 max-w-lg mx-auto">
        {/* Cover */}
        <div className="w-full h-52 rounded-3xl bg-gradient-to-br from-[#dcfce7] via-[#e0f2fe] to-[#fce7f3] flex items-center justify-center mb-4 overflow-hidden shadow-sm border border-black/5">
          <div className="text-center">
            <div className="text-5xl mb-2">🤝</div>
            <p className="text-[14px] font-medium text-[#4b5563]">
              Community Support Campaign
            </p>
          </div>
        </div>

        {/* Title */}
        <div className="rounded-3xl bg-white p-5 shadow-sm border border-black/5">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#00a884]/10 text-[#008069] flex items-center justify-center shrink-0">
              <HeartHandshake size={20} />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-[24px] font-bold leading-tight text-[#111827]">
                {campaign.title}
              </h2>

              <div className="flex items-center gap-2 mt-2 text-[13px] text-[#6b7280]">
                <BadgeCheck size={14} className="text-[#00a884]" />
                <span>Organized by {campaign.organizer}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-4 rounded-3xl bg-white p-5 shadow-sm border border-black/5">
          <CampaignProgress
            raised={campaign.raised}
            goal={campaign.goal}
            className="mt-1"
          />

          <div className="flex items-end justify-between mt-4 gap-3">
            <div>
              <p className="text-[26px] font-bold text-[#111827]">
                ৳{campaign.raised.toLocaleString()}
              </p>
              <p className="text-[13px] text-[#6b7280]">
                raised of ৳{campaign.goal.toLocaleString()}
              </p>
            </div>

            <div className="text-right">
              <p className="text-[24px] font-bold text-[#111827]">{percent}%</p>
              <p className="text-[13px] text-[#6b7280]">funded</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="rounded-2xl bg-[#f8fafc] px-4 py-3 border border-black/5">
              <div className="flex items-center gap-2 text-[#6b7280]">
                <Users size={15} />
                <span className="text-[12px]">Supporters</span>
              </div>
              <p className="text-[18px] font-semibold text-[#111827] mt-1">
                {campaign.donorCount}
              </p>
            </div>

            <div className="rounded-2xl bg-[#f8fafc] px-4 py-3 border border-black/5">
              <div className="flex items-center gap-2 text-[#6b7280]">
                <Clock3 size={15} />
                <span className="text-[12px]">Time left</span>
              </div>
              <p className="text-[18px] font-semibold text-[#111827] mt-1">
                {campaign.daysLeft} days
              </p>
            </div>
          </div>
        </div>

        {/* Story */}
        <div className="mt-4 rounded-3xl bg-white p-5 pb-16 shadow-sm border border-black/5">
          <h3 className="text-[18px] font-semibold text-[#111827] mb-3">
            Story
          </h3>
          <p className="text-[15px] leading-7 text-[#374151] whitespace-pre-line">
            {campaign.story}
          </p>
        </div>
      </div>

      {/* Sticky Donate */}
      <div className="fixed bottom-20 left-0 right-0 px-4 z-40">
        <div className="max-w-lg mx-auto">
          <div className="p-3">
            <button
              onClick={() => navigate(`/campaigns/${id}/donate`)}
              className="w-full py-3.5 rounded-full bg-[#00a884] text-white font-semibold text-[16px] shadow-sm hover:opacity-95 transition"
            >
              Donate Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetailPage;