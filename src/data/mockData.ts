// Mock data for the community app

// Mock data for the community app

export type Member = {
  id: string;
  name: string;
  role: string;
  location?: string;
  batch?: string;
  profession?: string;
  phone?: string;
  bloodGroup?: string;
  avatar?: string;

  isVerified?: boolean;
  isOnline?: boolean;
  mutualConnections?: number;
  activityCount?: number;
  donations?: number;
};

export const currentUser = {
  id: "1",
  name: "Kamrul Hasan",
  avatar: "",
  email: "kamrul@example.com",
  phone: "+8801712345678",
  batch: "2012",
  profession: "Software Engineer",
  location: "Dhaka, Bangladesh",
  bio: "Community organizer and tech enthusiast.",
  bloodGroup: "B+",
};

export const members: Member[] = [
  {
    id: "1",
    name: "Kamrul Hasan",
    role: "President",
    location: "Dhaka",
    batch: "2012",
    profession: "Software Engineer",
    phone: "+8801712345678",
    bloodGroup: "B+",
    avatar: "",
    isVerified: true,
    isOnline: true,
    mutualConnections: 18,
    activityCount: 42,
    donations: 12,
  },
  {
    id: "2",
    name: "Rafiq Ahmed",
    role: "Secretary",
    location: "Chittagong",
    batch: "2013",
    profession: "Doctor",
    phone: "+8801812345678",
    bloodGroup: "A+",
    avatar: "",
    isVerified: true,
    isOnline: false,
    mutualConnections: 11,
    activityCount: 27,
    donations: 5,
  },
  {
    id: "3",
    name: "Nusrat Jahan",
    role: "Treasurer",
    location: "Sylhet",
    batch: "2012",
    profession: "Banker",
    phone: "+8801912345678",
    bloodGroup: "O+",
    avatar: "",
    isVerified: true,
    isOnline: true,
    mutualConnections: 14,
    activityCount: 33,
    donations: 9,
  },
  {
    id: "4",
    name: "Abdul Karim",
    role: "Member",
    location: "Rajshahi",
    batch: "2014",
    profession: "Teacher",
    phone: "+8801612345678",
    bloodGroup: "AB+",
    avatar: "",
    isVerified: false,
    isOnline: false,
    mutualConnections: 6,
    activityCount: 12,
    donations: 2,
  },
  {
    id: "5",
    name: "Fatima Begum",
    role: "Vice President",
    location: "Khulna",
    batch: "2011",
    profession: "Lawyer",
    phone: "+8801512345678",
    bloodGroup: "A-",
    avatar: "",
    isVerified: true,
    isOnline: true,
    mutualConnections: 21,
    activityCount: 39,
    donations: 15,
  },
  {
    id: "6",
    name: "Mizanur Rahman",
    role: "Member",
    location: "Dhaka",
    batch: "2015",
    profession: "Engineer",
    phone: "+8801412345678",
    bloodGroup: "B+",
    avatar: "",
    isVerified: false,
    isOnline: true,
    mutualConnections: 9,
    activityCount: 16,
    donations: 3,
  },
  {
    id: "7",
    name: "Tasnim Akter",
    role: "Member",
    location: "Comilla",
    batch: "2013",
    profession: "Journalist",
    phone: "+8801312345678",
    bloodGroup: "O-",
    avatar: "",
    isVerified: false,
    isOnline: false,
    mutualConnections: 7,
    activityCount: 14,
    donations: 4,
  },
  {
    id: "8",
    name: "Shahidul Islam",
    role: "Advisor",
    location: "Barisal",
    batch: "2010",
    profession: "Business Owner",
    phone: "+8801212345678",
    bloodGroup: "AB-",
    avatar: "",
    isVerified: true,
    isOnline: false,
    mutualConnections: 25,
    activityCount: 51,
    donations: 20,
  },
];

export const notices = [
  { id: "1", title: "Annual General Meeting 2026", description: "All members are requested to attend the AGM scheduled for March 25, 2026 at the community hall.", date: "2026-03-10", priority: "high", pinned: true, body: "Dear Members,\n\nWe are pleased to announce the Annual General Meeting for the year 2026. The meeting will be held at the Community Hall on March 25, 2026, starting at 10:00 AM.\n\nAgenda:\n1. Annual Report Presentation\n2. Financial Statement Review\n3. Election of New Committee\n4. Open Discussion\n\nYour presence is highly valued. Please confirm your attendance by March 20.\n\nRegards,\nCommunity Committee" },
  { id: "2", title: "Membership Fee Reminder", description: "Annual membership fees for 2026 are now due. Please pay before March 31.", date: "2026-03-08", priority: "medium", pinned: false, body: "Please pay your annual membership fee of ৳5,000 before March 31, 2026." },
  { id: "3", title: "Community Iftar Program", description: "Join us for the community Iftar on March 15 at the main hall.", date: "2026-03-05", priority: "normal", pinned: false, body: "We are organizing a community Iftar gathering. All members and their families are welcome." },
];

