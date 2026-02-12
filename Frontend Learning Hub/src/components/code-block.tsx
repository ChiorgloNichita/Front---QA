"use client";

import { useState, useEffect, useRef } from "react";
import { CopyButton } from "@/components/copy-button";

interface CodeBlockProps {
  code: string;
  lang: string;
}

export function CodeBlock({ code, lang }: CodeBlockProps) {
  const [highlightedHtml, setHighlightedHtml] = useState<string | null>(null);
  const codeRef = useRef<string>(code);

  useEffect(() => {
    codeRef.current = code;
    let cancelled = false;

    import("shiki").then(({ codeToHtml }) => {
      codeToHtml(code, {
        lang: lang || "text",
        themes: {
          light: "github-light",
          dark: "github-dark",
        },
      })
        .then((html) => {
          if (!cancelled) setHighlightedHtml(html);
        })
        .catch(() => {
          if (!cancelled) setHighlightedHtml(null);
        });
    });

    return () => {
      cancelled = true;
    };
  }, [code, lang]);

  return (
    <div className="group my-6">
      <div className="flex items-center justify-between rounded-t-lg border border-b-0 bg-muted/50 px-4 py-2">
        <span className="text-xs font-mono text-muted-foreground">
          {lang || "code"}
        </span>
        <CopyButton text={code} />
      </div>
      {highlightedHtml ? (
        <div
          className="shiki-wrapper overflow-x-auto rounded-b-lg border text-sm [&_pre]:!bg-muted/30 [&_pre]:p-4 [&_pre]:!m-0 [&_code]:!bg-transparent"
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
      ) : (
        <pre className="overflow-x-auto rounded-b-lg border bg-muted/30 p-4 text-sm">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}
