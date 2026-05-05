"use client";

import { motion } from "framer-motion";
import { INITIAL_PROMPTS } from "@/lib/conversation";

interface PromptChipsProps {
  onSelect: (label: string, nodeId: string) => void;
}

export function PromptChips({ onSelect }: PromptChipsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-wrap gap-2"
    >
      {INITIAL_PROMPTS.map((prompt, i) => (
        <motion.button
          key={prompt.nodeId}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25, delay: 0.1 + i * 0.04 }}
          onClick={() => onSelect(prompt.label, prompt.nodeId)}
          className="px-3 py-1.5 text-xs uppercase tracking-widest text-[#262510] border border-[#cdcdc9] hover:border-[#f54e00] hover:text-[#f54e00] transition-all duration-150 cursor-pointer select-none"
          style={{ borderRadius: "4px" }}
        >
          {prompt.label}
        </motion.button>
      ))}
    </motion.div>
  );
}
