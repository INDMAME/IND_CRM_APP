import ReactMarkdown, { type Components } from "react-markdown";
import type { Ref } from "react";
import type { HelpTopic } from "./helpTypes.ts";

type ManualHelpTopicContentProps = {
  articleRef?: Ref<HTMLElement>;
  topic: HelpTopic;
};

const MANUAL_MARKDOWN_COMPONENTS: Components = {
  p: ({ children }) => <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-700">{children}</p>,
  ul: ({ children }) => <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700 marker:text-primary">{children}</ul>,
  ol: ({ children }) => <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-700 marker:text-primary">{children}</ol>,
  li: ({ children }) => <li className="pl-1">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-slate-900">{children}</strong>,
  blockquote: ({ children }) => (
    <blockquote className="mt-3 rounded-r-[var(--radius-xl)] border-l-2 border-primary/30 bg-primary/5 px-4 py-3 text-sm leading-6 text-slate-700">
      {children}
    </blockquote>
  ),
};

// Renders one documented topic as a readable Manual article.
const ManualHelpTopicContent = ({ articleRef, topic }: ManualHelpTopicContentProps) => {
  return (
    <article
      ref={articleRef}
      tabIndex={-1}
      aria-labelledby="manual-help-topic-title"
      className="scroll-mt-20 break-words rounded-[var(--radius-xl)] border border-slate-200 bg-white px-5 py-5 shadow-[0_14px_34px_rgba(15,23,42,0.06)] focus:outline-hidden focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 sm:px-7"
    >
      <header className="border-b border-slate-100 pb-4">
        <h2 id="manual-help-topic-title" className="text-balance text-xl font-semibold text-primary">
          {topic.title}
        </h2>
      </header>

      <div className="mt-5 space-y-6">
        {topic.chunks.map((chunk) => (
          <section key={chunk.id} aria-label={chunk.heading || topic.title}>
            {chunk.heading && chunk.heading !== topic.title ? (
              <h3
                id={`manual-help-chunk-${chunk.id}`}
                className="scroll-mt-6 text-base font-semibold text-primary"
              >
                {chunk.heading}
              </h3>
            ) : null}
            <ReactMarkdown
              skipHtml
              components={MANUAL_MARKDOWN_COMPONENTS}
            >
              {chunk.body}
            </ReactMarkdown>
          </section>
        ))}
      </div>
    </article>
  );
};

export default ManualHelpTopicContent;
