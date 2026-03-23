import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Demo gym image from Unsplash
const aboutImg = "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=1500&q=80";

export default function About() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const headingRef = useRef(null);
  const paraRef = useRef(null);

  useEffect(() => {
    // Parallax background
    gsap.to(bgRef.current, {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
    // Layered text animations
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
    gsap.fromTo(
      paraRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden"
      aria-labelledby="about-heading"
    >
      <img
        ref={bgRef}
        src={aboutImg}
        alt="Gym members training and working out"
        className="absolute inset-0 w-full h-full object-cover opacity-80 scale-105"
        style={{ zIndex: 1 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10" />
      <div className="relative z-20 text-center text-white px-4">
        <h2 ref={headingRef} id="about-heading" className="text-4xl md:text-6xl font-extrabold drop-shadow-lg tracking-tight">
          About <span className="text-pink-500">Our Gym</span>
        </h2>
        <p ref={paraRef} className="mt-6 text-lg md:text-2xl font-medium max-w-2xl mx-auto">
          We are more than just a gym. We are a community of athletes, trainers, and dreamers. Our mission is to empower you to reach your full potential with world-class equipment, expert trainers, and a motivating environment.
        </p>
      </div>
    </section>
  );
} 