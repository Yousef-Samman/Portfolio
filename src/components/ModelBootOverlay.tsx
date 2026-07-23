type ModelBootOverlayProps = {
  fadeOut: boolean;
};

const BOOT_NODES = [
  [100, 48],
  [148, 88],
  [132, 148],
  [68, 148],
  [52, 88],
] as const;

export function ModelBootOverlay({ fadeOut }: ModelBootOverlayProps) {
  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#010409]/96 transition-opacity duration-500 ease-out ${
        fadeOut ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      aria-busy={!fadeOut}
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div className="relative flex flex-col items-center gap-8 px-6">
        <svg
          className="h-36 w-36 sm:h-44 sm:w-44"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <defs>
            <linearGradient id="boot-edge" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(14 116 144)" stopOpacity="0.2" />
              <stop offset="50%" stopColor="rgb(34 211 238)" stopOpacity="0.85" />
              <stop offset="100%" stopColor="rgb(125 211 252)" stopOpacity="0.25" />
            </linearGradient>
          </defs>
          <g fill="none" strokeLinecap="round" strokeWidth={1.6} opacity={0.55}>
            {BOOT_NODES.map(([x, y], index) => (
              <line
                key={`spoke-${index}`}
                x1={100}
                y1={100}
                x2={x}
                y2={y}
                stroke="url(#boot-edge)"
                strokeOpacity={0.55}
              />
            ))}
            <polygon
              points={BOOT_NODES.map(([x, y]) => `${x},${y}`).join(' ')}
              stroke="url(#boot-edge)"
              strokeOpacity={0.4}
            />
          </g>
          <polygon
            points={BOOT_NODES.map(([x, y]) => `${x},${y}`).join(' ')}
            fill="none"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="8 14"
            className="motion-safe:animate-model-loader-dash motion-reduce:opacity-60"
            stroke="rgb(34 211 238)"
            opacity={0.9}
          />
          {BOOT_NODES.map(([cx, cy], index) => (
            <circle
              key={`node-${index}`}
              cx={cx}
              cy={cy}
              r={4.5}
              fill="rgb(34 211 238)"
              className="motion-safe:animate-loader-node motion-reduce:opacity-80"
              style={{ animationDelay: `${index * 0.14}s` }}
            />
          ))}
          <circle cx={100} cy={100} r={5} fill="rgb(125 211 252)" opacity={0.95} />
        </svg>
        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-cyan-400/80">
          Initializing model
        </p>
      </div>
    </div>
  );
}
