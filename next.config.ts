import type { NextConfig } from "next";

const securityHeaders = [
  // Prevent cross-origin clickjacking (same-origin framing allowed for the /brain demo shell)
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Prevent MIME-type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Control referrer info sent with requests
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Force HTTPS for 2 years, include subdomains
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Disable access to sensitive browser APIs
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  // Content Security Policy
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Next.js requires unsafe-inline for its runtime scripts; Apollo tracker CDN
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://assets.apollo.io",
      // Inline styles used by Tailwind + Google Fonts
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      // OpenStreetMap raster tiles for the Margins demo's live shipment map (/margins)
      "img-src 'self' data: blob: https://*.tile.openstreetmap.org",
      // Allow calls to our own API, xAI (streaming), OpenAI (embeddings), and Apollo tracking
      "connect-src 'self' https://api.x.ai https://hooks.slack.com https://api.openai.com https://*.apollo.io https://aplo-evnt.com",
      // Draco/GLTF decoders (proxied /logistics/new WebGL hero) run in blob-URL workers
      "worker-src 'self' blob:",
      // No iframes anywhere
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // Home dir has a stray package-lock.json; pin Turbopack to this app so
  // tailwindcss resolves from endurance-ai/node_modules, not ~/ .
  turbopack: {
    root: __dirname,
  },
  // Serve proxied static demos under a trailing-slash subpath (e.g. /remi/) without
  // Next auto-stripping the slash — required so the demo's relative asset paths
  // (external styles.css, console.html) resolve under the subpath instead of root.
  // Only affects the auto trailing-slash redirect; explicit redirects still apply.
  skipTrailingSlashRedirect: true,
  // Keep pdf-parse and mammoth out of the webpack bundle — they're CJS
  // modules with file-system side effects that break when bundled
  serverExternalPackages: ["pdf-parse", "mammoth"],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  // Serve the 1100 Group landing page (hosted on GitHub Pages) at endurancelabs.ai/1100
  // via a reverse-proxy rewrite — the address bar stays on our domain, no redirect.
  async rewrites() {
    return [
      { source: "/1100", destination: "https://endurance-ai-labs.github.io/1100-group-landing/index.html" },
      { source: "/1100/:path*", destination: "https://endurance-ai-labs.github.io/1100-group-landing/:path*" },
      // Brain Powered Operating System (Next.js app on Vercel) at endurancelabs.ai/BPOS
      // via a reverse-proxy rewrite. The app is served under basePath "/BPOS", so all of
      // its routes and assets are self-contained under that subpath — the address bar
      // stays on our domain, no redirect.
      { source: "/BPOS", destination: "https://brain-powered-os.vercel.app/BPOS" },
      { source: "/BPOS/:path*", destination: "https://brain-powered-os.vercel.app/BPOS/:path*" },
      // Remi (AI conversation-intelligence demo on GitHub Pages) at endurancelabs.ai/remi
      // via a reverse-proxy rewrite. skipTrailingSlashRedirect (above) keeps /remi/ from
      // being stripped; the page itself hops /remi -> /remi/ client-side so its external
      // styles.css and relative links resolve under the subpath.
      { source: "/remi", destination: "https://endurance-ai-labs.github.io/ella-demo/index.html" },
      { source: "/remi/:path*", destination: "https://endurance-ai-labs.github.io/ella-demo/:path*" },
      // Margins marketing landing is app/margins/page.tsx — exact /margins
      // must never proxy. The live commissions demo stays under /margins/app.
      { source: "/margins/app", destination: "https://payline-commissions-demo-sigma.vercel.app/margins" },
      { source: "/margins/app/:path*", destination: "https://payline-commissions-demo-sigma.vercel.app/margins/:path*" },
      // Endurance Logistics marketing site (GitHub Pages) at endurancelabs.ai/logistics/new
      // via a reverse-proxy rewrite, same pattern as /1100 and /remi. Public — proxy.ts
      // exempts /logistics/new from the /logistics investor-page gate. The page hops
      // /logistics/new -> /logistics/new/ client-side so its relative assets resolve.
      { source: "/logistics/new", destination: "https://endurance-ai-labs.github.io/endurance-logistics/index.html" },
      { source: "/logistics/new/:path*", destination: "https://endurance-ai-labs.github.io/endurance-logistics/:path*" },
      // Whitmore Vance LLP — law firm operating-system demo (GitHub Pages) at
      // endurancelabs.ai/law via a reverse-proxy rewrite. Unlike the CFP Portal
      // (see redirects below), this one proxies cleanly: every asset and route in
      // the portal is written under the "/law" prefix, so nothing resolves to a
      // root-absolute path that would 404 under the subpath. The GitHub Pages
      // project path is also /law, so the two spaces line up exactly.
      // Order matters. GitHub Pages answers a directory request that has no
      // trailing slash with a 301 to the slashed form, and a proxy passes that
      // redirect straight through — which would bounce the visitor off this
      // domain onto github.io. So directories are rewritten to their index.html
      // explicitly and never round-trip through that redirect. Assets are
      // matched first by their file extension and passed through untouched.
      { source: "/law", destination: "https://endurance-ai-labs.github.io/law/index.html" },
      { source: "/law/", destination: "https://endurance-ai-labs.github.io/law/index.html" },
      { source: "/law/:file(.*\\.[a-zA-Z0-9]+)", destination: "https://endurance-ai-labs.github.io/law/:file" },
      { source: "/law/:path*/", destination: "https://endurance-ai-labs.github.io/law/:path*/index.html" },
      { source: "/law/:path*", destination: "https://endurance-ai-labs.github.io/law/:path*/index.html" },
      // Hospitality operating system (multi-unit restaurant group portal, hosted on
      // GitHub Pages) at endurancelabs.ai/hospitality. Same clean-proxy pattern as
      // /law: every asset and route is written under the "/hospitality" prefix, and
      // the GitHub Pages project path is also /hospitality, so the two spaces line
      // up exactly and nothing resolves to a root-absolute path that would 404.
      { source: "/hospitality", destination: "https://endurance-ai-labs.github.io/hospitality/index.html" },
      { source: "/hospitality/:path*", destination: "https://endurance-ai-labs.github.io/hospitality/:path*" },
      // Wealth management portals, all hosted on GitHub Pages. Same clean-proxy
      // pattern as /law: each repository is named for its path and every asset
      // and route inside it is written under that prefix, so the proxied path
      // and the Pages project path line up exactly. Directories are rewritten
      // to their index.html explicitly so nothing round-trips through the
      // GitHub Pages trailing-slash redirect.
      // Blackmont Advisors wealth portal (client-facing demo)
      { source: "/wealthmanagement", destination: "https://endurance-ai-labs.github.io/wealthmanagement/index.html" },
      { source: "/wealthmanagement/", destination: "https://endurance-ai-labs.github.io/wealthmanagement/index.html" },
      { source: "/wealthmanagement/:file(.*\.[a-zA-Z0-9]+)", destination: "https://endurance-ai-labs.github.io/wealthmanagement/:file" },
      { source: "/wealthmanagement/:path*/", destination: "https://endurance-ai-labs.github.io/wealthmanagement/:path*/index.html" },
      { source: "/wealthmanagement/:path*", destination: "https://endurance-ai-labs.github.io/wealthmanagement/:path*/index.html" },
      // Blackmont Advisors, also reachable at its own name
      { source: "/blackmont", destination: "https://endurance-ai-labs.github.io/blackmont/index.html" },
      { source: "/blackmont/", destination: "https://endurance-ai-labs.github.io/blackmont/index.html" },
      { source: "/blackmont/:file(.*\.[a-zA-Z0-9]+)", destination: "https://endurance-ai-labs.github.io/blackmont/:file" },
      { source: "/blackmont/:path*/", destination: "https://endurance-ai-labs.github.io/blackmont/:path*/index.html" },
      { source: "/blackmont/:path*", destination: "https://endurance-ai-labs.github.io/blackmont/:path*/index.html" },
      // Evolve Private Wealth prospect demo
      { source: "/evolve", destination: "https://endurance-ai-labs.github.io/evolve/index.html" },
      { source: "/evolve/", destination: "https://endurance-ai-labs.github.io/evolve/index.html" },
      { source: "/evolve/:file(.*\.[a-zA-Z0-9]+)", destination: "https://endurance-ai-labs.github.io/evolve/:file" },
      { source: "/evolve/:path*/", destination: "https://endurance-ai-labs.github.io/evolve/:path*/index.html" },
      { source: "/evolve/:path*", destination: "https://endurance-ai-labs.github.io/evolve/:path*/index.html" },
      // Rosemont Partners, the generic wealth reference build
      { source: "/rosemont", destination: "https://endurance-ai-labs.github.io/rosemont/index.html" },
      { source: "/rosemont/", destination: "https://endurance-ai-labs.github.io/rosemont/index.html" },
      { source: "/rosemont/:file(.*\.[a-zA-Z0-9]+)", destination: "https://endurance-ai-labs.github.io/rosemont/:file" },
      { source: "/rosemont/:path*/", destination: "https://endurance-ai-labs.github.io/rosemont/:path*/index.html" },
      { source: "/rosemont/:path*", destination: "https://endurance-ai-labs.github.io/rosemont/:path*/index.html" },
    ];
  },
  // CFP Portal (Cloudflare Pages app) at endurancelabs.ai/CFPportal.
  // Redirect rather than a /1100-style proxy rewrite: the portal uses
  // root-absolute asset paths (/css, /js, /data, /api) that would 404
  // under a subpath proxy. Lowercase variants included for typed URLs.
  async redirects() {
    return [
      { source: "/CFPportal", destination: "https://cfp-portal-endurance.pages.dev/", permanent: false },
      { source: "/CFPportal/:path*", destination: "https://cfp-portal-endurance.pages.dev/:path*", permanent: false },
      { source: "/cfpportal", destination: "https://cfp-portal-endurance.pages.dev/", permanent: false },
      { source: "/cfpportal/:path*", destination: "https://cfp-portal-endurance.pages.dev/:path*", permanent: false },
    ];
  },
};

export default nextConfig;
