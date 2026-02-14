"use client";

import { motion } from "framer-motion";
import { CodePipeline } from "@/components/code-pipeline";

export default function CodePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-xl font-semibold text-white">Code Pipeline</h1>
      </div>
      
      <CodePipeline />
    </motion.div>
  );
}
