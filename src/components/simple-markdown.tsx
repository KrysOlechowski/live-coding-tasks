import type { ReactNode } from "react";

type Block =
  | { type: "code"; value: string }
  | { type: "heading"; depth: number; value: string }
  | { type: "ordered-list"; items: string[] }
  | { type: "paragraph"; value: string }
  | { type: "unordered-list"; items: string[] };

function renderInlineContent(input: string): ReactNode[] {
  const parts = input.split(/(`[^`]+`)/g).filter(Boolean);

  return parts.map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={`${part}-${index}`}
          className="rounded bg-zinc-900/5 px-1.5 py-0.5 font-mono text-[0.95em] text-zinc-950 dark:bg-white/10 dark:text-white"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    return <span key={`${part}-${index}`}>{part}</span>;
  });
}

function parseBlocks(markdown: string): Block[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];

  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      index += 1;
      continue;
    }

    if (trimmedLine.startsWith("```")) {
      const codeLines: string[] = [];
      index += 1;

      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        codeLines.push(lines[index]);
        index += 1;
      }

      index += 1;
      blocks.push({ type: "code", value: codeLines.join("\n") });
      continue;
    }

    const headingMatch = trimmedLine.match(/^(#{1,6})\s+(.*)$/);

    if (headingMatch) {
      blocks.push({
        type: "heading",
        depth: headingMatch[1].length,
        value: headingMatch[2],
      });
      index += 1;
      continue;
    }

    if (/^\d+\.\s+/.test(trimmedLine)) {
      const items: string[] = [];

      while (index < lines.length && /^\d+\.\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^\d+\.\s+/, ""));
        index += 1;
      }

      blocks.push({ type: "ordered-list", items });
      continue;
    }

    if (/^[-*]\s+/.test(trimmedLine)) {
      const items: string[] = [];

      while (index < lines.length && /^[-*]\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^[-*]\s+/, ""));
        index += 1;
      }

      blocks.push({ type: "unordered-list", items });
      continue;
    }

    const paragraphLines: string[] = [];

    while (
      index < lines.length &&
      lines[index].trim() &&
      !lines[index].trim().startsWith("```") &&
      !/^(#{1,6})\s+/.test(lines[index].trim()) &&
      !/^\d+\.\s+/.test(lines[index].trim()) &&
      !/^[-*]\s+/.test(lines[index].trim())
    ) {
      paragraphLines.push(lines[index].trim());
      index += 1;
    }

    blocks.push({
      type: "paragraph",
      value: paragraphLines.join(" "),
    });
  }

  return blocks;
}

export function SimpleMarkdown({
  content,
  className = "",
}: {
  content: string;
  className?: string;
}) {
  const blocks = parseBlocks(content);

  return (
    <div className={`space-y-4 ${className}`.trim()}>
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          if (block.depth === 1) {
            return (
              <h1 key={index} className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white">
                {renderInlineContent(block.value)}
              </h1>
            );
          }

          if (block.depth === 2) {
            return (
              <h2
                key={index}
                className="pt-2 text-xl font-semibold tracking-tight text-zinc-950 dark:text-white"
              >
                {renderInlineContent(block.value)}
              </h2>
            );
          }

          return (
            <h3 key={index} className="text-lg font-semibold text-zinc-950 dark:text-white">
              {renderInlineContent(block.value)}
            </h3>
          );
        }

        if (block.type === "paragraph") {
          return (
            <p key={index} className="leading-7 text-zinc-700 dark:text-zinc-300">
              {renderInlineContent(block.value)}
            </p>
          );
        }

        if (block.type === "unordered-list") {
          return (
            <ul
              key={index}
              className="space-y-2 pl-5 text-zinc-700 marker:text-zinc-400 list-disc dark:text-zinc-300"
            >
              {block.items.map((item, itemIndex) => (
                <li key={`${item}-${itemIndex}`}>{renderInlineContent(item)}</li>
              ))}
            </ul>
          );
        }

        if (block.type === "ordered-list") {
          return (
            <ol
              key={index}
              className="space-y-2 pl-5 text-zinc-700 marker:text-zinc-400 list-decimal dark:text-zinc-300"
            >
              {block.items.map((item, itemIndex) => (
                <li key={`${item}-${itemIndex}`}>{renderInlineContent(item)}</li>
              ))}
            </ol>
          );
        }

        return (
          <pre
            key={index}
            className="overflow-x-auto rounded-2xl border border-zinc-200 bg-zinc-950 p-4 text-sm leading-6 text-zinc-100 dark:border-zinc-800"
          >
            <code>{block.value}</code>
          </pre>
        );
      })}
    </div>
  );
}
