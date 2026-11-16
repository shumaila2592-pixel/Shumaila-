import React, { useState } from 'react';
import { GraduationCap } from 'lucide-react';

interface ResilientImageProps {
  src?: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackLabel,
}) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#102D55] via-[#173A6B] to-[#0A1E3B] text-white p-6 text-center ${className}`}
      >
        <div className="w-12 h-12 rounded-full border border-[#D5A83D]/50 bg-[#D5A83D]/15 flex items-center justify-center mb-3">
          <GraduationCap className="w-6 h-6 text-[#D5A83D]" />
        </div>
        <span className="font-serif text-sm font-medium text-white/95 max-w-[220px]">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
