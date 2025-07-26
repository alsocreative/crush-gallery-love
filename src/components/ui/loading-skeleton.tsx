"use client";

interface LoadingSkeletonProps {
  className?: string;
}

export const LoadingSkeleton = ({ className = "" }: LoadingSkeletonProps) => {
  return (
    <div className={`animate-pulse bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg ${className}`}>
      <div className="w-full h-full bg-gradient-to-br from-pink-200/50 to-purple-200/50 rounded-lg flex items-center justify-center">
        <div className="text-pink-300">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-pulse"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21,15 16,10 5,21"/>
          </svg>
        </div>
      </div>
    </div>
  );
};
