import {
  Bell,
  Search,
  Users,
  Newspaper,
  Calendar,
  Heart,
  MessageCircle,
  HandCoins,
  ChevronRight,
  Briefcase,
  Megaphone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  currentUser,
  notices,
  events,
  campaigns,
  obituaries,
  jobAlerts,
  promotionPlans,
  committees,
} from "@/data/mockData";
import CampaignProgress from "@/components/CampaignProgress";

const sectionTitleClass = "text-[18px] font-semibold text-[#111827]";
const sectionActionClass =
  "text-[13px] font-semibold text-[#00a884] transition hover:opacity-80";
const cardClass =
  "group rounded-[24px] border border-white/70 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(17,24,39,0.08)] active:scale-[0.99]";

const featuredSlides = [
  {
    id: "notice",
    type: "Notice",
    title: notices.find((n) => n.pinned)?.title || "Important community update",
    description:
      notices.find((n) => n.pinned)?.description ||
      "Stay informed with the latest community notice.",
    icon: Bell,
    to: notices.find((n) => n.pinned)
      ? `/community/notices/${notices.find((n) => n.pinned)!.id}`
      : "/community",
    bg: "from-[#00a884] via-[#0ba97f] to-[#36c79c]",
  },
  {
    id: "events",
    type: "Events",
    title: events[0]?.title || "Upcoming community event",
    description: events[0]
      ? `${events[0].date} • ${events[0].venue}`
      : "See what’s happening in your community.",
    icon: Calendar,
    to: events[0] ? `/community/events/${events[0].id}` : "/community?tab=events",
    bg: "from-violet-600 via-violet-500 to-fuchsia-500",
  },
  {
    id: "news",
    type: "News",
    title: notices[1]?.title || "Latest community news",
    description:
      notices[1]?.description || "Explore recent updates and announcements.",
    icon: Newspaper,
    to: notices[1] ? `/community/notices/${notices[1].id}` : "/community",
    bg: "from-amber-500 via-orange-500 to-rose-500",
  },
];

const smallQuickActions = [
  {
    icon: Heart,
    label: "Campaign",
    to: "/campaigns",
    color: "bg-rose-50 text-rose-600",
  },
  {
    icon: HandCoins,
    label: "Donation",
    to: "/campaigns?tab=mydonations",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Briefcase,
    label: "Job Alert",
    to: "/jobs",
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    icon: Megaphone,
    label: "Promotion",
    to: "/promotion",
    color: "bg-orange-50 text-orange-600",
  },
];

const promotionCardStyles = [
  {
    card: "border-rose-100 bg-rose-50",
    price: "text-rose-600",
    hover: "hover:shadow-[0_10px_30px_rgba(244,63,94,0.16)]",
  },
  {
    card: "border-amber-100 bg-amber-50",
    price: "text-amber-600",
    hover: "hover:shadow-[0_10px_30px_rgba(245,158,11,0.16)]",
  },
  {
    card: "border-green-100 bg-green-50",
    price: "text-green-600",
    hover: "hover:shadow-[0_10px_30px_rgba(14,165,233,0.16)]",
  },
];

const jobBadges = {
  urgent: {
    label: "🔥 Urgent",
    class: "bg-rose-50 text-rose-600 border border-rose-100",
  },
  new: {
    label: "🆕 New",
    class: "bg-emerald-50 text-emerald-600 border border-emerald-100",
  },
  ending: {
    label: "⏳ Ending Soon",
    class: "bg-amber-50 text-amber-600 border border-amber-100",
  },
};

