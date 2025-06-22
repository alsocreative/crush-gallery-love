"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { MediaItem, getImageSrc } from "@/lib/utils";

interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
  currentIndex: number;
  images: MediaItem[];
  onPrevious: () => void;
  onNext: () => void;
}

export const MediaModal = ({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
  currentIndex,
  images,
  onPrevious,
  onNext,
}: MediaModalProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const currentMedia = images[currentIndex];
  const isVideo = currentMedia?.type === 'video';

  // Update video muted state when media changes
  useEffect(() => {
    if (isVideo && currentMedia?.muted !== undefined) {
      setIsVideoMuted(currentMedia.muted);
    }
  }, [currentIndex, isVideo, currentMedia]);

  // Handle video controls
  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsVideoMuted(false); // Unmute on play
      } else {
        videoRef.current.pause();
      }
    }
  };

  const handleVideoPlay = () => {
    setIsVideoMuted(false); // Unmute on play
  };

  // Auto-play video when modal opens with a video
  useEffect(() => {
    if (isOpen && isVideo && videoRef.current) {
      // Small delay to ensure video element is ready
      const timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().catch(error => {
            console.log('Auto-play prevented:', error);
          });
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, isVideo, currentIndex]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);
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
            aria-label="Previous media"
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
            aria-label="Next media"
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

          {/* Media Container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full flex items-center justify-center p-4"
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
            <div className="relative flex items-center justify-center w-full h-full">
              {isVideo ? (
                <div className="relative max-w-full max-h-full">
                  <video
                    ref={videoRef}
                    src={getImageSrc(imageSrc)}
                    className="max-w-[90vw] max-h-[80vh] w-auto h-auto object-contain rounded-lg shadow-2xl cursor-pointer"
                    muted={isVideoMuted}
                    onClick={handleVideoClick}
                    onPlay={handleVideoPlay}
                    playsInline
                    preload="metadata"
                    loop
                  />
                  
                  {/* Play/Pause button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVideoClick();
                      }}
                      className="text-white hover:text-pink-300 transition-all duration-300 p-4 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm opacity-0 hover:opacity-100 pointer-events-auto transform hover:scale-110"
                      aria-label={videoRef.current?.paused ? "Play video" : "Pause video"}
                    >
                      {videoRef.current?.paused !== false ? (
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                          <polygon points="5,3 19,12 5,21" />
                        </svg>
                      ) : (
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                          <rect x="6" y="4" width="4" height="16" />
                          <rect x="14" y="4" width="4" height="16" />
                        </svg>
                      )}
                    </button>
                  </div>
                  
                  {/* Video overlay controls */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsVideoMuted(!isVideoMuted);
                      }}
                      className="text-white hover:text-pink-300 transition-colors p-2 rounded-full bg-black/70 hover:bg-black/90"
                      aria-label={isVideoMuted ? "Unmute video" : "Mute video"}
                    >
                      {isVideoMuted ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                          <line x1="23" y1="9" x2="17" y2="15"/>
                          <line x1="17" y1="9" x2="23" y2="15"/>
                        </svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <Image
                  src={getImageSrc(imageSrc)}
                  alt={imageAlt}
                  width={1200}
                  height={800}
                  className="max-w-[90vw] max-h-[80vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
                  priority
                />
              )}
            </div>
          </motion.div>

          {/* Media Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-60 text-white bg-black/50 px-4 py-2 rounded-full">
            <span className="text-sm font-medium">
              {currentIndex + 1} / {images.length} {isVideo && "📹"}
            </span>
          </div>

          {/* Media Caption */}
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
