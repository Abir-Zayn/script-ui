import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    // if its a proper error object, return the message
    return { errorMessage: error.message };
  } else {
    // return a generic error message
    return { errorMessage: 'An unexpected error occurred.' };
  }
};