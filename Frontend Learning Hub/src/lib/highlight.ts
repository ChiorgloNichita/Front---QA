import { codeToHtml } from "shiki";

let highlighterCache: Map<string, string> = new Map();

export async function highlightCode(code: string, lang: string): Promise<string> {
  const key = `${lang}:${code}`;
  if (highlighterCache.has(key)) {
    return highlighterCache.get(key)!;
  }

  try {
    const html = await codeToHtml(code, {
      lang: lang || "text",
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    });
    highlighterCache.set(key, html);
    return html;
  } catch {
    // Fallback for unsupported languages
    return `<pre><code>${escapeHtml(code)}</code></pre>`;
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
