interface Link {
  type: "link";
  link: URL;
  value: string;
}

interface Text {
  type: "text";
  value: string;
}

export interface EssaySection {
  company: string;
  location: string;
  title: string;
  dates: {
    startDate: Date;
    endDate: Date | null;
  }
  description: string;
  keyProjects: Array<string>;
  institution: string;
  major: string;
  projects: Array<Link | Text>;
  project: string;
  platform: string;
  links: Array<Link>
}
