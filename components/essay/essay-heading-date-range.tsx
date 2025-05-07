import type {EssaySection} from "@/types/core";

interface Props {
  dates: EssaySection['dates'];
}

export function EssayHeadingDateRange({dates}: Props) {
  if (!dates) {
    return null;
  }

  return <span className="text-xs text-gray-400 font-medium ml-2">{dates.startDate}{dates.endDate ? ` – ${dates.endDate}` : ` – Present`}</span>;
}
