import { useEffect, useState } from 'react';

export function useBootOverlay() {
  const [bootCover, setBootCover] = useState(true);
  const [bootFadeOut, setBootFadeOut] = useState(false);

  useEffect(() => {
    const unlockScroll = () => {
      document.documentElement.style.removeProperty('overflow');
      document.body.style.removeProperty('overflow');
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setBootCover(false);
      unlockScroll();
      return undefined;
    }

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    const fadeTimer = window.setTimeout(() => setBootFadeOut(true), 1100);
    const hideTimer = window.setTimeout(() => {
      setBootCover(false);
      unlockScroll();
    }, 1680);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
      unlockScroll();
    };
  }, []);

  return { bootCover, bootFadeOut };
}
