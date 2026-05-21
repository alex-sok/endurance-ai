// TODO(alex): provide high-res square headshots in /public/logistics/team/
// — dark backgrounds preferred. Add bios + prior companies + the one-line
// credibility hook below.

export const founders = [
  {
    name: "Alex Sok",
    role: "Founder & CEO",
    headshot: null, // TODO(alex): /public/logistics/team/alex.jpg
    hook: "TODO(alex): one-line credibility hook",
    bio: "TODO(alex): 2–3 sentence bio. Prior companies, why logistics, why now.",
  },
  {
    name: "Sid Bhambhani",
    role: "Co-Founder & CTO",
    headshot: null,
    hook: "TODO(alex)",
    bio: "TODO(alex)",
  },
  {
    name: "Nick Maxwell",
    role: "Co-Founder & Chief AI Officer",
    headshot: null,
    hook: "TODO(alex)",
    bio: "TODO(alex)",
  },
] as const;

// TODO(alex): supply advisor + investor logos (SVG, monochrome).
export const advisors: { name: string; logo: string | null }[] = [
  { name: "TODO(alex): Advisor 1", logo: null },
  { name: "TODO(alex): Advisor 2", logo: null },
  { name: "TODO(alex): Advisor 3", logo: null },
  { name: "TODO(alex): Advisor 4", logo: null },
];
