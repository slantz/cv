import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const snakeKebabToCamel = (str: string) =>
  str.toLowerCase().replace(/[-_][a-z]/g, (group) => group.slice(-1).toUpperCase());

export const parseTemplateString = (
  template: string | undefined,
  values: Record<string, string | number>
): string => {
  if (typeof template !== "string") {
    return ""
  }

  return template.replace(/{{(.*?)}}/g, (_, key) => {
    const trimmedKey = key.trim()
    return values.hasOwnProperty(trimmedKey)
      ? String(values[trimmedKey])
      : `{{${trimmedKey}}}`
  })
}

export const parseTemplateDescriptionWithDates = (description: string) => {
  return parseTemplateString(description, {
    devExperienceYears: new Date().getFullYear() - new Date('2013').getFullYear(),
    manageExperienceYears: new Date().getFullYear() - new Date('2019').getFullYear()
  })
}

export const format = (date: Date) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)

export const formatFirestoreTimestampDate = (timestamp: any): string => {
  if (!timestamp) return "Unknown date"

  try {
    // Firestore Timestamp (client SDK)
    if (typeof timestamp.toDate === "function") {
      return format(timestamp.toDate())
    }

    // Firestore Timestamp (admin SDK or serialized)
    if ("_seconds" in timestamp) {
      return format(new Date(timestamp._seconds * 1000))
    }

    if ("seconds" in timestamp) {
      return format(new Date(timestamp.seconds * 1000))
    }

    // ISO string or fallback
    return format(new Date(timestamp))
  } catch {
    return "Invalid date"
  }
}
