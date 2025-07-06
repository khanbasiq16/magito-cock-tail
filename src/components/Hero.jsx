"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(SplitText, ScrollTrigger);

const Hero = () => {
  const videoRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(() => {
    const heroSplit = new SplitText(".title", { type: "chars, words" });
    const paragraphSplit = new SplitText(".subtitle", { type: "lines" });

    heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
    });

    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
      delay: 1,
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    })
      .to(".right-leaf", { y: 200 }, 0)
      .to(".left-leaf", { y: -200 }, 0)
      .to(".arrow", { y: 100 }, 0);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const startValue = isMobile ? "top 50%" : "center 60%";
    const endValue = isMobile ? "120% top" : "bottom top";

    const onMetaLoaded = () => {
      gsap.timeline({
        scrollTrigger: {
          trigger: video, // Correct trigger
          start: startValue,
          end: endValue,
          scrub: true,
          pin: true,
        },
      }).to(video, {
        currentTime: video.duration || 3, 
        ease: "none",
      });
    };

    video.addEventListener("loadedmetadata", onMetaLoaded);

    return () => {
      video.removeEventListener("loadedmetadata", onMetaLoaded);
    };
  }, [isMobile]);

  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title">MOJITO</h1>

        <img src="/images/hero-left-leaf.png" alt="left-leaf" className="left-leaf" />
        <img src="/images/hero-right-leaf.png" alt="right-leaf" className="right-leaf" />

        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cool. Crisp. Classic.</p>
              <p className="subtitle">
                Sip the Spirit <br /> of Summer
              </p>
            </div>

            <div className="view-cocktails">
              <p className="subtitle">
                Every cocktail on our menu is a blend of premium ingredients,
                creative flair, and timeless recipes — designed to delight your
                senses.
              </p>
              <a href="#cocktails">View cocktails</a>
            </div>
          </div>
        </div>
      </section>

      <div className="video absolute inset-0">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          src="/videos/output.mp4"
        />
      </div>
    </>
  );
};

export default Hero;
