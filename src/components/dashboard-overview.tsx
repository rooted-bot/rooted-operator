"use client";

import { motion } from "framer-motion";
import { AgentStatusCard } from "./dashboard/agent-status-card";
import { SystemHealthCard } from "./dashboard/system-health-card";
import { RevenueCard } from "./dashboard/revenue-card";
import { ActivityFeed } from "./activity-feed";
import { CalendarStrip } from "./calendar-view";
import { PriorityList } from "./dashboard/priority-list";
import { QuickActions } from "./dashboard/quick-actions";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export function DashboardOverview() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Top Row - Stats */}
      <motion.div variants={itemVariants} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AgentStatusCard />
        <SystemHealthCard />
        <RevenueCard />
      </motion.div>

      {/* Middle Row - Activity & Calendar */}
      <motion.div variants={itemVariants} className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>
        <CalendarStrip />
      </motion.div>

      {/* Bottom Row - Priorities & Quick Actions */}
      <motion.div variants={itemVariants} className="grid gap-4 lg:grid-cols-2">
        <PriorityList />
        <QuickActions />
      </motion.div>
    </motion.div>
  );
}
