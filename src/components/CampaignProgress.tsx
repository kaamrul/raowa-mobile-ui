import { motion } from "framer-motion";

interface CampaignProgressProps {
  raised: number;
  goal: number;
  className?: string;
}

const CampaignProgress = ({ raised, goal, className = "" }: CampaignProgressProps) => {
  const percent = Math.min((raised / goal) * 100, 100);

  return (
    <div className={`w-full ${className}`}>
      <div className="h-2 rounded-full bg-secondary overflow-hidden">
        <motion.div
          className="h-full rounded-full progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] as const }}
        />
      </div>
    </div>
  );
};

export default CampaignProgress;
