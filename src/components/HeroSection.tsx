import { ArrowUpRight } from 'lucide-react';
import myPhoto from '../assets/Logos/My-Photo.jpg';
import { CONTACT_INFO, HERO_FEATURED_PROJECT, HERO_INTRO_PARAGRAPHS } from '../data/content';
import { CV_DOWNLOAD_URL } from '../lib/api';
import type { PortfolioTheme } from '../theme/portfolioTheme';

type HeroSectionProps = {
  theme: PortfolioTheme;
  cvAvailable: boolean | null;
};

export function HeroSection({ theme, cvAvailable }: HeroSectionProps) {
  return (
    <section id="about" className="mb-24 md:mb-48 grid grid-cols-12 gap-y-8">
      <div className="col-span-12 flex flex-col gap-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-stretch md:gap-x-10 lg:gap-x-16">
          <div className="mx-auto w-full max-w-sm shrink-0 md:mx-0">
            <div className={theme.heroPhotoWrap}>
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

          <div className="flex min-w-0 flex-1 flex-col md:h-[32rem]">
            <div
              className={`${theme.heroQuoteCard} flex h-full flex-col gap-6 overflow-hidden px-5 py-5 sm:px-6 sm:py-6 md:px-7 md:py-7`}
            >
              {/* About */}
              <div className="relative z-[1] flex flex-col gap-3">
                <span className={theme.heroQuoteLabel}>About</span>
                <div className="space-y-3">
                  {HERO_INTRO_PARAGRAPHS.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 32)}
                      className="m-0 text-base leading-relaxed text-pretty font-sans text-slate-200 sm:text-[1.05rem] sm:leading-7"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Graduation project */}
              <div className="relative z-[1] flex flex-col gap-2.5 border-t border-cyan-500/25 pt-5">
                <span className={theme.heroQuoteLabel}>{HERO_FEATURED_PROJECT.label}</span>
                <div className="flex flex-col gap-1">
                  <h2 className="m-0 text-lg font-semibold tracking-tight text-slate-50 sm:text-xl">
                    {HERO_FEATURED_PROJECT.title}
                  </h2>
                  <p className="m-0 text-xs font-sans font-medium tracking-wide text-cyan-300/85">
                    {HERO_FEATURED_PROJECT.category}
                  </p>
                </div>
                <p className="m-0 text-base leading-relaxed text-pretty font-sans text-slate-400 sm:leading-7">
                  {HERO_FEATURED_PROJECT.description}
                </p>
                <div className="mt-1 flex flex-wrap gap-2">
                  {HERO_FEATURED_PROJECT.tools.map((tool) => (
                    <span key={tool} className={theme.chip}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {cvAvailable === false ? (
          <p className={`text-xs ${theme.mutedDate}`}>
            {import.meta.env.DEV ? (
              <>
                CV PDF — add{' '}
                <code className="text-cyan-400/80">public/cv/YousefCv.pdf</code>
              </>
            ) : (
              <>CV download coming soon.</>
            )}
          </p>
        ) : (
          <a
            href={CV_DOWNLOAD_URL}
            download
            className={`${theme.cvButton} w-fit max-w-full ${cvAvailable === null ? 'pointer-events-none opacity-60' : ''}`}
            aria-disabled={cvAvailable === null}
          >
            Download CV <ArrowUpRight size={16} aria-hidden />
          </a>
        )}
      </div>
    </section>
  );
}
