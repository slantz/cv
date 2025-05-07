import type {EssaySection} from "@/types/core";

interface Props {
  keyProjects: EssaySection['keyProjects'];
}

export function EssayKeyProjects({keyProjects}: Props) {
  if (!keyProjects) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {keyProjects.map((keyProject, keyProjectIndex) => (
        <span
          key={keyProjectIndex}
          className="px-2 py-1 text-xs rounded-full bg-gray-700 text-gray-300"
        >
          {keyProject}
        </span>
      ))}
    </div>
  )
}
