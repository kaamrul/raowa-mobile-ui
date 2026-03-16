import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import BottomNav from "@/components/BottomNav";

const HomePage = lazy(() => import("./pages/HomePage"));
const MembersPage = lazy(() => import("./pages/MembersPage"));
const MemberProfilePage = lazy(() => import("./pages/MemberProfilePage"));
const CommunityPage = lazy(() => import("./pages/CommunityPage"));
const NoticeDetailPage = lazy(() => import("./pages/NoticeDetailPage"));
const CampaignsPage = lazy(() => import("./pages/CampaignsPage"));
const CampaignDetailPage = lazy(() => import("./pages/CampaignDetailPage"));
const InboxPage = lazy(() => import("./pages/InboxPage"));
const ChatPage = lazy(() => import("./pages/ChatPage"));
const DonationAmountPage = lazy(() => import("./pages/DonationAmountPage"));
const PaymentMethodPage = lazy(() => import("./pages/PaymentMethodPage"));
const DonationConfirmPage = lazy(() => import("./pages/DonationConfirmPage"));
const DonationStatusPage = lazy(() => import("./pages/DonationStatusPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const NewsDetailPage = lazy(() => import("./pages/NewsDetailPage"));
const ObituaryDetailPage = lazy(() => import("./pages/ObituaryDetailPage"));
const EventDetailPage = lazy(() => import("./pages/EventDetailPage"));
const JobApplyPage = lazy(() => import("./pages/JobApplyPage"));
const JobDetailsPage = lazy(() => import("./pages/JobDetailsPage"));
const JobsPage = lazy(() => import("./pages/JobsPage"));

const PromotionPage = lazy(() => import("./pages/PromotionPage"));
const PromotionPlansPage = lazy(() => import("./pages/PromotionPlansPage"));
const PromotionMyAdsPage = lazy(() => import("./pages/PromotionMyAdsPage"));
const PromotionMyPlanPage = lazy(() => import("./pages/PromotionMyPlanPage"));
const PromotionSubscribePage = lazy(() => import("./pages/PromotionSubscribePage"));
const PromotionCreateAdPage = lazy(() => import("./pages/PromotionCreateAdPage"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">
    Loading...
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="max-w-lg mx-auto relative">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/members" element={<MembersPage />} />
              <Route path="/members/:id" element={<MemberProfilePage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/community/notices/:id" element={<NoticeDetailPage />} />
              <Route path="/community/news/:id" element={<NewsDetailPage />} />
              <Route path="/community/events/:id" element={<EventDetailPage />} />
              <Route path="/community/obituaries/:id" element={<ObituaryDetailPage />} />
              <Route path="/campaigns" element={<CampaignsPage />} />
              <Route path="/campaigns/:id" element={<CampaignDetailPage />} />
              <Route path="/inbox" element={<InboxPage />} />
              <Route path="/inbox/chat/:id" element={<ChatPage />} />
              <Route path="/campaigns/:id/donate" element={<DonationAmountPage />} />
              <Route path="/campaigns/:id/donate/payment" element={<PaymentMethodPage />} />
              <Route path="/campaigns/:id/donate/confirm" element={<DonationConfirmPage />} />
              <Route path="/campaigns/:id/donate/status" element={<DonationStatusPage />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/jobs/:id" element={<JobDetailsPage />} />
              <Route path="/jobs/apply/:id" element={<JobApplyPage />} />

              <Route path="/promotion" element={<PromotionPage />} />
              <Route path="/promotion/plans" element={<PromotionPlansPage />} />
              <Route path="/promotion/my-ads" element={<PromotionMyAdsPage />} />
              <Route path="/promotion/my-plan" element={<PromotionMyPlanPage />} />
              <Route path="/promotion/subscribe/:planId" element={<PromotionSubscribePage />} />
              <Route path="/promotion/create-ad" element={<PromotionCreateAdPage />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>

          <BottomNav />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;