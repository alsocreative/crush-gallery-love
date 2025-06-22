"use client";

import Image from "next/image";
import { useState } from "react";
import { 
  GridBody,
  DraggableContainer,
  GridItem, 
} from "@/components/ui/infinite-drag-scroll";
import { ImageModal } from "@/components/ui/image-modal";
import { getImageSrc } from "@/lib/utils";
import galleryData from "@/data/webp-gallery.json";

// Use the local gallery images (webp format for browser compatibility)
const images = galleryData.gallery.webpImages;

export default function Home() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImageIndex(null);
  };

  const handlePreviousImage = () => {
    if (selectedImageIndex !== null) {
      const newIndex = selectedImageIndex === 0 ? images.length - 1 : selectedImageIndex - 1;
      setSelectedImageIndex(newIndex);
    }
  };

  const handleNextImage = () => {
    if (selectedImageIndex !== null) {
      const newIndex = selectedImageIndex === images.length - 1 ? 0 : selectedImageIndex + 1;
      setSelectedImageIndex(newIndex);
    }
  };

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
          {images.map((image, index) => (
            <GridItem
              key={image.id}
              className="relative h-54 w-36 md:h-96 md:w-64 cursor-pointer hover:shadow-2xl transition-shadow duration-300"
            >
              <div 
                onClick={() => handleImageClick(index)}
                className="relative w-full h-full group overflow-hidden rounded-lg"
              >
                <Image
                  src={getImageSrc(image.src)}
                  alt={image.alt}
                  fill
                  className="object-cover transition-all duration-300 group-hover:scale-110 group-hover:brightness-75"
                />
                {/* Magnifying glass icon overlay */}
                {/* <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-800"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="21 21l-4.35-4.35"></path>
                      <path d="11 8v6"></path>
                      <path d="8 11h6"></path>
                    </svg>
                  </div>
                </div> */}
                {/* Caption overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white text-xs font-medium leading-tight mb-2">
                      {image.alt}
                    </p>
                    {/* <div className="bg-pink-500/80 backdrop-blur-sm rounded-full px-3 py-1 text-center">
                      <span className="text-white text-xs font-medium">Click for fullscreen view</span>
                    </div> */}
                  </div>
                </div>
              </div>
            </GridItem>
          ))}
        </GridBody>
      </DraggableContainer>

      {/* Fullscreen Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        imageSrc={selectedImageIndex !== null ? getImageSrc(images[selectedImageIndex].src) : ""}
        imageAlt={selectedImageIndex !== null ? images[selectedImageIndex].alt : ""}
        currentIndex={selectedImageIndex || 0}
        images={images.map(img => ({ ...img, src: getImageSrc(img.src) }))}
        onPrevious={handlePreviousImage}
        onNext={handleNextImage}
      />
    </div>
  );
}
