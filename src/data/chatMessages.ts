export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  time: string;
  status: "sent" | "delivered" | "seen";
  replyTo?: string;
}

export const chatMessages: Record<string, ChatMessage[]> = {
  "1": [
    { id: "m1", senderId: "2", text: "Assalamu Alaikum, meeting time confirm হয়েছে?", time: "2:15 PM", status: "seen" },
    { id: "m2", senderId: "1", text: "Walaikum Assalam! হ্যাঁ, March 25 তারিখে সকাল ১০টায়।", time: "2:18 PM", status: "seen" },
    { id: "m3", senderId: "2", text: "Great! Agenda কি finalize হয়েছে?", time: "2:20 PM", status: "seen" },
    { id: "m4", senderId: "1", text: "হ্যাঁ, annual report, financial review আর election আছে। Notice দেওয়া হয়েছে।", time: "2:22 PM", status: "seen" },
    { id: "m5", senderId: "2", text: "বাহ, অনেক ধন্যবাদ! আমি সবাইকে জানিয়ে দিচ্ছি।", time: "2:25 PM", status: "seen" },
    { id: "m6", senderId: "2", text: "See you at the meeting!", time: "2:30 PM", status: "seen" },
  ],
  "2": [
    { id: "m1", senderId: "3", text: "Treasurer report ready আছে?", time: "12:45 PM", status: "seen" },
    { id: "m2", senderId: "1", text: "Almost done, আজকের মধ্যে পাঠাচ্ছি।", time: "1:00 PM", status: "seen" },
    { id: "m3", senderId: "3", text: "Thanks for the update.", time: "1:15 PM", status: "seen" },
  ],
  "4": [
    { id: "m1", senderId: "4", text: "Can you share the document?", time: "Yesterday", status: "seen" },
    { id: "m2", senderId: "1", text: "Sure, একটু পরেই share করছি।", time: "Yesterday", status: "delivered" },
  ],
};
