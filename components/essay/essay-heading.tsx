import type {EssaySection} from "@/types/core";
import {EssayHeadingDateRange} from "@/components/essay/essay-heading-date-range";
import {EssayHeadingSubtitle} from "@/components/essay/essay-heading-subtitle";
import {EssayHeadingTitle} from "@/components/essay/essay-heading-title";

interface Props {
  essay: EssaySection;
}

export function EssayHeading({essay}: Props) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex-1">
        <h4 className="font-semibold text-cyan-400">
          <EssayHeadingTitle
            company={essay.company}
            institution={essay.institution}
            project={essay.project}
            platform={essay.platform}
          />
          <EssayHeadingSubtitle
            location={essay.location}
            title={essay.title}
            major={essay.major}
            projects={essay.projects}
          />
        </h4>
      </div>
      <EssayHeadingDateRange dates={essay.dates} />
    </div>
  );
}
