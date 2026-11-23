export const SITE_URL = "https://endurancelabs.ai";

export const HOME_TITLE = "BrainOS by endurance | A company brain for operators";

export const HOME_DESCRIPTION =
  "BrainOS organizes your company’s knowledge, learns from every task, and helps everyone do more. Built for manufacturing, construction, logistics, energy, facilities management, and real estate.";

const organization = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "endurance",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-endurance.svg`,
  email: "hello@endurancelabs.ai",
  foundingDate: "2025",
  description: HOME_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    addressLocality: "San Francisco",
    addressRegion: "CA",
    addressCountry: "US",
  },
  founder: [
    { "@type": "Person", name: "Alex Sok", jobTitle: "Co-founder & CEO", sameAs: "https://www.linkedin.com/in/alexsok" },
    { "@type": "Person", name: "Nick Maxwell", jobTitle: "Co-founder & CTO" },
    { "@type": "Person", name: "Ramzy Azar", jobTitle: "Co-founder & COO" },
  ],
  sameAs: ["https://www.linkedin.com/company/endurance-ai-labs"],
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@endurancelabs.ai",
    contactType: "customer service",
  },
};

export function organizationNode() {
  return organization;
}

export function homepageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "endurance",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/#brainos`,
        name: "BrainOS",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: `${SITE_URL}/brain-os`,
        description: HOME_DESCRIPTION,
        provider: { "@id": `${SITE_URL}/#organization` },
        featureList: [
          "Manufacturing",
          "Construction",
          "Logistics",
          "Energy",
          "Facilities management",
          "Real estate",
        ],
      },
    ],
  };
}
