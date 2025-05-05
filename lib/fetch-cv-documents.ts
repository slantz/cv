import { getAdminDB } from "@/lib/firebase-admin"
import {snakeKebabToCamel} from "@/lib/utils";
import type {AboutSection, CVData, EssaySection} from "@/types/core";

export async function fetchCVDocuments(): Promise<CVData> {
  const db = getAdminDB();

  const fallback: CVData = {
    about: {
      title: '',
      description: '',
      subtitle: {
        major: '',
        duration: ''
      },
      achievements: [],
      contact: [],
      languages: [],
      skills: []
    },
    education: [],
    employment: [],
    projects: [],
    ownProjects: [],
    publications: []
  };

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
        documents.about = data as AboutSection
        break
      case "education":
      case "employment":
      case "projects":
      case "ownProjects":
      case "publications":
        documents[key] = data as EssaySection[]
        break
      default:
        console.warn(`Unexpected section "${key}" found in cv-data.`)
    }
  })

  return documents;
}
