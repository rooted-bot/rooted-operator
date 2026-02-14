"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TabBar } from "@/components/tab-bar";
import { OpsView } from "@/components/ops-view";
import { SuggestedTasksView } from "@/components/suggested-tasks-view";

const tabs = [
  { id: "overview", label: "Ops Overview" },
  { id: "suggested", label: "Suggested Tasks" },
];

export default function OpsPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-xl font-semibold text-white">Operations</h1>
        <TabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {activeTab === "overview" ? <OpsView /> : <SuggestedTasksView />}
    </motion.div>
  );
}
