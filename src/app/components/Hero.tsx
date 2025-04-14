'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Hero = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        imageRef.current,
        {
          y: '50vh',
          opacity: 0,
          filter: 'blur(20px)',
          scale: 1.2,
          transformOrigin: 'center center',
        },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          scale: 1,
          duration: 3,
          ease: 'power2.out',
        }
      );

      tl.fromTo(
        textRef.current,
        {
          y: '40vh',
          opacity: 0,
          filter: 'blur(15px)',
        },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 2.5,
          ease: 'power3.out',
        },
        '-=2'
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative h-full w-screen overflow-hidden">
      <img
        src="/BG.png"
        alt="Background"
        ref={imageRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      <div className="relative z-10 flex items-center justify-center h-full">
        <div
          ref={textRef}
          className="text-white text-8xl playfair-display-regular tracking-wide"
        >
          Your Animated Title
        </div>
      </div>
    </div>
  );
};

export default Hero;