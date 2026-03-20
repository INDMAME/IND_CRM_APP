import ReactMarkdown from "react-markdown";
import { classNames } from "../../../utils/classNames.ts";

type ChatMarkdownMessageProps = {
  markdown: string;
  className?: string;
};

// Renders safe markdown without enabling arbitrary HTML or JSX execution.
const ChatMarkdownMessage = ({ markdown, className }: ChatMarkdownMessageProps) => {
  return (
    <div className={classNames("min-w-0 break-words text-[12px] leading-5", className)}>
      <ReactMarkdown
        skipHtml
        components={{
          p: ({ children }) => <p className="whitespace-pre-wrap break-words">{children}</p>,
          ul: ({ children }) => <ul className="list-disc space-y-1 pl-5">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal space-y-1 pl-5">{children}</ol>,
          li: ({ children }) => <li className="break-words">{children}</li>,
          h1: ({ children }) => <h1 className="mb-2 text-[12px] font-semibold leading-5">{children}</h1>,
          h2: ({ children }) => <h2 className="mb-2 text-[12px] font-semibold leading-5">{children}</h2>,
          h3: ({ children }) => <h3 className="mb-1 text-[12px] font-semibold leading-5">{children}</h3>,
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline decoration-current underline-offset-2"
            >
              {children}
            </a>
          ),
          code: ({ children }) => (
            <code className="rounded bg-slate-900/10 px-1.5 py-0.5 font-mono text-[0.92em]">{children}</code>
          ),
          pre: ({ children }) => (
            <pre className="overflow-x-auto rounded-xl bg-slate-900 px-3 py-2 text-[12px] leading-5 text-slate-50">{children}</pre>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-slate-300 pl-3 text-[12px] leading-5 italic text-slate-600">{children}</blockquote>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
};

export default ChatMarkdownMessage;
