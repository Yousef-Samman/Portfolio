export type TechSkillItem = {
  name: string;
  href?: string;
  iconSrc?: string;
};

export type ProjectItem = {
  id: string;
  title: string;
  category: string;
  /** 1–2 sentence summary of what the project does and the problem it solves. */
  description: string;
  tools: string[];
  /** Optional technical highlights — only when there is something specific to say. */
  highlights?: string[];
  /** Featured projects get more visual weight in the Projects section. */
  featured?: boolean;
  /**
   * Private reference only — not shown or linked in the UI.
   * Omit or leave empty when the repo is private / not published yet.
   */
  repoUrl?: string;
  /** Optional live demo URL — only set when a real deployed URL exists. */
  liveUrl?: string;
};

export type ExperienceEntry = {
  company: string;
  role: string;
  date: string;
  startISO: string;
  endISO: string | null;
  logo?: string;
  summary: string;
  bullets: string[];
};

export type ExperienceWithTenure = ExperienceEntry & {
  tenureMonthsRounded: number;
  tenureLabel: string;
};
