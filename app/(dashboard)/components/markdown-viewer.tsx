import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MarkdownViewer({ content }: { content: string }) {
  if (!content) return <p className="text-zinc-500 italic">No description provided.</p>;

  return (
    // The 'prose' class here uses the plugin we just added to style everything automatically
    <article className="prose prose-invert prose-sm max-w-none 
      prose-p:text-zinc-300 prose-headings:text-zinc-100 
      prose-a:text-indigo-400 prose-code:text-indigo-300
      prose-ul:text-zinc-300 prose-ol:text-zinc-300
      prose-strong:text-zinc-100 prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800"
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </article>
  );
}