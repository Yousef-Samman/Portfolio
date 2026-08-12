import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  IN_PAGE_SECTION_IDS,
  type InPageSectionId,
  type NavItemId,
} from '../config/navigation';

function activeFromPathname(pathname: string): NavItemId | null {
  if (pathname === '/contact' || pathname.startsWith('/contact/')) {
    return 'contact';
  }
  if (pathname === '/projects' || pathname.startsWith('/projects/')) {
    return 'projects';
  }
  return null;
}

/**
 * Highlights the current nav item: route-based for Projects/Contact,
 * scroll-spy for in-page homepage sections only.
 */
export function useActiveNavSection(): NavItemId {
  const { pathname } = useLocation();
  const routeActive = activeFromPathname(pathname);
  const [scrollActive, setScrollActive] = useState<InPageSectionId>(
    IN_PAGE_SECTION_IDS[0],
  );

  useEffect(() => {
    if (routeActive) return;

    let raf = 0;
    const offset = () =>
      Math.min(200, Math.max(112, Math.round(window.innerHeight * 0.2)));

    const update = () => {
      let current: InPageSectionId = IN_PAGE_SECTION_IDS[0];
      const y = offset();
      for (const id of IN_PAGE_SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= y) current = id;
      }
      setScrollActive((prev) => (prev === current ? prev : current));
    };

    const onScrollOrResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    onScrollOrResize();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [routeActive]);

  return routeActive ?? scrollActive;
}
