"use client";

import Image from "next/image";
import { useState, useRef, useMemo } from "react";
import { 
  GridBody,
  DraggableContainer,
  GridItem, 
} from "@/components/ui/infinite-drag-scroll";
import { MediaModal } from "@/components/ui/image-modal";
import { getImageSrc, MediaItem } from "@/lib/utils";
import galleryData from "@/data/complete-gallery.json";

// Shuffle function to randomize array
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function Home() {
  // Randomize media order on each page load
  const media: MediaItem[] = useMemo(() => 
    shuffleArray(galleryData.gallery.media as MediaItem[]), 
    []
  );
  
  // Random romantic messages for the header
  const romanticMessages = useMemo(() => [
    "Every photo tells our beautiful story 💕",
    "Moments of love captured forever ✨",
    "Our journey through beautiful memories 🌹",
    "Each image holds a piece of my heart 💖",
    "Love stories written in pictures 📸",
    "Precious moments that take my breath away 🥰",
    "Every frame is a love letter to you 💌",
    "Beautiful memories that make my heart flutter 🦋",
    "Capturing the magic of our love story ✨",
    "Each photo is a reminder of how lucky I am 🍀"
  ], []);
  
  const randomMessage = useMemo(() => 
    romanticMessages[Math.floor(Math.random() * romanticMessages.length)],
    [romanticMessages]
  );
  const [selectedMediaIndex, setSelectedMediaIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});

  const handleMediaClick = (index: number) => {
    setSelectedMediaIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMediaIndex(null);
  };

  const handlePreviousMedia = () => {
    if (selectedMediaIndex !== null) {
      const newIndex = selectedMediaIndex === 0 ? media.length - 1 : selectedMediaIndex - 1;
      setSelectedMediaIndex(newIndex);
    }
  };

  const handleNextMedia = () => {
    if (selectedMediaIndex !== null) {
      const newIndex = selectedMediaIndex === media.length - 1 ? 0 : selectedMediaIndex + 1;
      setSelectedMediaIndex(newIndex);
    }
  };

  const handleVideoClick = (event: React.MouseEvent<HTMLVideoElement>, index: number) => {
    event.stopPropagation();
    const video = videoRefs.current[index];
    if (video) {
      if (video.muted) {
        video.muted = false;
        video.play();
      } else {
        video.muted = true;
        video.pause();
      }
    }
  };

  return (
    <div className="relative">
      {/* Beautiful Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-8">
        <div className="text-center text-white">
          <h1 className="text-2xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            My Beautiful Love Gallery 💕✨
          </h1>
          <p className="text-sm md:text-lg opacity-90 font-light">
            A complete collection of precious moments, memories, and love stories ✨
          </p>
          <p className="text-xs md:text-sm opacity-70 mt-1 italic">
            &ldquo;{randomMessage}&rdquo;
          </p>
        </div>
      </div>

      <DraggableContainer variant="masonry">
        <GridBody>
          {media.map((mediaItem: MediaItem, index: number) => (
            <GridItem
              key={mediaItem.id}
              className="relative h-54 w-36 md:h-96 md:w-64 cursor-pointer hover:shadow-2xl transition-shadow duration-300"
            >
              <div 
                onClick={() => handleMediaClick(index)}
                className="relative w-full h-full group overflow-hidden rounded-lg"
              >
                {mediaItem.type === 'video' ? (
                  <video
                    ref={(el) => { videoRefs.current[index] = el; }}
                    src={getImageSrc(mediaItem.src)}
                    className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:brightness-75"
                    muted={mediaItem.muted !== false}
                    loop
                    playsInline
                    onClick={(e) => handleVideoClick(e, index)}
                    onMouseEnter={(e) => {
                      const video = e.currentTarget;
                      video.play();
                    }}
                    onMouseLeave={(e) => {
                      const video = e.currentTarget;
                      if (video.muted) {
                        video.pause();
                      }
                    }}
                  />
                ) : (
                  <Image
                    src={getImageSrc(mediaItem.src)}
                    alt={mediaItem.alt}
                    fill
                    className="object-cover transition-all duration-300 group-hover:scale-110 group-hover:brightness-75"
                  />
                )}
                
                {/* Video indicator */}
                {mediaItem.type === 'video' && (
                  <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  </div>
                )}
                
                {/* Caption overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white text-xs font-medium leading-tight mb-2">
                      {mediaItem.alt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/70 text-xs">
                        {mediaItem.type === 'video' ? '📹 Video' : '📸 Photo'}
                      </span>
                      {mediaItem.type === 'video' && (
                        <span className="text-white/70 text-xs">
                          Click to {videoRefs.current[index]?.muted ? 'unmute' : 'mute'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </GridItem>
          ))}
        </GridBody>
      </DraggableContainer>

      {/* Fullscreen Media Modal */}
      <MediaModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        imageSrc={selectedMediaIndex !== null ? getImageSrc(media[selectedMediaIndex].src) : ""}
        imageAlt={selectedMediaIndex !== null ? media[selectedMediaIndex].alt : ""}
        currentIndex={selectedMediaIndex || 0}
        images={media.map((item: MediaItem) => ({ ...item, src: getImageSrc(item.src) }))}
        onPrevious={handlePreviousMedia}
        onNext={handleNextMedia}
      />
    </div>
  );
}
