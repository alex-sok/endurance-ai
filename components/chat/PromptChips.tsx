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
          className="px-4 py-2 text-xs tracking-widest uppercase text-white border border-[#2a3855] rounded-full hover:border-[#5b8dee]/60 hover:text-[#5b8dee] hover:bg-[#5b8dee]/5 hover:shadow-[0_0_12px_rgba(91,141,238,0.15)] transition-all duration-150 cursor-pointer select-none"
        >
          {prompt.label}
        </motion.button>
      ))}
    </motion.div>
  );
}
