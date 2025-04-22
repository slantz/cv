"use client"

import { useState, useEffect } from "react"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"

// This type represents the structure of our CV data
export interface CVSection {
  id: string
  title: string
  description: string
  order: number
  details: {
    title: string
    description: string
    tags?: string[]
  }[]
}

export function useCVData() {
  const [cvData, setCVData] = useState<CVSection[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Query the cv-sections collection, ordered by the 'order' field
        const sectionsQuery = query(collection(db, "cv-sections"), orderBy("order", "asc"))

        const sectionsSnapshot = await getDocs(sectionsQuery)

        if (sectionsSnapshot.empty) {
          setError("No CV data found. Please add some data to your Firebase collection.")
          setIsLoading(false)
          return
        }

        const sections: CVSection[] = []

        // Process each section document
        for (const sectionDoc of sectionsSnapshot.docs) {
          const sectionData = sectionDoc.data() as Omit<CVSection, "id" | "details">

          // Query the details subcollection for this section
          const detailsQuery = query(collection(db, `cv-sections/${sectionDoc.id}/details`), orderBy("order", "asc"))

          const detailsSnapshot = await getDocs(detailsQuery)

          const details = detailsSnapshot.docs.map((detailDoc) => {
            return detailDoc.data() as CVSection["details"][0]
          })

          // Add the section with its details to our array
          sections.push({
            id: sectionDoc.id,
            title: sectionData.title,
            description: sectionData.description,
            order: sectionData.order,
            details: details,
          })
        }

        setCVData(sections)
      } catch (err) {
        console.error("Error fetching CV data:", err)
        setError("Failed to load CV data. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return { cvData, isLoading, error }
}
