import type { ChatState, ChatAction, RouteId, FollowUp } from "@/types/chat";
import {
  WELCOME_MESSAGE,
  MISSION_INTAKE,
  WHAT_WE_DO,
  WHAT_WE_DO_DIFFERENT,
  WHAT_WE_DO_NOT,
  WHO_ARE_WE,
  HOW_WE_WORK,
  HOW_WE_WORK_DIAGNOSE,
  HOW_WE_WORK_PRIORITIZE,
  HOW_WE_WORK_DEPLOY,
  HOW_WE_WORK_EMBED,
  HOW_WE_WORK_TRANSFER,
  WHO_WE_HELP,
  WHO_WE_HELP_REGULATED,
  WHO_WE_HELP_FAILED_PILOT,
  WHO_WE_HELP_MANDATE,
  WHO_WE_HELP_INTERNAL_TEAM,
  SUPPORT,
  TALK_TO_TEAM,
  TOPIC_PILOTS,
  TOPIC_BUILD_VS_BUY,
  TOPIC_LLMS,
  TOPIC_GOVERNANCE,
  TOPIC_TIMELINE,
  TOPIC_TALENT,
  matchFreeTextIntent,
  FREE_TEXT_FALLBACK,
} from "@/lib/content";

let messageCounter = 0;
function makeId(): string {
  return `msg-${++messageCounter}-${Date.now()}`;
}

export const INITIAL_STATE: ChatState = {
  messages: [
    {
      id: makeId(),
      role: "assistant",
      content: WELCOME_MESSAGE,
      timestamp: new Date(),
    },
  ],
  currentRoute: null,
  currentStep: 0,
  missionData: {},
  isTyping: false,
  showInitialPrompts: true,
  followUps: [],
  inputPlaceholder: "Type a message or choose an option above",
  inputDisabled: false,
};

function assistantMsg(content: string) {
  return { id: makeId(), role: "assistant" as const, content, timestamp: new Date() };
}
function userMsg(content: string) {
  return { id: makeId(), role: "user" as const, content, timestamp: new Date() };
}

export function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "RESET":
      messageCounter = 0;
      return {
        ...INITIAL_STATE,
        messages: [{ id: makeId(), role: "assistant", content: WELCOME_MESSAGE, timestamp: new Date() }],
      };

    case "USER_MESSAGE":
      return { ...state, messages: [...state.messages, userMsg(action.payload)], showInitialPrompts: false, followUps: [] };

    case "ASSISTANT_MESSAGE":
      return { ...state, messages: [...state.messages, assistantMsg(action.payload)], isTyping: false };

    case "SET_ROUTE":
      return { ...state, currentRoute: action.payload, currentStep: 0 };

    case "ADVANCE_STEP":
      return { ...state, currentStep: state.currentStep + 1 };

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
      return { ...state, missionData: { ...state.missionData, [action.payload.field]: action.payload.value } };

    default:
      return state;
  }
}

// ─── Route response shape ─────────────────────────────────────────────────────

export interface RouteResponse {
  message: string;
  followUps: FollowUp[];
  nextPlaceholder: string;
  inputDisabled: boolean;
  /** For multi-step routes: which mission data field this step collects */
  missionField?: { field: "goal" | "blocker" | "stakes" | "internalFriction"; value: string };
  /** Whether this route is "done" — subsequent free text should go to intent matching */
  terminal?: boolean;
}

const DEFAULT_PLACEHOLDER = "Type a message or choose an option above";

// ─── Single-response route helper ────────────────────────────────────────────
function single(message: string, followUps: FollowUp[]): RouteResponse {
  return { message, followUps, nextPlaceholder: DEFAULT_PLACEHOLDER, inputDisabled: false, terminal: true };
}

