import { PortfolioLayout } from '../components/PortfolioLayout';
import { AssistantSection } from '../components/AssistantSection';
import { EducationSkillsSection } from '../components/EducationSkillsSection';
import { ExperienceSection } from '../components/ExperienceSection';
import { HeroSection } from '../components/HeroSection';
import { useCvAvailability } from '../hooks/useCvAvailability';
import { getPortfolioTheme } from '../theme/portfolioTheme';

export function PortfolioPage() {
  const theme = getPortfolioTheme();
  const { available: cvAvailable, downloadUrl: cvDownloadUrl } = useCvAvailability();

  return (
    <PortfolioLayout showBootOverlay>
      <HeroSection
        theme={theme}
        cvAvailable={cvAvailable}
        cvDownloadUrl={cvDownloadUrl}
      />
      <AssistantSection
        theme={{
          divider: theme.divider,
          sectionEyebrow: theme.sectionEyebrow,
          sectionEyebrowMark: theme.sectionEyebrowMark,
          contactInput: theme.contactInput,
          contactSubmit: theme.contactSubmit,
          contactSubmitDisabled: theme.contactSubmitDisabled,
          contactError: theme.contactError,
          ghostButton: theme.ghostButton,
          chipButton: theme.chipButton,
        }}
      />
      <ExperienceSection theme={theme} />
      <EducationSkillsSection theme={theme} />
    </PortfolioLayout>
  );
}
