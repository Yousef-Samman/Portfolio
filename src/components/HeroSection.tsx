import { ArrowUpRight } from 'lucide-react';
import myPhoto from '../assets/Logos/My-Photo.jpg';
import { CONTACT_INFO, HERO_INTRO_TEXT, HERO_QUOTE_TEXT } from '../data/content';
import { CV_DOWNLOAD_URL } from '../lib/api';
import type { PortfolioTheme } from '../theme/portfolioTheme';

type HeroSectionProps = {
  theme: PortfolioTheme;
  cvAvailable: boolean | null;
};

export function HeroSection({ theme, cvAvailable }: HeroSectionProps) {
  return (
    <section id="about" className="mb-48 grid grid-cols-12 gap-y-8">
      <div className="col-span-12">
        <span className={theme.statusBadge}>
          {theme.statusPing ? (
            <span className="relative flex h-1.5 w-1.5">
              <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-55" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
            </span>
          ) : null}
          Status — Online
        </span>
      </div>
      <div className="col-span-12 flex flex-col md:flex-row md:items-center gap-x-10 md:gap-x-12 lg:gap-x-16 gap-y-8">
        <div className="mx-auto w-full max-w-sm shrink-0 md:mx-0">
          <div className={`${theme.heroPhotoWrap} md:mb-0`}>
            <img
              src={myPhoto}
              alt={`Portrait of ${CONTACT_INFO.name}`}
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col items-stretch md:grid md:min-h-[32rem] md:max-w-none md:grid-rows-[1fr_auto] md:gap-y-8">
          <div className="flex min-h-0 w-full max-w-2xl flex-1 flex-col justify-center md:h-full md:min-h-0 md:flex-none md:justify-center">
            <div className={theme.heroQuoteCard}>
              <span className={theme.heroQuoteLabel}>Personal slogan</span>
              <span className={theme.heroQuoteMark} aria-hidden>
                &ldquo;
              </span>
              <blockquote className={`relative z-[1] m-0 ${theme.heroQuote}`}>
                <p>{HERO_QUOTE_TEXT}</p>
              </blockquote>
              <p className={theme.heroIntroInCard}>{HERO_INTRO_TEXT}</p>
            </div>
          </div>
          {cvAvailable === false ? (
            <p className={`mt-10 text-xs ${theme.mutedDate} md:row-start-2 md:mt-0`}>
              {import.meta.env.DEV ? (
                <>
                  CV PDF — add{' '}
                  <code className="text-emerald-400/80">public/cv/YousefCv.pdf</code>
                </>
              ) : (
                <>CV download coming soon.</>
              )}
            </p>
          ) : (
            <a
              href={CV_DOWNLOAD_URL}
              download
              className={`${theme.cvButton} mt-10 w-fit max-w-full shrink-0 self-start justify-self-start md:row-start-2 md:mt-0 ${cvAvailable === null ? 'pointer-events-none opacity-60' : ''}`}
              aria-disabled={cvAvailable === null}
            >
              Download CV <ArrowUpRight size={12} aria-hidden />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
