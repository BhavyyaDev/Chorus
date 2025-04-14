'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FrameAnimation = () => {
  const totalFrames = 180;
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const frameToSrc = (index: number) =>
    `/zoom-up-render/${String(index).padStart(4, '0')}.png`;

  useEffect(() => {
    let loaded = 0;
    for (let i = 0; i < totalFrames; i++) {
      const img = new window.Image();
      img.src = frameToSrc(i);
      img.onload = img.onerror = () => {
        loaded++;
        if (loaded === totalFrames) {
          setImagesLoaded(true);
        }
      };
    }
  }, []);

  useEffect(() => {
    if (!imagesLoaded || !imgRef.current) return;

    const scrollObj = { frame: 0 };

    const updateFrame = () => {
      const frameIndex = Math.round(scrollObj.frame);
      const newSrc = frameToSrc(frameIndex);
      if (imgRef.current && imgRef.current?.src !== newSrc) {
        imgRef.current.src = newSrc;
      }
    };

    const tl = gsap.to(scrollObj, {
      frame: totalFrames - 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '.tShirtZoom',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: () => requestAnimationFrame(updateFrame),
      },
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [imagesLoaded]);

  return (
    <div className="fixed bottom-0 w-full flex items-center justify-center pointer-events-none z-10">
      {imagesLoaded ? (
        <Image
          ref={imgRef}
          src={frameToSrc(0)}
          alt="Scroll animation frame"
          className="object-contain h-full w-auto"
          draggable={false}
          width={800}
          height={600}
        />
      ) : (
        <p>Loading animation...</p>
      )}
    </div>
  );
};

export default FrameAnimation;

