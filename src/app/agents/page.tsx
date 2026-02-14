"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TabBar } from "@/components/tab-bar";
import { AgentsView } from "@/components/agents-view";
import { ModelsView } from "@/components/models-view";

const tabs = [
  { id: "agents", label: "Agents" },
  { id: "models", label: "Models" },
];

export default function AgentsPage() {
  const [activeTab, setActiveTab] = useState("agents");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-xl font-semibold text-white">Agents</h1>
        <TabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {activeTab === "agents" ? <AgentsView /> : <ModelsView />}
    </motion.div>
  );
}
