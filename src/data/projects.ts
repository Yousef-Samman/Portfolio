import type { ProjectItem } from '../types/portfolio';

export const PROJECTS: ProjectItem[] = [
  {
    id: '01',
    slug: 'hackathonhub',
    title: 'HackathonHub',
    category: 'Graduation project · AI / Multi-Agent',
    featured: true,
    summary:
      'Nine parallel domain agents on Azure AI Foundry that score hackathon submissions with grounded, citeable reports.',
    description:
      'Platform that scores hackathon submissions by running nine domain-specific agents in parallel on Azure AI Foundry. Agents pull grounded research through MCP tools and persist findings in Cosmos DB so judges get structured, citeable evaluation reports instead of a single opaque score.',
    tools: ['Azure AI Foundry', 'Python', 'MCP', 'Cosmos DB', 'React'],
    highlights: [
      'Nine parallel domain agents rather than a single monolithic prompt',
      'MCP research tools + Cosmos DB persistence for grounded, reviewable findings',
    ],
    problem:
      'Hackathon judging often collapses into a single opaque score or a long free-text rubric that is hard to compare across teams. Reviewers need structured evaluation across multiple domains (technical depth, novelty, feasibility, and similar axes) with enough grounding that a score can be questioned and defended — not just accepted.',
    approach:
      'HackathonHub runs nine domain-specific agents in parallel on Azure AI Foundry instead of one monolithic prompt. Each agent focuses on its own evaluation slice, can pull grounded research through MCP tools, and writes findings into Cosmos DB. A React front end surfaces the structured reports so judges see citeable evidence alongside scores rather than a black-box number.',
    decisions: [
      {
        title: 'Nine parallel agents over one mega-prompt',
        detail:
          'Splitting evaluation by domain keeps each agent’s context focused and makes partial failure easier to reason about — a weak answer in one domain does not silently poison the entire score.',
      },
      {
        title: 'MCP tools for grounded research',
        detail:
          'Agents are allowed to fetch supporting research through MCP tooling rather than relying only on model priors, so claims in the report can point at retrieved material instead of invented justification.',
      },
      {
        title: 'Cosmos DB for persisted findings',
        detail:
          'Persisting agent findings in Cosmos DB keeps evaluations reviewable after the run finishes and supports structured retrieval for the judge-facing report UI.',
      },
    ],
    challenge: {
      problem:
        'A single-score or single-prompt pipeline is easy to demo but hard to trust: reviewers cannot tell which domain drove the result, and there is little durable artifact to inspect after the fact.',
      solution:
        'Parallel domain agents plus persisted findings give a structured, citeable trail. Judges see per-domain output grounded with MCP research rather than one opaque aggregate.',
    },
    outcome:
      'Demonstrates a multi-agent evaluation workflow on Azure AI Foundry with MCP-backed research and Cosmos DB persistence, exposed through a React UI for structured judging reports.',
  },
  {
    id: '02',
    slug: 'tafweej-hajj',
    title: 'Tafweej Hajj',
    category: 'Course project · Full-stack',
    summary:
      'Crowd-management dashboard: Mapbox density view updated live over Socket.IO from a Node backend.',
    description:
      'Crowd-management web app for Hajj-scale scenarios: operators watch density on a Mapbox map while Socket.IO pushes live location updates from the Node backend so the dashboard reflects crowd movement without full page refreshes.',
    tools: ['React', 'Node.js', 'Socket.IO', 'Mapbox'],
    highlights: [
      'Real-time density updates over Socket.IO into a Mapbox map view',
    ],
    repoUrl: 'https://github.com/Yousef-Samman/Tafweej_Hajj',
    problem:
      'In high-density pilgrimage scenarios, operators need a live sense of where crowds are concentrating. A static map or a dashboard that only refreshes on page reload is too slow for that operational picture.',
    approach:
      'A React front end renders crowd density on a Mapbox map. A Node.js backend publishes location updates over Socket.IO so the map can update in place as new positions arrive, without requiring a full page refresh.',
    decisions: [
      {
        title: 'Socket.IO for live map updates',
        detail:
          'Pushing location events over Socket.IO keeps the operator view current without polling or reload cycles, which fits a dashboard that should track movement continuously.',
      },
      {
        title: 'Mapbox as the density canvas',
        detail:
          'Mapbox provides the interactive map layer for plotting density so operators can read geographic concentration rather than raw coordinate tables.',
      },
    ],
    challenge: {
      problem:
        'Crowd position data is only useful if the dashboard stays in sync as people move; a request/response-only UI falls behind.',
      solution:
        'Socket.IO streams location updates into the Mapbox view so density changes appear live on the operator dashboard.',
    },
    outcome:
      'A course full-stack prototype that combines React, Node.js, Socket.IO, and Mapbox into a live crowd-density dashboard for Hajj-scale scenario practice.',
  },
  {
    id: '03',
    slug: 'smart-notifier',
    title: 'Smart Notifier',
    category: 'Course / practice · Admin form',
    summary:
      'Admin form + dashboard for logging and tracking item requests in one place.',
    description:
      'Small admin workflow for logging and tracking item requests in one place — a form feeds a dashboard so staff can see request status without chasing messages across chats or spreadsheets.',
    tools: ['JavaScript', 'CSS', 'Backend logic'],
    repoUrl: 'https://github.com/Yousef-Samman/Smart_Item_Notifier_Form',
    problem:
      'Item requests were easy to lose when they lived only in chat threads or ad-hoc spreadsheets. Staff needed a single place to log a request and see its status later.',
    approach:
      'A small admin form captures request details and feeds a dashboard view so status is visible without hunting across channels. Built with JavaScript and CSS on the front end, with backend logic to persist and serve the request workflow.',
    outcome:
      'A practice admin workflow that centralizes request intake and basic status tracking — scoped as a course/practice project, not a production inventory system.',
  },
  {
    id: '04',
    slug: 'travella',
    title: 'Travella',
    category: 'Course / practice · Front-end UI',
    summary:
      'Travel-booking UI practice: Vite + JavaScript + Tailwind modular page sections.',
    description:
      'Front-end travel-booking UI built with Vite, JavaScript, and Tailwind — modular page sections for browsing and booking flows as a practice project in component structure and layout, not a production booking system.',
    tools: ['Vite', 'JavaScript', 'Tailwind CSS'],
    repoUrl: 'https://github.com/Amonaquel/Travella',
    problem:
      'Needed a focused front-end practice surface for structuring browsing and booking UI flows — layout, sections, and component organization — without the weight of a real booking backend.',
    approach:
      'Travella is a Vite + JavaScript + Tailwind front-end with modular page sections for browse and booking-style flows. Emphasis is on UI structure and layout conventions rather than payments, inventory, or live availability.',
    outcome:
      'A course/practice UI that demonstrates modular front-end structure for travel-style flows; intentionally not a production booking system.',
  },
];

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}
