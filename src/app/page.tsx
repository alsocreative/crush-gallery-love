"use client";

import Image from "next/image";
import { 
  GridBody,
  DraggableContainer,
  GridItem, 
} from "@/components/ui/infinite-drag-scroll";

const images = [
  {
    id: 1,
    alt: "Your smile lights up every room just like this radiant portrait",
    src: "https://images.unsplash.com/photo-1494790108755-2616c96b8551?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    id: 2,
    alt: "Grace and elegance, just like you",
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    id: 3,
    alt: "Natural beauty that takes my breath away",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    id: 4,
    alt: "Every photo reminds me of your beautiful eyes",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    id: 5,
    alt: "Soft and gentle, like your heart",
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    id: 6,
    alt: "The kind of beauty that stops time",
    src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    id: 7,
    alt: "Dreamy and wonderful, just like thinking of you",
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    id: 8,
    alt: "Your laugh is more beautiful than any sunset",
    src: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    id: 9,
    alt: "Confidence and charm in every glance",
    src: "https://images.unsplash.com/photo-1520813792240-56fc4a3765d7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    id: 10,
    alt: "The way you make ordinary moments extraordinary",
    src: "https://images.unsplash.com/photo-1512310604669-443f26c35f52?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    id: 11,
    alt: "Sweet and serene, like peaceful moments with you",
    src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    id: 12,
    alt: "Every photo is a reminder of how beautiful life can be",
    src: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    id: 13,
    alt: "The sparkle in your eyes outshines every star",
    src: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    id: 14,
    alt: "Gentle and kind, the way you care for everyone around you",
    src: "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    id: 15,
    alt: "The way you light up when you're happy",
    src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    id: 16,
    alt: "Every moment with you feels like a beautiful photograph",
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    id: 17,
    alt: "The way you make everything around you more beautiful",
    src: "https://images.unsplash.com/photo-1502323777036-f29e3972d82f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    id: 18,
    alt: "You are the most beautiful part of every day",
    src: "https://images.unsplash.com/photo-1485893086445-ed75865251e0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
];

export default function Home() {
  return (
    <div className="relative">
      {/* Beautiful Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-8">
        <div className="text-center text-white">
          <h1 className="text-2xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Beautiful Moments 💕
          </h1>
          <p className="text-sm md:text-lg opacity-90 font-light">
            Every photo reminds me of your smile ✨
          </p>
          <p className="text-xs md:text-sm opacity-70 mt-1 italic">
            &ldquo;In a world full of art, you are my masterpiece&rdquo;
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
