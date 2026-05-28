import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type MutableRefObject,
} from 'react';

const TURNSTILE_SCRIPT_ID = 'cf-turnstile-script';
const TURNSTILE_SCRIPT_SRC =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

/** Cloudflare dummy key that always passes instantly — not for production. */
const TURNSTILE_ALWAYS_PASS_TEST_KEY = '1x00000000000000000000AA';

type TurnstileWidgetProps = {
  siteKey: string;
  onToken: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
  resetKey?: number;
};

export type TurnstileHandle = {
  resetWidget: () => void;
  isReady: () => boolean;
};

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          'expired-callback'?: () => void;
          'error-callback'?: () => void;
          theme?: 'light' | 'dark' | 'auto';
          appearance?: 'always' | 'execute' | 'interaction-only';
          size?: 'normal' | 'compact' | 'flexible';
        },
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

function loadTurnstileScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve();

  const existing = document.getElementById(TURNSTILE_SCRIPT_ID);
  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error('Turnstile script failed')), {
        once: true,
      });
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.id = TURNSTILE_SCRIPT_ID;
    script.src = TURNSTILE_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Turnstile script failed'));
    document.head.appendChild(script);
  });
}

function useLatestRef<T>(value: T): MutableRefObject<T> {
  const ref = useRef(value);
  ref.current = value;
  return ref;
}

export const TurnstileWidget = forwardRef<TurnstileHandle, TurnstileWidgetProps>(
  function TurnstileWidget(
    { siteKey, onToken, onExpire, onError, resetKey = 0 },
    ref,
  ) {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);
    const [loadError, setLoadError] = useState(false);
    const [widgetReady, setWidgetReady] = useState(false);
    const onTokenRef = useLatestRef(onToken);
    const onExpireRef = useLatestRef(onExpire);
    const onErrorRef = useLatestRef(onError);

    useImperativeHandle(
      ref,
      () => ({
        resetWidget: () => {
          if (widgetIdRef.current && window.turnstile) {
            window.turnstile.reset(widgetIdRef.current);
          }
          onTokenRef.current('');
        },
        isReady: () => widgetReady && Boolean(widgetIdRef.current),
      }),
      [widgetReady],
    );

    useEffect(() => {
      let cancelled = false;

      loadTurnstileScript()
        .then(() => {
          if (cancelled || !window.turnstile || !containerRef.current) return;

          if (widgetIdRef.current) {
            window.turnstile.remove(widgetIdRef.current);
            widgetIdRef.current = null;
          }

          widgetIdRef.current = window.turnstile.render(containerRef.current, {
            sitekey: siteKey,
            theme: 'dark',
            size: 'normal',
            appearance: 'always',
            callback: (token) => {
              if (token) onTokenRef.current(token);
            },
            'expired-callback': () => {
              onTokenRef.current('');
              onExpireRef.current?.();
            },
            'error-callback': () => {
              onTokenRef.current('');
              onErrorRef.current?.();
            },
          });
          setLoadError(false);
          setWidgetReady(true);
        })
        .catch(() => {
          if (!cancelled) setLoadError(true);
        });

      return () => {
        cancelled = true;
        setWidgetReady(false);
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        }
      };
    }, [siteKey, resetKey, onTokenRef, onExpireRef, onErrorRef]);

    if (loadError) {
      return (
        <p className="text-sm text-amber-300/90" role="alert">
          Security check could not load. Refresh the page or try again later.
        </p>
      );
    }

    return <div ref={containerRef} className="flex min-h-[78px] items-center" />;
  },
);

export function getTurnstileSiteKey(): string | undefined {
  const key = import.meta.env.VITE_TURNSTILE_SITE_KEY?.trim();
  return key || undefined;
}

export function isAlwaysPassTurnstileTestKey(siteKey: string): boolean {
  return siteKey === TURNSTILE_ALWAYS_PASS_TEST_KEY;
}
