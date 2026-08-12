import { ArrowDown, ArrowUpRight } from 'lucide-react';
import myPhoto from '../assets/Logos/My-Photo.jpg';
import { CONTACT_INFO, HERO_INTRO_PARAGRAPHS } from '../data/content';
import type { PortfolioTheme } from '../theme/portfolioTheme';

type HeroSectionProps = {
  theme: PortfolioTheme;
  cvAvailable: boolean | null;
  cvDownloadUrl: string;
};

export function HeroSection({ theme, cvAvailable, cvDownloadUrl }: HeroSectionProps) {
  return (
    <section id="about" className="mb-16 grid grid-cols-12 gap-y-8 sm:mb-24 md:mb-28">
      <div className="col-span-12">
        <div className="mb-8 flex flex-col gap-2 sm:mb-10">
          <p className={theme.sectionEyebrow}>
            <span className={theme.sectionEyebrowMark} aria-hidden />
            Portfolio home
          </p>
          <p className="max-w-2xl text-sm text-slate-400 sm:text-base">
            IT graduate · AI engineering track · grounded ChatBot for recruiters and collaborators.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:items-stretch lg:gap-10 xl:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] xl:gap-12">
          <div className="mx-auto w-full max-w-xs sm:max-w-sm lg:mx-0 lg:max-w-none">
            <div className={theme.heroPhotoWrap}>
              <img
                src={myPhoto}
                alt={`Portrait of ${CONTACT_INFO.name}`}
                className="absolute inset-0 h-full w-full object-cover object-[center_12%] transition-transform duration-500 ease-out hover:scale-[1.03]"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030508]/70 via-transparent to-cyan-950/10"
                aria-hidden
              />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-200/90">
                  {CONTACT_INFO.location}
                </p>
              </div>
            </div>
          </div>

          <div className="flex min-w-0 flex-col justify-center">
            <div
              className={`${theme.heroQuoteCard} relative z-[1] flex w-full flex-col gap-5 px-5 py-6 sm:gap-6 sm:px-7 sm:py-8 md:px-8`}
            >
              <span className={theme.heroQuoteLabel}>About</span>
              <div className="max-w-prose space-y-3.5">
                {HERO_INTRO_PARAGRAPHS.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="m-0 text-base leading-relaxed text-pretty font-sans text-slate-200 sm:text-[1.05rem] sm:leading-7"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="relative z-[1] flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
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
                    href={cvDownloadUrl}
                    download="YousefCv.pdf"
                    className={`${theme.cvButton} w-full max-w-full sm:w-fit ${cvAvailable === null ? 'pointer-events-none opacity-60' : ''}`}
                    aria-disabled={cvAvailable === null}
                  >
                    Download CV <ArrowUpRight size={16} aria-hidden />
                  </a>
                )}
                <a
                  href="#yousefai"
                  className={`${theme.ghostButton} min-h-11 justify-center px-4 text-[11px] sm:justify-start`}
                >
                  Ask the ChatBot
                  <ArrowDown className="h-3.5 w-3.5" aria-hidden />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
