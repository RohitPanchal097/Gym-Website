import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Demo gym class image from Unsplash
const classesImg = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80";

export default function Classes() {
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
      id="classes"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden"
    >
      <img
        ref={bgRef}
        src={classesImg}
        alt="Gym Classes"
        className="absolute inset-0 w-full h-full object-cover opacity-80 scale-105"
        style={{ zIndex: 1 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10" />
      <div className="relative z-20 text-center text-white px-4">
        <h2 ref={headingRef} className="text-4xl md:text-6xl font-extrabold drop-shadow-lg tracking-tight">
          <span className="text-pink-500">Classes</span> & Programs
        </h2>
        <p ref={paraRef} className="mt-6 text-lg md:text-2xl font-medium max-w-2xl mx-auto">
          From HIIT to Yoga, Strength Training to Cardio, our diverse classes are designed for all fitness levels. Find your passion, push your limits, and achieve your goals with us.
        </p>
      </div>
    </section>
  );
} 