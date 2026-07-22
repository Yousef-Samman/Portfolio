import { useEffect, useRef, useState, type FormEvent } from 'react';
import { apiPath, submitContact } from '../lib/api';
import {
  getTurnstileSiteKey,
  isAlwaysPassTurnstileTestKey,
  TurnstileWidget,
  type TurnstileHandle,
} from './TurnstileWidget';

export type ContactTheme = {
  sectionLabel: string;
  contactCard: string;
  contactCalloutBox: string;
  contactCalloutText: string;
  contactLabel: string;
  contactInput: string;
  contactTextarea: string;
  contactSubmit: string;
  contactSubmitDisabled: string;
  contactSuccess: string;
  contactError: string;
};

export function ContactSection({ theme }: { theme: ContactTheme }) {
  const turnstileRef = useRef<TurnstileHandle>(null);
  const pendingSubmitRef = useRef(false);

  const turnstileSiteKey = getTurnstileSiteKey();
  const captchaRequired = Boolean(turnstileSiteKey);
  const usingAlwaysPassTestKey =
    turnstileSiteKey !== undefined && isAlwaysPassTurnstileTestKey(turnstileSiteKey);

  const [name, setName] = useState('');
  const [fromEmail, setFromEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [serverCaptchaOn, setServerCaptchaOn] = useState<boolean | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    fetch(apiPath('/api/health'))
      .then((res) => res.json())
      .then((data: { turnstile?: boolean }) => setServerCaptchaOn(Boolean(data.turnstile)))
      .catch(() => setServerCaptchaOn(null));
  }, []);

  const captchaMisconfigured =
    serverCaptchaOn === true && !captchaRequired && import.meta.env.DEV;

  function clearFormFeedback() {
    if (status === 'idle') return;
    setStatus('idle');
    setFeedback('');
  }

  function resetCaptchaFlow() {
    pendingSubmitRef.current = false;
    setShowCaptcha(false);
    setTurnstileToken('');
    turnstileRef.current?.resetWidget();
  }

  async function sendMessage(captchaToken: string) {
    if (!captchaToken && captchaRequired) {
      setStatus('error');
      setFeedback('Complete the security check before sending.');
      return;
    }

    setStatus('sending');
    setFeedback('');

    const result = await submitContact({
      name,
      email: fromEmail,
      message,
      subject: subject || undefined,
      website,
      turnstileToken: captchaToken || undefined,
    });

    if (result.ok === true) {
      setStatus('success');
      setFeedback(result.data.message);
      setName('');
      setFromEmail('');
      setSubject('');
      setMessage('');
      setWebsite('');
      resetCaptchaFlow();
      setTurnstileResetKey((key) => key + 1);
      return;
    }

    setStatus('error');
    setFeedback(result.error);
    resetCaptchaFlow();
    setTurnstileResetKey((key) => key + 1);
  }

  function handleTurnstileToken(token: string) {
    if (!token) return;
    setTurnstileToken(token);
    if (pendingSubmitRef.current) {
      pendingSubmitRef.current = false;
      void sendMessage(token);
    }
  }

  function handleTurnstileExpireOrError() {
    setTurnstileToken('');
    if (pendingSubmitRef.current) {
      pendingSubmitRef.current = false;
      setStatus('error');
      setFeedback('Security check failed or expired. Press Send message to try again.');
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    clearFormFeedback();

    if (captchaMisconfigured) {
      setStatus('error');
      setFeedback(
        'Security check is not loaded in the browser. Stop the dev server, run npm run dev:all again, then retry.',
      );
      return;
    }

    if (captchaRequired) {
      if (!turnstileToken) {
        pendingSubmitRef.current = true;
        setShowCaptcha(true);
        setStatus('idle');
        setFeedback('');
        return;
      }
      await sendMessage(turnstileToken);
      return;
    }

    if (serverCaptchaOn && !turnstileToken) {
      setStatus('error');
      setFeedback('Complete the security check before sending.');
      return;
    }

    await sendMessage('');
  }

  const busy = status === 'sending';
  const waitingForCaptcha = showCaptcha && captchaRequired && !turnstileToken;
  const submitDisabled = busy || waitingForCaptcha;

  return (
    <section id="contact" className="mb-24 md:mb-48 pt-8 md:pt-12 border-t border-slate-600">
      <h3
        className={`text-xs font-sans uppercase tracking-[0.3em] font-bold mb-10 ${theme.sectionLabel}`}
      >
        Get in Touch
      </h3>

      <div className={theme.contactCalloutBox}>
        <p className={theme.contactCalloutText}>
          Send a message including the email you want a reply sent to.
        </p>
      </div>

      <form
        className={`${theme.contactCard} p-5 sm:p-8 md:p-10 space-y-5`}
        onSubmit={onSubmit}
        noValidate
      >
        <div className="absolute -left-[9999px] opacity-0" aria-hidden>
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="contact-name" className={theme.contactLabel}>
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              minLength={2}
              maxLength={80}
              autoComplete="name"
              className={theme.contactInput}
              value={name}
              onChange={(e) => {
                clearFormFeedback();
                resetCaptchaFlow();
                setName(e.target.value);
              }}
              disabled={busy}
            />
          </div>
          <div>
            <label htmlFor="contact-email" className={theme.contactLabel}>
              Your email <span className="font-normal normal-case text-slate-500">(for reply)</span>
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className={theme.contactInput}
              value={fromEmail}
              onChange={(e) => {
                clearFormFeedback();
                resetCaptchaFlow();
                setFromEmail(e.target.value);
              }}
              disabled={busy}
            />
          </div>
        </div>

        <div>
          <label htmlFor="contact-subject" className={theme.contactLabel}>
            Subject <span className="font-normal normal-case text-slate-500">(optional)</span>
          </label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            maxLength={120}
            className={theme.contactInput}
            value={subject}
            onChange={(e) => {
              clearFormFeedback();
              resetCaptchaFlow();
              setSubject(e.target.value);
            }}
            disabled={busy}
          />
        </div>

        <div>
          <label htmlFor="contact-message" className={theme.contactLabel}>
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            minLength={10}
            maxLength={2000}
            rows={5}
            className={theme.contactTextarea}
            value={message}
            onChange={(e) => {
              clearFormFeedback();
              resetCaptchaFlow();
              setMessage(e.target.value);
            }}
            disabled={busy}
          />
        </div>

        {showCaptcha && turnstileSiteKey ? (
          <div className="rounded-lg border border-slate-600/80 bg-slate-950/40 p-4">
            <p className={`${theme.contactLabel} mb-2`}>Security check</p>
            <p className="mb-3 text-xs text-slate-500">
              Complete the check below. Your message sends only after it passes.
            </p>
            {usingAlwaysPassTestKey ? (
              <p className="mb-3 text-xs text-amber-300/90" role="alert">
                You are using Cloudflare&apos;s test key. Create an Interactive widget for a real
                challenge.
              </p>
            ) : null}
            <TurnstileWidget
              ref={turnstileRef}
              siteKey={turnstileSiteKey}
              resetKey={turnstileResetKey}
              onToken={handleTurnstileToken}
              onExpire={handleTurnstileExpireOrError}
              onError={handleTurnstileExpireOrError}
            />
          </div>
        ) : null}

        {!captchaRequired && import.meta.env.DEV ? (
          <p className="text-xs text-amber-300/90" role="alert">
            Security check is off: add <code className="text-emerald-400/80">VITE_TURNSTILE_SITE_KEY</code>{' '}
            to <code className="text-emerald-400/80">.env.local</code> and restart{' '}
            <code className="text-emerald-400/80">npm run dev:all</code>.
          </p>
        ) : null}

        {captchaMisconfigured ? (
          <p className="text-xs text-amber-300/90" role="alert">
            API expects CAPTCHA but the site key is missing in the browser. Restart{' '}
            <code className="text-emerald-400/80">npm run dev:all</code>.
          </p>
        ) : null}

        <button
          type="submit"
          disabled={submitDisabled}
          className={submitDisabled ? theme.contactSubmitDisabled : theme.contactSubmit}
        >
          {busy ? 'Sending…' : waitingForCaptcha ? 'Complete security check…' : 'Send message'}
        </button>

        {status === 'success' ? (
          <p className={theme.contactSuccess} role="status">
            {feedback}
          </p>
        ) : null}
        {status === 'error' ? (
          <p className={theme.contactError} role="alert">
            {feedback}
          </p>
        ) : null}
      </form>
    </section>
  );
}
