import { getAdminDB } from "@/lib/firebase-admin"
import { Timestamp } from "firebase-admin/firestore";
import {snakeKebabToCamel} from "@/lib/utils";
import type {AboutSection, CVData, EssaySection, SectionMeta} from "@/types/core";

const fallback: CVData = {
  about: {
    meta: {
      order: 0,
      title: 'about',
      subtitle: ''
    },
    title: '',
    description: '',
    subtitle: {
      major: '',
      duration: '',
      years: ''
    },
    social: {
      github: {
        link: {
          type: 'link',
          value: '',
          link: 'https://'
        },
        tracking: ''
      },
      linkedin: {
        link: {
          type: 'link',
          value: '',
          link: 'https://'
        },
        tracking: ''
      },
      medium: {
        link: {
          type: 'link',
          value: '',
          link: 'https://'
        },
        tracking: ''
      },
      stackOverflow: {
        link: {
          type: 'link',
          value: '',
          link: 'https://'
        },
        tracking: ''
      }
    },
    achievements: [],
    contact: [],
    languages: [],
    skills: []
  },
  education: {
    meta: {
      order: 3,
      title: 'education',
      subtitle: ''
    },
    data: []
  },
  employment: {
    meta: {
      order: 1,
      title: 'employment',
      subtitle: ''
    },
    data: []
  },
  projects: {
    meta: {
      order: 2,
      title: 'projects',
      subtitle: ''
    },
    data: []
  },
  ownProjects: {
    meta: {
      order: 4,
      title: 'personal projects',
      subtitle: ''
    },
    data: []
  },
  publications: {
    meta: {
      order: 5,
      title: 'publications',
      subtitle: ''
    },
    data: []
  }
};

function normalizeEssaySection(section: EssaySection): EssaySection {
  if (!section.dates) {
    return section;
  }

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "long",
      timeZone: "UTC",
    }).format(date);
  };

  return {
    ...section,
    dates: {
      startDate: formatDate(section.dates.startDate),
      ...(section.dates.endDate && {
        endDate: formatDate(section.dates.endDate),
      }),
    },
  };
}

export async function fetchCVDocuments(): Promise<CVData> {
  const db = getAdminDB();

  if (!db) {
    console.error("Something is wrong, there's no firestore db to be used on SSR, can't fetch cv data.")
    return fallback;
  }

  // const snapshotWithAbout = await db
  //   .collection("cv-data")
  //   .where(FieldPath.documentId(), "!=", "about")
  //   .orderBy(FieldPath.documentId())
  //   .get()

  const snapshot = await db.collection("cv-data").get()

  const documents = {...fallback};

  snapshot.forEach((doc) => {
    const key = snakeKebabToCamel(doc.id) as keyof CVData
    const data = doc.data()

    switch (key) {
      case "about":
        documents.about = data as SectionMeta & AboutSection
        break
      case "education":
      case "employment":
      case "projects":
      case "ownProjects":
      case "publications":
        documents[key] = {
          meta: (data as SectionMeta).meta,
          data: (data as SectionMeta & {data: EssaySection[]}).data.map(normalizeEssaySection),
        };
        break
      default:
        console.warn(`Unexpected section "${key}" found in cv-data.`)
    }
  })

  return documents;
}
