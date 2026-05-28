import { useEffect, useState } from 'react';
import { NAV_SECTION_IDS, type NavSectionId } from '../config/navigation';

export function useActiveNavSection() {
  const [activeSection, setActiveSection] = useState<NavSectionId>(NAV_SECTION_IDS[0]);

  useEffect(() => {
    let raf = 0;
    const offset = () =>
      Math.min(200, Math.max(112, Math.round(window.innerHeight * 0.2)));

    const update = () => {
      let current: NavSectionId = NAV_SECTION_IDS[0];
      const y = offset();
      for (const id of NAV_SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= y) current = id;
      }
      setActiveSection((prev) => (prev === current ? prev : current));
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
  }, []);

  return activeSection;
}
