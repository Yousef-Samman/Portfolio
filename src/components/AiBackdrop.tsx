import { AI_GRAPH_EDGES, AI_GRAPH_NODES } from '../data/aiBackdrop';

export function AiBackdrop() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-[#010409]" aria-hidden />

      <div
        className="absolute inset-0 opacity-[0.4] motion-safe:animate-grid-drift motion-reduce:animate-none motion-reduce:opacity-[0.22]"
        style={{
          backgroundImage: `
            linear-gradient(rgb(148 163 184 / 0.055) 1px, transparent 1px),
            linear-gradient(90deg, rgb(34 211 238 / 0.045) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px, 64px 64px',
        }}
        aria-hidden
      />

      <div className="absolute inset-0 motion-safe:animate-bg-float-y motion-reduce:animate-none">
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_100%_72%_at_50%_8%,rgb(34_211_238/0.16),transparent_56%)] motion-safe:animate-ai-radial-a motion-reduce:animate-none"
          aria-hidden
        />
      </div>
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_48%_40%_at_94%_4%,rgb(125_211_252/0.12),transparent_50%)] motion-safe:animate-ai-radial-b motion-reduce:animate-none"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_42%_36%_at_6%_94%,rgb(100_116_139/0.18),transparent_54%)] motion-safe:animate-ai-radial-c motion-reduce:animate-none"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute -left-[18%] top-[22%] h-[48%] w-[136%] bg-[linear-gradient(102deg,transparent_16%,rgb(34_211_238/0.12)_38%,rgb(125_211_252/0.1)_52%,rgb(56_189_248/0.07)_66%,transparent_84%)] blur-[88px] motion-safe:animate-latent-drift motion-reduce:opacity-35"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-[14%] bottom-[8%] h-[38%] w-[118%] bg-[linear-gradient(78deg,transparent_22%,rgb(56_189_248/0.1)_48%,rgb(34_211_238/0.08)_62%,transparent_80%)] blur-[72px] motion-safe:animate-latent-drift motion-reduce:opacity-30"
        style={{ animationDelay: '-6s' }}
        aria-hidden
      />

      <svg
        className="absolute inset-0 h-full w-full opacity-[0.55]"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1920 1080"
        aria-hidden
      >
        <defs>
          <linearGradient id="ai-synapse" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(34 211 238)" stopOpacity="0" />
            <stop offset="45%" stopColor="rgb(34 211 238)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="rgb(125 211 252)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {AI_GRAPH_EDGES.map(([from, to], index) => {
          const a = AI_GRAPH_NODES[from];
          const b = AI_GRAPH_NODES[to];
          return (
            <line
              key={`e-${index}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="url(#ai-synapse)"
              strokeWidth={1}
              className="motion-safe:animate-synapse-pulse motion-reduce:opacity-50"
              style={{ animationDelay: `${(index % 7) * 0.35}s` }}
            />
          );
        })}
        {AI_GRAPH_NODES.map((node, index) => (
          <circle
            key={`n-${index}`}
            cx={node.x}
            cy={node.y}
            r={2.6}
            fill="rgb(34 211 238)"
            opacity={0.55}
            className="motion-safe:animate-node-activation motion-reduce:opacity-40"
            style={{ animationDelay: node.delay }}
          />
        ))}
      </svg>

      <div
        className="absolute inset-0 opacity-[0.055] mix-blend-overlay motion-reduce:opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] bg-[linear-gradient(to_top,rgb(8_47_73/0.16),rgb(15_23_42/0.04),transparent)]"
        aria-hidden
      />

      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_96%_90%_at_50%_50%,transparent_20%,rgb(1_4_12/0.86))]"
        aria-hidden
      />
    </div>
  );
}
