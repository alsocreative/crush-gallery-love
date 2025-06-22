"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
  currentIndex: number;
  images: Array<{ id: number; src: string; alt: string }>;
  onPrevious: () => void;
  onNext: () => void;
}

export const ImageModal = ({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
  currentIndex,
  images,
  onPrevious,
  onNext,
}: ImageModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          onPrevious();
          break;
        case "ArrowRight":
          onNext();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    
    // Prevent body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, onPrevious, onNext]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
          onClick={onClose}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-60 text-white hover:text-pink-300 transition-colors p-2 rounded-full bg-black/50 hover:bg-black/70"
            aria-label="Close modal"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrevious();
            }}
            className="absolute left-4 z-60 text-white hover:text-pink-300 transition-colors p-3 rounded-full bg-black/50 hover:bg-black/70"
            aria-label="Previous image"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15,18 9,12 15,6"></polyline>
            </svg>
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 z-60 text-white hover:text-pink-300 transition-colors p-3 rounded-full bg-black/50 hover:bg-black/70"
            aria-label="Next image"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
          </button>

          {/* Image Container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-[90vw] max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(event, info) => {
              const threshold = 100;
              if (info.offset.x > threshold) {
                onPrevious();
              } else if (info.offset.x < -threshold) {
                onNext();
              }
            }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={1200}
                height={800}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                priority
              />
              {/* Loading overlay could be added here */}
            </div>
          </motion.div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-60 text-white bg-black/50 px-4 py-2 rounded-full">
            <span className="text-sm font-medium">
              {currentIndex + 1} / {images.length}
            </span>
          </div>

          {/* Image Caption */}
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-60 text-white bg-black/70 px-6 py-3 rounded-lg max-w-[80vw] text-center">
            <p className="text-sm font-medium leading-relaxed">
              {imageAlt}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
