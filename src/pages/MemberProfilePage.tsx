import { useParams, useNavigate } from "react-router-dom";
import { members } from "@/data/mockData";
import {
  ChevronLeft,
  MessageCircle,
  Phone,
  Video,
  Share2,
  MapPin,
  Briefcase,
  Droplets,
  GraduationCap,
  UserRound,
  Sparkles,
  BadgeCheck,
  Activity,
  HeartHandshake,
} from "lucide-react";
import { motion } from "framer-motion";

const infoItems = [
  { key: "location", label: "Location", icon: MapPin },
  { key: "batch", label: "Batch", icon: GraduationCap },
  { key: "profession", label: "Profession", icon: Briefcase },
  { key: "phone", label: "Phone", icon: Phone },
  { key: "bloodGroup", label: "Blood Group", icon: Droplets },
] as const;

const actions = [
  { icon: MessageCircle, label: "Message" },
  { icon: Phone, label: "Audio" },
  { icon: Video, label: "Video" },
  { icon: Share2, label: "Share" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.34,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const MemberProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const member = members.find((m) => m.id === id);

  if (!member) {
    return (
      <div className="min-h-screen bg-[#f5f7fb] px-4 pt-16">
        <div className="mx-auto max-w-lg rounded-[32px] border border-black/5 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[#00a884]/10 text-[#00a884]">
            <UserRound size={28} />
          </div>
          <h2 className="mt-4 text-[20px] font-semibold text-[#111827]">
            Member not found
          </h2>
          <p className="mt-1 text-[13px] text-[#6b7280]">
            This profile may have been removed or is unavailable.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-5 rounded-full bg-[#00a884] px-5 py-2.5 text-[13px] font-semibold text-white"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  const initials = member.name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const mutualConnections = member.mutualConnections ?? 12;
  const donations = member.donations ?? 8;
  const activityCount = member.activityCount ?? 24;
  const isVerified = member.isVerified ?? true;
  const isOnline = member.isOnline ?? true;

  return (
    <div className="min-h-screen bg-[#f5f7fb] pb-44">

      <div className="relative h-[170px]">
        {/* top gradient area */}
        <div className="absolute inset-x-0 top-0 h-[120px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00a884]/20 via-[#d8f7ef] to-[#ffffff]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.8),transparent_28%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,168,132,0.18),transparent_34%)]" />
          <div className="absolute -top-12 right-[-40px] h-44 w-44 rounded-full bg-[#00a884]/10 blur-3xl" />
          <div className="absolute -left-8 top-10 h-32 w-32 rounded-full bg-emerald-200/40 blur-3xl" />
        </div>

        {/* bottom rounded surface */}
        <div className="absolute inset-x-0 bottom-0 z-0 h-[60px] rounded-t-[40px] bg-[#f5f7fb]" />

        {/* top buttons */}
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-10 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/80 text-[#111827] shadow-md backdrop-blur-xl"
        >
          <ChevronLeft size={20} />
        </button>

        <button className="absolute right-4 top-10 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/80 text-[#111827] shadow-md backdrop-blur-xl">
          <Share2 size={18} />
        </button>

        {/* avatar */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.04}
          className="absolute inset-x-0 top-[60px] z-20 flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-[-10px] rounded-full bg-gradient-to-r from-[#00a884]/30 via-emerald-300/30 to-cyan-300/30 blur-2xl" />

            <div className="relative rounded-full bg-gradient-to-br from-[#00a884] via-emerald-400 to-cyan-400 p-[3px] shadow-[0_10px_20px_rgba(0,168,132,0.22)]">
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-white p-1.5">
                <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#00a884]/15 to-[#dff8f1]">
                  {member.avatar ? (
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-[34px] font-bold text-[#008069]">
                      {initials}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {isOnline && (
              <div className="absolute bottom-2 right-2 h-6 w-6 rounded-full border-4 border-white bg-emerald-500 shadow-md" />
            )}
          </div>
        </motion.div>
      </div>

      <div className="mx-auto max-w-lg px-4 pt-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.1}
          className="text-center"
        >
          <h1 className="mt-4 text-[30px] font-bold tracking-tight text-[#111827]">
            {member.name}
          </h1>

          <div className="mt-2 flex items-center justify-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#eefaf7] px-3 py-1.5 text-[13px] text-[#4b5563]">
              {isVerified && (
                <BadgeCheck size={14} className="text-[#00a884]" />
              )}
              <span>{member.role}</span>
            </div>

            {isOnline && (
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-3 py-1.5 text-[12px] font-medium text-emerald-600 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Online
              </div>
            )}
          </div>

          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-black/5 bg-white px-3.5 py-2 text-[13px] text-[#4b5563] shadow-sm">
            <MapPin size={14} className="text-[#00a884]" />
            <span>{member.location}</span>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="rounded-[24px] border border-white/60 bg-white/80 px-3 py-4 shadow-sm backdrop-blur-xl">
              <p className="text-[11px] text-[#6b7280]">Connections</p>
              <p className="mt-1 text-[18px] font-bold text-[#111827]">
                {mutualConnections}
              </p>
            </div>
            <div className="rounded-[24px] border border-white/60 bg-white/80 px-3 py-4 shadow-sm backdrop-blur-xl">
              <p className="text-[11px] text-[#6b7280]">Activities</p>
              <p className="mt-1 text-[18px] font-bold text-[#111827]">
                {activityCount}
              </p>
            </div>
            <div className="rounded-[24px] border border-white/60 bg-white/80 px-3 py-4 shadow-sm backdrop-blur-xl">
              <p className="text-[11px] text-[#6b7280]">Donations</p>
              <p className="mt-1 text-[18px] font-bold text-[#111827]">
                {donations}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.16}
          className="mt-7 grid grid-cols-4 gap-3"
        >
          {actions.map((action) => (
            <motion.button
              key={action.label}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="group rounded-[24px] border border-white/60 bg-white/80 px-2 py-4 text-center shadow-[0_10px_30px_rgba(17,24,39,0.06)] backdrop-blur-xl transition"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00a884]/15 to-[#dff8f1] text-[#00a884] shadow-sm transition group-hover:shadow-[0_10px_24px_rgba(0,168,132,0.18)]">
                <action.icon size={19} />
              </div>
              <span className="mt-2.5 block text-[11px] font-semibold text-[#4b5563]">
                {action.label}
              </span>
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.22}
          className="mt-7 rounded-[32px] border border-black/5 bg-white p-5 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[17px] font-semibold text-[#111827]">
                Profile details
              </h2>
              <p className="mt-1 text-[12px] text-[#6b7280]">
                Personal and professional information
              </p>
            </div>

            <div className="rounded-full bg-[#00a884]/10 px-3 py-1.5 text-[11px] font-semibold text-[#008069]">
              Member
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {infoItems.map((item, index) => {
              const Icon = item.icon;
              const value = member[item.key];

              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: 0.28 + index * 0.04,
                      duration: 0.24,
                      ease: [0.22, 1, 0.36, 1] as const,
                    },
                  }}
                  className="flex items-start gap-3 rounded-[24px] border border-black/5 bg-[#f8fafc] px-4 py-3.5"
                >
                  <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-black/5 bg-white text-[#00a884] shadow-sm">
                    <Icon size={18} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] text-[#6b7280]">{item.label}</p>
                    <p className="mt-1 break-words text-[15px] font-semibold leading-6 text-[#111827]">
                      {value || "Not provided"}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.28}
          className="mt-6 rounded-[32px] border border-black/5 bg-white p-5 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[16px] font-semibold text-[#111827]">
                Mutual connections
              </h3>
              <p className="mt-1 text-[12px] text-[#6b7280]">
                People you both may know
              </p>
            </div>
            <span className="text-[12px] font-semibold text-[#00a884]">
              {mutualConnections} total
            </span>
          </div>

          <div className="mt-4 flex items-center">
            {["A", "R", "S", "N"].map((item, i) => (
              <div
                key={item}
                className="-ml-2 first:ml-0 flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-[#eafaf6] text-sm font-bold text-[#008069] shadow-sm"
                style={{ zIndex: 10 - i }}
              >
                {item}
              </div>
            ))}
            <div className="-ml-2 flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-[#111827] text-[11px] font-semibold text-white shadow-sm">
              +{Math.max(mutualConnections - 4, 0)}
            </div>
          </div>
        </motion.div> */}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.32}
          className="mt-6 grid grid-cols-2 gap-4"
        >
          <div className="rounded-[28px] border border-black/5 bg-gradient-to-br from-white to-[#f4fffb] p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#00a884]/10 text-[#00a884]">
              <Activity size={18} />
            </div>
            <h3 className="mt-4 text-[15px] font-semibold text-[#111827]">
              Activity history
            </h3>
            <p className="mt-1 text-[13px] leading-6 text-[#6b7280]">
              Participated in {activityCount} community activities and events.
            </p>
          </div>

          <div className="rounded-[28px] border border-black/5 bg-gradient-to-br from-white to-[#fffaf6] p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
              <HeartHandshake size={18} />
            </div>
            <h3 className="mt-4 text-[15px] font-semibold text-[#111827]">
              Support record
            </h3>
            <p className="mt-1 text-[13px] leading-6 text-[#6b7280]">
              Contributed to {donations} support and donation initiatives.
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.36}
          className="mt-6 rounded-[32px] border border-black/5 bg-gradient-to-br from-white to-[#f9fffd] p-5 shadow-sm"
        >
          <h3 className="text-[16px] font-semibold text-[#111827]">
            Community note
          </h3>
          <p className="mt-2 text-[14px] leading-6 text-[#6b7280]">
            This profile helps members connect more easily through batch,
            location, profession, and contact details in one polished place.
          </p>
        </motion.div>
      </div>

      <div className="fixed bottom-20 left-1/2 z-30 w-[calc(90%-40px)] max-w-md -translate-x-1/2">
        <div className="flex items-center justify-between rounded-[28px] border border-white/60 bg-white/85 p-3 shadow-[0_16px_40px_rgba(0,0,0,0.12)] backdrop-blur-xl">
          <div className="min-w-0">
            <p className="text-[12px] text-[#6b7280]">Connect with</p>
            <p className="truncate text-[15px] font-semibold text-[#111827]">
              {member.name}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eefaf7] text-[#00a884]">
              <Phone size={18} />
            </button>
            <button className="flex h-11 items-center justify-center rounded-full bg-[#00a884] px-5 text-[13px] font-semibold text-white shadow-lg">
              Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberProfilePage;