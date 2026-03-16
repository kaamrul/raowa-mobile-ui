import { Briefcase, MapPin, ChevronRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jobAlerts } from "@/data/mockData";

const sectionTitleClass = "text-[20px] font-bold text-[#111827]";
const cardClass =
  "group rounded-[24px] border border-white/70 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(17,24,39,0.08)]";

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

const getJobBadge = (job: any) => {
  const today = new Date();
  const deadline = new Date(job.deadline);

  const diffDays = Math.max(
    0,
    Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  );

  if (job.isNew) return jobBadges.new;
  if (diffDays <= 2) return jobBadges.ending;
  if (diffDays <= 5) return jobBadges.urgent;

  return null;
};

const JobsPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filteredJobs = useMemo(() => {
    return jobAlerts.filter((job) =>
      `${job.title} ${job.company} ${job.location}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-[#f5f7fb] pb-24">
      <div className="px-4 pb-6 pt-10">
        <div className="mx-auto max-w-lg">
          <h1 className="text-[28px] font-bold tracking-[-0.03em] text-[#111827]">
            Job Alerts
          </h1>
          <p className="mt-1 text-[13px] text-[#6b7280]">
            Discover opportunities from your community
          </p>

          <div className="mt-5 flex items-center gap-3 rounded-[22px] border border-white/70 bg-white px-4 py-3 shadow-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f3faf8] text-[#00a884]">
              <Search size={18} />
            </div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search jobs, company, location..."
              className="flex-1 bg-transparent text-[14px] text-[#111827] outline-none placeholder:text-[#9ca3af]"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-lg space-y-4 px-4">
        <div className="flex items-center justify-between">
          <h2 className={sectionTitleClass}>Available Jobs</h2>
          <span className="text-[12px] font-medium text-[#6b7280]">
            {filteredJobs.length} jobs
          </span>
        </div>

        {filteredJobs.map((job) => {
          const badge = getJobBadge(job);

          return (
            <div
              key={job.id}
              onClick={() => navigate(`/jobs/${job.id}`)}
              className={`${cardClass} cursor-pointer`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-[16px] font-semibold text-[#111827]">
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

                  <div className="mt-2 flex items-center gap-2 text-[12px] text-[#6b7280]">
                    <Briefcase size={14} />
                    <span>{job.company}</span>
                  </div>

                  <div className="mt-1 flex items-center gap-2 text-[12px] text-[#6b7280]">
                    <MapPin size={14} />
                    <span>{job.location}</span>
                  </div>

                  <p className="mt-3 text-[12px] text-[#6b7280]">
                    Deadline: {job.deadline}
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f8fafc] text-[#9ca3af] transition-all duration-300 group-hover:bg-[#ecfdf5] group-hover:text-[#00a884]">
                  <ChevronRight size={18} />
                </div>
              </div>
            </div>
          );
        })}

        {filteredJobs.length === 0 && (
          <div className="rounded-[24px] bg-white p-6 text-center shadow-sm">
            <p className="text-[14px] font-medium text-[#111827]">
              No jobs found
            </p>
            <p className="mt-1 text-[12px] text-[#6b7280]">
              Try a different keyword
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsPage;