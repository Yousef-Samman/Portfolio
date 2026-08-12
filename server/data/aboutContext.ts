/**
 * Grounding facts for the portfolio AI assistant (server-only).
 *
 * Keep in sync manually with:
 * - src/data/content.ts
 * - src/data/experience.ts
 * - src/data/projects.ts
 * - src/data/skills.ts
 * - Education copy in src/components/EducationSkillsSection.tsx
 *
 * Do not invent facts. Do not include GitHub repo URLs — the site intentionally
 * does not expose them to visitors.
 */

export type AboutContext = {
  identity: {
    name: string;
    credentialsLine: string;
    location: string;
    githubUsername: string;
    linkedinSlug: string;
    about: string;
  };
  education: {
    degree: string;
    school: string;
    gpa: string;
    honours: string;
    certificates: readonly string[];
    inProgress: readonly string[];
  };
  experience: readonly {
    company: string;
    role: string;
    date: string;
    summary: string;
    bullets: readonly string[];
  }[];
  projects: readonly {
    title: string;
    slug: string;
    category: string;
    featured?: boolean;
    summary: string;
    description: string;
    tools: readonly string[];
    highlights?: readonly string[];
    liveUrl?: string;
    problem?: string;
    approach?: string;
    decisions?: readonly { title: string; detail: string }[];
    challenge?: { problem: string; solution: string };
    outcome?: string;
  }[];
  skills: {
    stack: readonly string[];
    tools: readonly string[];
  };
};

export const ABOUT_CONTEXT: AboutContext = {
  identity: {
    name: 'Yousef Samman',
    credentialsLine: 'IT Graduate | AI Engineer | CCST | KAU',
    location: 'Jeddah, Saudi Arabia',
    githubUsername: 'Yousef-Samman',
    linkedinSlug: 'yousef-samman-615bb2213',
    about:
      "Fresh IT Graduate (KAU, GPA 4.83/5.0), AI Engineer building toward production AI systems. Currently completing IBM's Generative AI Engineering Professional Certificate that is covering LLMs, transformers, RAG, LangChain, and fine-tuning. Most recently built Hackathon Hub, a multi-agent AI evaluation system with 9 parallel sub-agents. Backed by 4+ years in operations and customer-facing roles.",
  },
  education: {
    degree: 'B.Sc. Information Technology',
    school: 'King Abdulaziz University, Jeddah',
    gpa: '4.83 / 5.0',
    honours: 'First Class Honours',
    certificates: [
      'IELTS Academic — Overall Band Score 7.0',
      'CCST Networking - Cisco (Apr 2025)',
      'Alison Sales Management Diploma (Apr 2024)',
      'Java Programming - Udemy (May 2023)',
      'JavaScript Essentials (Dec 2022)',
    ],
    inProgress: [
      "IBM Generative AI Engineering Professional Certificate (in progress) — covering LLMs, transformers, RAG, LangChain, and fine-tuning",
    ],
  },
  experience: [
    {
      company: 'ASQ INTERNATIONAL Food & Beverages Co. Ltd',
      role: 'Store Manager',
      date: 'Dec 2025 - Aug 2026',
      summary:
        'Led daily operations at Crepe & Dip, managed team performance, and maintained service excellence.',
      bullets: ['Store Management', 'Technical Support', 'Team Leadership'],
    },
    {
      company: 'ASQ INTERNATIONAL Food & Beverages Co. Ltd',
      role: 'Cashier',
      date: 'Sep 2025 - Dec 2025',
      summary:
        'Handled POS transactions, issued receipts, and supported customer service in a fast-paced environment.',
      bullets: ['POS Operations', 'Customer Service', 'Teamwork'],
    },
    {
      company: 'The Saudi National Bank (SNB)',
      role: 'Digital Banking COOP',
      date: 'Jun 2025 - Aug 2025',
      summary: 'Supported digital banking operations and process improvement activities.',
      bullets: [
        'Digital Banking Exposure',
        'IT Operations Support',
        'Team Collaboration',
      ],
    },
    {
      company: 'IKEA',
      role: 'Salesperson',
      date: 'Jun 2023 - Feb 2025',
      summary:
        'Delivered customer-focused solutions on the showroom floor, coordinated with logistics for stock availability, and contributed to target-driven weekly execution across departments.',
      bullets: [
        'Customer Engagement',
        'Sales Performance',
        'Goal Alignment',
        'Showroom operations',
        'Cross-team coordination',
      ],
    },
    {
      company: 'Al-Ittihad Al-Mobtaker Co. Ltd.',
      role: 'Head Waiter',
      date: 'Sep 2021 - Aug 2022',
      summary: 'Led front-line service operations and supported daily team coordination.',
      bullets: ['Team Leadership', 'Service Quality', 'Operations Discipline'],
    },
  ],
  projects: [
    {
      title: 'HackathonHub',
      slug: 'hackathonhub',
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
      title: 'Tafweej Hajj',
      slug: 'tafweej-hajj',
      category: 'Course project · Full-stack',
      summary:
        'Crowd-management dashboard: Mapbox density view updated live over Socket.IO from a Node backend.',
      description:
        'Crowd-management web app for Hajj-scale scenarios: operators watch density on a Mapbox map while Socket.IO pushes live location updates from the Node backend so the dashboard reflects crowd movement without full page refreshes.',
      tools: ['React', 'Node.js', 'Socket.IO', 'Mapbox'],
      highlights: [
        'Real-time density updates over Socket.IO into a Mapbox map view',
      ],
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
      title: 'Smart Notifier',
      slug: 'smart-notifier',
      category: 'Course / practice · Admin form',
      summary:
        'Admin form + dashboard for logging and tracking item requests in one place.',
      description:
        'Small admin workflow for logging and tracking item requests in one place — a form feeds a dashboard so staff can see request status without chasing messages across chats or spreadsheets.',
      tools: ['JavaScript', 'CSS', 'Backend logic'],
      problem:
        'Item requests were easy to lose when they lived only in chat threads or ad-hoc spreadsheets. Staff needed a single place to log a request and see its status later.',
      approach:
        'A small admin form captures request details and feeds a dashboard view so status is visible without hunting across channels. Built with JavaScript and CSS on the front end, with backend logic to persist and serve the request workflow.',
      outcome:
        'A practice admin workflow that centralizes request intake and basic status tracking — scoped as a course/practice project, not a production inventory system.',
    },
    {
      title: 'Travella',
      slug: 'travella',
      category: 'Course / practice · Front-end UI',
      summary:
        'Travel-booking UI practice: Vite + JavaScript + Tailwind modular page sections.',
      description:
        'Front-end travel-booking UI built with Vite, JavaScript, and Tailwind — modular page sections for browsing and booking flows as a practice project in component structure and layout, not a production booking system.',
      tools: ['Vite', 'JavaScript', 'Tailwind CSS'],
      problem:
        'Needed a focused front-end practice surface for structuring browsing and booking UI flows — layout, sections, and component organization — without the weight of a real booking backend.',
      approach:
        'Travella is a Vite + JavaScript + Tailwind front-end with modular page sections for browse and booking-style flows. Emphasis is on UI structure and layout conventions rather than payments, inventory, or live availability.',
      outcome:
        'A course/practice UI that demonstrates modular front-end structure for travel-style flows; intentionally not a production booking system.',
    },
  ],
  skills: {
    stack: ['React', 'Node.js', 'JavaScript', 'Vite', 'HTML5', 'CSS3'],
    tools: ['Mapbox', 'Socket.IO', 'Supabase', 'Git', 'Tailwind CSS'],
  },
};

/** Plain-text block injected into the assistant system prompt. */
export function formatAboutContext(): string {
  const c = ABOUT_CONTEXT;
  const lines: string[] = [
    `Name: ${c.identity.name}`,
    `Credentials: ${c.identity.credentialsLine}`,
    `Location: ${c.identity.location}`,
    `GitHub username (no public repo links on the portfolio): ${c.identity.githubUsername}`,
    `LinkedIn: linkedin.com/in/${c.identity.linkedinSlug}`,
    '',
    'About:',
    c.identity.about,
    '',
    'Education:',
    `- ${c.education.degree} — ${c.education.school}`,
    `- Honours: ${c.education.honours}`,
    `- GPA: ${c.education.gpa}`,
    '- Certificates:',
    ...c.education.certificates.map((cert) => `  - ${cert}`),
    '- In progress:',
    ...c.education.inProgress.map((item) => `  - ${item}`),
    '',
    'Work experience (most recent first):',
  ];

  for (const job of c.experience) {
    lines.push(`- ${job.role} at ${job.company} (${job.date})`);
    lines.push(`  Summary: ${job.summary}`);
    lines.push(`  Focus: ${job.bullets.join(', ')}`);
  }

  lines.push('', 'Projects:');
  for (const project of c.projects) {
    const featured = project.featured ? ' [featured]' : '';
    lines.push(`- ${project.title}${featured} — ${project.category}`);
    lines.push(`  Slug: ${project.slug}`);
    lines.push(`  Summary: ${project.summary}`);
    lines.push(`  ${project.description}`);
    lines.push(`  Tech: ${project.tools.join(', ')}`);
    if (project.highlights?.length) {
      lines.push(`  Highlights: ${project.highlights.join('; ')}`);
    }
    if (project.problem) {
      lines.push(`  Problem: ${project.problem}`);
    }
    if (project.approach) {
      lines.push(`  Approach: ${project.approach}`);
    }
    if (project.decisions?.length) {
      lines.push('  Design decisions:');
      for (const decision of project.decisions) {
        lines.push(`    - ${decision.title}: ${decision.detail}`);
      }
    }
    if (project.challenge) {
      lines.push(`  Challenge: ${project.challenge.problem}`);
      lines.push(`  Challenge solution: ${project.challenge.solution}`);
    }
    if (project.outcome) {
      lines.push(`  Outcome: ${project.outcome}`);
    }
    if (project.liveUrl) {
      lines.push(`  Live URL: ${project.liveUrl}`);
    }
  }

  lines.push(
    '',
    'Technical skills:',
    `- Stack: ${c.skills.stack.join(', ')}`,
    `- Tools: ${c.skills.tools.join(', ')}`,
    '',
    'Contact:',
    '- Prefer the Get In Touch feature on this portfolio (Contact page) or LinkedIn.',
    '',
    'Notes for answering:',
    '- Always speak in first person as Yousef (I / my / me).',
    '- Plain text only — never markdown bold, italics, or links.',
    '- When inviting contact, tell them to use the Get In Touch feature to reach out to you.',
    '- Project source code is not publicly linked from the portfolio site.',
    '- If asked for a repo/code link, say the code is not publicly linked from the site and they can ask you directly via Get In Touch.',
    '- Do not invent live demos, employers, dates, or tech that are not listed above.',
  );

  return lines.join('\n');
}
