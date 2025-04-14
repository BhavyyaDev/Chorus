'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const BuySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marquee2Ref = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const sizeChartRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const ctx = gsap.context(() => {
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          x: '-100%',
          duration: 20,
          ease: 'none',
          repeat: -1,
        });
      }

      if (marquee2Ref.current) {
        gsap.to(marquee2Ref.current, {
          x: '100%',
          duration: 25,
          ease: 'none',
          repeat: -1,
        });
      }


      // Size Chart Animation
      if (sizeChartRef.current) {
        gsap.fromTo(sizeChartRef.current,
          {
            opacity: 0,
            y: 50,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sizeChartRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Hover effect for CTA button
      const ctaButton = ctaRef.current?.querySelector('.cta-button');
      if (ctaButton) {
        ctaButton.addEventListener('mouseenter', () => {
          gsap.to(ctaButton, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out',
          });
        });

        ctaButton.addEventListener('mouseleave', () => {
          gsap.to(ctaButton, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const marqueeText = 'pre-order • EXCLUSIVE SERIES • LIMITED EDITION • ';


  return (
    <div
      ref={sectionRef}
      className="relative w-full bg-black text-white overflow-hidden py-10"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-[80vh] bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
      </div>

      {/* First Marquee */}
      <div className="relative mb-8 overflow-hidden">
        <div
          ref={marqueeRef}
          className="flex whitespace-nowrap text-6xl md:text-8xl lg:text-9xl font-koulen "
          style={{ width: '200%' }}
        >
          <span className="mr-8">{marqueeText}</span>
          <span className="mr-8">{marqueeText}</span>
          <span className="mr-8">{marqueeText}</span>
          <span className="mr-8">{marqueeText}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-12">
        {/* Logo */}
        {/* <div ref={logoRef} className="mb-8">
          <img
            src="/icons/chorusWhite.svg"
            alt="Chorus Logo"
            className="w-32 md:w-48 lg:w-56 h-auto"
          />
        </div> */}

        

        {/* CTA Section */}
        <div ref={ctaRef} className="text-center">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-koulen font-normal mb-4">
            READY TO MAKE IT YOURS?
          </h2>
          <p className="text-lg md:text-xl font-manrope mb-8 max-w-2xl mx-auto opacity-90">
            Join the exclusive Chorus Enterprise Series. Limited edition pieces crafted with premium materials.
          </p>

          <button className="bg-white text-black px-12 py-4 text-xl md:text-2xl font-koulen font-semibold rounded-lg hover:bg-neutral-900 hover:text-white transition-colors duration-300 shadow-2xl cursor-pointer"
          onClick={() => {
            window.location.href = '/buy';
          }}
          >
            pre-order
          </button>

          <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-2 text-sm font-manrope opacity-75">
            <span>✓ Pan India Shipping</span>
            <span>✓ Limited Edition </span>
            <span>✓ Premium French Terry</span>
          </div>
        </div>
      </div>


    </div>
  );
};

export default BuySection;
