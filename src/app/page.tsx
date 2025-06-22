"use client";

import Image from "next/image";
import { 
  GridBody,
  DraggableContainer,
  GridItem, 
} from "@/components/ui/infinite-drag-scroll";
import galleryData from "@/data/webp-gallery.json";

// Use the local gallery images (webp format for browser compatibility)
const images = galleryData.gallery.webpImages;

export default function Home() {
  return (
    <div className="relative">
      {/* Beautiful Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-8">
        <div className="text-center text-white">
          <h1 className="text-2xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            My Beautiful Gallery 💕
          </h1>
          <p className="text-sm md:text-lg opacity-90 font-light">
            A collection of precious moments and memories ✨
          </p>
          <p className="text-xs md:text-sm opacity-70 mt-1 italic">
            &ldquo;Every photo tells our beautiful story&rdquo;
          </p>
        </div>
      </div>

      <DraggableContainer variant="masonry">
        <GridBody>
          {images.map((image) => (
            <GridItem
              key={image.id}
              className="relative h-54 w-36 md:h-96 md:w-64"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="pointer-events-none object-cover"
              />
              {/* Optional: Add a subtle overlay with the romantic message */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white text-xs font-medium leading-tight">
                    {image.alt}
                  </p>
                </div>
              </div>
            </GridItem>
          ))}
        </GridBody>
      </DraggableContainer>
    </div>
  );
}
