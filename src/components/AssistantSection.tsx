import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { Eraser, Send } from 'lucide-react';
import {
  ASSISTANT_HISTORY_MAX_MESSAGES,
  ASSISTANT_QUESTION_MAX_LENGTH,
  askAssistant,
} from '../lib/api';
import type { PortfolioTheme } from '../theme/portfolioTheme';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
};

type AssistantSectionProps = {
  theme: Pick<
    PortfolioTheme,
    | 'divider'
    | 'sectionEyebrow'
    | 'sectionEyebrowMark'
    | 'contactInput'
    | 'contactSubmit'
    | 'contactSubmitDisabled'
    | 'contactError'
    | 'ghostButton'
    | 'chipButton'
  >;
};

const STARTER_PROMPTS = [
  'What is HackathonHub?',
  'Where did you study?',
  'What tech do you use?',
  'How can I contact you?',
] as const;

function dropTrailingUser(messages: ChatMessage[]): ChatMessage[] {
  const next = [...messages];
  while (next.length > 0 && next[next.length - 1].role === 'user') {
    next.pop();
  }
  return next;
}

export function AssistantSection({ theme }: AssistantSectionProps) {
  const titleId = useId();
  const disclaimerId = useId();
  const liveRegionId = useId();

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [liveAnnouncement, setLiveAnnouncement] = useState('');

  // Only scroll after the visitor starts chatting — never on first mount,
  // or opening `/` jumps the page down to the ChatBot section.
  useEffect(() => {
    if (messages.length === 0 && !sending) return;
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages, sending]);

  async function sendQuestion(raw: string) {
    if (sending) return;

    const trimmed = raw.trim();
    if (!trimmed) {
      setError('Please enter a question.');
      return;
    }
    if (trimmed.length > ASSISTANT_QUESTION_MAX_LENGTH) {
      setError(`Keep questions to ${ASSISTANT_QUESTION_MAX_LENGTH} characters or fewer.`);
      return;
    }

    const prior = dropTrailingUser(messages);
    const history = prior
      .slice(-ASSISTANT_HISTORY_MAX_MESSAGES)
      .map(({ role, text }) => ({ role, text }));

    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: trimmed,
    };

    setMessages([...prior, userMessage]);
    setQuestion('');
    setError('');
    setSending(true);
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }

    const result = await askAssistant(trimmed, history);

    setSending(false);

    if (result.ok === false) {
      setError(result.error);
      return;
    }

    const assistantMessage: ChatMessage = {
      id: `a-${Date.now()}`,
      role: 'assistant',
      text: result.data.answer,
    };
    setMessages((prev) => [...prev, assistantMessage]);
    setLiveAnnouncement(result.data.answer);
  }

  async function handleSubmit(event?: FormEvent) {
    event?.preventDefault();
    await sendQuestion(question);
  }

  function clearChat() {
    if (sending) return;
    setMessages([]);
    setError('');
    setLiveAnnouncement('Chat cleared.');
    inputRef.current?.focus();
  }

  function onComposerKeyDown(event: ReactKeyboardEvent<HTMLTextAreaElement>) {
    if (event.key !== 'Enter' || event.shiftKey) return;
    const finePointer =
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: fine)').matches;
    if (!finePointer) return;
    event.preventDefault();
    void handleSubmit();
  }

  const remaining = ASSISTANT_QUESTION_MAX_LENGTH - question.length;
  const canSend = question.trim().length > 0 && !sending;
  const hasHistory = messages.length > 0;
  const showEmpty = messages.length === 0 && !sending;

  return (
    <section
      id="yousefai"
      className={`mb-16 pt-8 sm:mb-24 sm:pt-10 md:mb-28 ${theme.divider}`}
      aria-labelledby={titleId}
      aria-describedby={disclaimerId}
    >
      <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h3 id={titleId} className={theme.sectionEyebrow}>
            <span className={theme.sectionEyebrowMark} aria-hidden />
            Yousef - ChatBot
          </h3>
          <p
            id={disclaimerId}
            className="mt-2 max-w-xl text-sm leading-relaxed text-slate-400"
          >
            Grounded on this portfolio's education, experience, projects, and
            skills.
            <br />
            20 questions / hour.
          </p>
        </div>
        {hasHistory ? (
          <button
            type="button"
            onClick={clearChat}
            disabled={sending}
            className={`${theme.ghostButton} self-start sm:self-auto`}
          >
            <Eraser className="h-3.5 w-3.5" aria-hidden />
            Clear chat
          </button>
        ) : null}
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-cyan-500/25 bg-gradient-to-b from-cyan-950/35 via-slate-950/85 to-[#05080f] shadow-[0_28px_56px_-30px_rgba(0,0,0,0.8)] ring-1 ring-cyan-500/10 transition-shadow duration-300 hover:ring-cyan-400/20">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/55 to-transparent"
          aria-hidden
        />

        <div className="flex items-center gap-3 border-b border-white/5 bg-cyan-950/20 px-4 py-3 sm:px-6">
          <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400/40 opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400/90" />
          </span>
          <p className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-cyan-200/80">
            Online · portfolio facts only
          </p>
        </div>

        <div
          className="space-y-3 px-3 py-4 sm:space-y-4 sm:px-6 sm:py-6"
          aria-live="polite"
          aria-relevant="additions"
          id={liveRegionId}
        >
          {showEmpty ? (
            <div className="mx-auto max-w-lg py-4 text-center sm:py-8">
              <p className="text-base font-medium tracking-tight text-slate-200 sm:text-lg">
                Ask me anything about my work
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Tap a starter or type below — I answer as Yousef.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {STARTER_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    disabled={sending}
                    onClick={() => void sendQuestion(prompt)}
                    className={theme.chipButton}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {messages.map((message) => (
            <div
              key={message.id}
              className={
                message.role === 'user'
                  ? 'ml-auto flex max-w-[min(92%,34rem)] flex-col items-end gap-1'
                  : 'mr-auto flex max-w-[min(92%,38rem)] flex-col items-start gap-1'
              }
            >
              <span className="px-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                {message.role === 'user' ? 'You' : 'Yousef'}
              </span>
              <div
                className={
                  message.role === 'user'
                    ? 'rounded-2xl rounded-br-md bg-cyan-500/20 px-3.5 py-2.5 text-[15px] leading-relaxed text-slate-50 ring-1 ring-cyan-400/25 sm:px-4 sm:py-3 sm:text-sm'
                    : 'rounded-2xl rounded-bl-md bg-slate-900/90 px-3.5 py-2.5 text-[15px] leading-relaxed text-slate-200 ring-1 ring-slate-700/80 sm:px-4 sm:py-3 sm:text-sm'
                }
              >
                <p className="whitespace-pre-wrap break-words">{message.text}</p>
              </div>
            </div>
          ))}

          {sending ? (
            <div className="mr-auto flex max-w-[12rem] flex-col items-start gap-1" role="status">
              <span className="px-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Yousef
              </span>
              <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-slate-900/90 px-4 py-3 ring-1 ring-slate-700/80">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400/90 motion-reduce:animate-none" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400/70 [animation-delay:150ms] motion-reduce:animate-none" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400/50 [animation-delay:300ms] motion-reduce:animate-none" />
                <span className="sr-only">Thinking</span>
              </div>
            </div>
          ) : null}

          <div ref={endRef} aria-hidden className="h-px w-full" />
        </div>

        <span className="sr-only" aria-live="polite">
          {liveAnnouncement}
        </span>

        <form
          onSubmit={(event) => void handleSubmit(event)}
          className="sticky bottom-0 border-t border-white/5 bg-slate-950/95 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md sm:px-5 sm:py-4"
        >
          {error ? (
            <p className={`mb-2 px-1 ${theme.contactError}`} role="alert">
              {error}
            </p>
          ) : null}

          <div className="flex items-end gap-2 sm:gap-3">
            <label htmlFor="yousefai-question" className="sr-only">
              Ask Yousef a question
            </label>
            <textarea
              ref={inputRef}
              id="yousefai-question"
              rows={1}
              value={question}
              maxLength={ASSISTANT_QUESTION_MAX_LENGTH}
              onChange={(event) => {
                setQuestion(event.target.value);
                if (error) setError('');
                const el = event.target;
                el.style.height = 'auto';
                el.style.height = `${Math.min(el.scrollHeight, 144)}px`;
              }}
              onKeyDown={onComposerKeyDown}
              disabled={sending}
              placeholder="Ask me about projects, education, experience…"
              className={`${theme.contactInput} max-h-36 min-h-12 flex-1 resize-none overflow-y-auto py-3 text-base leading-snug transition-colors duration-200 hover:border-slate-500/90 sm:min-h-[2.75rem] sm:py-2.5 sm:text-sm`}
              enterKeyHint="send"
            />
            <button
              type="submit"
              disabled={!canSend}
              aria-label="Send question"
              className={`${canSend ? theme.contactSubmit : theme.contactSubmitDisabled} !h-12 !w-12 shrink-0 !px-0 sm:!h-11 sm:!w-12`}
            >
              <Send className="h-4 w-4" aria-hidden />
            </button>
          </div>

          <p
            className={`mt-2 px-1 text-[11px] tabular-nums ${
              remaining <= 40 ? 'text-amber-300/90' : 'text-slate-600'
            }`}
            aria-live="polite"
          >
            {question.length}/{ASSISTANT_QUESTION_MAX_LENGTH}
          </p>
        </form>
      </div>
    </section>
  );
}
