import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { notices, news, events, obituaries } from "@/data/mockData";
import {
  Pin,
  Calendar,
  Newspaper,
  Megaphone,
  HeartHandshake,
  ChevronRight,
  Clock3,
  MapPin,
} from "lucide-react";

const tabs = ["Notices", "News", "Events", "Obituaries"];

const tabContentVariants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.28,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: {
      duration: 0.18,
      ease: [0.4, 0, 1, 1],
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 14, scale: 0.98 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.28,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: 8,
    scale: 0.98,
    transition: {
      duration: 0.16,
    },
  },
};

const CommunityPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialIndex = useMemo(() => {
    const tab = searchParams.get("tab");
    if (tab === "news") return 1;
    if (tab === "events") return 2;
    if (tab === "obituaries") return 3;
    return 0;
  }, [searchParams]);

  const [activeTab, setActiveTab] = useState(initialIndex);

  useEffect(() => {
    setActiveTab(initialIndex);
  }, [initialIndex]);

  const handleTabChange = (index: number) => {
    setActiveTab(index);

    const tabMap = ["notices", "news", "events", "obituaries"];
    setSearchParams({ tab: tabMap[index] });
  };

  const renderContent = () => {
    if (activeTab === 0) {
      return notices.map((notice) => (
        <motion.button
          layout
          key={notice.id}
          variants={itemVariants}
          onClick={() => navigate(`/community/notices/${notice.id}`)}
          className="w-full text-left rounded-[28px] bg-white border border-black/5 shadow-sm p-4 transition hover:shadow-md"
        >
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#00a884]/10 text-[#00a884] flex items-center justify-center shrink-0">
              <Megaphone size={20} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-2">
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

              <h3 className="text-[17px] font-semibold text-[#111827] leading-snug">
                {notice.title}
              </h3>

              <p className="text-[14px] text-[#6b7280] mt-2 line-clamp-2 leading-6">
                {notice.description}
              </p>

              <div className="mt-3 flex items-center justify-between gap-3">
                <p className="text-[12px] text-[#9ca3af]">{notice.date}</p>
                <ChevronRight size={16} className="text-[#9ca3af]" />
              </div>
            </div>
          </div>
        </motion.button>
      ));
    }

    if (activeTab === 1) {
      return news.map((item) => (
        <motion.button
          layout
          key={item.id}
          variants={itemVariants}
          onClick={() => navigate(`/community/news/${item.id}`)}
          className="w-full text-left rounded-[28px] bg-white border border-black/5 shadow-sm p-4 transition hover:shadow-md"
        >
          <div className="w-full h-36 rounded-3xl bg-gradient-to-br from-[#dcfce7] via-[#e0f2fe] to-[#fce7f3] flex items-center justify-center mb-4 overflow-hidden">
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-white/80 mx-auto flex items-center justify-center shadow-sm">
                <Newspaper size={24} className="text-[#00a884]" />
              </div>
              <p className="text-[12px] font-medium text-[#4b5563] mt-2">
                Community News
              </p>
            </div>
          </div>

          <h3 className="text-[17px] font-semibold text-[#111827] leading-snug">
            {item.title}
          </h3>

          <p className="text-[14px] text-[#6b7280] mt-2 line-clamp-2 leading-6">
            {item.excerpt}
          </p>

          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="text-[12px] text-[#9ca3af]">
              {item.date} • {item.author}
            </p>
            <ChevronRight size={16} className="text-[#9ca3af]" />
          </div>
        </motion.button>
      ));
    }

    if (activeTab === 2) {
      return events.map((event) => (
        <motion.button
          layout
          key={event.id}
          variants={itemVariants}
          onClick={() => navigate(`/community/events/${event.id}`)}
          className="w-full text-left rounded-[28px] bg-white border border-black/5 shadow-sm p-4 transition hover:shadow-md"
        >
          <div className="w-full h-32 rounded-3xl bg-gradient-to-br from-[#ecfeff] via-[#eff6ff] to-[#f5f3ff] flex items-center justify-center mb-4">
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm">
              <Calendar size={24} className="text-[#00a884]" />
            </div>
          </div>

          <h3 className="text-[17px] font-semibold text-[#111827] leading-snug">
            {event.title}
          </h3>

          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2 text-[13px] text-[#6b7280]">
              <Calendar size={14} />
              <span>{event.date}</span>
            </div>

            <div className="flex items-center gap-2 text-[13px] text-[#6b7280]">
              <Clock3 size={14} />
              <span>{event.time}</span>
            </div>

            <div className="flex items-center gap-2 text-[13px] text-[#6b7280]">
              <MapPin size={14} />
              <span>{event.venue}</span>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <ChevronRight size={16} className="text-[#9ca3af]" />
          </div>
        </motion.button>
      ));
    }

    return obituaries.map((obit) => (
      <motion.button
        layout
        key={obit.id}
        variants={itemVariants}
        onClick={() => navigate(`/community/obituaries/${obit.id}`)}
        className="w-full text-left rounded-[28px] bg-white border border-black/5 shadow-sm p-4 transition hover:shadow-md"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#f3f4f6] flex items-center justify-center text-[26px] shrink-0">
            🕯️
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-[17px] font-semibold text-[#111827]">
              {obit.name}
            </h3>
            <p className="text-[13px] text-[#6b7280] mt-1">
              {obit.dateOfPassing}
            </p>
            <p className="text-[13px] text-[#4b5563] font-bengali mt-2 line-clamp-2">
              {obit.prayer}
            </p>
          </div>

          <ChevronRight size={16} className="text-[#9ca3af] shrink-0" />
        </div>
      </motion.button>
    ));
  };

  return (
    <div className="min-h-screen bg-[#f6f7fb] pb-[110px]">
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-black/5">
        <div className="max-w-lg mx-auto px-4 pt-12 pb-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-[28px] font-bold text-[#111827]">Community</h1>
              <p className="text-[13px] text-[#6b7280] mt-1">
                Stay updated with notices, news, events and obituaries
              </p>
            </div>

            <div className="w-11 h-11 rounded-2xl bg-[#00a884]/10 text-[#00a884] flex items-center justify-center shrink-0">
              <HeartHandshake size={20} />
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-[#f3f4f6] p-1 flex gap-1">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => handleTabChange(i)}
                className={`flex-1 rounded-xl py-2.5 text-[12px] font-semibold transition-all duration-200 ${
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

      <div className="max-w-lg mx-auto px-4 pt-4 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTab}
            variants={tabContentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-4"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CommunityPage;