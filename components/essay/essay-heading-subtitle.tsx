import type {EssaySection} from "@/types/core";
import {EssayHeadingLocation} from "@/components/essay/essay-heading-location";
import {EssayHeadingMajorOrTitle} from "@/components/essay/essay-heading-major-or-title";
import {EssayHeadingProjects} from "@/components/essay/essay-heading-projects";

interface Props {
  location: EssaySection['location'];
  title: EssaySection['title'];
  major: EssaySection['major'];
  projects: EssaySection['projects'];
}

export function EssayHeadingSubtitle({location, title, major, projects}: Props) {
  if (!location && !title && !major && !projects) {
    return null;
  }

  return (
    <span className="font-normal text-gray-400">
      <EssayHeadingLocation location={location}/>
      <EssayHeadingMajorOrTitle title={title} major={major} />
      <EssayHeadingProjects projects={projects} />
    </span>
  )
}
