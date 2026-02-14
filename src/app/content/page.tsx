"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TabBar } from "@/components/tab-bar";
import { ContentView } from "@/components/content-view";

const tabs = [
  { id: "pipeline", label: "Pipeline" },
  { id: "calendar", label: "Calendar" },
];

export default function ContentPage() {
  const [activeTab, setActiveTab] = useState("pipeline");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-xl font-semibold text-white">Content</h1>
        <TabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {activeTab === "pipeline" ? (
        <ContentView />
      ) : (
        <div className="glass-card p-8 text-center">
          <p className="text-white/50">Content calendar view coming soon</p>
        </div>
      )}
    </motion.div>
  );
}
