import ReactMarkdown from "react-markdown";
import { classNames } from "../../../utils/classNames.ts";

type ChatMarkdownMessageProps = {
  markdown: string;
  className?: string;
  tone?: "default" | "inverse";
  avatarWrapped?: boolean;
};

// Renders safe markdown without enabling arbitrary HTML or JSX execution.
const ChatMarkdownMessage = ({ markdown, className, tone = "default", avatarWrapped = false }: ChatMarkdownMessageProps) => {
  const isInverse = tone === "inverse";
  const listClassName = avatarWrapped
    ? "list-inside list-disc space-y-0"
    : "list-disc space-y-0 pl-5";
  const orderedListClassName = avatarWrapped
    ? "list-inside list-decimal space-y-0"
    : "list-decimal space-y-0 pl-5";

  return (
    <div
      className={classNames(
        "min-w-0 break-words text-[12px] leading-[1.15rem] [&>*+*]:mt-1.5 [&_strong]:font-semibold",
        isInverse
          ? "text-white [&_strong]:text-white [&_em]:text-white/90"
          : "text-slate-700 [&_strong]:text-slate-900 [&_em]:text-slate-600",
        className
      )}
    >
      <ReactMarkdown
        skipHtml
        components={{
          p: ({ children }) => (
            <p className={classNames("whitespace-pre-wrap break-words leading-[1.15rem]", isInverse ? "text-white" : "text-slate-700")}>
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className={classNames(listClassName, isInverse ? "marker:text-white/80" : "marker:text-primary")}>
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className={classNames(orderedListClassName, isInverse ? "marker:text-white/80" : "marker:text-primary")}>
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="break-words pl-0.5 leading-[1.15rem]">{children}</li>,
          h1: ({ children }) => (
            <h1
              className={classNames(
                "rounded-[var(--radius-xl)] border px-2.5 py-1 text-[12px] font-semibold leading-[1.15rem]",
                isInverse ? "border-white/15 bg-white/10 text-white" : "border-primary/10 bg-primary/5 text-primary"
              )}
            >
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2
              className={classNames(
                "rounded-[var(--radius-xl)] border px-2.5 py-1 text-[12px] font-semibold leading-[1.15rem]",
                isInverse ? "border-white/15 bg-white/10 text-white" : "border-primary/10 bg-primary/5 text-primary"
              )}
            >
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className={classNames("text-[12px] font-semibold leading-[1.15rem]", isInverse ? "text-white" : "text-primary")}>
              {children}
            </h3>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className={classNames(
                "font-medium underline decoration-current underline-offset-2",
                isInverse ? "text-white" : undefined
              )}
            >
              {children}
            </a>
          ),
          strong: ({ children }) => <strong className={classNames("font-semibold", isInverse ? "text-white" : "text-slate-900")}>{children}</strong>,
          em: ({ children }) => <em className={classNames(isInverse ? "text-white/90" : "text-slate-600")}>{children}</em>,
          code: ({ children }) => (
            <code
              className={classNames(
                "rounded-[var(--radius-xl)] border px-1.5 py-0.5 font-mono text-[0.92em]",
                isInverse ? "border-white/15 bg-white/10 text-white" : "border-slate-200 bg-slate-100 text-slate-800"
              )}
            >
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre
              className={classNames(
                "overflow-x-auto rounded-[var(--radius-xl)] border px-2.5 py-2.5 text-[12px] leading-[1.15rem] shadow-inner",
                isInverse ? "border-white/15 bg-slate-950/70 text-slate-50" : "border-slate-200 bg-slate-900 text-slate-50"
              )}
            >
              {children}
            </pre>
          ),
          blockquote: ({ children }) => (
            <blockquote
              className={classNames(
                "rounded-r-[var(--radius-xl)] border-l-2 px-2.5 py-1.5 text-[12px] leading-[1.15rem] italic",
                isInverse ? "border-white/25 bg-white/10 text-white/90" : "border-primary/25 bg-primary/5 text-slate-700"
              )}
            >
              {children}
            </blockquote>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
};

export default ChatMarkdownMessage;