export const news = [
  { id: "1", title: "Community Wins Best Organization Award", excerpt: "Our community has been recognized as the best community organization in the district.", date: "2026-03-12", image: "", author: "Admin", description:"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32." },
  { id: "2", title: "New Scholarship Program Announced", excerpt: "A new scholarship fund has been established for deserving students from our community.", date: "2026-03-09", image: "", author: "Committee", description:"The new scholarship program aims to support talented students from our community who demonstrate academic excellence and financial need. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32." },
  { id: "3", title: "Blood Donation Camp Success", excerpt: "Over 150 units of blood collected at the annual blood donation camp.", date: "2026-03-06", image: "", author: "Health Committee", description:"The annual blood donation camp was a great success, with over 150 units of blood collected and distributed to those in need. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32." },
];

export const events = [
  { id: "1", title: "Annual Reunion 2026", date: "2026-04-15", time: "10:00 AM", venue: "Grand Ballroom, Dhaka", image: "", organizer: "Reunion Committee", description: "Annual reunion gathering for all batches." },
  { id: "2", title: "Cricket Tournament", date: "2026-04-01", time: "8:00 AM", venue: "Community Ground", image: "", organizer: "Sports Committee", description: "Inter-batch cricket tournament." },
  { id: "3", title: "Career Workshop", date: "2026-03-28", time: "3:00 PM", venue: "Conference Room", image: "", organizer: "Career Cell", description: "Workshop on career development and networking." },
];

export const campaigns = [
  { id: "1", title: "Flood Relief Fund 2026", story: "Devastating floods have affected thousands of families in the northern region. Your contribution can help provide food, shelter, and medical aid.", image: "", raised: 350000, goal: 500000, daysLeft: 12, donorCount: 89, organizer: "Relief Committee" },
  { id: "2", title: "School Building Project", story: "Help us build a new school for underprivileged children in the rural areas of Rangpur.", image: "", raised: 1200000, goal: 2000000, daysLeft: 45, donorCount: 234, organizer: "Education Committee" },
  { id: "3", title: "Medical Aid for Members", story: "Supporting community members who need urgent medical treatment and cannot afford it.", image: "", raised: 85000, goal: 100000, daysLeft: 5, donorCount: 42, organizer: "Health Committee" },
];

export const obituaries = [
  { id: "1", name: "Abul Kalam Azad", dateOfPassing: "2026-03-01", photo: "", prayer: "ইন্না লিল্লাহি ওয়া ইন্না ইলাইহি রাজিউন", biography: "A beloved member of our community who served for over 30 years.", description: "A devoted member of our community who served for over 30 years. May Allah grant them peace, forgiveness, and Abul Kalam Azad. Please remember them in your prayers." },
  { id: "2", name: "Rokeya Sultana", dateOfPassing: "2026-02-20", photo: "", prayer: "ইন্না লিল্লাহি ওয়া ইন্না ইলাইহি রাজিউন", biography: "A devoted teacher and community leader who touched many lives.", description: "A devoted member of our community who served for over 30 years. May Allah grant them peace, forgiveness, and Rokeya Sultana. Please remember them in your prayers." },
];

export const chats = [
  { id: "1", name: "Rafiq Ahmed", lastMessage: "See you at the meeting!", time: "2:30 PM", unread: 2, avatar: "" },
  { id: "2", name: "Nusrat Jahan", lastMessage: "Thanks for the update.", time: "1:15 PM", unread: 0, avatar: "" },
  { id: "3", name: "Community Group", lastMessage: "Karim: Don't forget the event tomorrow", time: "12:00 PM", unread: 5, avatar: "", isGroup: true },
  { id: "4", name: "Abdul Karim", lastMessage: "Can you share the document?", time: "Yesterday", unread: 0, avatar: "" },
  { id: "5", name: "Executive Committee", lastMessage: "Meeting minutes attached", time: "Yesterday", unread: 1, avatar: "", isGroup: true },
];

export const calls = [
  { id: "1", name: "Rafiq Ahmed", type: "audio" as const, direction: "incoming" as const, time: "Today, 3:00 PM", missed: false },
  { id: "2", name: "Nusrat Jahan", type: "video" as const, direction: "outgoing" as const, time: "Today, 1:00 PM", missed: false },
  { id: "3", name: "Abdul Karim", type: "audio" as const, direction: "incoming" as const, time: "Yesterday, 5:30 PM", missed: true },
];

export const myDonations = [
  { id: "1", campaign: "Flood Relief Fund 2026", amount: 5000, status: "completed", date: "2026-03-08", txId: "TXN001234" },
  { id: "2", campaign: "School Building Project", amount: 10000, status: "completed", date: "2026-02-15", txId: "TXN001235" },
  { id: "3", campaign: "Medical Aid for Members", amount: 2000, status: "pending", date: "2026-03-12", txId: "TXN001236" },
];

