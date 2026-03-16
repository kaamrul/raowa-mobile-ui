import { NavLink, useLocation } from "react-router-dom";
import { Home, Users, Newspaper, Heart, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const tabs = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/members", icon: Users, label: "Members" },
  { to: "/community", icon: Newspaper, label: "Community" },
  { to: "/campaigns", icon: Heart, label: "Campaigns" },
  { to: "/inbox", icon: MessageCircle, label: "Inbox" },
];

const BottomNav = () => {
  const location = useLocation();

  if (location.pathname.startsWith("/inbox/chat")) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border safe-bottom">
      <div className="flex items-center justify-around h-16 px-4 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const isActive =
            tab.to === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(tab.to);

          return (
            <NavLink
              key={tab.to}
              to={tab.to}
              className="flex flex-col items-center justify-center gap-0.5 relative w-16"
            >
              <div className="relative flex flex-col items-center">
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -top-1 w-8 h-0.5 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <tab.icon
                  size={22}
                  className={
                    isActive ? "text-primary mt-1" : "text-muted-foreground mt-1"
                  }
                  strokeWidth={isActive ? 2.2 : 1.8}
                />
                <span
                  className={`text-[11px] mt-0.5 font-medium ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {tab.label}
                </span>
              </div>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;