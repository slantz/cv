import type {EssaySection} from "@/types/core";

interface Props {
  location: EssaySection['location'];
}

export function EssayHeadingLocation({location}: Props) {
  if (!location) {
    return null;
  }

  return <span className="text-sm">, {location}</span>;
}
