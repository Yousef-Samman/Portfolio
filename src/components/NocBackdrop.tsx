import { NOC_RF_SITES } from '../data/nocBackdrop';

export function NocBackdrop() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-[#010409]" aria-hidden />

      <div
        className="absolute inset-0 opacity-[0.56] motion-safe:animate-mesh-drift motion-reduce:animate-none motion-reduce:opacity-[0.28]"
        style={{
          backgroundImage: `
            linear-gradient(30deg, rgb(52 211 153 / 0.095) 10.5%, transparent 10.8%),
            linear-gradient(-30deg, rgb(45 212 191 / 0.072) 10.5%, transparent 10.8%)
          `,
          backgroundSize: '68px 68px, 68px 68px',
          backgroundPosition: '0 0, 34px 34px',
        }}
        aria-hidden
      />

      <div className="absolute inset-0 motion-safe:animate-bg-float-y motion-reduce:animate-none">
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_100%_72%_at_50%_8%,rgb(34_197_94/0.22),transparent_56%)] motion-safe:animate-noc-radial-a motion-reduce:animate-none"
          aria-hidden
        />
      </div>
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_48%_40%_at_94%_4%,rgb(245_158_11/0.16),transparent_50%)] motion-safe:animate-noc-radial-b motion-reduce:animate-none"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_42%_36%_at_6%_94%,rgb(34_211_238/0.14),transparent_54%)] motion-safe:animate-noc-radial-c motion-reduce:animate-none"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute -left-[18%] top-[22%] h-[48%] w-[136%] bg-[linear-gradient(102deg,transparent_16%,rgb(52_211_153/0.16)_38%,rgb(34_211_238/0.13)_52%,rgb(16_185_129/0.09)_66%,transparent_84%)] blur-[88px] motion-safe:animate-spectrum-shift motion-reduce:opacity-35"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-[14%] bottom-[8%] h-[38%] w-[118%] bg-[linear-gradient(78deg,transparent_22%,rgb(16_185_129/0.12)_48%,rgb(52_211_153/0.1)_62%,transparent_80%)] blur-[72px] motion-safe:animate-spectrum-shift motion-reduce:opacity-30"
        style={{ animationDelay: '-6s' }}
        aria-hidden
      />

      {NOC_RF_SITES.map((site, index) => (
        <div
          key={index}
          className="pointer-events-none absolute"
          style={{ left: site.x, top: site.y, transform: 'translate(-50%, -50%)' }}
        >
          <div className="relative h-px w-px">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div
                className="h-[min(42vmin,360px)] w-[min(42vmin,360px)] rounded-full border border-emerald-400/38 motion-safe:animate-net-ripple motion-reduce:hidden origin-center"
                style={{ animationDelay: site.d0 }}
              />
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div
                className="h-[min(54vmin,460px)] w-[min(54vmin,460px)] rounded-full border border-teal-300/22 motion-safe:animate-net-ripple-slow motion-reduce:hidden origin-center"
                style={{ animationDelay: site.d1 }}
              />
            </div>
          </div>
        </div>
      ))}

      <div
        className="absolute inset-0 opacity-[0.055] mix-blend-overlay motion-reduce:opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] bg-[linear-gradient(to_top,rgb(6_78_59/0.14),rgb(15_23_42/0.04),transparent)]"
        aria-hidden
      />

      <svg
        className="absolute inset-0 h-full w-full opacity-[0.42]"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1920 1080"
        aria-hidden
      >
        <defs>
          <linearGradient id="noc-fiber" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(52 211 153)" stopOpacity="0" />
            <stop offset="50%" stopColor="rgb(52 211 153)" stopOpacity="0.52" />
            <stop offset="100%" stopColor="rgb(45 212 191)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M-40 880 L480 120 L1040 400 L1960 200"
          fill="none"
          stroke="url(#noc-fiber)"
          strokeWidth={1.25}
          strokeLinecap="round"
        />
        <path
          d="M-80 320 L720 980 L1500 640 L2000 880"
          fill="none"
          stroke="url(#noc-fiber)"
          strokeWidth={1}
          strokeOpacity={0.78}
          strokeLinecap="round"
        />
        <path
          d="M 120 120 L 420 520 L 880 180 L 1320 640 L 1720 200"
          fill="none"
          stroke="url(#noc-fiber)"
          strokeWidth={0.85}
          strokeOpacity={0.58}
          strokeLinecap="round"
          strokeDasharray="3 10"
        />
      </svg>

      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_96%_90%_at_50%_50%,transparent_20%,rgb(1_4_12/0.86))]"
        aria-hidden
      />
    </div>
  );
}
