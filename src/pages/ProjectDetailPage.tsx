import type { ReactNode } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { PortfolioLayout } from '../components/PortfolioLayout';
import { getProjectBySlug, PROJECTS } from '../data/projects';
import type { ProjectItem } from '../types/portfolio';
import { getPortfolioTheme, type PortfolioTheme } from '../theme/portfolioTheme';

const articleShellClass =
  'relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900/80 via-slate-950/75 to-[#030508]/90 ring-1 ring-white/10 shadow-[0_24px_64px_-28px_rgba(0,0,0,0.75)] backdrop-blur-md';

const articleInnerClass = 'relative px-5 py-6 sm:px-8 sm:py-8 md:px-10 md:py-10';

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-white/10 pt-7 sm:pt-8">
      <h2 className="mb-3 flex items-center gap-3 text-xs font-sans font-bold uppercase tracking-[0.3em] text-slate-200">
        <span className="h-4 w-0.5 shrink-0 rounded-full bg-cyan-400/80" aria-hidden />
        {title}
      </h2>
      <div className="max-w-3xl space-y-3 pl-3.5 text-sm leading-relaxed text-slate-300 sm:pl-4 sm:text-[0.95rem] sm:leading-7">
        {children}
      </div>
    </section>
  );
}

function ProjectProgressBar({
  index,
  total,
}: {
  index: number;
  total: number;
}) {
  const current = index + 1;
  const fillPercent = total > 0 ? (current / total) * 100 : 0;

  return (
    <div
      className="w-full max-w-[13rem] sm:max-w-[15rem]"
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={current}
      aria-label={`Project ${current} of ${total}`}
    >
      <div className="mb-1.5 flex items-center justify-between gap-3 text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500">
        <span>In series</span>
        <span className="tabular-nums text-cyan-300/90">
          {current} / {total}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-slate-800 ring-1 ring-slate-700/70">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-700/90 to-cyan-400 transition-[width] duration-500 ease-out"
          style={{ width: `${fillPercent}%` }}
        />
      </div>
    </div>
  );
}

function BackToProjectsButton({ theme }: { theme: PortfolioTheme }) {
  return (
    <Link
      to="/projects"
      className={`${theme.navRouteBase} ${theme.navRouteInactive} gap-2 text-[10px] font-bold uppercase tracking-[0.14em]`}
    >
      <ArrowLeft size={14} className="shrink-0" aria-hidden />
      All projects
    </Link>
  );
}

function ProjectPager({
  previous,
  next,
}: {
  previous: ProjectItem | null;
  next: ProjectItem | null;
}) {
  if (!previous && !next) return null;

  const chipClass =
    'inline-flex min-h-9 max-w-[7.5rem] items-center gap-1.5 rounded-md border border-slate-600/90 bg-slate-950/70 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-200 transition-colors hover:border-cyan-500/45 hover:bg-cyan-950/35 hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/45 sm:max-w-[8.5rem]';

  return (
    <nav
      className="flex w-full max-w-[13rem] items-stretch justify-end gap-2 sm:max-w-[15rem]"
      aria-label="Adjacent projects"
    >
      {previous ? (
        <Link
          to={`/projects/${previous.slug}`}
          className={`${chipClass} mr-auto`}
          title={`Previous: ${previous.title}`}
        >
          <ArrowLeft size={13} className="shrink-0 text-cyan-400/90" aria-hidden />
          <span className="truncate">{previous.title}</span>
        </Link>
      ) : null}

      {next ? (
        <Link
          to={`/projects/${next.slug}`}
          className={`${chipClass} justify-end`}
          title={`Next: ${next.title}`}
        >
          <span className="truncate">{next.title}</span>
          <ArrowRight size={13} className="shrink-0 text-cyan-400/90" aria-hidden />
        </Link>
      ) : null}
    </nav>
  );
}

export function ProjectDetailPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const theme = getPortfolioTheme();
  const project = getProjectBySlug(slug);
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  const previous = index > 0 ? PROJECTS[index - 1] : null;
  const next =
    index >= 0 && index < PROJECTS.length - 1 ? PROJECTS[index + 1] : null;

  if (!project) {
    return (
      <PortfolioLayout showHeader={false} showFooter={false}>
        <p className={`text-base ${theme.lead}`}>That project was not found.</p>
        <div className="mt-6">
          <BackToProjectsButton theme={theme} />
        </div>
      </PortfolioLayout>
    );
  }

  const isFeatured = Boolean(project.featured);

  return (
    <PortfolioLayout showHeader={false} showFooter={false}>
      <div className="mb-8 flex flex-col gap-4 border-b border-slate-700/80 pb-5 sm:mb-10 sm:flex-row sm:items-start sm:justify-between sm:gap-6 sm:pb-6">
        <BackToProjectsButton theme={theme} />
        <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:items-end">
          <ProjectProgressBar index={index} total={PROJECTS.length} />
          <ProjectPager previous={previous} next={next} />
        </div>
      </div>

      <article className={`${articleShellClass} mb-2`}>
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
          aria-hidden
        />
        <div className={articleInnerClass}>
          <header className="mb-8 sm:mb-9">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              {isFeatured ? (
                <span className="inline-block text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-400/90">
                  Featured
                </span>
              ) : null}
              <p className={theme.projectCat}>{project.category}</p>
            </div>
            <h1 className="mt-2 text-balance text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">
              {project.title}
            </h1>
            <p
              className={`mt-4 max-w-3xl text-base leading-relaxed text-pretty sm:text-lg sm:leading-8 ${
                isFeatured ? 'text-slate-200' : 'text-slate-300'
              }`}
            >
              {project.description}
            </p>

            {project.liveUrl ? (
              <p className="mt-5">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${theme.navRouteBase} ${theme.navRouteInactive} gap-2 text-[10px] font-bold uppercase tracking-[0.14em]`}
                >
                  Live demo
                  <ExternalLink size={14} className="shrink-0" aria-hidden />
                </a>
              </p>
            ) : null}
          </header>

          <section className="mb-8 border-t border-white/10 pt-7 sm:mb-9 sm:pt-8" aria-labelledby="tech-stack-heading">
            <h2
              id="tech-stack-heading"
              className="mb-3 flex items-center gap-3 text-xs font-sans font-bold uppercase tracking-[0.3em] text-slate-200"
            >
              <span className="h-4 w-0.5 shrink-0 rounded-full bg-cyan-400/80" aria-hidden />
              Tech stack
            </h2>
            <ul
              className="m-0 flex list-none flex-wrap gap-2 p-0 pl-3.5 sm:pl-4"
              aria-label={`${project.title} complete tech stack`}
            >
              {project.tools.map((tool) => (
                <li key={tool}>
                  <span className={theme.chip}>{tool}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="space-y-7 sm:space-y-8">
            {project.problem ? (
              <DetailSection title="Problem / why it exists">
                <p>{project.problem}</p>
              </DetailSection>
            ) : null}

            {project.approach ? (
              <DetailSection title="How it works">
                <p>{project.approach}</p>
              </DetailSection>
            ) : null}

            {project.decisions && project.decisions.length > 0 ? (
              <DetailSection title="Key technical decisions">
                <ul className="list-none space-y-4 p-0">
                  {project.decisions.map((decision) => (
                    <li key={decision.title}>
                      <h3 className="mb-1 text-sm font-semibold text-slate-100 sm:text-base">
                        {decision.title}
                      </h3>
                      <p>{decision.detail}</p>
                    </li>
                  ))}
                </ul>
              </DetailSection>
            ) : null}

            {project.challenge ? (
              <DetailSection title="Challenge & approach">
                <p>
                  <span className="font-medium text-slate-200">Challenge: </span>
                  {project.challenge.problem}
                </p>
                <p>
                  <span className="font-medium text-slate-200">Addressed by: </span>
                  {project.challenge.solution}
                </p>
              </DetailSection>
            ) : null}

            {project.outcome ? (
              <DetailSection title="Outcome">
                <p>{project.outcome}</p>
              </DetailSection>
            ) : null}

            {project.highlights && project.highlights.length > 0 ? (
              <DetailSection title="Highlights">
                <ul className="list-disc space-y-1.5 pl-4 marker:text-cyan-500/70">
                  {project.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </DetailSection>
            ) : null}
          </div>
        </div>
      </article>
    </PortfolioLayout>
  );
}
