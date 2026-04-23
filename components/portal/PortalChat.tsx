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
  // mobileOpen controls visibility on mobile only.
  // On desktop (lg+) the panel is always visible via CSS.
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export function PortalChat({ portal, mobileOpen, onMobileClose }: Props) {
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
      content: `I have full context on the ${portal.client_name} engagement — strategy, approach, timeline, and team. What do you need to know?`,
    }]);
    setTimeout(() => inputRef.current?.focus(), 400);
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
    <>
      {/* ── Mobile backdrop ──────────────────────────────────────────────────── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* ── Chat panel ───────────────────────────────────────────────────────── */}
      {/*
        Mobile:  hidden by default, slides in as full-screen when mobileOpen
        Desktop: always visible as a fixed right rail (lg:flex)
      */}
      <div
        className={[
          "fixed z-50 flex flex-col",
          // Mobile geometry
          "inset-0",
          // Mobile open/closed
          mobileOpen ? "flex" : "hidden",
          // Desktop: override to always-visible right rail
          "lg:flex lg:inset-auto lg:top-14 lg:right-0 lg:bottom-0 lg:w-[380px]",
        ].join(" ")}
        style={{
          background: "#07080c",
          borderLeft: `2px solid ${portal.accent_color}50`,
        }}
      >
        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <div
          className="flex-shrink-0 px-5 py-4"
          style={{ borderBottom: `1px solid rgba(255,255,255,0.08)` }}
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2.5">
              {/* Blinking active dot */}
              <motion.span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: portal.accent_color }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <span
                className="text-xs font-semibold tracking-[0.25em] uppercase"
                style={{ color: portal.accent_color }}
              >
                Mission AI
              </span>
            </div>
            {/* Mobile-only close */}
            <button
              onClick={onMobileClose}
              className="lg:hidden w-7 h-7 flex items-center justify-center text-white/30 hover:text-white/70 transition-colors"
            >
              ✕
            </button>
          </div>
          <p className="text-xs text-white/35 tracking-[0.15em] uppercase pl-[18px]">
            {portal.client_name} // Tactical Briefing
          </p>
        </div>

        {/* ── Messages ───────────────────────────────────────────────────────── */}
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
            <div className="flex flex-col gap-1">
              <span
                className="text-[10px] tracking-[0.2em] uppercase mb-1"
                style={{ color: `${portal.accent_color}70` }}
              >
                AI
              </span>
              <div
                className="text-sm leading-relaxed text-white/80 pl-3"
                style={{ borderLeft: `2px solid ${portal.accent_color}40` }}
              >
                {streamingContent || (
                  <span className="flex gap-1 items-center h-5">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1 h-1 rounded-full"
                        style={{ background: portal.accent_color }}
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </span>
                )}
                {streamingContent && (
                  <span
                    className="inline-block w-[2px] h-[13px] ml-0.5 align-middle animate-pulse"
                    style={{ background: portal.accent_color }}
                  />
                )}
              </div>
            </div>
          )}
        </div>

        {/* ── Input ──────────────────────────────────────────────────────────── */}
        <div
          className="flex-shrink-0 px-5 pt-4 pb-5"
          style={{ borderTop: `1px solid rgba(255,255,255,0.08)` }}
        >
          <div className="flex items-start gap-2">
            {/* Terminal prompt character */}
            <span
              className="mt-[11px] text-sm font-semibold flex-shrink-0 select-none"
              style={{ color: `${portal.accent_color}80` }}
            >
              &gt;
            </span>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Enter your query…"
              rows={1}
              disabled={streaming}
              className="flex-1 bg-transparent text-sm text-white/85 placeholder:text-white/20 resize-none outline-none leading-relaxed tracking-wide overflow-hidden pt-2"
              style={{ caretColor: portal.accent_color }}
            />
            <button
              onClick={send}
              disabled={!input.trim() || streaming}
              className="flex-shrink-0 mt-1.5 w-7 h-7 flex items-center justify-center rounded text-xs font-semibold transition-all duration-150 disabled:opacity-25"
              style={{
                background: input.trim() && !streaming ? portal.accent_color : "transparent",
                border: input.trim() && !streaming ? "none" : `1px solid rgba(255,255,255,0.12)`,
                color: input.trim() && !streaming ? "#07080c" : "rgba(255,255,255,0.25)",
              }}
            >
              ↑
            </button>
          </div>
          {/* Hard underline beneath input */}
          <div
            className="mt-3 h-px"
            style={{ background: `${portal.accent_color}25` }}
          />
          <p className="mt-2 text-[10px] text-white/15 tracking-[0.15em] uppercase">
            Responses scoped to this engagement
          </p>
        </div>
      </div>
    </>
  );
}

// ── Message bubble ────────────────────────────────────────────────────────────

function MessageBubble({ message, portal }: { message: Message; portal: Portal }) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex flex-col items-end gap-1">
        <span
          className="text-[10px] tracking-[0.2em] uppercase"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          You
        </span>
        <p
          className="text-sm tracking-wide leading-relaxed text-right"
          style={{ color: `${portal.accent_color}CC` }}
        >
          {message.content}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <span
        className="text-[10px] tracking-[0.2em] uppercase"
        style={{ color: `${portal.accent_color}70` }}
      >
        AI
      </span>
      <div
        className="text-sm leading-relaxed text-white/80 pl-3"
        style={{ borderLeft: `2px solid ${portal.accent_color}40` }}
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
                <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0" style={{ background: portal.accent_color }} />
                <span>{children}</span>
              </li>
            ),
            strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
