import { useParams, useNavigate } from "react-router-dom";
import { notices } from "@/data/mockData";
import { ChevronLeft, Share2, Pin, Megaphone } from "lucide-react";

const NoticeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const notice = notices.find((n) => n.id === id);

  if (!notice) {
    return (
      <div className="min-h-screen bg-[#f6f7fb] px-4 pt-16">
        <div className="max-w-lg mx-auto rounded-[28px] bg-white p-8 shadow-sm border border-black/5 text-center">
          <div className="text-4xl mb-3">📌</div>
          <h2 className="text-[20px] font-bold text-[#111827]">
            Notice not found
          </h2>
          <p className="text-[14px] text-[#6b7280] mt-2">
            The notice you are looking for does not exist or may have been removed.
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
              Notice
            </h1>

            <button className="w-10 h-10 rounded-full bg-[#f3f4f6] flex items-center justify-center text-[#111827]">
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 pt-4 space-y-4">
        {/* Hero meta */}
        <div className="rounded-[28px] bg-white p-5 border border-black/5 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#00a884]/10 text-[#00a884] flex items-center justify-center shrink-0">
              <Megaphone size={20} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                {notice.pinned && (
                  <div className="inline-flex items-center gap-1 rounded-full bg-[#ecfdf5] text-[#008069] px-2.5 py-1 text-[11px] font-semibold">
                    <Pin size={11} />
                    <span>Pinned</span>
                  </div>
                )}

                <span
                  className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    notice.priority === "high"
                      ? "bg-[#fef2f2] text-[#dc2626]"
                      : notice.priority === "medium"
                      ? "bg-[#fff7ed] text-[#ea580c]"
                      : "bg-[#f3f4f6] text-[#6b7280]"
                  }`}
                >
                  {notice.priority}
                </span>
              </div>

              <h2 className="text-[26px] font-bold leading-tight text-[#111827] mt-3">
                {notice.title}
              </h2>

              <p className="text-[13px] text-[#6b7280] mt-2">{notice.date}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="rounded-[28px] bg-white p-5 border border-black/5 shadow-sm">
          <h3 className="text-[16px] font-semibold text-[#111827] mb-4">
            Details
          </h3>

          <div className="text-[15px] leading-8 text-[#374151] whitespace-pre-line">
            {notice.body}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeDetailPage;