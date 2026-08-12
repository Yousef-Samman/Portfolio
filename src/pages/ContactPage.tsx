import { PortfolioLayout } from '../components/PortfolioLayout';
import { ContactSection } from '../components/ContactSection';
import { getPortfolioTheme } from '../theme/portfolioTheme';

export function ContactPage() {
  const theme = getPortfolioTheme();

  return (
    <PortfolioLayout>
      <div className="mb-6 sm:mb-8">
        <p className={`text-xs font-sans uppercase tracking-[0.3em] font-bold mb-3 ${theme.sectionLabel}`}>
          Contact
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl md:text-5xl">
          Get in Touch
        </h1>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-slate-950/55 ring-1 ring-white/10">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              'radial-gradient(circle at 12% 0%, rgba(34,211,238,0.12), transparent 42%)',
          }}
          aria-hidden
        />

        <div className="relative flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/80 px-4 py-3 sm:px-6 sm:py-3.5">
          <div className="flex items-center gap-2.5">
            <span
              className="h-2 w-2 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.55)]"
              aria-hidden
            />
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300">
              Channel
              <span className="mx-2 text-slate-600" aria-hidden>
                ·
              </span>
              <span className="font-medium normal-case tracking-normal text-cyan-300/95">
                ready
              </span>
            </p>
          </div>
          <p className="text-[11px] text-slate-400">
            Reply to the email you include below
          </p>
        </div>

        <div className="relative px-4 py-5 sm:px-6 sm:py-7 md:px-8 md:py-8">
          <ContactSection
            standalone
            hideCallout
            embedded
            theme={{
              sectionLabel: theme.sectionLabel,
              contactCard: theme.contactCard,
              contactCalloutBox: theme.contactCalloutBox,
              contactCalloutText: theme.contactCalloutText,
              contactLabel: theme.contactLabel,
              contactInput: theme.contactInput,
              contactTextarea: theme.contactTextarea,
              contactSubmit: theme.contactSubmit,
              contactSubmitDisabled: theme.contactSubmitDisabled,
              contactSuccess: theme.contactSuccess,
              contactError: theme.contactError,
            }}
          />
        </div>
      </div>
    </PortfolioLayout>
  );
}
