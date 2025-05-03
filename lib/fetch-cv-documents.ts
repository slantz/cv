import { getAdminDB } from "@/lib/firebase-admin"
import {FieldPath} from "firebase-admin/firestore";

export async function fetchCVDocuments(): Promise<Record<string, any>> {
  const db = getAdminDB();

  if (!db) {
    console.error("Something is wrong, there's no firestore db to be used on SSR, can't fetch cv data.")
    return [];
  }

  const snapshotWithAbout = await db
    .collection("cv-data")
    .where(FieldPath.documentId(), "!=", "about")
    .orderBy(FieldPath.documentId())
    .get()

  snapshotWithAbout.forEach(doc => {
    console.log(doc.id)
  })

  const snapshot = await db.collection("cv-data").get()

  const documents: Record<string, any> = {}

  snapshot.forEach((doc) => {
    documents[doc.id] = doc.data()
  })

  return documents;
}
