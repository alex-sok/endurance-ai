"use client";

import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import type { ChatMessage } from "@/types/chat";
import { cn } from "@/lib/utils";

interface MessageProps {
  message: ChatMessage;
  isLast?: boolean;
}

export function Message({ message, isLast }: MessageProps) {
  const isAssistant = message.role === "assistant";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "w-full flex",
        isAssistant ? "justify-start" : "justify-end"
      )}
    >
      <div
        className={cn(
          "max-w-[85%] sm:max-w-[75%]",
          isAssistant
            ? "text-stone-800"
            : "bg-stone-900 text-stone-50 rounded-2xl rounded-br-sm px-4 py-3"
        )}
      >
        {isAssistant ? (
          <div className="prose prose-stone prose-sm max-w-none leading-relaxed">
            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <p className="mb-3 last:mb-0 text-stone-700 text-[0.9375rem] leading-[1.65] font-light">
                    {children}
                  </p>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-stone-900">
                    {children}
                  </strong>
                ),
                ul: ({ children }) => (
                  <ul className="mb-3 space-y-1.5 pl-0 list-none">{children}</ul>
                ),
                li: ({ children }) => (
                  <li className="flex gap-2 text-stone-700 text-[0.9375rem] leading-[1.65] font-light">
                    <span className="text-stone-400 mt-0.5 shrink-0">—</span>
                    <span>{children}</span>
                  </li>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-900 underline underline-offset-2 decoration-stone-300 hover:decoration-stone-600 transition-colors"
                  >
                    {children}
                  </a>
                ),
                h1: ({ children }) => (
                  <h1 className="text-base font-semibold text-stone-900 mb-2 mt-4 first:mt-0">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-sm font-semibold text-stone-900 mb-1.5 mt-3 first:mt-0 uppercase tracking-wide">
                    {children}
                  </h2>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        ) : (
          <p className="text-[0.9375rem] leading-relaxed">{message.content}</p>
        )}
      </div>
    </motion.div>
  );
}

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.25 }}
      className="flex justify-start w-full"
    >
      <div className="flex items-center gap-1 py-2">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-stone-400"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
