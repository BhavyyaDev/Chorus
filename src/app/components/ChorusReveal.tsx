'use client';
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isMobile } from "@/lib/isMobile";
import { FaCaretDown } from "react-icons/fa";
import BuySection from "./BuySection";
import { motion } from "framer-motion";
import Image from "next/image";
// import FrameAnimation from "./sections/ImageVideo";

gsap.registerPlugin(ScrollTrigger);


const CRITICAL_ASSETS = [
  '/icons/chorusWhite.svg',
  '/BG.png',
  '/bg-rmvd-black-crop.png',
  '/PersonFalling.png',
  '/sideTshirtfront-BG_RMVD.png',
  '/sideTshirtback-BG_RMVD.png',
  '/wide-shot-front.png',
  '/icons/chorusBlack.svg',
  '/wide-shot-rmvd-gb.png',
  '/zoom-up-render/UpsideDown.png'
];

const ChorusReveal = () => {
  const [showContent, setShowContent] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const wideText = useRef(null);
  const eleganceText = useRef(null);
  const HeroBgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let loadedCount = 0;
    const totalAssetsWithVideo = CRITICAL_ASSETS.length + 1; 

    const handleAssetLoad = () => {
      loadedCount++;
      const progress = Math.round((loadedCount / totalAssetsWithVideo) * 100);
      setLoadingProgress(progress);

      if (loadedCount === totalAssetsWithVideo) {
        setAssetsLoaded(true);
      }
    };

    CRITICAL_ASSETS.forEach((src: string) => {
      const img = new window.Image();
      img.onload = handleAssetLoad;
      img.onerror = handleAssetLoad; 
      img.src = src;
    });

    const video = document.createElement('video');
    video.onloadeddata = handleAssetLoad;
    video.onerror = handleAssetLoad;
    video.src = '/render-video/SalaryTshirt.mp4';
    video.load();

  }, []);





  useEffect(() => {
    if (!assetsLoaded) return;

    const tl = gsap.timeline();

    tl.to(".chorus-mask-group", {
      duration: 2,
      ease: "expo.inOut",
      transformOrigin: "50% 50%",
    }).to(".chorus-mask-group", {
      scale: 12,
      duration: 2,
      delay: -1.0,
      ease: "expo.inOut",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          const svgElement = document.querySelector(".chorus-svg");
          if (svgElement) {
            svgElement.remove();
          }
          setShowContent(true);
          this.kill();
        }
      },
    });

    return () => {
      tl.kill();
    };
  }, [assetsLoaded]);

  useEffect(() => {
    if (!showContent) return;


    gsap.to(".main-content", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: -1,
      ease: "expo.inOut",
    });

    gsap.to(".hero-bg", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: -0.8,
      ease: "expo.inOut",
    });

    gsap.to(".hero-text", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: -0.8,
      ease: "expo.inOut",
    });

    const mainContent = document.querySelector(".main-content");



    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const xMove = (mouseEvent.clientX / window.innerWidth - 0.5) * 40;

      gsap.to(".hero-text", {
        x: `${xMove * 0.4}%`,
        duration: 0.3,
      });

      gsap.to(".hero-bg", {
        x: xMove * 1.7,
        duration: 0.3,
      });
    };

    setTimeout(() => {
      const wideContainer = document.querySelector('.WideBanner');

      if (wideContainer && wideText.current) {
        ScrollTrigger.create({
          trigger: wideContainer,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const yMove = (progress - 0.2) * 200;

            gsap.to(wideText.current, {
              y: yMove,
              duration: 0.1,
              ease: "none"
            });
          }
        });
      }
    }, 100);






    const tShirtBack = document.querySelector(".bg-image-back");
    const tShirtBackContainer = document.querySelector(".scroll-section");
    const fallingPerson = document.querySelector(".fallingPerson");
    const elegantMove = isMobile() ? 20 : 100

    ScrollTrigger.create({
      trigger: eleganceText.current,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const xMove = (progress - 0.5) * elegantMove;

        gsap.to(eleganceText.current, {
          x: -xMove,
          duration: 0.1,
          ease: "none"
        });
      }
    });



    const toMove = isMobile() ? 500 : 1400;

    if (tShirtBack && tShirtBackContainer) {
      ScrollTrigger.create({
        trigger: tShirtBackContainer,
        start: "top bottom",
        end: "200%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const xMove = (progress - 0.5) * toMove;

          gsap.to(tShirtBack, {
            x: xMove,
            duration: 0.1,
            ease: "none"
          });
        }
      });
    }

    const fallingCount = isMobile() ? 800 : 2500;

    if (fallingPerson) {
      ScrollTrigger.create({
        trigger: tShirtBackContainer,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const yMove = (progress - 0.5) * fallingCount;

          gsap.to(fallingPerson, {
            y: yMove,
            duration: 0.1,
            ease: "none"
          });
        }
      });
    }

    









    // const lineContainer = document.querySelector("Tshirt-right");

    // if (lineRef.current && textRef.current) {
    //   const tl = gsap.timeline({
    //     scrollTrigger: {
    //       trigger: lineContainer,
    //       start: "top center",
    //       end: "bottom center",
    //       toggleActions: "play none none reverse"
    //     }
    //   });

    //   tl.to(lineRef.current, {
    //     width: '300px',
    //     opacity: 1,
    //     duration: 1,
    //     ease: "power2.out"
    //   })
    //     .to(textRef.current, {
    //       opacity: 1,
    //       y: 0,
    //       duration: 1,
    //       ease: "power2.out"
    //     }, "-=0.6");
    // }

    mainContent?.addEventListener("mousemove", handleMouseMove);

    return () => {
      mainContent?.removeEventListener("mousemove", handleMouseMove);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [showContent]);

  return (
    <>

      {/* SVG Mask Reveal */}
      <div className="chorus-svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-black">
        <svg
          viewBox="0 0 1200 600"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full"
        >

          <defs>
            <mask id="chorusMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="chorus-mask-group ">
                <image
                  href="/icons/chorusWhite.svg"
                  x="38%"
                  y="35%"
                  width="24%"
                  height="30%"
                />
              </g>
            </mask>
          </defs>

          <image
            href="/BG.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#chorusMask)"
          />
        </svg>

        {/* Loading indicator */}
        {!assetsLoaded && (
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white text-center">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <p className="text-sm font-manrope opacity-75">{loadingProgress}%</p>
          </div>
        )}
      </div>

      {showContent && (
        <div className="main-content overflow-x-hidden w-full rotate-[-10deg] scale-[1.7]">
          <div className="landing overflow-hidden relative w-full h-screen bg-black">



            {/* Hero Section */}
            <div className="hero-section relative overflow-hidden w-full h-screen z-20">
    
              <motion.img
                ref={HeroBgRef}
                className="absolute hero-bg scale-[1.8] rotate-[-3deg] top-0 left-0 w-full h-full object-cover"
                src="/BG.png"
                alt="Background"
              />


              <div className="hero-text text-white flex flex-col absolute top-10 left-5 w-[90%] koulen-regular-500! ">
                <h1 className="text-5xl md:text-9xl  -mb-1 -ml-1">Welcome to</h1>
                {/* <img src="/icons/chorusWhite.svg" alt="" className=" -ml-2 md:-ml-8 max-w-[80%] w-[60%]" /> */}
                <h2 className="text-5xl md:text-9xl  mb-0">Enterprise SERIES</h2>
              </div>
            </div>

            <div className="flex justify-center absolute bottom-40 left-0 w-full z-50">
              <button className="cta-button bg-white text-black px-12 py-4 text-xl md:text-2xl font-koulen font-bold rounded-lg hover:invert  transition-all duration-300  cursor-pointer z-50"
                onClick={() => {
                  window.location.href = '/buy';
                }}
              >
                PRE-ORDER
              </button>
            </div>

            {/* Bottom Bar */}
            <div className="bottom-bar text-white absolute bottom-0 left-0 w-full py-[60px] px-10 bg-gradient-to-t from-black to-transparent z-40">
              {/* <div className="flex gap-4 items-center">
                <div className="text-4xl">↓</div>
                <h3 className="text-xl font-manrope">
                  Scroll Down
                </h3>
              </div> */}
            </div>
          </div>

          <div className="scroll-section relative">
            {/* <FrameAnimation  /> */}

            {/* Wrapper with overflow visible for the moving image */}
            <div className="back-bg-scroll overflow-x-visible relative">
              <div className=" flex bg-black relative">
                <div>
                  <div ref={eleganceText} className="h-[100px] text-right top-1/4 right-0 text-2xl md:text-7xl absolute">
                    <p>
                      Crafted with elegance of<br /> frech cotton
                    </p>
                  </div>

                </div>

                {/* <div className="line-container absolute top-1/2 right-1/2">
                <div
                  ref={lineRef}
                  className="absolute top-1/2 right-1/2 h-[2px] bg-white opacity-0"
                  style={{ width: 0 }}
                />
                <div
                  ref={textRef}
                  className="ml-8 text-white font-serif text-2xl opacity-0 translate-y-4"
                >
                  100% Organic Cotton. Slim Fit.
                </div><div
                  ref={lineRef}
                  className="absolute h-[2px] bg-white opacity-0"
                  style={{ width: 0 }}
                />
                <div
                  ref={textRef}
                  className="ml-8 text-white font-serif text-2xl opacity-0 translate-y-4"
                >
                  100% Organic Cotton. Slim Fit.
                </div>
              </div> */}
                <Image
                  className="w-full h-[30%] max-h-[40%]  object-cover mx-auto bg-image-back"
                  src="/bg-rmvd-black-crop.png"
                  alt="Background"
                  width={1200}
                  height={400}
                />

              </div>
                { <motion.img
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1, ease: "easeOut" }}
                  src="/PersonFalling.png" alt="" className=" fallingPerson top-130 md:top-250 absolute  right-10 object-cover w-[80px]  md:w-[200px] z-[1]" />}

              <div className=".bebas-neue-regular-700 text-[50px] md:text-[200px] text-center absolute bottom-10 flex flex-col gap-0">
                <p>THE STORY</p>
                <FaCaretDown className="text-white  animate-bounce mx-auto text-4xl md:text-8xl -mt-5  md:-mt-20 " />
              </div>

            </div>
            <div className="Tshirt-right h-screen flex justify-end! relative  overflow-hidden">

              <div className="absolute w-full h-full max-h-screen   right-0 flex items-center justify-end">
                <motion.div
                  initial={{ opacity: 0, }}
                  whileInView={{ opacity: 1, }}
                  transition={{ duration: 1, delay: 1, ease: "easeOut" }}
                  className="text-white  text-lg md:text-xl text-left"
                >
                  <div className="text-[12px] md:text-2xl text-right">
                    It looks like success, feels like growth — but it&apos;s a trap.<br />
                    The man falls, chasing salary, thinking he’s rising.<br />
                    <span className="font-italic font-serif">&apos;Salary Aakhon Ka Dhokha Hai&apos;</span> blends Hindi and English to hit where it hurts<br />
                    a visual truth about how we confuse stability with progress.
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  whileInView={{ opacity: 1, width: '120px' }}
                  transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                  className="h-[2px] bg-white"
                />
                {/* </div>
                <div className=" h-full absolute right-0"> */}
                <motion.img
                  initial={{ x: 100, opacity: 0, scale: 0.9 }}
                  whileInView={{ x: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                  src="/sideTshirtfront-BG_RMVD.png"
                  alt="Chorus Enterprise Series T-Shirt"
                  className="h-[80%] md:h-[90%]  -mr-32 md:mr-0 object-contain z-5 bg-transparent -ml-20"
                />
              </div>


            </div>

            <div className="w-full">
              <video
                src="/render-video/SalaryTshirt.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full md:w-[50%] mx-auto object-cover"
              />
            </div>

            {/* Backside meow section */}
            <div className="Tshirt-right h-screen flex justify-start relative  overflow-hidden">

              {/* Animated Line and Text from Right */}
              <div className="absolute w-full h-full max-h-screen left-0 flex flex-row-reverse items-center justify-end">
                <motion.div
                  initial={{ opacity: 0, }}
                  whileInView={{ opacity: 1, }}
                  transition={{ duration: 1, delay: 1, ease: "easeOut" }}
                  className="text-white  text-lg md:text-xl text-left min-w-[200px]"
                >
                  <div className="text-[13px]  -ml-2 md:text-xl text-right pr-2 md:pr-6 md:mb-0 mb-30  max-w-[99%] ">
                    {isMobile() ? <p>
                      A row of suited figures marches in the same direction — a stark black-and-white metaphor for routine, the daily grind, and salary-driven stability.<br />
                      Amid them, one walks the other way.<br /><br />
                      This lone figure symbolizes a quiet awakening a break from the loop, a search for meaning or freedom.<br /><br />
                      Inspired by Marcus Wallinder’s <em>Just Passing Through II</em>, the design captures a powerful contrast: while most follow, a few reflect and choose their own path.
                    </p> : <p>
                      is The back print shows rows of suited individuals walking in the same direction a visual metaphor for the daily grind, routine, and the pursuit of salary-driven stability. The black-and-white palette adds to the emotionless, almost mechanical tone.< br /><br />
                      Among them, one figure walks the other way.
                      Noticing that there&apos;s more to life than the loop. His shift in direction reflects a quiet realization, a searchfor something different maybe freedom, maybe purpose.<br /><br />
                      This contrast becomes the heart of the design: most follow the path laid out, while a few pause, reflect, and choose their own.
                      Inspired by Marcus Wallinder&apos;s  Instagram post “Just Passing Through it. </p>}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, width: '0px' }}
                  whileInView={{ opacity: 1, width: '120px' }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                  className="h-[2px] md:mb-50 mb-30 bg-white min-w-[100px] md:min-w-[300px] z-[99999]"
                />
                {/* </div>
                <div className=" h-full absolute right-0"> */}
                <motion.img
                  initial={{ x: -100, opacity: 0, scale: 0.9 }}
                  whileInView={{ x: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                  src="/sideTshirtback-BG_RMVD.png"
                  alt="Chorus Enterprise Series T-Shirt"
                  className="h-[80%] md:h-[90%]  -ml-32 md:ml-0 object-contain z-5 bg-transparent -mr-44"
                />
              </div>


            </div>


            <div className="w-full h-screen relative flex justify-center items-center WideBanner">
              <Image src="/wide-shot-front.png" alt="" className="h-screen object-cover absolute" fill />
              <Image ref={wideText} src="/icons/chorusBlack.svg" alt="" className="absolute top-1/4 md:w-[40%]  w-[80%]" width={400} height={200} />
              <img src="/wide-shot-rmvd-gb.png" className="absolute h-screen object-cover" alt="" />
            </div>
          </div>

          {/* Content Section */}

          {/* <div className="w-full relative  flex flex-col items-center justify-center   bg-white/80">
            <div className="bottom-bar absolute text-white  top-0 left-0 w-full py-[400px] z-[0] px-10 bg-gradient-to-t from-transparent to-black flex justify-center items-center ">

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-3 pt-16">
              <CurvedCard src="/images/salary ankhon ka studio vertical-1.png" />
              <CurvedCard src="/images/salary ankhon ka studio vertical-2.png" />
              <CurvedCard src="/images/salary ankhon ka studio vertical-1.png" />
              <CurvedCard src="/images/salary ankhon ka studio.png" />
            </div>
          </div> */}
          {/* <img src="" alt="" /> */}

          {/* Go to purchase section */}
          <BuySection />


          {/* <div className="w-full h-[90vh] md:h-[150vh] tShirtZoom md:block hidden">
            <FrameAnimation />
          </div> */}
          <motion.div
            className="up-side-down-container"
          >
            <motion.img
              initial={{ opacity: 0, y: 500 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
              src={"/zoom-up-render/UpsideDown.png"}
              alt="Zoom up render"
              className="w-full h-auto -mt-16 top-0 rotate-180 up-side-down"
            />
          </motion.div>
          {/* <div className="w-full relative h-[80vh] md:hidden visible">
            <motion.video
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
              src="/zoom-up-render/zoom-up-rendr-phone.mov"
              autoPlay
              muted
              playsInline
              className="w-full md:w-[50%] mx-auto object-cover absolute bottom-0"
            />
          </div> */}


        </div >
      )}
    </>
  );
};

export default ChorusReveal;
