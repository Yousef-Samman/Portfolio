import { useEffect, useState } from 'react';

export function useBootOverlay() {
  const [bootCover, setBootCover] = useState(true);
  const [bootFadeOut, setBootFadeOut] = useState(false);

  useEffect(() => {
    const unlockScroll = () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setBootCover(false);
      unlockScroll();
      return undefined;
    }

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
