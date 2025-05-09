import type {EssaySection} from "@/types/core";
import {ExternalLink} from "lucide-react";

interface Props {
  links: EssaySection['links'];
}

export function EssayLinks({links}: Props) {
  if (!links) {
    return null;
  }

  return (
    <ul className="mt-2 space-y-1 pl-2">
      {links.map((url, index) => (
        <li
          key={index}
        >
          <a
            href={url.link}
            title={url.value}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <ExternalLink className="h-3 w-3 mr-1.5" />
            {url.value}
          </a>
        </li>
      ))}
    </ul>
  );
}
