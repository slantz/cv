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