const getJobBadge = (job) => {
  const today = new Date();
  const deadline = new Date(job.deadline);

  const diffDays = Math.ceil(
    (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (job.isNew) return jobBadges.new;

  if (diffDays <= 2) return jobBadges.ending;

  if (diffDays <= 5) return jobBadges.urgent;

  return null;
};

const HomePage = () => {
  const navigate = useNavigate();
  const firstName = currentUser.name.split(" ")[0];
  const pinnedNotice = notices.find((n) => n.pinned);

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % featuredSlides.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f7fb] pb-28">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-b-[32px] px-4 pb-6 pt-12">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00a884]/15 via-[#e3fcda] to-white" />
        <div className="absolute right-[-40px] top-[-20px] h-40 w-40 rounded-full bg-[#00a884]/15 blur-3xl" />
        <div className="absolute left-[-30px] top-[30px] h-28 w-28 rounded-full bg-emerald-200/40 blur-3xl" />

        <div className="relative mx-auto max-w-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center rounded-full border border-white/70 bg-white/70 px-2.5 py-1 text-[11px] font-medium text-[#6b7280] shadow-sm backdrop-blur-md">
                Assalamu Alaikum
              </div>

              <h1 className="mt-3 text-[30px] font-bold tracking-[-0.03em] text-[#111827]">
                {firstName}
              </h1>

              <p className="mt-1.5 text-[13px] leading-6 text-[#6b7280]">
                Welcome back to your community space
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white/85 text-[#111827] shadow-[0_10px_25px_rgba(17,24,39,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.04] active:scale-95">
                <Bell size={18} />
                <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[#00a884] ring-2 ring-white" />
              </button>

              <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#00a884]/20 to-[#dff8f1] text-[15px] font-bold text-[#008069] shadow-[0_10px_25px_rgba(0,168,132,0.16)] ring-1 ring-white/80 transition-transform duration-300 hover:scale-[1.06]">
                <span className="relative z-10">{firstName[0]}</span>
                <span className="absolute inset-0 rounded-full bg-white/30" />
                <span className="absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full bg-[#22c55e] ring-2 ring-white" />
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="mt-5 flex items-center gap-3 rounded-[22px] border border-white/70 bg-white/85 px-4 py-3 shadow-sm backdrop-blur-xl transition-shadow duration-300 hover:shadow-md">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f3faf8] text-[#00a884] transition-transform duration-300 hover:scale-105">
              <Search size={18} />
            </div>
            <input
              placeholder="Search members, news, events..."
              className="flex-1 bg-transparent text-[14px] text-[#111827] outline-none placeholder:text-[#9ca3af]"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-4 max-w-lg space-y-6 px-4">
        {/* Quick Hub */}
        <div className="space-y-4">
          {/* Medium Cards */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate("/members")}
              className="group rounded-[26px] border border-white/70 bg-white/90 p-4 text-left shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md active:scale-[0.99]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-gradient-to-br from-[#00a884]/15 to-[#dff8f1] text-[#008069] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                <Users size={21} />
              </div>

              <h3 className="mt-4 text-[16px] font-semibold text-[#111827]">
                Members
              </h3>
              <p className="mt-1 text-[12px] leading-5 text-[#6b7280]">
                Browse and connect with community members
              </p>
            </button>

            <button
              onClick={() => navigate("/inbox")}
              className="group rounded-[26px] border border-white/70 bg-white/90 p-4 text-left shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md active:scale-[0.99]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-gradient-to-br from-sky-500/15 to-sky-50 text-sky-600 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                <MessageCircle size={21} />
              </div>

              <h3 className="mt-4 text-[16px] font-semibold text-[#111827]">
                Inbox
              </h3>
              <p className="mt-1 text-[12px] leading-5 text-[#6b7280]">
                Messages, replies and direct updates
              </p>
            </button>
          </div>

          {/* Small Tiles */}
          <div className="grid grid-cols-4 gap-3">
            {smallQuickActions.map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.to)}
                className="group rounded-[22px] border border-white/70 bg-white/90 p-3 text-center shadow-sm backdrop-blur-xl transition-all duration-300 hover:shadow-md active:scale-95"
              >
                <div
                  className={`mx-auto flex h-11 w-11 items-center justify-center rounded-[16px] ${item.color} transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}
                >
                  <item.icon size={18} />
                </div>
                <p className="mt-2.5 text-[11px] font-semibold leading-4 text-[#374151] transition-colors duration-300 group-hover:text-[#111827]">
                  {item.label}
                </p>
              </button>
            ))}
          </div>

          {/* Featured Slider */}
          <div className="overflow-hidden rounded-[30px]">
            <div
              onClick={() => navigate(featuredSlides[activeSlide].to)}
              className={`group relative min-h-[210px] cursor-pointer overflow-hidden rounded-[30px] bg-gradient-to-br ${featuredSlides[activeSlide].bg} p-5 text-white shadow-[0_18px_45px_rgba(0,0,0,0.10)] transition-all duration-300 hover:shadow-[0_24px_60px_rgba(0,0,0,0.14)]`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.24),transparent_35%)]" />
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-black/5 blur-2xl" />
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />

              <div className="relative flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white/90 backdrop-blur">
                    {featuredSlides[activeSlide].type}
                  </div>

                  <h3 className="mt-4 text-[22px] font-bold leading-8 tracking-tight">
                    {featuredSlides[activeSlide].title}
                  </h3>

                  <p className="mt-2 max-w-[90%] text-[13px] leading-6 text-white/85">
                    {featuredSlides[activeSlide].description}
                  </p>

                  <div className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-white">
                    Explore now
                    <span className="inline-flex transition-transform duration-300 group-hover:translate-x-1">
                      <ChevronRight size={16} />
                    </span>
                  </div>
                </div>

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[20px] bg-white/15 text-white backdrop-blur-md ring-1 ring-white/20 transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-6">
                  {(() => {
                    const Icon = featuredSlides[activeSlide].icon;
                    return <Icon size={24} />;
                  })()}
                </div>
              </div>
            </div>

            {/* Dots */}
            <div className="relative z-20 mt-[-10px] flex items-center justify-center gap-2">
              {featuredSlides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => setActiveSlide(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 ${
                    activeSlide === index
                      ? "w-6 bg-[#00a884]"
                      : "w-2.5 bg-[#d1d5db]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Job Alerts */}
        {jobAlerts.length > 0 && (
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className={sectionTitleClass}>Job Alerts</h2>
              <button
                onClick={() => navigate("/jobs")}
                className={sectionActionClass}
              >
                See all
              </button>
            </div>

            <div className="space-y-3">
              {jobAlerts.slice(0, 2).map((job) => {
                const badge = getJobBadge(job);

                return (
                  <div
                    key={job.id}
                    onClick={() => navigate(`/jobs/${job.id}`)}
                    className={`${cardClass} cursor-pointer`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-[15px] font-semibold text-[#111827]">
                            {job.title}
                          </h3>

                          {badge && (
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${badge.class}`}
                            >
                              {badge.label}
                            </span>
                          )}
                        </div>

                        <p className="mt-1 text-[12px] text-[#6b7280]">
                          {job.company} • {job.location}
                        </p>
                      </div>

                      <span className="shrink-0 rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-semibold text-indigo-600 transition-transform duration-300">
                        Apply
                      </span>
                    </div>

                    <p className="mt-2 text-[12px] text-[#6b7280]">
                      Deadline: {job.deadline}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Upcoming Events */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className={sectionTitleClass}>Upcoming Events</h2>
            <button
              onClick={() => navigate("/community?tab=events")}
              className={sectionActionClass}
            >
              See all
            </button>
          </div>

          <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 scrollbar-hide">
            {events.map((event) => (
              <div
                key={event.id}
                className="group min-w-[230px] shrink-0 cursor-pointer rounded-[26px] border border-white/70 bg-white p-3.5 shadow-sm transition-all duration-300 hover:shadow-[0_18px_40px_rgba(17,24,39,0.08)]"
                onClick={() => navigate(`/community/events/${event.id}`)}
              >
                <div className="flex h-28 w-full items-center justify-center rounded-[20px] bg-gradient-to-br from-[#00a884]/10 to-[#eefaf7] transition-transform duration-300 group-hover:scale-[1.02]">
                  <Calendar
                    size={30}
                    className="text-[#00a884]/50 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                <h4 className="mt-3 truncate text-[15px] font-semibold text-[#111827]">
                  {event.title}
                </h4>
                <p className="mt-1 text-[12px] text-[#6b7280]">{event.date}</p>
                <p className="text-[12px] text-[#6b7280]">{event.venue}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Active Campaigns */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className={sectionTitleClass}>Active Campaigns</h2>
            <button
              onClick={() => navigate("/campaigns")}
              className={sectionActionClass}
            >
              See all
            </button>
          </div>

          <div className="space-y-4">
            {campaigns.slice(0, 2).map((campaign) => (
              <div
                key={campaign.id}
                className="group cursor-pointer rounded-[28px] border border-white/70 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-[0_18px_40px_rgba(17,24,39,0.08)]"
                onClick={() => navigate(`/campaigns/${campaign.id}`)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-[11px] font-semibold text-green-600">
                      Active Campaign
                    </div>
                    <h4 className="mt-3 text-[17px] font-semibold text-[#111827]">
                      {campaign.title}
                    </h4>
                  </div>
                </div>

                <p className="mt-2 line-clamp-2 text-[14px] leading-6 text-[#6b7280]">
                  {campaign.story}
                </p>

                <CampaignProgress
                  raised={campaign.raised}
                  goal={campaign.goal}
                  className="mt-4"
                />

                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="text-[12px] text-[#6b7280]">
                    ৳{campaign.raised.toLocaleString()} / ৳
                    {campaign.goal.toLocaleString()}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/campaigns/${campaign.id}`);
                    }}
                    className="rounded-full bg-[#00a884] px-4 py-2 text-[12px] font-semibold text-white shadow-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-md active:scale-95"
                  >
                    Donate
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Business Promotion Preview */}
        {promotionPlans.length > 0 && (
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className={sectionTitleClass}>Business Promotion</h2>
              <button
                onClick={() => navigate("/promotion")}
                className={sectionActionClass}
              >
                Explore
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {promotionPlans.map((plan, index) => {
                const style = promotionCardStyles[index % promotionCardStyles.length];

                return (
                  <div
                    key={plan.id}
                    onClick={() => navigate(`/promotion/subscribe/${plan.id}`)}
                    className={`group cursor-pointer rounded-[24px] border p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 ${style.card} ${style.hover}`}
                  >
                    <p className="text-[12px] font-semibold text-[#111827]">
                      {plan.name}
                    </p>

                    <p
                      className={`mt-2 text-[22px] font-bold transition-transform duration-300 group-hover:scale-105 ${style.price}`}
                    >
                      ৳{plan.price}
                    </p>

                    <p className="text-[11px] text-[#6b7280]">per month</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Committee Preview */}
        {committees.length > 0 && (
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className={sectionTitleClass}>Committee Management</h2>
              <button
                onClick={() => navigate("/committee")}
                className={sectionActionClass}
              >
                View all
              </button>
            </div>

            <div className="space-y-3">
              {committees.slice(0, 2).map((committee) => (
                <div
                  key={committee.id}
                  onClick={() => navigate(`/committee/${committee.id}`)}
                  className={`${cardClass} cursor-pointer`}
                >
                  <h3 className="text-[15px] font-semibold text-[#111827]">
                    {committee.name}
                  </h3>
                  <p className="mt-1 text-[12px] text-[#6b7280]">
                    Term: {committee.term}
                  </p>
                  <p className="mt-2 text-[12px] font-medium text-[#00a884]">
                    {committee.members.length} members
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Obituaries */}
        {obituaries.length > 0 && (
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className={sectionTitleClass}>Recent Obituaries</h2>
            </div>

            <div className="space-y-3">
              {obituaries.map((obit) => (
                <div
                  key={obit.id}
                  className="group flex cursor-pointer items-center gap-3 rounded-[24px] border border-white/70 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-[0_16px_36px_rgba(17,24,39,0.08)]"
                  onClick={() => navigate(`/community/obituaries/${obit.id}`)}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f8fafc] text-[18px] shadow-sm transition-transform duration-300 group-hover:scale-105">
                    🕯️
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[14px] font-semibold text-[#111827]">
                      {obit.name}
                    </p>
                    <p className="text-[12px] text-[#6b7280]">
                      {obit.dateOfPassing}
                    </p>
                  </div>

                  <ChevronRight
                    size={18}
                    className="text-[#9ca3af] transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;