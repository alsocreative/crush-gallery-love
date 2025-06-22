import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Get the base path for the application (for GitHub Pages deployment)
export const getBasePath = () => {
  return process.env.NODE_ENV === "production" ? "/crush-gallery-love" : "";
};

// Utility function to get the correct image src with base path
export const getImageSrc = (src: string) => {
  const basePath = getBasePath();
  // If src already includes the base path, return as is
  if (src.startsWith(basePath)) {
    return src;
  }
  // Add base path to the src
  return `${basePath}${src}`;
};
