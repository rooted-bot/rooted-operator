"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TabBar } from "@/components/tab-bar";
import { KnowledgeBase } from "@/components/knowledge-base";
import { EcosystemView } from "@/components/ecosystem-view";

const tabs = [
  { id: "knowledge", label: "Knowledge" },
  { id: "ecosystem", label: "Ecosystem" },
];

export default function KnowledgePage() {
  const [activeTab, setActiveTab] = useState("knowledge");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-xl font-semibold text-white">Knowledge</h1>
        <TabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {activeTab === "knowledge" ? <KnowledgeBase /> : <EcosystemView />}
    </motion.div>
  );
}
