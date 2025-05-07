import { getAdminDB } from "@/lib/firebase-admin"
import { Timestamp } from "firebase-admin/firestore";
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

function normalizeEssaySection(section: any): EssaySection {
  if (!section.dates) {
    return section;
  }

  return {
    ...section,
    dates: {
      startDate: section.dates.startDate instanceof Timestamp
        ? section.dates.startDate.toDate()
        : section.dates.startDate,
      ...(section.dates.endDate && {
        endDate: section.dates.endDate instanceof Timestamp
          ? section.dates.endDate.toDate()
          : section.dates.endDate
      })
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
