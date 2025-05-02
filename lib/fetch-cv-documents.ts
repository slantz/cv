import { getAdminDB } from "@/lib/firebase-admin"

export async function fetchCVDocuments(): Promise<Record<string, any>> {
  const db = getAdminDB();

  if (!db) {
    console.error("Something is wrong, there's no firestore db to be used on SSR, can't fetch cv data.")
    return [];
  }

  const snapshot = await db.collection("cv-data").get()

  const documents: Record<string, any> = {}

  snapshot.forEach((doc) => {
    documents[doc.id] = doc.data()
  })

  return documents;
}
