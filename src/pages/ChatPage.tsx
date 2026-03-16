import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Phone,
  Video,
  MoreVertical,
  Smile,
  Paperclip,
  Camera,
  Mic,
  Send,
  Check,
  CheckCheck,
  Image as ImageIcon,
  FileText,
  Headphones,
  X,
  Reply,
  Forward,
  Trash2,
  Play,
  ChevronDown,
  Search,
  BellOff,
  Users,
  Link2,
  Info,
  Star,
  Shield,
} from "lucide-react";
import { chats, members } from "@/data/mockData";
import { chatMessages, ChatMessage } from "@/data/chatMessages";

type ReactionType = "👍" | "❤️" | "😂" | "😮" | "😢" | "🙏";

type LocalMessage = ChatMessage & {
  type?: "text" | "voice" | "image" | "file";
  duration?: string;
  fileName?: string;
  replyTo?: {
    id?: string;
    text: string;
    sender: string;
  };
  dateLabel?: string;
  reactions?: ReactionType[];
  forwarded?: boolean;
};

const EMOJIS = ["😀", "😂", "😍", "😢", "🔥", "👍", "❤️", "🙏"];
const REACTIONS: ReactionType[] = ["👍", "❤️", "😂", "😮", "😢", "🙏"];

const ChatPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const chat = chats.find((c) => c.id === id);
  const member = members.find((m) => m.name === chat?.name);

  const initialMessages: LocalMessage[] = (chatMessages[id || "1"] || []).map(
    (msg, index) => ({
      ...msg,
      type: "text",
      dateLabel: index === 0 ? "Today" : undefined,
      reactions: [],
    })
  );

  const [messages, setMessages] = useState<LocalMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [showAttach, setShowAttach] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [replyMessage, setReplyMessage] = useState<LocalMessage | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<LocalMessage | null>(null);
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [forwardMode, setForwardMode] = useState(false);

  const [showTopMenu, setShowTopMenu] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showAttach, showEmoji]);

  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${Math.min(
      textareaRef.current.scrollHeight,
      120
    )}px`;
  }, [input]);

  const isOnline = member ? parseInt(member.id) % 2 === 0 : false;

  const initials =
    chat?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2) || "?";

  const resetPanels = () => {
    setShowAttach(false);
    setShowEmoji(false);
  };

  const closeAllMenus = () => {
    setShowTopMenu(false);
    setShowMoreOptions(false);
    setShowActionMenu(false);
    setSelectedMessage(null);
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const msg: LocalMessage = {
      id: `m${Date.now()}`,
      senderId: "1",
      text: input.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "sent",
      type: "text",
      reactions: [],
      forwarded: forwardMode,
      replyTo: replyMessage
        ? {
            id: replyMessage.id,
            text:
              replyMessage.type === "voice"
                ? "Voice message"
                : replyMessage.fileName || replyMessage.text,
            sender: replyMessage.senderId === "1" ? "You" : chat?.name || "User",
          }
        : undefined,
    };

    setMessages((prev) => [...prev, msg]);
    setInput("");
    setReplyMessage(null);
    setForwardMode(false);
    resetPanels();
  };

  const sendDemoVoiceMessage = () => {
    const msg: LocalMessage = {
      id: `m${Date.now()}`,
      senderId: "1",
      text: "",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "sent",
      type: "voice",
      duration: "0:12",
      reactions: [],
      forwarded: false,
    };

    setMessages((prev) => [...prev, msg]);
    resetPanels();
  };

  const sendDemoFile = () => {
    const msg: LocalMessage = {
      id: `m${Date.now()}`,
      senderId: "1",
      text: "",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "sent",
      type: "file",
      fileName: "Project-Brief.pdf",
      reactions: [],
    };

    setMessages((prev) => [...prev, msg]);
    setShowAttach(false);
  };

  const sendDemoImage = () => {
    const msg: LocalMessage = {
      id: `m${Date.now()}`,
      senderId: "1",
      text: "Nice photo!",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "sent",
      type: "image",
      reactions: [],
    };

    setMessages((prev) => [...prev, msg]);
    setShowAttach(false);
  };

  const addReaction = (messageId: string, reaction: ReactionType) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id !== messageId) return msg;
        const exists = msg.reactions?.includes(reaction);
        return {
          ...msg,
          reactions: exists
            ? (msg.reactions || []).filter((r) => r !== reaction)
            : [...(msg.reactions || []), reaction],
        };
      })
    );
    setShowActionMenu(false);
    setSelectedMessage(null);
  };

  const deleteMessage = (messageId: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
    setShowActionMenu(false);
    setSelectedMessage(null);
    if (replyMessage?.id === messageId) setReplyMessage(null);
  };

  const replyToMessage = (msg: LocalMessage) => {
    setReplyMessage(msg);
    setForwardMode(false);
    setShowActionMenu(false);
    setSelectedMessage(null);
  };

  const forwardMessage = (msg: LocalMessage) => {
    const textToForward =
      msg.type === "voice"
        ? "Forwarded voice message"
        : msg.fileName || msg.text || "Forwarded message";
    setInput(textToForward);
    setForwardMode(true);
    setReplyMessage(null);
    setShowActionMenu(false);
    setSelectedMessage(null);
  };

  const openMessageMenu = (msg: LocalMessage) => {
    setSelectedMessage(msg);
    setShowActionMenu(true);
    setShowTopMenu(false);
    setShowMoreOptions(false);
  };

  const StatusIcon = ({ status }: { status: string }) => {
    if (status === "seen") {
      return <CheckCheck size={14} className="text-sky-500" />;
    }
    if (status === "delivered") {
      return <CheckCheck size={14} className="text-white/70" />;
    }
    return <Check size={14} className="text-white/70" />;
  };

  const attachments = [
    { icon: ImageIcon, label: "Gallery", color: "bg-purple-500", action: sendDemoImage },
    { icon: Camera, label: "Camera", color: "bg-pink-500", action: sendDemoImage },
    { icon: FileText, label: "Document", color: "bg-blue-500", action: sendDemoFile },
    { icon: Headphones, label: "Audio", color: "bg-orange-500", action: sendDemoVoiceMessage },
  ];

  const topMenuItems = [
    {
      label: "New group",
      icon: Users,
      action: () => {
        setShowTopMenu(false);
        alert("New group clicked");
      },
    },
    {
      label: "View contact",
      icon: Info,
      action: () => {
        setShowTopMenu(false);
        alert("View contact clicked");
      },
    },
    {
      label: "Media, links & docs",
      icon: Link2,
      action: () => {
        setShowTopMenu(false);
        alert("Media, links & docs clicked");
      },
    },
    {
      label: "Mute notifications",
      icon: BellOff,
      action: () => {
        setIsMuted((prev) => !prev);
        setShowTopMenu(false);
      },
    },
    {
      label: "Search",
      icon: Search,
      action: () => {
        setShowTopMenu(false);
        alert("Search clicked");
      },
    },
    {
      label: "More",
      icon: ChevronDown,
      action: () => {
        setShowTopMenu(false);
        setShowMoreOptions(true);
      },
    },
  ];

  const moreMenuItems = [
    {
      label: "Clear chat",
      icon: Trash2,
      action: () => {
        setShowMoreOptions(false);
        alert("Clear chat clicked");
      },
    },
    {
      label: "Export chat",
      icon: FileText,
      action: () => {
        setShowMoreOptions(false);
        alert("Export chat clicked");
      },
    },
    {
      label: "Add to starred",
      icon: Star,
      action: () => {
        setShowMoreOptions(false);
        alert("Add to starred clicked");
      },
    },
    {
      label: "Block contact",
      icon: Shield,
      action: () => {
        setShowMoreOptions(false);
        alert("Block contact clicked");
      },
    },
  ];

  return (
    <div className="relative flex flex-col h-screen bg-[#efeae2] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(circle_at_1px_1px,_#000_1px,_transparent_0)] [background-size:18px_18px]" />

      <AnimatePresence>
        {(showTopMenu || showMoreOptions) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20"
            onClick={closeAllMenus}
          />
        )}
      </AnimatePresence>

      <div className="relative z-30 flex items-center gap-3 px-3 py-3 bg-[#075e54] text-white shadow-md">
        <button
          onClick={() => navigate("/inbox")}
          className="p-1 rounded-full hover:bg-white/10 transition"
        >
          <ArrowLeft size={22} />
        </button>

        <div className="relative w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-sm font-semibold shrink-0">
          {initials}
          {isOnline && (
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-[#075e54]" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold truncate">{chat?.name}</h4>
          <p className="text-[11px] text-white/80">
            {isOnline ? "online" : "last seen recently"}
            {isMuted ? " • muted" : ""}
          </p>
        </div>

        <div className="flex items-center gap-1">
          <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/10 transition">
            <Video size={20} />
          </button>
          <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/10 transition">
            <Phone size={20} />
          </button>
          <button
            onClick={() => {
              setShowTopMenu((prev) => !prev);
              setShowMoreOptions(false);
              setShowActionMenu(false);
            }}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/10 transition"
          >
            <MoreVertical size={20} />
          </button>
        </div>

        <AnimatePresence>
          {showTopMenu && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.16 }}
              className="absolute right-3 top-14 w-64 bg-white text-[#111b21] rounded-2xl shadow-2xl border border-black/5 overflow-hidden z-50"
            >
              <div className="py-2">
                {topMenuItems.map(({ label, icon: Icon, action }) => (
                  <button
                    key={label}
                    onClick={action}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-[#f5f6f6] transition"
                  >
                    <Icon size={18} className="text-[#54656f]" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-10 flex-1 overflow-y-auto px-3 py-4 space-y-2">
        {messages.map((msg) => {
          const isMine = msg.senderId === "1";

          return (
            <div key={msg.id}>
              {msg.dateLabel && (
                <div className="flex justify-center my-3">
                  <span className="px-3 py-1 rounded-full bg-[#e1f2fb] text-[#54656f] text-[11px] shadow-sm">
                    {msg.dateLabel}
                  </span>
                </div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.18 }}
                className={`flex ${isMine ? "justify-end" : "justify-start"}`}
              >
                <div className="relative max-w-[82%] sm:max-w-[70%]">
                  <div
                    className={`absolute top-0 w-3 h-3 ${
                      isMine
                        ? "right-[-4px] bg-[#d9fdd3] [clip-path:polygon(0_0,100%_0,0_100%)]"
                        : "left-[-4px] bg-white [clip-path:polygon(100%_0,100%_100%,0_0)]"
                    }`}
                  />

                  <div
                    className={`relative px-3 py-2 rounded-lg shadow-sm ${
                      isMine
                        ? "bg-[#d9fdd3] text-[#111b21] rounded-tr-sm"
                        : "bg-white text-[#111b21] rounded-tl-sm"
                    } ${
                      selectedMessage?.id === msg.id ? "ring-2 ring-[#00a884]/40" : ""
                    }`}
                    onDoubleClick={() => replyToMessage(msg)}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      openMessageMenu(msg);
                    }}
                  >
                    <button
                      onClick={() => openMessageMenu(msg)}
                      className="absolute top-1 right-1 text-[#667781] hover:bg-black/5 rounded-full p-1"
                    >
                      <ChevronDown size={14} />
                    </button>

                    {msg.forwarded && (
                      <div className="mb-1 text-[11px] text-[#667781] font-medium">
                        Forwarded
                      </div>
                    )}

                    {msg.replyTo && (
                      <div
                        className={`mb-2 rounded-md px-2 py-1.5 border-l-4 ${
                          isMine
                            ? "bg-black/5 border-[#00a884]"
                            : "bg-[#f5f6f6] border-[#53bdeb]"
                        }`}
                      >
                        <p className="text-[11px] font-semibold text-[#00a884]">
                          {msg.replyTo.sender}
                        </p>
                        <p className="text-[12px] text-[#667781] truncate">
                          {msg.replyTo.text}
                        </p>
                      </div>
                    )}

                    {msg.type === "voice" ? (
                      <div className="flex items-center gap-3 min-w-[180px] pr-10">
                        <button className="w-8 h-8 rounded-full bg-[#00a884] text-white flex items-center justify-center">
                          <Play size={15} />
                        </button>
                        <div className="flex-1">
                          <div className="h-1.5 rounded-full bg-black/10 overflow-hidden">
                            <div className="w-1/3 h-full bg-[#00a884]" />
                          </div>
                          <div className="flex justify-between mt-1 text-[10px] text-[#667781]">
                            <span>Voice message</span>
                            <span>{msg.duration}</span>
                          </div>
                        </div>
                      </div>
                    ) : msg.type === "file" ? (
                      <div className="flex items-center gap-3 pr-10 min-w-[220px]">
                        <div className="w-10 h-10 rounded-lg bg-blue-500 text-white flex items-center justify-center">
                          <FileText size={18} />
                        </div>
                        <div>
                          <p className="text-[13px] font-medium">
                            {msg.fileName || "Document.pdf"}
                          </p>
                          <p className="text-[11px] text-[#667781]">
                            Tap to open
                          </p>
                        </div>
                      </div>
                    ) : msg.type === "image" ? (
                      <div className="pr-10">
                        <div className="w-[220px] h-[150px] rounded-xl bg-gradient-to-br from-[#cfe9ff] to-[#f7d7ff] mb-2 flex items-center justify-center text-[#54656f]">
                          Image preview
                        </div>
                        {msg.text && (
                          <p className="text-[14px] leading-[1.45] whitespace-pre-wrap break-words">
                            {msg.text}
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-[14px] leading-[1.45] whitespace-pre-wrap break-words pr-12">
                        {msg.text}
                      </p>
                    )}

                    {!!msg.reactions?.length && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {msg.reactions.map((reaction, i) => (
                          <span
                            key={`${reaction}-${i}`}
                            className="px-2 py-0.5 rounded-full bg-white/70 text-[12px] shadow-sm"
                          >
                            {reaction}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="absolute bottom-1 right-2 flex items-center gap-1">
                      <span className="text-[10px] text-[#667781]">{msg.time}</span>
                      {isMine && <StatusIcon status={msg.status} />}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}

        <div ref={bottomRef} />
      </div>

      <AnimatePresence>
        {showActionMenu && selectedMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 bg-black/20 flex items-end"
            onClick={() => {
              setShowActionMenu(false);
              setSelectedMessage(null);
            }}
          >
            <motion.div
              initial={{ y: 60 }}
              animate={{ y: 0 }}
              exit={{ y: 60 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-white rounded-t-3xl p-4 shadow-2xl"
            >
              <div className="flex justify-center gap-2 mb-4">
                {REACTIONS.map((reaction) => (
                  <button
                    key={reaction}
                    onClick={() => addReaction(selectedMessage.id, reaction)}
                    className="w-11 h-11 rounded-full bg-[#f5f6f6] text-xl hover:scale-105 transition"
                  >
                    {reaction}
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => replyToMessage(selectedMessage)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-[#f5f6f6]"
                >
                  <Reply size={18} />
                  <span className="text-sm">Reply</span>
                </button>

                <button
                  onClick={() => forwardMessage(selectedMessage)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-[#f5f6f6]"
                >
                  <Forward size={18} />
                  <span className="text-sm">Forward</span>
                </button>

                <button
                  onClick={() => deleteMessage(selectedMessage.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-red-50 text-red-600"
                >
                  <Trash2 size={18} />
                  <span className="text-sm">Delete message</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showMoreOptions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/20 flex items-end"
            onClick={() => setShowMoreOptions(false)}
          >
            <motion.div
              initial={{ y: 60 }}
              animate={{ y: 0 }}
              exit={{ y: 60 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-white rounded-t-3xl p-4 shadow-2xl"
            >
              <div className="w-12 h-1.5 rounded-full bg-black/10 mx-auto mb-4" />

              <h3 className="text-sm font-semibold text-[#111b21] mb-3 px-1">
                More options
              </h3>

              <div className="space-y-2">
                {moreMenuItems.map(({ label, icon: Icon, action }) => (
                  <button
                    key={label}
                    onClick={action}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-[#f5f6f6] transition"
                  >
                    <Icon size={18} className="text-[#54656f]" />
                    <span className="text-sm text-[#111b21]">{label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAttach && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative z-20 px-4 pb-3"
          >
            <div className="rounded-2xl bg-white shadow-xl border border-black/5 p-4">
              <div className="grid grid-cols-4 gap-4">
                {attachments.map(({ icon: Icon, label, color, action }) => (
                  <button
                    key={label}
                    onClick={action}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div
                      className={`w-14 h-14 rounded-full ${color} flex items-center justify-center shadow-md group-hover:scale-105 transition`}
                    >
                      <Icon size={24} className="text-white" />
                    </div>
                    <span className="text-[12px] text-[#667781]">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showEmoji && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="relative z-20 px-3 pb-2"
          >
            <div className="bg-white rounded-2xl shadow-lg p-3 flex flex-wrap gap-2">
              {EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => setInput((prev) => prev + emoji)}
                  className="w-10 h-10 rounded-full hover:bg-[#f5f6f6] text-xl"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 px-2 pb-2 pt-1">
        {replyMessage && (
          <div className="mb-1 mx-1 rounded-2xl bg-white shadow-sm px-3 py-2 flex items-start justify-between gap-3">
            <div className="border-l-4 border-[#00a884] pl-2 min-w-0">
              <p className="text-[11px] font-semibold text-[#00a884]">
                {replyMessage.senderId === "1" ? "You" : chat?.name}
              </p>
              <p className="text-[12px] text-[#667781] truncate">
                {replyMessage.type === "voice"
                  ? "Voice message"
                  : replyMessage.fileName || replyMessage.text}
              </p>
            </div>
            <button
              onClick={() => setReplyMessage(null)}
              className="text-[#667781] shrink-0"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {forwardMode && (
          <div className="mb-1 mx-1 rounded-2xl bg-[#e7fce3] shadow-sm px-3 py-2 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-[#008069]">Forward mode</p>
              <p className="text-[12px] text-[#667781] truncate">
                This message will be sent as forwarded
              </p>
            </div>
            <button
              onClick={() => setForwardMode(false)}
              className="text-[#667781] shrink-0"
            >
              <X size={18} />
            </button>
          </div>
        )}

        <div className="flex items-end gap-2">
          <div className="flex-1 flex items-end gap-2 bg-white rounded-full px-3 py-2 shadow-sm">
            <button
              onClick={() => {
                setShowEmoji((prev) => !prev);
                setShowAttach(false);
              }}
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#54656f] hover:bg-black/5 transition"
            >
              <Smile size={21} />
            </button>

            <button
              onClick={() => {
                setShowAttach((prev) => !prev);
                setShowEmoji(false);
              }}
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#54656f] hover:bg-black/5 transition"
            >
              <Paperclip size={20} />
            </button>

            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Type a message"
              rows={1}
              className="flex-1 max-h-[120px] bg-transparent resize-none outline-none text-[14px] leading-5 placeholder:text-[#667781] py-2"
            />

            <button
              onClick={sendDemoImage}
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#54656f] hover:bg-black/5 transition"
            >
              <Camera size={20} />
            </button>
          </div>

          {input.trim() ? (
            <button
              onClick={sendMessage}
              className="w-12 h-12 rounded-full bg-[#00a884] flex items-center justify-center text-white shadow-md hover:scale-[1.03] transition"
            >
              <Send size={18} />
            </button>
          ) : (
            <button
              onClick={sendDemoVoiceMessage}
              className="w-12 h-12 rounded-full bg-[#00a884] flex items-center justify-center text-white shadow-md hover:scale-[1.03] transition"
            >
              <Mic size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;