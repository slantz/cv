interface Link {
  type: "link";
  link: `https://${string}` | `http://${string}`;
  value: string;
}

interface Text {
  type: "text";
  value: string;
}

export interface Contact {
  title: string;
  type: 'location' | 'email' | 'telegram' | 'discord';
  value: string;
  tracking?: 'email' | 'telegram' | 'discord';
  link?: `mailto:${string}` | `https://${string}` | `http://${string}`;
}

interface AboutSubTitle {
  major: string;
  duration: string;
  years: string;
}

interface Language {
  name: string;
  proficiency: string;
  level: 1 | 2 | 3 | 4 | 5;
}

interface Skill {
  key: string;
  order: number;
  level: 1 | 2 | 3 | 4 | 5;
  details: string[];
}

interface Social {
  github: {
    link: Link;
    tracking: string;
  };
  linkedin: {
    link: Link;
    tracking: string;
  };
  medium: {
    link: Link;
    tracking: string;
  };
  stackOverflow: {
    link: Link;
    tracking: string;
  };
}

export interface SectionMeta {
  meta: {
    order: number;
  }
}

export interface AboutSection {
  title: string;
  description: string;
  subtitle: AboutSubTitle;
  achievements: Array<{text: string}>;
  contact: Array<Contact>;
  languages: Array<Language>;
  skills: Array<Skill>;
  social: Social
}

export interface EssaySection {
  company?: string;
  location?: string;
  title?: string;
  dates?: {
    startDate: Date;
    endDate?: Date;
  }
  description?: string;
  keyProjects?: Array<string>;
  institution?: string;
  major?: string;
  projects?: Array<Link | Text>;
  project?: string;
  platform?: string;
  links?: Array<Link>
}

export interface CVData {
  about: AboutSection & SectionMeta;
  education: SectionMeta & {data: Array<EssaySection>}
  employment: SectionMeta & {data: Array<EssaySection>}
  projects: SectionMeta & {data: Array<EssaySection>}
  ownProjects: SectionMeta & {data: Array<EssaySection>}
  publications: SectionMeta & {data: Array<EssaySection>}
}
