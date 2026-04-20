"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Portal } from "@/types/portal";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Props {
  portal: Portal;
  onClose: () => void;
}

export function PortalChat({ portal, onClose }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Welcome message on mount
  useEffect(() => {
    setMessages([{
      role: "assistant",
      content: `Welcome to the ${portal.client_name} mission briefing. I have full context on this engagement — ask me anything about the strategy, approach, timeline, or team.`,
    }]);
    setTimeout(() => inputRef.current?.focus(), 300);
  }, [portal.client_name]);

  // Auto-scroll during streaming
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [streamingContent, messages]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || streaming) return;

    const userMessage: Message = { role: "user", content: text };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setStreaming(true);
    setStreamingContent("");

    try {
      const res = await fetch(`/api/portal/${portal.slug}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        accumulated += chunk;
        setStreamingContent(accumulated);
      }

      setMessages((prev) => [...prev, { role: "assistant", content: accumulated }]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setMessages((prev) => [...prev, { role: "assistant", content: `Error: ${msg}` }]);
    } finally {
      setStreaming(false);
      setStreamingContent("");
    }
  }, [input, messages, streaming, portal.slug]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "100%" }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] flex flex-col"
      style={{
        background: "rgba(13,17,26,0.97)",
        backdropFilter: "blur(20px)",
        borderLeft: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div>
          <p className="text-sm font-medium text-white tracking-wide">
            Mission AI
          </p>
          <p className="text-xs text-white/35 tracking-wide">
            {portal.client_name} context
          </p>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full text-white/40 hover:text-white hover:bg-white/05 transition-all duration-150"
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-5 py-5 space-y-5"
        style={{ scrollbarWidth: "none" }}
      >
        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} portal={portal} />
        ))}

        {/* Streaming bubble */}
        {streaming && (
          <div className="flex justify-start">
            <div
              className="max-w-[85%] px-4 py-3 rounded-2xl rounded-bl-sm text-sm leading-relaxed tracking-wide text-white/80"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              {streamingContent || (
                <span className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="w-1 h-1 rounded-full bg-white/30"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </span>
              )}
              {streamingContent && (
                <span
                  className="inline-block w-[2px] h-[14px] ml-0.5 align-middle animate-pulse"
                  style={{ background: portal.accent_color }}
                />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div
        className="px-5 py-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Ask anything about this engagement…"
            rows={1}
            disabled={streaming}
            className="flex-1 bg-transparent text-sm text-white placeholder:text-white/25 resize-none outline-none leading-relaxed tracking-wide overflow-hidden"
            style={{ caretColor: portal.accent_color }}
          />
          <button
            onClick={send}
            disabled={!input.trim() || streaming}
            className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full text-xs font-medium transition-all duration-150 disabled:opacity-30"
            style={{
              background: input.trim() && !streaming ? portal.accent_color : "transparent",
              border: input.trim() && !streaming ? "none" : "1px solid rgba(255,255,255,0.15)",
              color: input.trim() && !streaming ? "#0f1115" : "rgba(255,255,255,0.3)",
            }}
          >
            ↑
          </button>
        </div>
        <p className="mt-2 text-center text-xs text-white/15 tracking-wide">
          AI responses are scoped to this engagement.
        </p>
      </div>
    </motion.div>
  );
}

// ── Message bubble ────────────────────────────────────────────────────────────

function MessageBubble({ message, portal }: { message: Message; portal: Portal }) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div
          className="max-w-[85%] px-4 py-3 rounded-2xl rounded-br-sm text-sm tracking-wide leading-relaxed"
          style={{ color: portal.accent_color, background: `${portal.accent_color}12`, border: `1px solid ${portal.accent_color}20` }}
        >
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div
        className="max-w-[85%] px-4 py-3 rounded-2xl rounded-bl-sm text-sm leading-relaxed text-white/80"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ children }) => <p className="mb-2 last:mb-0 tracking-wide">{children}</p>,
            a: ({ href, children }) => (
              <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: portal.accent_color }} className="hover:opacity-80 underline underline-offset-2">
                {children}
              </a>
            ),
            ul: ({ children }) => <ul className="mb-2 space-y-1">{children}</ul>,
            li: ({ children }) => (
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: portal.accent_color }} />
                <span>{children}</span>
              </li>
            ),
            strong: ({ children }) => <strong className="text-white font-medium">{children}</strong>,
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
