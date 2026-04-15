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
    <div className="relative flex items-end gap-2 bg-white border border-stone-200 rounded-2xl px-4 py-3 shadow-sm focus-within:border-stone-400 transition-colors duration-150">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder ?? "Type a message…"}
        disabled={disabled}
        rows={1}
        className={cn(
          "flex-1 resize-none bg-transparent text-[0.9375rem] font-light text-stone-800 placeholder:text-stone-400 focus:outline-none leading-relaxed min-h-[1.5rem] max-h-40",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      />
      <motion.button
        onClick={handleSubmit}
        disabled={!canSubmit}
        whileTap={{ scale: 0.9 }}
        className={cn(
          "shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-colors duration-150",
          canSubmit
            ? "bg-stone-900 text-white hover:bg-stone-700"
            : "bg-stone-100 text-stone-300 cursor-not-allowed"
        )}
      >
        <ArrowUp size={15} strokeWidth={2.5} />
      </motion.button>
    </div>
  );
}
