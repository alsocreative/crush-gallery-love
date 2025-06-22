import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility function to get the correct image src using JSDelivr CDN
export const getImageSrc = (src: string) => {
  const cdnBase = 'https://cdn.jsdelivr.net/gh/alsocreative/crush-gallery-love@main/tee';
  
  // If src starts with '/', prepend the CDN base
  if (src.startsWith('/')) {
    return `${cdnBase}${src}`;
  }
  
  // If it's already a full URL, return as is
  if (src.startsWith('http')) {
    return src;
  }
  
  // Otherwise, assume it's a relative path and add CDN base
  return `${cdnBase}/${src}`;
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
