import { type ReactNode } from "react";
import {ExternalLink} from "lucide-react";

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
        rel="noopener noreferrer"
        className="underline text-sky-400 hover:text-sky-300"
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

export const renderDescription = (description: string | { text: string; url: string }[]) => {
  if (typeof description === "string") {
    return <p className="text-sm text-gray-300 mt-1">{description}</p>
  }
  else if (Array.isArray(description)) {
    return (
      <div className="mt-2 space-y-1">
        {description.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <ExternalLink className="h-3 w-3 mr-1.5" />
            {link.text}
          </a>
        ))}
      </div>
    )
  }
  return null
}

// Helper function to format subtitle with italic styling for "some additional detail"
export const formatSubtitle = (subtitle: string) => {
  if (!subtitle) return null

  // Check if the subtitle contains "some additional detail"
  const parts = subtitle.split(" - ")
  if (parts.length === 2 && parts[1] === "some additional detail") {
    return (
      <>
        {parts[0]} - <i className="text-gray-400">some additional detail</i>
      </>
    )
  }

  return subtitle
}
