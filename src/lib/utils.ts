// src/lib/utils.ts

import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility to merge Tailwind (and other) class names.
 * Combines clsx for conditional logic with twMerge for deduplication.
 *
 * @param inputs - Class names or conditional expressions
 * @returns A single string of merged class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
