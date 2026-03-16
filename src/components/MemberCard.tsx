import { useNavigate } from "react-router-dom";
import { MapPin, ChevronRight, Briefcase } from "lucide-react";

type MemberCardProps = {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar?: string;
};

const MemberCard = ({ id, name, role, location, avatar }: MemberCardProps) => {
  const navigate = useNavigate();

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <button
      onClick={() => navigate(`/members/${id}`)}
      className="w-full text-left px-4 py-4 flex items-center gap-3 active:bg-[#f9fafb] transition"
    >
      {avatar ? (
        <img
          src={avatar}
          alt={name}
          className="w-14 h-14 rounded-2xl object-cover shrink-0 border border-black/5"
        />
      ) : (
        <div className="w-14 h-14 rounded-2xl bg-[#00a884]/10 text-[#008069] flex items-center justify-center font-semibold text-[15px] shrink-0">
          {initials}
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-[15px] font-semibold text-[#111827] truncate">
              {name}
            </h3>

            <div className="flex items-center gap-1 mt-1 text-[12px] text-[#6b7280]">
              <Briefcase size={13} className="shrink-0" />
              <span className="truncate">{role}</span>
            </div>

            <div className="flex items-center gap-1 mt-1 text-[12px] text-[#6b7280]">
              <MapPin size={13} className="shrink-0" />
              <span className="truncate">{location}</span>
            </div>
          </div>

          <div className="w-9 h-9 rounded-full bg-[#f3f4f6] flex items-center justify-center shrink-0 text-[#6b7280]">
            <ChevronRight size={16} />
          </div>
        </div>
      </div>
    </button>
  );
};

export default MemberCard;