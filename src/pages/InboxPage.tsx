import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  Edit,
  Phone,
  Video,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  MoreVertical,
  MessageCircleMore,
} from "lucide-react";
import { chats, calls, members } from "@/data/mockData";

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: [0.2, 0, 0, 1] as const },
  },
};

const InboxPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const tabs = ["Chats", "Calls"];

  const filteredChats = useMemo(() => {
    return chats.filter((chat) =>
      `${chat.name} ${chat.lastMessage}`.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const filteredCalls = useMemo(() => {
    return calls.filter((call) =>
      `${call.name} ${call.time}`.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-[#efeae2] pb-24">
      <div className="sticky top-0 z-20 bg-[#075e54] text-white shadow-md">
        <div className="px-4 pt-4 pb-4">
          <div className="flex items-center justify-between">
            <h1 className="text-[22px] font-bold">Inbox</h1>

            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/10 transition">
                <Edit size={18} />
              </button>
              <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/10 transition">
                <MoreVertical size={18} />
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 bg-white/12 rounded-full px-4 py-3 backdrop-blur-sm">
            <Search size={18} className="text-white/80" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={activeTab === 0 ? "Search chats..." : "Search calls..."}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-white/70"
            />
          </div>

          <div className="mt-4 flex gap-1 bg-white/10 rounded-full p-1">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === i
                    ? "bg-white text-[#075e54] shadow-sm"
                    : "text-white/80"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        className="px-4 pt-2"
        initial="hidden"
        animate="show"
        key={activeTab + search}
        variants={{ show: { transition: { staggerChildren: 0.04 } } }}
      >
        {activeTab === 0 && (
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
            {filteredChats.length === 0 ? (
              <div className="px-4 py-10 text-center text-sm text-[#667781]">
                No chats found
              </div>
            ) : (
              filteredChats.map((chat, index) => {
                const initials = chat.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2);

                const member = members.find((m) => m.name === chat.name);
                const isOnline = member ? parseInt(member.id) % 2 === 0 : false;

                return (
                  <motion.div
                    key={chat.id}
                    variants={fadeUp}
                    onClick={() => navigate(`/inbox/chat/${chat.id}`)}
                    className={`flex items-center gap-3 px-3 py-3 cursor-pointer active:bg-[#f5f6f6] transition-colors ${
                      index !== filteredChats.length - 1 ? "border-b border-[#eef1f3]" : ""
                    }`}
                  >
                    <div className="relative w-12 h-12 rounded-full bg-[#e7fce3] flex items-center justify-center text-[#008069] font-semibold text-sm shrink-0">
                      {initials}
                      {isOnline && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-[15px] font-semibold text-[#111b21] truncate">
                          {chat.name}
                        </h4>
                        <span
                          className={`text-[11px] shrink-0 ${
                            chat.unread > 0 ? "text-[#00a884] font-medium" : "text-[#667781]"
                          }`}
                        >
                          {chat.time}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-2 mt-0.5">
                        <p className="text-[13px] text-[#667781] truncate">
                          {chat.lastMessage}
                        </p>

                        {chat.unread > 0 && (
                          <span className="ml-2 shrink-0 min-w-[20px] h-5 px-1.5 rounded-full bg-[#00a884] text-white text-[10px] font-bold flex items-center justify-center">
                            {chat.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        )}

        {activeTab === 1 && (
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
            {filteredCalls.length === 0 ? (
              <div className="px-4 py-10 text-center text-sm text-[#667781]">
                No calls found
              </div>
            ) : (
              filteredCalls.map((call, index) => (
                <motion.div
                  key={call.id}
                  variants={fadeUp}
                  className={`flex items-center gap-3 px-3 py-3 ${
                    index !== filteredCalls.length - 1 ? "border-b border-[#eef1f3]" : ""
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-[#e7fce3] flex items-center justify-center text-[#008069] font-semibold text-sm shrink-0">
                    {call.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4
                      className={`text-[15px] font-semibold ${
                        call.missed ? "text-red-500" : "text-[#111b21]"
                      }`}
                    >
                      {call.name}
                    </h4>

                    <div className="flex items-center gap-1 mt-0.5">
                      {call.direction === "incoming" ? (
                        call.missed ? (
                          <PhoneMissed size={13} className="text-red-500" />
                        ) : (
                          <PhoneIncoming size={13} className="text-[#00a884]" />
                        )
                      ) : (
                        <PhoneOutgoing size={13} className="text-[#00a884]" />
                      )}

                      <span className="text-[13px] text-[#667781]">{call.time}</span>
                    </div>
                  </div>

                  <button className="w-10 h-10 rounded-full bg-[#f5f6f6] flex items-center justify-center text-[#008069]">
                    {call.type === "video" ? <Video size={18} /> : <Phone size={18} />}
                  </button>
                </motion.div>
              ))
            )}
          </div>
        )}
      </motion.div>

      <button className="fixed bottom-24 right-4 z-30 w-14 h-14 rounded-full bg-[#00a884] text-white shadow-lg flex items-center justify-center hover:scale-[1.03] transition">
        <MessageCircleMore size={22} />
      </button>
    </div>
  );
};

export default InboxPage;