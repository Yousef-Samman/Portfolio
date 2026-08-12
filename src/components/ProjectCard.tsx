import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ProjectItem } from '../types/portfolio';
import type { PortfolioTheme } from '../theme/portfolioTheme';

type ProjectCardProps = {
  project: ProjectItem;
  theme: PortfolioTheme;
  /** Bento span classes from the parent grid. */
  className?: string;
};

export function ProjectCard({ project, theme, className = '' }: ProjectCardProps) {
  const isFeatured = Boolean(project.featured);
  const detailPath = `/projects/${project.slug}`;

  return (
    <Link
      to={detailPath}
      className={[
        'group relative flex h-full flex-col overflow-hidden rounded-2xl p-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/45 sm:p-6',
        isFeatured
          ? 'bg-gradient-to-br from-cyan-950/55 via-slate-950/70 to-slate-950/80 ring-1 ring-cyan-500/30 hover:ring-cyan-400/45'
          : 'bg-slate-900/55 ring-1 ring-white/10 hover:bg-slate-900/75 hover:ring-cyan-500/30',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label={`${project.title}${isFeatured ? ' (featured)' : ''} — open project details`}
    >
      {isFeatured ? (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
          aria-hidden
        />
      ) : null}

      <div className="mb-3 flex items-start justify-between gap-3">
        <span
          className={
            isFeatured
              ? 'font-mono text-sm font-semibold tabular-nums tracking-tight text-cyan-300/90'
              : 'font-mono text-sm font-semibold tabular-nums tracking-tight text-cyan-500/60'
          }
          aria-hidden
        >
          {project.id}
        </span>
        <span
          className={
            isFeatured
              ? 'inline-flex items-center gap-1 rounded-md border border-cyan-500/40 bg-cyan-500/15 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-cyan-200 transition-colors group-hover:border-cyan-400/55'
              : 'inline-flex items-center gap-1 rounded-md border border-slate-600/80 bg-slate-950/40 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400 transition-colors group-hover:border-cyan-500/35 group-hover:text-cyan-200'
          }
        >
          Details
          <ArrowUpRight
            size={12}
            className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden
          />
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        {isFeatured ? (
          <span className="mb-2 text-[9px] font-bold uppercase tracking-[0.22em] text-cyan-400/90">
            Featured
          </span>
        ) : null}
        <h2
          className={
            isFeatured
              ? 'text-xl font-bold tracking-tight text-slate-50 transition-colors group-hover:text-cyan-200 sm:text-2xl md:text-3xl'
              : 'text-base font-bold tracking-tight text-slate-100 transition-colors group-hover:text-cyan-300 sm:text-lg'
          }
        >
          {project.title}
        </h2>
        <p className={`mt-1 ${theme.projectCat}`}>{project.category}</p>
        <p
          className={
            isFeatured
              ? 'mt-3 max-w-xl text-sm leading-relaxed text-slate-300 line-clamp-4 sm:text-base sm:leading-7'
              : 'mt-2 text-sm leading-snug text-slate-400 line-clamp-3'
          }
        >
          {project.summary}
        </p>

        <ul
          className="mt-auto flex list-none flex-wrap gap-1.5 pt-4 p-0"
          aria-label={`${project.title} tech stack`}
        >
          {(isFeatured ? project.tools : project.tools.slice(0, 4)).map((tool) => (
            <li key={tool}>
              <span className={theme.chip}>{tool}</span>
            </li>
          ))}
          {!isFeatured && project.tools.length > 4 ? (
            <li>
              <span className={theme.chip}>+{project.tools.length - 4}</span>
            </li>
          ) : null}
        </ul>
      </div>
    </Link>
  );
}
