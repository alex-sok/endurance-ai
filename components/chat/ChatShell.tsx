"use client";

import { useReducer, useRef, useEffect, useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import ReactMarkdown from "react-markdown";

import { chatReducer, INITIAL_STATE, processRoute, processSupportAction } from "@/lib/conversation";
import type { ChatMessage, FollowUp, RouteId } from "@/types/chat";

import { Message, TypingIndicator } from "./Message";
import { PromptChips } from "./PromptChips";
import { FollowUpButtons } from "./FollowUpButtons";
import { ChatInput } from "./ChatInput";

// Multi-step routes that advance through sequential prompts.
// All other routes are single-response; free text always goes to the LLM.
const MULTI_STEP_ROUTES = new Set<RouteId>(["mission-intake"]);

const TYPING_DELAY = 520;

// ── Streaming bubble — same visual style as assistant messages ────────────────
function StreamingBubble({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="w-full flex justify-start"
    >
      <div className="max-w-[85%] sm:max-w-[75%] text-stone-800">
        <div className="prose prose-stone prose-sm max-w-none leading-relaxed">
          <ReactMarkdown
            components={{
              p: ({ children }) => (
                <p className="mb-3 last:mb-0 text-stone-700 text-[0.9375rem] leading-[1.65] font-light">
                  {children}
                </p>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-stone-900">{children}</strong>
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
            {text}
          </ReactMarkdown>
          {/* blinking cursor */}
          <span className="inline-block w-0.5 h-3.5 bg-stone-400 ml-0.5 animate-pulse align-middle" />
        </div>
      </div>
    </motion.div>
  );
}

export function ChatShell() {
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  const bottomRef = useRef<HTMLDivElement>(null);
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Streaming state — local, not in reducer
  const [streamingText, setStreamingText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  // ── Scroll to bottom ──────────────────────────────────────────────────────
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state.messages, state.isTyping, state.followUps, streamingText]);

  // ── Cleanup on unmount ────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      abortRef.current?.abort();
    };
  }, []);

  // ── Deliver deterministic assistant response after typing delay ───────────
  const deliverResponse = useCallback(
    (message: string, followUps: FollowUp[], placeholder: string, inputDisabled: boolean) => {
      dispatch({ type: "SET_TYPING", payload: true });
      typingTimerRef.current = setTimeout(() => {
        dispatch({ type: "ASSISTANT_MESSAGE", payload: message });
        dispatch({ type: "SET_FOLLOW_UPS", payload: followUps });
        dispatch({ type: "SET_INPUT_PLACEHOLDER", payload: placeholder });
        dispatch({ type: "SET_INPUT_DISABLED", payload: inputDisabled });
      }, TYPING_DELAY);
    },
    []
  );

  // ── LLM streaming call ────────────────────────────────────────────────────
  const callLLM = useCallback(
    async (messages: ChatMessage[]) => {
      abortRef.current?.abort();
      abortRef.current = new AbortController();

      setIsStreaming(true);
      setStreamingText("");
      dispatch({ type: "SET_INPUT_DISABLED", payload: true });

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: messages.map((m) => ({ role: m.role, content: m.content })),
          }),
          signal: abortRef.current.signal,
        });

        if (!res.ok) {
          throw new Error(`API error ${res.status}`);
        }

        const reader = res.body!.getReader();
        const decoder = new TextDecoder();
        let fullText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          fullText += decoder.decode(value, { stream: true });
          setStreamingText(fullText);
        }

        dispatch({ type: "ASSISTANT_MESSAGE", payload: fullText });
        dispatch({ type: "SET_FOLLOW_UPS", payload: [] });
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          dispatch({
            type: "ASSISTANT_MESSAGE",
            payload:
              "I'm having trouble connecting right now. Please try again or reach us directly at [hello@endurancelabs.ai](mailto:hello@endurancelabs.ai).",
          });
        }
      } finally {
        setIsStreaming(false);
        setStreamingText("");
        dispatch({ type: "SET_INPUT_DISABLED", payload: false });
      }
    },
    []
  );

  // ── Prompt chip selection (initial load) ──────────────────────────────────
  const handlePromptSelect = useCallback(
    (label: string, routeId: RouteId) => {
      dispatch({ type: "HIDE_INITIAL_PROMPTS" });
      dispatch({ type: "USER_MESSAGE", payload: label });
      dispatch({ type: "SET_ROUTE", payload: routeId });

      const response = processRoute(routeId, 0, label, {});
      if (response.missionField) {
        dispatch({ type: "STORE_MISSION_FIELD", payload: response.missionField });
      }
      deliverResponse(response.message, response.followUps, response.nextPlaceholder, response.inputDisabled);

      if (MULTI_STEP_ROUTES.has(routeId)) {
        dispatch({ type: "ADVANCE_STEP" });
      }
    },
    [deliverResponse]
  );

  // ── Follow-up button press ────────────────────────────────────────────────
  const handleFollowUp = useCallback(
    (followUp: FollowUp) => {
      if (followUp.routeId) {
        dispatch({ type: "USER_MESSAGE", payload: followUp.label });
        dispatch({ type: "SET_ROUTE", payload: followUp.routeId });

        const response = processRoute(followUp.routeId, 0, followUp.label, state.missionData);
        if (response.missionField) {
          dispatch({ type: "STORE_MISSION_FIELD", payload: response.missionField });
        }
        deliverResponse(response.message, response.followUps, response.nextPlaceholder, response.inputDisabled);

        if (MULTI_STEP_ROUTES.has(followUp.routeId)) {
          dispatch({ type: "ADVANCE_STEP" });
        }
        return;
      }

      if (followUp.stepAction) {
        dispatch({ type: "USER_MESSAGE", payload: followUp.label });
        const response = processSupportAction(followUp.stepAction);
        deliverResponse(response.message, response.followUps, response.nextPlaceholder, response.inputDisabled);
      }
    },
    [deliverResponse, state.missionData]
  );

  // ── Free text input ───────────────────────────────────────────────────────
  const handleTextInput = useCallback(
    (value: string) => {
      dispatch({ type: "USER_MESSAGE", payload: value });

      const { currentRoute, currentStep, missionData } = state;

      // Active multi-step route: advance through sequential prompts (deterministic)
      if (currentRoute && MULTI_STEP_ROUTES.has(currentRoute)) {
        let updatedMission = { ...missionData };

        if (currentRoute === "mission-intake") {
          const fieldMap: Record<number, keyof typeof missionData> = {
            1: "goal",
            2: "blocker",
            3: "stakes",
            4: "internalFriction",
          };
          const field = fieldMap[currentStep];
          if (field) {
            updatedMission = { ...updatedMission, [field]: value };
            dispatch({ type: "STORE_MISSION_FIELD", payload: { field, value } });
          }
        }

        const response = processRoute(currentRoute, currentStep, value, updatedMission);
        if (response.missionField) {
          dispatch({ type: "STORE_MISSION_FIELD", payload: response.missionField });
        }
        dispatch({ type: "ADVANCE_STEP" });
        deliverResponse(response.message, response.followUps, response.nextPlaceholder, response.inputDisabled);
        return;
      }

      // All other cases → LLM streaming response
      // Build the messages array including the new user message (state hasn't updated yet)
      const messagesWithUser: ChatMessage[] = [
        ...state.messages,
        {
          id: `user-${Date.now()}`,
          role: "user",
          content: value,
          timestamp: new Date(),
        },
      ];
      callLLM(messagesWithUser);
    },
    [state, deliverResponse, callLLM]
  );

  // ── Reset ─────────────────────────────────────────────────────────────────
  const handleReset = useCallback(() => {
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    abortRef.current?.abort();
    setIsStreaming(false);
    setStreamingText("");
    dispatch({ type: "RESET" });
  }, []);

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto w-full">
      {/* ── Header ─────────────────────────────────────── */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between px-1 pt-6 pb-4 shrink-0"
      >
        <div className="flex items-center">
          <img
            src="/endurance-logo.svg"
            alt="Endurance AI Labs"
            className="h-6 w-auto"
          />
        </div>

        <div className="flex items-center gap-4">
          <a
            href="mailto:hello@endurancelabs.ai"
            className="hidden sm:inline-flex text-xs text-stone-400 hover:text-stone-700 transition-colors duration-150 font-light tracking-wide"
          >
            hello@endurancelabs.ai
          </a>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-600 transition-colors duration-150 font-light"
            aria-label="Start over"
          >
            <RotateCcw size={12} />
            <span className="hidden sm:inline">Start over</span>
          </button>
        </div>
      </motion.header>

      {/* ── Message list ───────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-1 pb-4 space-y-5 scroll-smooth">
        <AnimatePresence initial={false}>
          {state.messages.map((msg, i) => (
            <Message key={msg.id} message={msg} isLast={i === state.messages.length - 1} />
          ))}
        </AnimatePresence>

        {/* Deterministic typing indicator (for structured routes) */}
        <AnimatePresence>
          {state.isTyping && !isStreaming && <TypingIndicator key="typing" />}
        </AnimatePresence>

        {/* LLM streaming bubble */}
        <AnimatePresence>
          {isStreaming && (
            <motion.div
              key="streaming"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {streamingText ? (
                <StreamingBubble text={streamingText} />
              ) : (
                <TypingIndicator />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Follow-up buttons */}
        <AnimatePresence>
          {!state.isTyping && !isStreaming && state.followUps.length > 0 && (
            <motion.div
              key="followups"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FollowUpButtons followUps={state.followUps} onSelect={handleFollowUp} />
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>

      {/* ── Input area ─────────────────────────────────── */}
      <div className="shrink-0 pb-8 pt-2 space-y-3">
        <AnimatePresence>
          {state.showInitialPrompts && (
            <motion.div
              key="chips"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <PromptChips onSelect={handlePromptSelect} />
            </motion.div>
          )}
        </AnimatePresence>

        <ChatInput
          onSubmit={handleTextInput}
          placeholder={state.inputPlaceholder}
          disabled={state.inputDisabled || state.isTyping || isStreaming}
        />

        <p className="text-center text-[11px] text-stone-300 font-light tracking-wide">
          Endurance AI Labs · Strategic AI advisory for high-stakes initiatives
        </p>
      </div>
    </div>
  );
}
