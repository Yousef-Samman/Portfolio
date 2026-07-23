import { ContactSection } from '../components/ContactSection';
import { EducationSkillsSection } from '../components/EducationSkillsSection';
import { ExperienceSection } from '../components/ExperienceSection';
import { HeroSection } from '../components/HeroSection';
import { AiBackdrop } from '../components/AiBackdrop';
import { ModelBootOverlay } from '../components/ModelBootOverlay';
import { PortfolioFooter } from '../components/PortfolioFooter';
import { PortfolioHeader } from '../components/PortfolioHeader';
import { ProjectsSection } from '../components/ProjectsSection';
import { useActiveNavSection } from '../hooks/useActiveNavSection';
import { useBootOverlay } from '../hooks/useBootOverlay';
import { useCvAvailability } from '../hooks/useCvAvailability';
import { usePortfolioAiClass } from '../hooks/usePortfolioAiClass';
import { getPortfolioTheme } from '../theme/portfolioTheme';

export function PortfolioPage() {
  const theme = getPortfolioTheme();
  const activeSection = useActiveNavSection();
  const cvAvailable = useCvAvailability();
  const { bootCover, bootFadeOut } = useBootOverlay();

  usePortfolioAiClass();

  return (
    <div className={theme.shell}>
      <div className="fixed inset-0 z-0 overflow-hidden motion-safe:animate-backdrop-boot motion-reduce:opacity-100">
        <AiBackdrop />
      </div>

      <div className="relative z-10">
        <main className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-24 pt-16 sm:pt-20 md:pt-24 pb-24 md:pb-48">
          <PortfolioHeader theme={theme} activeSection={activeSection} />
          <HeroSection theme={theme} cvAvailable={cvAvailable} />
          <ExperienceSection theme={theme} />
          <ProjectsSection theme={theme} />
          <EducationSkillsSection theme={theme} />
          <ContactSection
            theme={{
              sectionLabel: theme.sectionLabel,
              contactCard: theme.contactCard,
              contactCalloutBox: theme.contactCalloutBox,
              contactCalloutText: theme.contactCalloutText,
              contactLabel: theme.contactLabel,
              contactInput: theme.contactInput,
              contactTextarea: theme.contactTextarea,
              contactSubmit: theme.contactSubmit,
              contactSubmitDisabled: theme.contactSubmitDisabled,
              contactSuccess: theme.contactSuccess,
              contactError: theme.contactError,
            }}
          />
        </main>

        <PortfolioFooter theme={theme} />
      </div>

      {bootCover ? <ModelBootOverlay fadeOut={bootFadeOut} /> : null}
    </div>
  );
}
