export type TechSkillItem = {
  name: string;
  href?: string;
  iconSrc?: string;
};

export type ProjectDecision = {
  title: string;
  detail: string;
};

export type ProjectChallenge = {
  problem: string;
  solution: string;
};

export type ProjectItem = {
  id: string;
  /** URL segment for `/projects/:slug`. */
  slug: string;
  title: string;
  category: string;
  /** One-line blurb for the projects index cards. */
  summary: string;
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
  /** Detail: what problem it solves / why it exists. */
  problem?: string;
  /** Detail: core technical approach. */
  approach?: string;
  /** Detail: specific technical decisions worth calling out. */
  decisions?: ProjectDecision[];
  /** Detail: a real challenge and how it was addressed. */
  challenge?: ProjectChallenge;
  /** Detail: what the finished (or current) state demonstrates. */
  outcome?: string;
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
