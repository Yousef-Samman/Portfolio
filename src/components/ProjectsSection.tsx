import githubIcon from '../assets/Logos/GhubLogo.jpg';
import { PROJECTS } from '../data/projects';
import type { PortfolioTheme } from '../theme/portfolioTheme';

type ProjectsSectionProps = {
  theme: PortfolioTheme;
};

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
        {PROJECTS.map((project) => {
          const hasRepo = Boolean(project.repoUrl);
          const className = theme.projectRow;
          const body = (
            <>
              <div
                className={`col-span-12 md:col-span-1 text-[10px] font-sans self-center ${theme.projectId}`}
              >
                /{project.id}
              </div>
              <div className="col-span-12 md:col-span-4 mt-4 md:mt-0">
                <h4 className={theme.projectTitle}>{project.title}</h4>
                <span className={theme.projectCat}>{project.category}</span>
              </div>
              <div className="col-span-12 md:col-span-5 mt-4 md:mt-0">
                <p className={theme.projectDesc}>{project.description}</p>
              </div>
              <div className="col-span-12 md:col-span-2 mt-4 md:mt-0 flex justify-end">
                <div className={theme.iconCircle}>
                  <img
                    src={githubIcon}
                    alt=""
                    className={`h-5 w-5 rounded-sm object-contain ${hasRepo ? 'opacity-90' : 'opacity-40'}`}
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            </>
          );

          if (hasRepo && project.repoUrl) {
            return (
              <a
                key={project.id}
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
                aria-label={`${project.title}: view GitHub repository`}
              >
                {body}
              </a>
            );
          }

          return (
            <div
              key={project.id}
              className={`${className} cursor-default`}
              aria-label={`${project.title}: private / in-progress project`}
            >
              {body}
            </div>
          );
        })}
      </div>
    </section>
  );
}
