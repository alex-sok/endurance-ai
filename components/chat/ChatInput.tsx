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
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmit(); }
  }

  const canSubmit = value.trim().length > 0 && !disabled;

  return (
    <div
      className="relative flex items-center gap-3 px-3 py-2 transition-all duration-150"
      style={{
        background: "transparent",
        border: "1px solid #7a7974",
        borderRadius: "0px",
      }}
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder ?? "Ask anything…"}
        disabled={disabled}
        rows={1}
        style={{ caretColor: "#262510", letterSpacing: "0.08px" }}
        className={cn(
          "flex-1 resize-none overflow-hidden bg-transparent text-sm text-[#262510] placeholder:text-[#7a7974] focus:outline-none leading-relaxed min-h-[1.5rem] max-h-40",
          disabled && "opacity-40 cursor-not-allowed"
        )}
      />
      <motion.button
        onClick={handleSubmit}
        disabled={!canSubmit}
        whileTap={{ scale: 0.9 }}
        className={cn(
          "shrink-0 w-7 h-7 flex items-center justify-center transition-all duration-150",
          canSubmit
            ? "bg-[#262510] text-[#f7f7f4] hover:bg-[#141414]"
            : "border border-[#e6e5e0] text-[#cdcdc9] cursor-not-allowed"
        )}
        style={{ borderRadius: "4px" }}
      >
        <ArrowUp size={13} strokeWidth={2} />
      </motion.button>
    </div>
  );
}
