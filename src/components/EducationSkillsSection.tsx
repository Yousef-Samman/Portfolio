import { ChevronRight } from 'lucide-react';
import { EDUCATION_CERTIFICATES } from '../data/content';
import { TECH_STACK_ITEMS, TECH_TOOL_ITEMS } from '../data/skills';
import type { PortfolioTheme } from '../theme/portfolioTheme';
import { SkillList } from './SkillList';

type EducationSkillsSectionProps = {
  theme: PortfolioTheme;
};

export function EducationSkillsSection({ theme }: EducationSkillsSectionProps) {
  return (
    <section id="skills" className="mb-48">
      <div className="flex items-center justify-between mb-12">
        <h3 className={`text-xs font-sans uppercase tracking-[0.3em] font-bold ${theme.sectionLabel}`}>
          Education & Tools
        </h3>
      </div>
      <div className="grid grid-cols-12 gap-12">
        <div className={theme.eduCard}>
          <h3 className={theme.eduHeading}>Education</h3>
          <h4 className={theme.eduTitle}>B.Sc. Information Technology</h4>
          <p className={theme.eduSub}>King Abdulaziz University, Jeddah</p>
          <div className={theme.eduGpa}>GPA: 4.85 / 5.0</div>
          <div className="space-y-4">
            {EDUCATION_CERTIFICATES.map((certificate) => (
              <div key={certificate} className={theme.eduRow}>
                <ChevronRight size={14} className={theme.eduChevron} /> {certificate}
              </div>
            ))}
          </div>
        </div>
        <div className={theme.skillsCard}>
          <h3 className={theme.skillsHeading}>Technical Toolkit</h3>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8">
            <div>
              <h5 className={theme.skillsColTitle}>Stack</h5>
              <SkillList items={TECH_STACK_ITEMS} theme={theme} />
            </div>
            <div>
              <h5 className={theme.skillsColTitle}>Tools</h5>
              <SkillList items={TECH_TOOL_ITEMS} theme={theme} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
