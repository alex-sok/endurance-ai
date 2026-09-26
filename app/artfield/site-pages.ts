// The pages that share the Artfield header and footer, and the path each one
// lights up as current. The homepage lights nothing.
export type SitePage = 'home' | 'about' | 'use-cases' | 'technical';

export const PAGE_HREF: Record<SitePage, string | null> = {
  home: null,
  about: '/about',
  'use-cases': '/brain-os/use-cases',
  technical: '/brain-os/technical',
};
