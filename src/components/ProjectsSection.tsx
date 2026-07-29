import { PROJECTS } from '../data/projects';
import type { ProjectItem } from '../types/portfolio';
import type { PortfolioTheme } from '../theme/portfolioTheme';

type ProjectsSectionProps = {
  theme: PortfolioTheme;
};

function ProjectCard({
  project,
  theme,
}: {
  project: ProjectItem;
  theme: PortfolioTheme;
}) {
  const isFeatured = Boolean(project.featured);

  return (
    <article
      className={
        isFeatured
          ? 'flex gap-5 border-b border-cyan-500/25 bg-cyan-950/20 px-4 py-10 ring-1 ring-inset ring-cyan-500/15 sm:gap-7 sm:px-6 md:gap-8 md:px-8 md:py-14'
          : 'flex gap-5 border-b border-slate-700 px-4 py-8 transition-colors sm:gap-7 sm:px-6 md:gap-8 md:px-8 md:py-12 md:hover:bg-slate-900/40'
      }
      aria-label={`${project.title}${isFeatured ? ' (featured)' : ''}`}
    >
      {/* Fixed-width index column — same width on every card */}
      <div className="flex w-12 shrink-0 justify-start pt-1 sm:w-14 md:w-16 md:pt-1.5" aria-hidden>
        <span
          className={
            isFeatured
              ? 'font-mono text-3xl font-semibold leading-none tracking-tight text-cyan-300 tabular-nums sm:text-4xl'
              : 'font-mono text-3xl font-semibold leading-none tracking-tight text-cyan-500/70 tabular-nums sm:text-4xl'
          }
        >
          {project.id}
        </span>
      </div>

      <div className="grid min-w-0 flex-1 grid-cols-1 gap-5 md:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] md:gap-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
        <div className="min-w-0">
          {isFeatured ? (
            <span className="mb-2 inline-block text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-400/90">
              Featured
            </span>
          ) : null}
          <h4 className={isFeatured ? `${theme.projectTitle} sm:text-3xl` : theme.projectTitle}>
            {project.title}
          </h4>
          <span className={theme.projectCat}>{project.category}</span>
        </div>

        <div className="min-w-0">
          <p
            className={
              isFeatured
                ? 'max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base sm:leading-7'
                : 'max-w-xl text-sm leading-relaxed text-slate-400'
            }
          >
            {project.description}
          </p>

          <div className="mt-4">
            <p className="mb-2 text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-slate-500">
              Tech
            </p>
            <ul
              className="m-0 flex list-none flex-wrap gap-2 p-0"
              aria-label={`${project.title} tech stack`}
            >
              {project.tools.map((tool) => (
                <li key={tool}>
                  <span className={theme.chip}>{tool}</span>
                </li>
              ))}
            </ul>
          </div>

          {project.highlights && project.highlights.length > 0 ? (
            <ul className="mt-4 list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-slate-400 marker:text-cyan-500/70">
              {project.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}

          {project.liveUrl ? (
            <p className="mt-4">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm text-sm font-medium text-cyan-300/95 underline-offset-2 hover:text-cyan-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/45"
              >
                Live demo
              </a>
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function ProjectsSection({ theme }: ProjectsSectionProps) {
  return (
    <section id="projects" className="mb-24 md:mb-48">
      <div className="mb-8 flex flex-col gap-2 sm:mb-12 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <h3 className={`text-xs font-sans uppercase tracking-[0.3em] font-bold ${theme.sectionLabel}`}>
          Projects
        </h3>
        <span className={`text-[10px] font-sans ${theme.mutedDate}`}>
          SELECTED PROJECTS ({PROJECTS.length})
        </span>
      </div>
      <div className={theme.dividerSoft}>
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} theme={theme} />
        ))}
      </div>
    </section>
  );
}
