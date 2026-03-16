import {
  ArrowLeft,
  Briefcase,
  MapPin,
  CalendarDays,
  Building2,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { jobAlerts } from "@/data/mockData";

const JobDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const job = jobAlerts.find((item) => String(item.id) === String(id));

  if (!job) {
    return (
      <div className="min-h-screen bg-[#f5f7fb] p-4">
        <div className="mx-auto max-w-lg rounded-[24px] bg-white p-6 shadow-sm">
          <p className="text-[16px] font-semibold text-[#111827]">
            Job not found
          </p>
          <button
            onClick={() => navigate("/jobs")}
            className="mt-4 rounded-full bg-[#00a884] px-4 py-2 text-sm font-semibold text-white"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] pb-24">
      <div className="px-4 pb-5 pt-8">
        <div className="mx-auto max-w-lg">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] font-medium text-[#111827] shadow-sm"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <div className="rounded-[30px] bg-gradient-to-br from-[#00a884] via-[#0ba97f] to-[#36c79c] p-5 text-white shadow-[0_18px_45px_rgba(0,0,0,0.10)]">
            <p className="inline-flex rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide">
              Job Opportunity
            </p>

            <h1 className="mt-4 text-[24px] font-bold leading-8">{job.title}</h1>

            <div className="mt-4 space-y-2 text-[13px] text-white/90">
              <div className="flex items-center gap-2">
                <Building2 size={15} />
                <span>{job.company}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={15} />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays size={15} />
                <span>Deadline: {job.deadline}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-lg space-y-4 px-4">
        <div className="rounded-[24px] bg-white p-5 shadow-sm">
          <h2 className="text-[17px] font-semibold text-[#111827]">
            Job Overview
          </h2>
          <p className="mt-3 text-[14px] leading-7 text-[#4b5563]">
            {job.description ||
              "We are looking for a passionate and qualified candidate to join our team. This role offers a great opportunity to grow professionally and contribute meaningfully."}
          </p>
        </div>

        <div className="rounded-[24px] bg-white p-5 shadow-sm">
          <h2 className="text-[17px] font-semibold text-[#111827]">
            Responsibilities
          </h2>
          <ul className="mt-3 space-y-2 text-[14px] text-[#4b5563]">
            <li>• Collaborate with team members and stakeholders</li>
            <li>• Deliver tasks within deadlines</li>
            <li>• Maintain professional communication</li>
            <li>• Contribute to continuous improvement</li>
          </ul>
        </div>

        <div className="rounded-[24px] bg-white p-5 shadow-sm">
          <h2 className="text-[17px] font-semibold text-[#111827]">
            Requirements
          </h2>
          <ul className="mt-3 space-y-2 text-[14px] text-[#4b5563]">
            <li>• Relevant skills and experience</li>
            <li>• Strong communication ability</li>
            <li>• Problem-solving mindset</li>
            <li>• Ability to work independently and in a team</li>
          </ul>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 border-t border-white/70 bg-white/90 p-4 backdrop-blur">
        <div className="mx-auto max-w-lg">
          <button
            onClick={() => navigate(`/jobs/apply/${job.id}`)}
            className="w-full rounded-[18px] bg-[#00a884] py-3 text-[14px] font-semibold text-white shadow-sm transition-all duration-300 hover:opacity-95"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;