import { useParams, useNavigate } from "react-router-dom";
import { events } from "@/data/mockData";
import {
  ChevronLeft,
  Share2,
  Calendar,
  Clock3,
  MapPin,
  Users,
} from "lucide-react";

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="min-h-screen bg-[#f6f7fb] px-4 pt-16">
        <div className="max-w-lg mx-auto rounded-[28px] bg-white p-8 shadow-sm border border-black/5 text-center">
          <div className="text-4xl mb-3">📅</div>
          <h2 className="text-[20px] font-bold text-[#111827]">
            Event not found
          </h2>
          <p className="text-[14px] text-[#6b7280] mt-2">
            The event you are looking for does not exist or may have been removed.
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
              Event
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
          <div className="h-48 bg-gradient-to-br from-[#ecfeff] via-[#eff6ff] to-[#f5f3ff] flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm mx-auto flex items-center justify-center">
                <Calendar size={28} className="text-[#00a884]" />
              </div>
              <p className="text-[13px] font-medium text-[#4b5563] mt-3">
                Community Event
              </p>
            </div>
          </div>

          <div className="p-5">
            <h2 className="text-[26px] font-bold leading-tight text-[#111827]">
              {event.title}
            </h2>
          </div>
        </div>

        {/* Meta */}
        <div className="rounded-[28px] bg-white p-5 border border-black/5 shadow-sm">
          <h3 className="text-[16px] font-semibold text-[#111827] mb-4">
            Event Details
          </h3>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#f8fafc] flex items-center justify-center shrink-0">
                <Calendar size={18} className="text-[#00a884]" />
              </div>
              <div>
                <p className="text-[12px] text-[#6b7280]">Date</p>
                <p className="text-[15px] font-semibold text-[#111827]">
                  {event.date}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#f8fafc] flex items-center justify-center shrink-0">
                <Clock3 size={18} className="text-[#00a884]" />
              </div>
              <div>
                <p className="text-[12px] text-[#6b7280]">Time</p>
                <p className="text-[15px] font-semibold text-[#111827]">
                  {event.time}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#f8fafc] flex items-center justify-center shrink-0">
                <MapPin size={18} className="text-[#00a884]" />
              </div>
              <div>
                <p className="text-[12px] text-[#6b7280]">Venue</p>
                <p className="text-[15px] font-semibold text-[#111827]">
                  {event.venue}
                </p>
              </div>
            </div>

            {event.organizer && (
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#f8fafc] flex items-center justify-center shrink-0">
                  <Users size={18} className="text-[#00a884]" />
                </div>
                <div>
                  <p className="text-[12px] text-[#6b7280]">Organizer</p>
                  <p className="text-[15px] font-semibold text-[#111827]">
                    {event.organizer}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="rounded-[28px] bg-white p-5 border border-black/5 shadow-sm">
          <h3 className="text-[16px] font-semibold text-[#111827] mb-4">
            About this event
          </h3>
          <div className="text-[15px] leading-8 text-[#374151] whitespace-pre-line">
            {event.description || "Event details will be shared soon."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;