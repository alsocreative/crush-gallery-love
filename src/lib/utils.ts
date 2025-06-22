import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility function to get the correct image src (simplified without base path)
export const getImageSrc = (src: string) => {
  return src;
};

// Type definitions for media items
export interface MediaItem {
  id: number;
  filename: string;
  src: string;
  alt: string;
  type: 'video' | 'webp' | 'heic';
  date: string;
  muted?: boolean;
}
