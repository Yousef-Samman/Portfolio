import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls to `#hash` after client-side navigations (e.g. `/projects` → `/#experience`).
 * Without a hash, scrolls to top on pathname change.
 */
export function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const scroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return true;
        }
        return false;
      };

      if (scroll()) return;

      // Homepage sections may mount one tick later after navigating from another route.
      const t = window.setTimeout(() => {
        if (!scroll()) window.scrollTo(0, 0);
      }, 50);
      return () => window.clearTimeout(t);
    }

    window.scrollTo(0, 0);
    return undefined;
  }, [pathname, hash]);

  return null;
}
