import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Block admin tooling and private client portals from crawlers
        disallow: ["/admin", "/admin/", "/mission/"],
      },
    ],
    sitemap: "https://endurancelabs.ai/sitemap.xml",
  };
}
