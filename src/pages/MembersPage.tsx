import { useMemo, useState } from "react";
import { Search, Users, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { members } from "@/data/mockData";
import MemberCard from "@/components/MemberCard";

const batches = ["All", "2010", "2011", "2012", "2013", "2014", "2015"];

const containerVariants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.24,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.045,
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: {
      duration: 0.16,
      ease: [0.4, 0, 1, 1],
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.24,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: 8,
    scale: 0.985,
    transition: { duration: 0.14 },
  },
};

const MembersPage = () => {
  const [search, setSearch] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("All");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();

    return members.filter((m) => {
      const matchSearch =
        m.name.toLowerCase().includes(q) ||
        m.location.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q);

      const matchBatch = selectedBatch === "All" || m.batch === selectedBatch;

      return matchSearch && matchBatch;
    });
  }, [search, selectedBatch]);

  const listKey = `${selectedBatch}-${search.trim().toLowerCase()}`;

  return (
    <div className="min-h-screen bg-[#f6f7fb] pb-24">
      {/* Sticky mobile header */}
      <div className="sticky top-0 z-20 border-b border-black/5 bg-white/85 backdrop-blur-md">
        <div className="mx-auto max-w-lg px-4 pt-12 pb-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-[28px] font-bold tracking-tight text-[#111827]">
                Members
              </h1>
              <p className="mt-1 text-[13px] text-[#6b7280]">
                Discover alumni by batch, place and role
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#00a884]/10 text-[#00a884] shrink-0">
              <Users size={20} />
            </div>
          </div>

          {/* Search */}
          <div className="mt-4 rounded-2xl border border-black/5 bg-[#f3f4f6] px-3.5 py-3 flex items-center gap-2.5 shadow-sm">
            <Search size={18} className="text-[#6b7280]" />
            <input
              placeholder="Search members, city or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-[14px] text-[#111827] outline-none placeholder:text-[#9ca3af]"
            />
          </div>

          {/* Batch pills */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {batches.map((batch) => {
              const isActive = selectedBatch === batch;

              return (
                <button
                  key={batch}
                  onClick={() => setSelectedBatch(batch)}
                  className={`relative shrink-0 rounded-full px-4 py-2 text-[12px] font-semibold transition-colors ${
                    isActive ? "text-white" : "text-[#4b5563]"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeBatchPill"
                      className="absolute inset-0 rounded-full bg-[#00a884] shadow-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}

                  {!isActive && (
                    <span className="absolute inset-0 rounded-full bg-white border border-black/5 shadow-sm" />
                  )}

                  <span className="relative z-10">{batch}</span>
                </button>
              );
            })}
          </div>

          {/* Results info */}
          <div className="mt-3 flex items-center justify-between text-[12px] text-[#6b7280]">
            <span>
              {filtered.length} member{filtered.length !== 1 ? "s" : ""} found
            </span>
            <span>{selectedBatch === "All" ? "All batches" : `Batch ${selectedBatch}`}</span>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="mx-auto max-w-lg px-4 pt-4 overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={listKey}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="space-y-3"
          >
            {filtered.length > 0 ? (
              filtered.map((member) => (
                <motion.div
                  key={member.id}
                  layout
                  variants={itemVariants}
                  className="rounded-[26px] border border-black/5 bg-white p-1 shadow-sm"
                >
                  <MemberCard
                    id={member.id}
                    name={member.name}
                    role={member.role}
                    location={member.location}
                    avatar={member.avatar}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="rounded-[28px] border border-black/5 bg-white px-6 py-12 text-center shadow-sm"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00a884]/10 text-[#00a884]">
                  <MapPin size={22} />
                </div>

                <h3 className="mt-4 text-[17px] font-semibold text-[#111827]">
                  No members found
                </h3>
                <p className="mt-1 text-[13px] leading-6 text-[#6b7280]">
                  Try searching with a different name, location or batch.
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MembersPage;