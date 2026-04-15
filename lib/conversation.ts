import type { ChatState, ChatAction, FollowUp, MissionData } from "@/types/chat";
import {
  conversationFlows,
  generateMissionSummary,
  CONTACT_EMAIL,
  CALENDLY_URL,
} from "@/lib/conversation-flows";

// ─── Id generator ─────────────────────────────────────────────────────────────
let messageCounter = 0;
function makeId(): string {
  return `msg-${++messageCounter}-${Date.now()}`;
}

function assistantMsg(content: string) {
  return { id: makeId(), role: "assistant" as const, content, timestamp: new Date() };
}
function userMsg(content: string) {
  return { id: makeId(), role: "user" as const, content, timestamp: new Date() };
}

// ─── Node helpers ─────────────────────────────────────────────────────────────

/** Returns the display message for a node, generating dynamically for mission-summary */
export function getNodeMessage(nodeId: string, missionData: MissionData): string {
  const node = conversationFlows[nodeId];
  if (!node) return "I'm not sure where to go from here. How can I help?";

  if (nodeId === "mission-summary") {
    return generateMissionSummary(missionData);
  }

  return node.message
    .replace(/\[Calendly Link\]/g, CALENDLY_URL)
    .replace(/\[Email Address\]/g, CONTACT_EMAIL);
}

/** Returns follow-up chips for a node.
 *  - Chips with a nextNodeId → navigation chips (nodeId set)
 *  - Chips without nextNodeId on capture nodes → quick-select answers (no nodeId, routed via handleTextInput)
 *  - CTAs → external links (href set) or reset navigation
 */
export function getNodeFollowUps(nodeId: string): FollowUp[] {
  const node = conversationFlows[nodeId];
  if (!node) return [];

  const chips: FollowUp[] = (node.promptChips ?? []).map((chip) => ({
    label: chip.label,
    // If chip has explicit nextNodeId use it; if node is a capture step use node's nextNodeId;
    // otherwise leave undefined (treated as free text in handleFollowUp)
    nodeId: chip.nextNodeId ?? (node.captureKey ? node.nextNodeId : undefined),
  }));

  // Append CTAs as special chips
  for (const cta of node.cta ?? []) {
    if (cta.action === "link") {
      chips.push({ label: cta.label, href: cta.value });
    } else if (cta.action === "email") {
      chips.push({ label: cta.label, href: `mailto:${cta.value}` });
    } else if (cta.action === "reset" || cta.action === "route") {
      chips.push({ label: cta.label, nodeId: cta.value });
    }
  }

  return chips;
}

/** Returns the captureKey of the current node if it expects user input */
export function getNodeCaptureKey(nodeId: string): keyof MissionData | null {
  const node = conversationFlows[nodeId];
  return (node?.captureKey as keyof MissionData) ?? null;
}

/** Returns the nextNodeId of a node */
export function getNodeNextId(nodeId: string): string | null {
  return conversationFlows[nodeId]?.nextNodeId ?? null;
}

// ─── Initial prompt chips (home node) ────────────────────────────────────────
export const INITIAL_PROMPTS: { label: string; nodeId: string }[] =
  (conversationFlows["home"].promptChips ?? [])
    .filter((c) => c.nextNodeId)
    .map((c) => ({ label: c.label, nodeId: c.nextNodeId! }));

// ─── Reducer ──────────────────────────────────────────────────────────────────
const WELCOME_MESSAGE = conversationFlows["home"].message;

export const INITIAL_STATE: ChatState = {
  messages: [
    {
      id: makeId(),
      role: "assistant",
      content: WELCOME_MESSAGE,
      timestamp: new Date(),
    },
  ],
  activeNodeId: "home",
  missionData: {},
  isTyping: false,
  showInitialPrompts: true,
  followUps: [],
  inputPlaceholder: "Type a message or choose an option above",
  inputDisabled: false,
};

export function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "RESET":
      messageCounter = 0;
      return {
        ...INITIAL_STATE,
        messages: [
          { id: makeId(), role: "assistant", content: WELCOME_MESSAGE, timestamp: new Date() },
        ],
      };

    case "USER_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, userMsg(action.payload)],
        showInitialPrompts: false,
        followUps: [],
      };

    case "ASSISTANT_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, assistantMsg(action.payload)],
        isTyping: false,
      };

    case "SET_NODE":
      return { ...state, activeNodeId: action.payload };

    case "SET_FOLLOW_UPS":
      return { ...state, followUps: action.payload };

    case "SET_TYPING":
      return { ...state, isTyping: action.payload };

    case "SET_INPUT_PLACEHOLDER":
      return { ...state, inputPlaceholder: action.payload };

    case "SET_INPUT_DISABLED":
      return { ...state, inputDisabled: action.payload };

    case "HIDE_INITIAL_PROMPTS":
      return { ...state, showInitialPrompts: false };

    case "STORE_MISSION_FIELD":
      return {
        ...state,
        missionData: { ...state.missionData, [action.payload.field]: action.payload.value },
      };

    default:
      return state;
  }
}
