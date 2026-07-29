import { ArrowUpRight } from 'lucide-react';
import myPhoto from '../assets/Logos/My-Photo.jpg';
import { CONTACT_INFO, HERO_INTRO_PARAGRAPHS } from '../data/content';
import { CV_DOWNLOAD_URL } from '../lib/api';
import type { PortfolioTheme } from '../theme/portfolioTheme';

type HeroSectionProps = {
  theme: PortfolioTheme;
  cvAvailable: boolean | null;
};

export function HeroSection({ theme, cvAvailable }: HeroSectionProps) {
  return (
    <section id="about" className="mb-24 md:mb-48 grid grid-cols-12 gap-y-8">
      <div className="col-span-12">
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

          {/* Column matches photo height; card sits centered in the middle */}
          <div className="flex min-w-0 flex-1 flex-col justify-center self-stretch">
            <div
              className={`${theme.heroQuoteCard} relative z-[1] flex w-full flex-col gap-5 px-5 py-6 sm:gap-6 sm:px-6 sm:py-7 md:px-8 md:py-8`}
            >
              <span className={theme.heroQuoteLabel}>About</span>
              <div className="max-w-prose space-y-3">
                {HERO_INTRO_PARAGRAPHS.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="m-0 text-base leading-relaxed text-pretty font-sans text-slate-200 sm:text-[1.05rem] sm:leading-7"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {cvAvailable === false ? (
                <p className={`relative z-[1] text-xs ${theme.mutedDate}`}>
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
                  className={`${theme.cvButton} relative z-[1] w-fit max-w-full ${cvAvailable === null ? 'pointer-events-none opacity-60' : ''}`}
                  aria-disabled={cvAvailable === null}
                >
                  Download CV <ArrowUpRight size={16} aria-hidden />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
