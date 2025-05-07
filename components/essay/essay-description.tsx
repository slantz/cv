import type {EssaySection} from "@/types/core";
import {parseTextWithLinks} from "@/lib/render-utils";

interface Props {
  description: EssaySection['description'];
}

export function EssayDescription({description}: Props) {
  if (!description) {
    return null;
  }

  return (
    <p className="text-sm text-gray-300 mt-1">{parseTextWithLinks(description)}</p>
  )
}
