"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "@/components/code-block";

interface MarkdownRendererProps {
  content: string;
}

function generateId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\wа-яё\s-]/gi, "")
    .replace(/\s+/g, "-");
}

function extractText(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(extractText).join("");
  if (children && typeof children === "object" && "props" in children) {
    return extractText((children as React.ReactElement<{ children?: React.ReactNode }>).props.children);
  }
  return String(children ?? "");
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children }) => {
          const text = extractText(children);
          const id = generateId(text);
          return (
            <h2 id={id} className="mt-10 mb-4 text-2xl font-bold scroll-mt-20">
              {children}
            </h2>
          );
        },
        h3: ({ children }) => {
          const text = extractText(children);
          const id = generateId(text);
          return (
            <h3 id={id} className="mt-8 mb-3 text-xl font-semibold scroll-mt-20">
              {children}
            </h3>
          );
        },
        h4: ({ children }) => (
          <h4 className="mt-6 mb-2 text-lg font-semibold">{children}</h4>
        ),
        p: ({ children }) => (
          <p className="my-3 text-foreground/90 leading-relaxed">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="my-3 ml-6 list-disc space-y-1 text-foreground/90">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="my-3 ml-6 list-decimal space-y-1 text-foreground/90">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="leading-relaxed">{children}</li>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold">{children}</strong>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        blockquote: ({ children }) => (
          <blockquote className="my-4 border-l-4 border-primary/30 pl-4 italic text-muted-foreground">
            {children}
          </blockquote>
        ),
        code: ({ className, children }) => {
          const isBlock = className?.startsWith("language-");
          if (isBlock) {
            return (
              <code className="text-sm">{children}</code>
            );
          }
          return (
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono text-primary">
              {children}
            </code>
          );
        },
        pre: ({ children }) => {
          const codeChild = children as React.ReactElement<{
            className?: string;
            children?: React.ReactNode;
          }>;
          const lang = codeChild?.props?.className
            ?.replace("language-", "")
            ?? "";
          const codeText = extractText(codeChild?.props?.children).replace(/\n$/, "");

          return <CodeBlock code={codeText} lang={lang} />;
        },
        table: ({ children }) => (
          <div className="my-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-muted/50">{children}</thead>
        ),
        th: ({ children }) => (
          <th className="border-b px-4 py-2 text-left font-semibold">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border-b px-4 py-2">{children}</td>
        ),
        hr: () => <hr className="my-8 border-border" />,
        img: ({ src, alt }) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt ?? ""}
            className="my-4 rounded-lg border max-w-full"
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
