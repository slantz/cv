import { type ReactNode } from "react";

export function parseTextWithLinks(text: string): ReactNode[] {
  const result: ReactNode[] = [];

  const linkRegex =
    /{{link}}.*?{{title}}(.*?){{title}}.*?{{url}}(.*?){{url}}.*?{{link}}/g;

  let currentIndex = 0;
  const matches = [...text.matchAll(linkRegex)];

  for (const match of matches) {
    const [fullMatch, title, url] = match;
    const matchIndex = match.index ?? 0;

    if (currentIndex < matchIndex) {
      result.push(text.slice(currentIndex, matchIndex));
    }

    result.push(
      <a
        key={matchIndex}
        href={url}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="text-cyan-400 hover:text-cyan-300 transition-colors"
        title={title}
      >
        {title}
      </a>
    );

    currentIndex = matchIndex + fullMatch.length;
  }

  if (currentIndex < text.length) {
    result.push(text.slice(currentIndex));
  }

  return result;
}