// ─── Main route processor ─────────────────────────────────────────────────────
export function processRoute(
  routeId: RouteId,
  step: number,
  userInput: string,
  missionData: ChatState["missionData"]
): RouteResponse {
  switch (routeId) {
    // ── Mission Intake (multi-step) ────────────────────────────────────────
    case "mission-intake": {
      if (step === 0) {
        return {
          message: MISSION_INTAKE.intro,
          followUps: [],
          nextPlaceholder: MISSION_INTAKE.step1_placeholder,
          inputDisabled: false,
        };
      }
      if (step === 1) {
        return {
          message: MISSION_INTAKE.step2(userInput),
          followUps: [],
          nextPlaceholder: MISSION_INTAKE.step2_placeholder,
          inputDisabled: false,
          missionField: { field: "goal", value: userInput },
        };
      }
      if (step === 2) {
        return {
          message: MISSION_INTAKE.step3(userInput),
          followUps: [],
          nextPlaceholder: MISSION_INTAKE.step3_placeholder,
          inputDisabled: false,
          missionField: { field: "blocker", value: userInput },
        };
      }
      if (step === 3) {
        return {
          message: MISSION_INTAKE.step4,
          followUps: [],
          nextPlaceholder: MISSION_INTAKE.step4_placeholder,
          inputDisabled: false,
          missionField: { field: "stakes", value: userInput },
        };
      }
      if (step === 4) {
        const fullData = {
          goal: missionData.goal ?? "",
          blocker: missionData.blocker ?? "",
          stakes: missionData.stakes ?? "",
          internalFriction: userInput,
        };
        return {
          message: MISSION_INTAKE.summary(fullData),
          followUps: MISSION_INTAKE.followUps,
          nextPlaceholder: DEFAULT_PLACEHOLDER,
          inputDisabled: false,
          missionField: { field: "internalFriction", value: userInput },
          terminal: true,
        };
      }
      // Past the defined steps — treat as free text
      return freeTextResponse(userInput);
    }

    // ── Support (step 0 = branch, thereafter handled via stepAction) ──────
    case "support": {
      if (step === 0) {
        return {
          message: SUPPORT.intro,
          followUps: SUPPORT.followUps,
          nextPlaceholder: "Or describe what you need",
          inputDisabled: false,
        };
      }
      return freeTextResponse(userInput);
    }

    // ── Single-response routes ─────────────────────────────────────────────
    case "what-we-do":            return single(WHAT_WE_DO.message, WHAT_WE_DO.followUps);
    case "what-we-do/different":  return single(WHAT_WE_DO_DIFFERENT.message, WHAT_WE_DO_DIFFERENT.followUps);
    case "what-we-do/not":        return single(WHAT_WE_DO_NOT.message, WHAT_WE_DO_NOT.followUps);

    case "who-are-we":            return single(WHO_ARE_WE.message, WHO_ARE_WE.followUps);

    case "how-we-work":           return single(HOW_WE_WORK.message, HOW_WE_WORK.followUps);
    case "how-we-work/diagnose":  return single(HOW_WE_WORK_DIAGNOSE.message, HOW_WE_WORK_DIAGNOSE.followUps);
    case "how-we-work/prioritize":return single(HOW_WE_WORK_PRIORITIZE.message, HOW_WE_WORK_PRIORITIZE.followUps);
    case "how-we-work/deploy":    return single(HOW_WE_WORK_DEPLOY.message, HOW_WE_WORK_DEPLOY.followUps);
    case "how-we-work/embed":     return single(HOW_WE_WORK_EMBED.message, HOW_WE_WORK_EMBED.followUps);
    case "how-we-work/transfer":  return single(HOW_WE_WORK_TRANSFER.message, HOW_WE_WORK_TRANSFER.followUps);

    case "who-we-help":               return single(WHO_WE_HELP.message, WHO_WE_HELP.followUps);
    case "who-we-help/regulated":     return single(WHO_WE_HELP_REGULATED.message, WHO_WE_HELP_REGULATED.followUps);
    case "who-we-help/failed-pilot":  return single(WHO_WE_HELP_FAILED_PILOT.message, WHO_WE_HELP_FAILED_PILOT.followUps);
    case "who-we-help/mandate":       return single(WHO_WE_HELP_MANDATE.message, WHO_WE_HELP_MANDATE.followUps);
    case "who-we-help/internal-team": return single(WHO_WE_HELP_INTERNAL_TEAM.message, WHO_WE_HELP_INTERNAL_TEAM.followUps);

    case "talk-to-team":          return single(TALK_TO_TEAM.message, TALK_TO_TEAM.followUps);

    case "topic/pilots":          return single(TOPIC_PILOTS.message, TOPIC_PILOTS.followUps);
    case "topic/build-vs-buy":    return single(TOPIC_BUILD_VS_BUY.message, TOPIC_BUILD_VS_BUY.followUps);
    case "topic/llms":            return single(TOPIC_LLMS.message, TOPIC_LLMS.followUps);
    case "topic/governance":      return single(TOPIC_GOVERNANCE.message, TOPIC_GOVERNANCE.followUps);
    case "topic/timeline":        return single(TOPIC_TIMELINE.message, TOPIC_TIMELINE.followUps);
    case "topic/talent":          return single(TOPIC_TALENT.message, TOPIC_TALENT.followUps);

    default:
      return freeTextResponse(userInput);
  }
}

// ─── Support step-action handler ──────────────────────────────────────────────
export function processSupportAction(stepAction: string): RouteResponse {
  if (stepAction === "existing-client") {
    return single(SUPPORT.existingClient, SUPPORT.existingClientFollowUps);
  }
  if (stepAction === "general-inquiry") {
    return single(SUPPORT.generalInquiry, SUPPORT.generalInquiryFollowUps);
  }
  return freeTextResponse(stepAction);
}

// ─── Free text handler ────────────────────────────────────────────────────────
export function freeTextResponse(input: string): RouteResponse {
  const match = matchFreeTextIntent(input);
  if (match) {
    return {
      message: match.message,
      followUps: match.followUps,
      nextPlaceholder: DEFAULT_PLACEHOLDER,
      inputDisabled: false,
      terminal: true,
    };
  }
  return {
    message: FREE_TEXT_FALLBACK,
    followUps: [
      { label: "Brief us on a mission", routeId: "mission-intake" as RouteId },
      { label: "What does Endurance do?", routeId: "what-we-do" as RouteId },
      { label: "Talk to the team", routeId: "talk-to-team" as RouteId },
    ],
    nextPlaceholder: DEFAULT_PLACEHOLDER,
    inputDisabled: false,
    terminal: true,
  };
}
