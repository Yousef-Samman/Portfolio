/**
 * Flip to `true` when project case studies are ready to show again.
 * While false, `/projects` shows a building-in-progress placeholder and
 * `/projects/:slug` redirects to `/projects`.
 *
 * Existing UI lives in:
 * - src/components/ProjectsSection.tsx
 * - src/components/ToolkitChipTray.tsx
 * - src/pages/ProjectDetailPage.tsx
 * - src/data/projects.ts
 */
export const PROJECTS_SHOWCASE_LIVE = false;

/** Visual progress for the WIP placeholder (0–100). */
export const PROJECTS_BUILD_PROGRESS_PERCENT = 30;