export const jobAlerts = [
  {
    id: "1",
    title: "Marketing Executive",
    company: "ABC Group",
    location: "Dhaka",
    deadline: "2025-09-15",
    type: "Full Time",
    isNew: true,
    circular: "We are looking for a dynamic marketing executive...",
    requirements: ["Bachelor degree", "Good communication", "1+ years experience"],
    description: "We are looking for a dynamic marketing executive to join our team. The ideal candidate will have a passion for marketing, strong communication skills, and the ability to work in a fast-paced environment.",
    applyLink: "#",
  },
  {
    id: "2",
    title: "Accounts Officer",
    company: "XYZ Holdings",
    location: "Chittagong",
    deadline: "2025-09-20",
    type: "Full Time",
    isNew: false,
    circular: "Accounts officer needed for finance operations...",
    requirements: ["BBA/MBA", "Excel skills", "2+ years experience"],
    description: "We are looking for a skilled accounts officer to manage our financial operations. The ideal candidate will have a strong background in accounting principles and experience with financial software.",
    applyLink: "#",
  },
  {
    id: "3",
    title: "Frontend Developer",
    company: "Tech Corp",
    location: "Dhaka, Bangladesh",
    deadline: "2026-03-20",
    type: "Full Time",
    isNew: true,
    circular: "We are seeking a skilled frontend developer with React experience to join our team. The ideal candidate will have a strong understanding of web development principles and a passion for creating user-friendly interfaces.",
    requirements: ["Proficiency in React", "3+ years experience", "Good communication"],
    applyLink: "#",
    description:
      "We are looking for a skilled frontend developer with React experience.",
  },
  {
    id: "4",
    title: "UI/UX Designer",
    company: "Creative Studio",
    location: "Remote",
    deadline: "2026-03-18",
    type: "Contract",
    isNew: false,
    circular: "Creative Studio is seeking a talented UI/UX designer to work on exciting projects. The ideal candidate will have a strong portfolio showcasing their design skills and experience with user-centered design principles.",
    requirements: ["Strong portfolio", "Experience with design tools", "Good communication"],
    applyLink: "#",
    description:
      "Join our design team to craft modern and engaging user experiences.",
  },
];

export const promotionPlans = [
  {
    id: "basic",
    name: "Basic Plan",
    price: 200,
    duration: "month",
    features: [
      "1 business listing",
      "Basic visibility",
      "Standard support",
    ],
    badge: "Starter",
  },
  {
    id: "premium",
    name: "Premium Plan",
    price: 500,
    duration: "month",
    features: [
      "3 business listings",
      "Priority visibility",
      "Promotion badge",
    ],
    badge: "Popular",
  },
  {
    id: "featured",
    name: "Featured Plan",
    price: 1000,
    duration: "month",
    features: [
      "Unlimited listings",
      "Top featured placement",
      "Priority support",
    ],
    badge: "Best Value",
  },
];

export const myAds = [
  {
    id: "1",
    title: "Hasan Electronics",
    category: "Electronics",
    status: "Active",
    plan: "premium",
    createdAt: "2025-08-01",
    expiresAt: "2025-09-01",
  },
  {
    id: "2",
    title: "Rafiq Properties",
    category: "Real Estate",
    status: "Pending",
    plan: "basic",
    createdAt: "2025-08-10",
    expiresAt: "2025-09-10",
  },
];

export const myPromotionPlan = {
  active: true,
  planId: "premium",
  name: "Premium Plan",
  price: 500,
  startedAt: "2025-08-01",
  expiresAt: "2025-09-01",
  status: "Active",
};

export const committees = [
  {
    id: "1",
    name: "Central Committee",
    term: "2025-2027",
    members: [
      { name: "Kamrul Hasan", role: "President" },
      { name: "Rafiq Ahmed", role: "Vice President" },
      { name: "Nusrat Jahan", role: "Secretary" },
      { name: "Mizanur Rahman", role: "Treasurer" },
      { name: "Fatima Begum", role: "Treasurer" },
      { name: "Abdul Karim", role: "Member" },
      { name: "Tasnim Akter", role: "Member" },
      { name: "Shahidul Islam", role: "Advisor" },
      { name: "Rokeya Sultana", role: "Member" },
      { name: "Karim Uddin", role: "Member" },
      { name: "Laila Sultana", role: "Member" },
      { name: "Jamal Hossain", role: "Member" },
      { name: "Sadia Parvin", role: "Member" },
      { name: "Fahim Ahmed", role: "Member" },
    ],
  },
  {
    id: "2",
    name: "Event Management Committee",
    term: "2025-2026",
    members: [
      { name: "Fatima Begum", role: "Chair" },
      { name: "Mizanur Rahman", role: "Coordinator" },
      { name: "Tasnim Akter", role: "Member" },
      { name: "Abdul Karim", role: "Member" },
      { name: "Rokeya Sultana", role: "Member" },
      { name: "Shahidul Islam", role: "Member" },
      { name: "Karim Uddin", role: "Member" },
      { name: "Laila Sultana", role: "Member" },
      { name: "Jamal Hossain", role: "Member" },
      { name: "Sadia Parvin", role: "Member" },
      { name: "Fahim Ahmed", role: "Member" },
    ],
  },
];