"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TabBar } from "@/components/tab-bar";
import { CommsView } from "@/components/comms-view";
import { CRMView } from "@/components/crm-view";

const tabs = [
  { id: "comms", label: "Comms" },
  { id: "crm", label: "CRM" },
];

export default function CommsPage() {
  const [activeTab, setActiveTab] = useState("comms");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-xl font-semibold text-white">Communications</h1>
        <TabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {activeTab === "comms" ? <CommsView /> : <CRMView />}
    </motion.div>
  );
}
