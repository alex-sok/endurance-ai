export type LearnArticle = {
  slug: string;
  kicker: string;
  hed: string;
  dek: string;
  pull: string;
  grafs: string[];
  close: string;
};

export const LEARN_INDEX_LINE =
  "You already have AI. The question is where it sits.";

export const LEARN_ARTICLES: LearnArticle[] = [
  {
    slug: "what-is-ai",
    kicker: "LEARN · 01",
    hed: "You already have AI. The question is where it sits.",
    dek: "A chat window is one surface. It is not the work.",
    pull: "A claim without a source is a rumor.",
    grafs: [
      "Most people say AI and mean a box you type into.",
      "That box is real. It is also the least interesting part.",
      "AI is software that can take a judgment that used to require a person and run it as a system.",
      "Read a pile. Classify a load. Draft a statement. Apply a split. Flag the thing that does not belong.",
      "Language models made that cheap. They did not make it true.",
      "A large language model is trained to predict what comes next in language. It is very good at reading and writing.",
      "It is not a general. It is not your ledger.",
      "It has no memory of your company except what you put in front of it, in the moment, under a permission.",
      "If you ask it for a source it does not have, it will often give you one anyway. That is not malice. That is how prediction works.",
      "So the question is not whether you get AI. You already have it.",
      "The question is whether it sits on the mess as a chat window, or in the operation as the thing that runs the week.",
      "Chat can summarize the meeting. It cannot be the system of record. It cannot own the number on Friday.",
      "It cannot tell you, with a trail, why this broker was paid this amount on this load. That is the line.",
      "Brain exists because a claim without a source is a rumor.",
      "Margins exists because a pay run without a computation is a spreadsheet with a person attached to it.",
      "Both are AI. Neither is a chatbot with a new skin.",
      "If you cannot say what the system may do, what it may not, whose data it can see, and who still owns the exception, you do not have AI in the company. You have a demo.",
      "Start with one desk. Make the trail visible. If Friday is cleaner, you have something you can roll.",
    ],
    close:
      "The next century does not go to whoever chats best. It goes to whoever cites the source and settles the money.",
  },
  {
    slug: "what-happens-to-my-data",
    kicker: "LEARN · 02",
    hed: "If you cannot show the source, you do not have AI.",
    dek: "The model is not a warehouse. Friday still needs a trail.",
    pull: "If it cannot be cited, it does not ship.",
    grafs: [
      "The serious question is not whether the model is smart.",
      "It is where this number came from, who was allowed to see it, and whether you can prove that on Friday.",
      "An LLM does not have your company. It has a context window and a habit of filling gaps.",
      "If you pour a warehouse into a public model, you have not adopted AI. You have mailed the warehouse.",
      "If you ask a chat window to remember the pay run, it will remember a version of it. That version is not a ledger.",
      "The rule is boring. It is the only one that survives a diligence call.",
      "Your data stays in your environment when the work requires it.",
      "Access is permissioned. There is a trail. We do not train external models on your data.",
      "That is not a badge. It is how the system is allowed to run.",
      "Margins does not know a load the way a chatbot knows a paragraph.",
      "It reads the TMS under a permission, computes a split under a rule, and writes a line you can point at.",
      "If a load pays twice, the miss is a record, not a vibe.",
      "Brain does not answer from a private myth of the firm. It answers from a source. If there is no source, there is no claim.",
      "Governance is the same problem in slower language.",
      "Who can see the week. Who can change a rule. What counts as an exception. What gets logged.",
      "If those questions live in a PDF and not in the path from ingest to payday, you do not have governance. You have a policy.",
      "Start small here too. One desk. One permission. One week.",
      "If you cannot say who saw the file and why a line changed, you are not ready to put the rest of the company behind a model.",
    ],
    close:
      "The next century does not go to whoever uploaded the most. It goes to whoever can still show the source.",
  },
];

export function getLearnArticle(slug: string): LearnArticle | undefined {
  return LEARN_ARTICLES.find((article) => article.slug === slug);
}
