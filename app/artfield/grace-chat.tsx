'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChatOverlay } from '@/components/landing/ChatOverlay';
import { useSiteAnalytics } from '@/hooks/useSiteAnalytics';

// Keep the existing advisor and homepage analytics when replacing LandingShell.
export function GraceChat() {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const { onSectionEnter, onChatOpen, onCtaClick, getSessionId } = useSiteAnalytics();
  const close = useCallback(() => {
    setOpen(false);
    trigger.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) onSectionEnter(entry.target.id || 'hero');
      }
    }, { threshold: .4 });
    document.querySelectorAll('#main > section').forEach(section => observer.observe(section));
    const trackLink = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a') : null;
      if (link && /^(https?:|mailto:)/.test(link.getAttribute('href') ?? '')) {
        onCtaClick(link.textContent?.trim() || link.href);
      }
    };
    document.addEventListener('click', trackLink);
    return () => {
      observer.disconnect();
      document.removeEventListener('click', trackLink);
    };
  }, [onSectionEnter, onCtaClick]);

  return <>
    <Button ref={trigger} variant="link" className="grace-link h-auto rounded-none border-0 bg-transparent p-0 font-normal" onClick={() => { setOpen(true); onChatOpen(); }}>
      Or meet Grace, our AI advisor <ArrowUpRight size={14} />
    </Button>
    {open && createPortal(<ChatOverlay open onClose={close} getSessionId={getSessionId} />, document.body)}
  </>;
}
