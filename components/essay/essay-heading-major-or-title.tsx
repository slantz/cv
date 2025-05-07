import type {EssaySection} from "@/types/core";

interface Props {
  title: EssaySection['title'];
  major: EssaySection['major'];
}

export function EssayHeadingMajorOrTitle({title, major}: Props) {
  if (!title && !major) {
    return null;
  }

  return <i className="text-sm text-gray-300"> — {title || major}</i>
}
