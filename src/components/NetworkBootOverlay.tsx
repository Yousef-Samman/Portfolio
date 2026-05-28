type NetworkBootOverlayProps = {
  fadeOut: boolean;
};

export function NetworkBootOverlay({ fadeOut }: NetworkBootOverlayProps) {
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
              <stop offset="0%" stopColor="rgb(16 185 129)" stopOpacity="0.15" />
              <stop offset="50%" stopColor="rgb(52 211 153)" stopOpacity="0.85" />
              <stop offset="100%" stopColor="rgb(34 211 238)" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <g fill="none" strokeLinecap="round" strokeWidth={2.2} opacity={0.55}>
            <path d="M100 36 L164 100 L100 164 L36 100 Z" stroke="url(#boot-edge)" />
            <path d="M100 36 L100 164" stroke="url(#boot-edge)" strokeOpacity={0.45} />
            <path d="M36 100 L164 100" stroke="url(#boot-edge)" strokeOpacity={0.45} />
          </g>
          <path
            d="M100 36 L164 100 L100 164 L36 100 Z"
            fill="none"
            strokeWidth={2.8}
            strokeLinecap="round"
            strokeDasharray="10 18"
            className="motion-safe:animate-net-loader-dash motion-reduce:opacity-60"
            stroke="rgb(52 211 153)"
            opacity={0.9}
          />
          {(
            [
              [100, 36],
              [164, 100],
              [100, 164],
              [36, 100],
            ] as const
          ).map(([cx, cy], index) => (
            <circle
              key={index}
              cx={cx}
              cy={cy}
              r={5}
              fill="rgb(52 211 153)"
              className="motion-safe:animate-loader-node motion-reduce:opacity-80"
              style={{ animationDelay: `${index * 0.18}s` }}
            />
          ))}
          <circle cx={100} cy={100} r={4} fill="rgb(245 158 11)" opacity={0.95} />
        </svg>
        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-emerald-400/80">
          Establishing routes
        </p>
      </div>
    </div>
  );
}
