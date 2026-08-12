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
    ? 'mx-auto max-w-[1440px] px-4 pb-20 pt-12 sm:px-6 sm:pb-28 sm:pt-16 md:px-12 md:pb-32 md:pt-20 lg:px-24'
    : 'mx-auto max-w-[1440px] px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10 md:px-12 md:pb-24 md:pt-12 lg:px-24';

  return (
    <div className={theme.shell}>
      <ScrollToHash />
      <div className="fixed inset-0 z-0 overflow-hidden bg-[#030508] motion-safe:animate-backdrop-boot motion-reduce:opacity-100">
        <AiBackdrop />
      </div>

      <div className="relative z-10 min-h-[100dvh] bg-transparent">
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
