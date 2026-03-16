import { useParams, useNavigate } from "react-router-dom";
import { news } from "@/data/mockData";
import { ChevronLeft, Share2, Newspaper } from "lucide-react";

const NewsDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = news.find((n) => n.id === id);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#f6f7fb] px-4 pt-16">
        <div className="max-w-lg mx-auto rounded-[28px] bg-white p-8 shadow-sm border border-black/5 text-center">
          <div className="text-4xl mb-3">📰</div>
          <h2 className="text-[20px] font-bold text-[#111827]">
            News not found
          </h2>
          <p className="text-[14px] text-[#6b7280] mt-2">
            The news article you are looking for does not exist or may have been removed.
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
              News
            </h1>

            <button className="w-10 h-10 rounded-full bg-[#f3f4f6] flex items-center justify-center text-[#111827]">
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 pt-4 space-y-4">
        {/* Hero */}
        <div className="rounded-[28px] overflow-hidden bg-white border border-black/5 shadow-sm">
          <div className="h-48 bg-gradient-to-br from-[#dcfce7] via-[#e0f2fe] to-[#fce7f3] flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/80 mx-auto flex items-center justify-center shadow-sm">
                <Newspaper size={28} className="text-[#00a884]" />
              </div>
              <p className="text-[13px] font-medium text-[#4b5563] mt-3">
                Community News
              </p>
            </div>
          </div>

          <div className="p-5">
            <h2 className="text-[26px] font-bold leading-tight text-[#111827]">
              {article.title}
            </h2>
            <div className="mt-3 flex items-center gap-2 text-[13px] text-[#6b7280] flex-wrap">
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.author}</span>
            </div>
          </div>
        </div>

        {/* Excerpt */}
        {article.excerpt && (
          <div className="rounded-[28px] bg-white p-5 border border-black/5 shadow-sm">
            <h3 className="text-[16px] font-semibold text-[#111827] mb-3">
              Summary
            </h3>
            <p className="text-[15px] leading-7 text-[#4b5563]">
              {article.excerpt}
            </p>
          </div>
        )}

        {/* Content */}
        <div className="rounded-[28px] bg-white p-5 border border-black/5 shadow-sm">
          <h3 className="text-[16px] font-semibold text-[#111827] mb-4">
            Full Story
          </h3>
          <div className="text-[15px] leading-8 text-[#374151] whitespace-pre-line">
            {article.description || article.excerpt}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage;