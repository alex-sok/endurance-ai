"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSubmit: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function ChatInput({ onSubmit, placeholder, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [value]);

  function handleSubmit() {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSubmit(trimmed);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  const canSubmit = value.trim().length > 0 && !disabled;

  return (
    <div className="relative flex items-center gap-3 bg-[#0d1525] border border-[#2a3a55] rounded-xl px-4 py-3 focus-within:border-[#5b8dee]/60 focus-within:shadow-[0_0_20px_rgba(91,141,238,0.12)] transition-all duration-200">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder ?? "Type a message…"}
        disabled={disabled}
        rows={1}
        style={{ caretColor: "#5b8dee" }}
        className={cn(
          "flex-1 resize-none overflow-hidden bg-transparent text-[0.9375rem] font-medium text-white placeholder:text-white/50 focus:outline-none leading-relaxed min-h-[1.5rem] max-h-40 tracking-wide",
          disabled && "opacity-40 cursor-not-allowed"
        )}
      />
      <motion.button
        onClick={handleSubmit}
        disabled={!canSubmit}
        whileTap={{ scale: 0.9 }}
        className={cn(
          "shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150",
          canSubmit
            ? "bg-[#5b8dee] text-[#0f1115] hover:bg-[#7aa9f5] shadow-[0_0_16px_rgba(91,141,238,0.5)]"
            : "bg-transparent border border-[#2a3a55] text-white/20 cursor-not-allowed"
        )}
      >
        <ArrowUp size={15} strokeWidth={2.5} />
      </motion.button>
    </div>
  );
}
