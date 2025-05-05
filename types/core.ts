interface Link {
  type: "link";
  link: URL;
  value: string;
}

interface Text {
  type: "text";
  value: string;
}

interface Contact {
  title: string;
  type: 'location' | 'email' | 'telegram' | 'discord';
  value: string;
  tracking?: 'email' | 'telegram' | 'discord';
  link?: `mailto:${string}` | `https://${string}` | `http://${string}`;
}

interface AboutSubTitle {
  major: string;
  duration: string;
}

interface Language {
  name: string;
  proficiency: string;
  level: 1 | 2 | 3 | 4 | 5;
}

interface Skill {
  key: string;
  order: number;
  level: 1  | 2 | 3 | 4 | 5;
  details: string[];
}

export interface AboutSection {
  title: string;
  description: string;
  subtitle: AboutSubTitle;
  achievements: Array<{text: string}>;
  contact: Array<Contact>;
  languages: Array<Language>;
  skills: Array<Skill>;
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

export interface CVData {
  about: AboutSection;
  education: Array<EssaySection>;
  employment: Array<EssaySection>
  projects: Array<EssaySection>
  ownProjects: Array<EssaySection>
  publications: Array<EssaySection>
}
