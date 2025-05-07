import { getAdminDB } from "@/lib/firebase-admin"
import {snakeKebabToCamel} from "@/lib/utils";
import type {AboutSection, CVData, EssaySection, SectionMeta} from "@/types/core";

const fallback: CVData = {
  about: {
    meta: {
      order: 0
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
      order: 3
    },
    data: []
  },
  employment: {
    meta: {
      order: 1
    },
    data: []
  },
  projects: {
    meta: {
      order: 2
    },
    data: []
  },
  ownProjects: {
    meta: {
      order: 4
    },
    data: []
  },
  publications: {
    meta: {
      order: 5
    },
    data: []
  }
};

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

  const sectionEntries: [keyof CVData, CVData[keyof CVData]][] = [];

  snapshot.forEach((doc) => {
    const key = snakeKebabToCamel(doc.id) as keyof CVData
    const data = doc.data()

    switch (key) {
      case "about":
        sectionEntries.push([key, data as AboutSection & SectionMeta]);
        break;
      case "education":
      case "employment":
      case "projects":
      case "ownProjects":
      case "publications":
        sectionEntries.push([key, data as SectionMeta & {data: Array<EssaySection>}]);
        break;
      default:
        console.warn(`Unexpected section "${key}" found in cv-data.`)
    }
  })

  sectionEntries.sort(([, a], [, b]) => a.meta.order - b.meta.order);

  const documents: CVData = {...fallback};

  for (const [key, value] of sectionEntries) {
    if (key === "about") {
      documents[key] = value as AboutSection & SectionMeta;
    }
    else {
      documents[key] = value as SectionMeta & {data: Array<EssaySection>};
    }
  }

  return {
    ...documents
  };
}
