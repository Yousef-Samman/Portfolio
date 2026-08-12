import {
  EDUCATION_CERTIFICATES,
  EDUCATION_GPA,
  EDUCATION_HONOURS,
} from '../data/content';
import type { PortfolioTheme } from '../theme/portfolioTheme';

type EducationSkillsSectionProps = {
  theme: PortfolioTheme;
};

export function EducationSkillsSection({ theme }: EducationSkillsSectionProps) {
  return (
    <section id="skills" className="mb-16 border-t border-slate-600/80 pt-8 sm:mb-24 sm:pt-10 md:mb-28">
      <div className="mb-6 sm:mb-8">
        <h3 className={theme.sectionEyebrow}>
          <span className={theme.sectionEyebrowMark} aria-hidden />
          Education
        </h3>
        <p className="mt-2 max-w-xl text-sm text-slate-400">
          Degree, GPA, and certificates.
        </p>
      </div>

      <div
        className={`${theme.eduCard} max-w-none grid gap-8 lg:grid-cols-[minmax(14rem,22rem)_minmax(0,1fr)] lg:items-start lg:gap-10`}
      >
        <div className="min-w-0 lg:border-r lg:border-cyan-500/20 lg:pr-8">
          <h4 className="mb-2 font-serif text-2xl italic leading-snug text-slate-50 sm:text-3xl">
            B.Sc. Information Technology
          </h4>
          <p className="mb-2 text-sm font-medium text-cyan-200/90">
            {EDUCATION_HONOURS}
          </p>
          <p className="mb-5 text-sm text-slate-400">
            King Abdulaziz University, Jeddah
          </p>
          <div className="inline-block rounded-lg border border-cyan-500/30 bg-cyan-500/12 px-3 py-2 font-sans text-xl font-extrabold tabular-nums tracking-tight text-cyan-100 transition-colors duration-200 hover:border-cyan-400/45 hover:bg-cyan-500/18 sm:px-4 sm:py-2.5 sm:text-2xl">
            GPA: {EDUCATION_GPA}
          </div>
        </div>

        <div className="min-w-0">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-400/80">
            Certificates
          </p>
          <ul className="m-0 flex list-none flex-wrap gap-2.5 p-0 sm:gap-3">
            {EDUCATION_CERTIFICATES.map((certificate) => (
              <li key={certificate}>
                <span className="inline-flex max-w-full items-center rounded-full border border-cyan-500/25 bg-cyan-950/35 px-3.5 py-2 text-left text-[11px] font-sans uppercase tracking-wide text-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400/45 hover:bg-cyan-500/15 hover:text-cyan-50 hover:shadow-[0_0_16px_rgba(34,211,238,0.12)] sm:text-xs sm:tracking-wider">
                  {certificate}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
