import { useParams, useNavigate } from "react-router-dom";
import { obituaries } from "@/data/mockData";
import { ChevronLeft, Share2, CalendarDays, Heart } from "lucide-react";

const ObituaryDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const obituary = obituaries.find((o) => o.id === id);

  if (!obituary) {
    return (
      <div className="min-h-screen bg-[#f6f7fb] px-4 pt-16">
        <div className="max-w-lg mx-auto rounded-[28px] bg-white p-8 shadow-sm border border-black/5 text-center">
          <div className="text-4xl mb-3">🕯️</div>
          <h2 className="text-[20px] font-bold text-[#111827]">
            Obituary not found
          </h2>
          <p className="text-[14px] text-[#6b7280] mt-2">
            The obituary you are looking for does not exist or may have been removed.
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

  return (
    <div className="min-h-screen bg-[#f6f7fb] pb-[110px]">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-black/5">
        <div className="max-w-lg mx-auto px-4 pt-10 pb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full bg-[#f3f4f6] flex items-center justify-center text-[#111827]"
            >
              <ChevronLeft size={20} />
            </button>

            <h1 className="text-[18px] font-semibold text-[#111827] flex-1">
              Obituary
            </h1>

            <button className="w-10 h-10 rounded-full bg-[#f3f4f6] flex items-center justify-center text-[#111827]">
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 pt-4 space-y-4">
        {/* Hero */}
        <div className="rounded-[28px] bg-white p-6 border border-black/5 shadow-sm text-center">
          <div className="w-20 h-20 rounded-full bg-[#f3f4f6] mx-auto flex items-center justify-center text-[34px]">
            🕯️
          </div>

          <h2 className="text-[26px] font-bold text-[#111827] mt-4">
            {obituary.name}
          </h2>

          <div className="inline-flex items-center gap-2 rounded-full bg-[#f9fafb] px-3 py-1.5 mt-3 text-[13px] text-[#6b7280]">
            <CalendarDays size={14} />
            <span>{obituary.dateOfPassing}</span>
          </div>
        </div>

        {/* Prayer */}
        <div className="rounded-[28px] bg-white p-5 border border-black/5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-[#00a884]/10 flex items-center justify-center">
              <Heart size={18} className="text-[#00a884]" />
            </div>
            <h3 className="text-[16px] font-semibold text-[#111827]">
              Prayer & remembrance
            </h3>
          </div>

          <p className="text-[16px] leading-8 text-[#374151] font-bengali whitespace-pre-line">
            {obituary.prayer}
          </p>
        </div>

        {/* Details */}
        <div className="rounded-[28px] bg-white p-5 border border-black/5 shadow-sm">
          <h3 className="text-[16px] font-semibold text-[#111827] mb-4">
            Details
          </h3>

          <div className="text-[15px] leading-8 text-[#374151] whitespace-pre-line">
            {obituary.description ||
              "May Allah grant them peace, forgiveness, and Rokeya Sultana. Please remember them in your prayers."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObituaryDetailPage;