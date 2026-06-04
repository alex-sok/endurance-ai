// TODO(alex): provide high-res square headshots in /public/logistics/team/
// — dark backgrounds preferred. Until then, cards fall back to monogram initials.

export const founders = [
  {
    name: "Alex Sok",
    role: "Co-founder, CEO",
    headshot: null, // TODO(alex): /public/logistics/team/alex.jpg
    hook: "3x founder, angel investor (Spline, Superroot, Cairnspring), joined stealth AI/ML lab in 2018 and led product design, 0-$120M ARR in 24 months.",
    bio: "3x founder, angel investor (Spline, Superroot, Cairnspring), joined stealth AI/ML lab in 2018 and led product design, 0-$120M ARR in 24 months.",
  },
  {
    name: "Nick Maxwell",
    role: "Co-founder, CTO",
    headshot: null, // TODO(alex): /public/logistics/team/nick.jpg
    hook: "2x founder, founding engineer at Tala Security acquired by Intuit, Cornell CS.",
    bio: "2x founder, founding engineer at Tala Security acquired by Intuit, Cornell CS.",
  },
  {
    name: "Anthony Haralson",
    role: "Founding Partner, VP of GTM",
    headshot: null, // TODO(alex): /public/logistics/team/anthony.jpg
    hook: "Two decades of executive and investment experience across biopharma, financial services, and medtech at Pfizer, Abbott, and Goldman Sachs. Michigan grad and Dartmouth MBA.",
    bio: "Two decades of executive and investment experience across biopharma, financial services, and medtech at Pfizer, Abbott, and Goldman Sachs. Michigan grad and Dartmouth MBA.",
  },
  {
    name: "Ramzy Azar",
    role: "Founding Partner, VP of Ops",
    headshot: null, // TODO(alex): /public/logistics/team/ramzy.jpg
    hook: "Principal real estate investment fund, operator, Cal grad.",
    bio: "Principal real estate investment fund, operator, Cal grad.",
  },
] as const;

// TODO(alex): supply advisor + investor logos (SVG, monochrome).
export const advisors: { name: string; logo: string | null }[] = [
  { name: "TODO(alex): Advisor 1", logo: null },
  { name: "TODO(alex): Advisor 2", logo: null },
  { name: "TODO(alex): Advisor 3", logo: null },
  { name: "TODO(alex): Advisor 4", logo: null },
];
