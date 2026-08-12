import type { ReactNode } from 'react';
import { AiBackdrop } from './AiBackdrop';
import { ModelBootOverlay } from './ModelBootOverlay';
import { PortfolioFooter } from './PortfolioFooter';
import { PortfolioHeader } from './PortfolioHeader';
import { ScrollToHash } from './ScrollToHash';
import { useActiveNavSection } from '../hooks/useActiveNavSection';
import { useBootOverlay } from '../hooks/useBootOverlay';
import { usePortfolioAiClass } from '../hooks/usePortfolioAiClass';
import { getPortfolioTheme } from '../theme/portfolioTheme';

type PortfolioLayoutProps = {
  children: ReactNode;
  /** First-load boot overlay — typically homepage only. */
  showBootOverlay?: boolean;
  /** Site name / socials / primary nav. Hide on focused pages (e.g. project detail). */
  showHeader?: boolean;
  showFooter?: boolean;
};

/** Mounted only when needed so body scroll lock does not run on other routes. */
function BootOverlayHost() {
  const { bootCover, bootFadeOut } = useBootOverlay();
  if (!bootCover) return null;
  return <ModelBootOverlay fadeOut={bootFadeOut} />;
}

export function PortfolioLayout({
  children,
  showBootOverlay = false,
  showHeader = true,
  showFooter = true,
}: PortfolioLayoutProps) {
  const theme = getPortfolioTheme();
  const activeSection = useActiveNavSection();

  usePortfolioAiClass();

  const mainPad = showHeader
    ? 'mx-auto max-w-[1440px] px-4 pb-20 pt-4 sm:px-6 sm:pb-28 sm:pt-12 md:px-12 md:pb-32 md:pt-16 lg:px-24'
    : 'mx-auto max-w-[1440px] px-4 pb-16 pt-4 sm:px-6 sm:pb-20 sm:pt-10 md:px-12 md:pb-24 md:pt-12 lg:px-24';

  return (
    <div className={`${theme.shell} relative`}>
      <ScrollToHash />
      {/*
        Safari 26+ samples fixed/sticky edge backgrounds to tint the top chrome.
        A solid fixed bg creates the hard top “border” bar. This 4px sampler has
        NO background-color on purpose → translucent chrome; page shows through.
      */}
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-[2] h-1 w-full"
        aria-hidden
      />
      {/* Visual backdrop only — wrapper must stay background-free for the sampler above */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
        <AiBackdrop />
      </div>

      <div className="relative z-10 min-h-[100dvh] min-h-[100svh]">
        <main className={mainPad}>
          {showHeader ? (
            <PortfolioHeader theme={theme} activeSection={activeSection} />
          ) : null}
          {children}
        </main>

        {showFooter ? <PortfolioFooter theme={theme} /> : null}
      </div>

      {showBootOverlay ? <BootOverlayHost /> : null}
    </div>
  );
}
