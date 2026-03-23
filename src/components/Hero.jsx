import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Demo gym image from Unsplash
const heroImg = "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1500&q=80";

export default function Hero() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const buttonRef = useRef(null);

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
    // Layered text/button animations
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
    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        delay: 0.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  const handleScrollToClasses = () => {
    const classesSection = document.getElementById('classes');
    if (classesSection) {
      classesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <img
        ref={bgRef}
        src={heroImg}
        alt="Gym equipment and training environment"
        className="absolute inset-0 w-full h-full object-cover opacity-80 scale-105"
        style={{ zIndex: 1 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10" />
      <div className="relative z-20 text-center text-white px-4">
        <h1 
          ref={headingRef} 
          id="hero-heading"
          className="text-5xl md:text-7xl font-extrabold drop-shadow-lg tracking-tight"
        >
          Unleash Your <span className="text-pink-500">Power</span>
        </h1>
        <p 
          ref={paraRef} 
          className="mt-6 text-xl md:text-2xl font-medium max-w-2xl mx-auto"
        >
          Join the most <span className="text-pink-400">dynamic</span> gym in the city. Train with the best, become your best.
        </p>
        <button 
          ref={buttonRef} 
          onClick={handleScrollToClasses}
          className="mt-10 px-8 py-4 bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-full text-lg font-bold shadow-lg transition-all duration-300 min-h-12"
          aria-label="Scroll to classes section"
        >
          Get Started
        </button>
      </div>
    </section>
  );
} 