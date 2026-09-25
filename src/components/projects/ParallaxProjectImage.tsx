import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Star } from 'lucide-react';

interface ParallaxProjectImageProps {
  src: string;
  alt: string;
  featured?: boolean;
  featuredLabel?: string;
  width?: number;
  height?: number;
  className?: string;
}

export const ParallaxProjectImage: React.FC<ParallaxProjectImageProps> = ({
  src,
  alt,
  featured = false,
  featuredLabel = 'À la une',
  width = 720,
  height = 450,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  // Track scroll progress of this specific project card through the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Smooth subtle translation: -6% when entering from bottom, +6% when leaving at top
  const rawY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const smoothY = useSpring(rawY, {
    stiffness: 150,
    damping: 30,
    mass: 0.2,
  });

  // Final Y value respects accessibility
  const y = prefersReducedMotion ? '0%' : smoothY;

  return (
    <div
      ref={containerRef}
      className={`relative aspect-[16/10] w-full overflow-hidden bg-slate-950 rounded-t-2xl border-b border-slate-200/80 ${className}`}
    >
      {/* Parallax Image Element */}
      <motion.div
        className="w-full h-[116%] -top-[8%] absolute inset-x-0"
        style={{ y }}
      >
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out will-change-transform"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Subtle bottom vignette to ensure great contrast and depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

      {/* Featured status badge if explicitly featured */}
      {featured && (
        <div className="absolute top-3 left-3 flex items-center pointer-events-none z-10">
          <span className="px-2.5 py-1 rounded-md bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-xs flex items-center gap-1 backdrop-blur-xs">
            <Star className="w-3 h-3 fill-current" />
            <span>{featuredLabel}</span>
          </span>
        </div>
      )}
    </div>
  );
};
