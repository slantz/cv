import type {EssaySection} from "@/types/core";

interface Props {
  company: EssaySection['company'];
  institution: EssaySection['institution'];
  project: EssaySection['project'];
  platform: EssaySection['platform'];
}

export function EssayHeadingTitle({company, institution, project, platform}: Props) {
  if (company || institution || project) {
    return <span>{company || institution || project}</span>;
  }

  if (platform) {
    return <span>{`on ${platform}`}</span>;
  }

  return <span>Heading</span>;
}
