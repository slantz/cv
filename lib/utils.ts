import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const snakeKebabToCamel = (str: string) =>
  str.toLowerCase().replace(/[-_][a-z]/g, (group) => group.slice(-1).toUpperCase());
