import type {EssaySection} from "@/types/core";

interface Props {
  projects: EssaySection['projects'];
}

export function EssayHeadingProjects({projects}: Props) {
  if (!projects) {
    return null;
  }

  return (
    <span>
      {" — "}
      {projects.map((project, index) => {
        const isLast = index === projects.length - 1;

        const content =
          project.type === "text" ? (
            <i className="text-sm text-gray-300">{project.value}</i>
          ) : (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <i>{project.value}</i>
            </a>
          );

        return (
          <span key={project.value}>
            {content}
            {!isLast && ", "}
          </span>
        );
      })}
    </span>
  );
}
