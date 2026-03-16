import { ArrowLeft, Upload, Send } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { jobAlerts } from "@/data/mockData";

const inputClass =
  "w-full rounded-[16px] border border-[#e5e7eb] bg-white px-4 py-3 text-[14px] text-[#111827] outline-none transition focus:border-[#00a884]";
const labelClass = "mb-2 block text-[13px] font-medium text-[#374151]";

const JobApplyPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const job = jobAlerts.find((item) => String(item.id) === String(id));

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    experience: "",
    coverLetter: "",
  });

  if (!job) {
    return (
      <div className="min-h-screen bg-[#f5f7fb] p-4">
        <div className="mx-auto max-w-lg rounded-[24px] bg-white p-6 shadow-sm">
          <p className="text-[16px] font-semibold text-[#111827]">
            Job not found
          </p>
        </div>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Application Submitted:", form, "Job:", job);

    alert("Application submitted successfully!");
    navigate("/jobs");
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] pb-10">
      <div className="px-4 pb-5 pt-8">
        <div className="mx-auto max-w-lg">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] font-medium text-[#111827] shadow-sm"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <div className="rounded-[28px] bg-white p-5 shadow-sm">
            <p className="text-[12px] font-medium text-[#00a884]">
              Applying for
            </p>
            <h1 className="mt-1 text-[22px] font-bold text-[#111827]">
              {job.title}
            </h1>
            <p className="mt-1 text-[13px] text-[#6b7280]">
              {job.company} • {job.location}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-lg px-4">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-[28px] bg-white p-5 shadow-sm"
        >
          <div>
            <label className={labelClass}>Full Name</label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className={inputClass}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label className={labelClass}>Email Address</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className={inputClass}
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className={labelClass}>Phone Number</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className={inputClass}
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div>
            <label className={labelClass}>Experience</label>
            <input
              name="experience"
              value={form.experience}
              onChange={handleChange}
              className={inputClass}
              placeholder="e.g. 2 years in frontend development"
            />
          </div>

          <div>
            <label className={labelClass}>Cover Letter</label>
            <textarea
              name="coverLetter"
              value={form.coverLetter}
              onChange={handleChange}
              rows={5}
              className={inputClass}
              placeholder="Write a short cover letter"
            />
          </div>

          <div>
            <label className={labelClass}>Resume / CV</label>
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-[16px] border border-dashed border-[#d1d5db] bg-[#f9fafb] px-4 py-4 text-[13px] font-medium text-[#6b7280] transition hover:border-[#00a884] hover:text-[#00a884]">
              <Upload size={16} />
              Upload Resume
              <input type="file" className="hidden" />
            </label>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-[18px] bg-[#00a884] py-3 text-[14px] font-semibold text-white shadow-sm transition-all duration-300 hover:opacity-95"
          >
            <Send size={16} />
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobApplyPage;