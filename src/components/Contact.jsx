import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Demo gym contact image from Unsplash
const contactImg = "https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=1500&q=80";

export default function Contact() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const headingRef = useRef(null);
  const formRef = useRef(null);

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
    // Layered text/form animations
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
      formRef.current,
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
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden"
    >
      <img
        ref={bgRef}
        src={contactImg}
        alt="Contact"
        className="absolute inset-0 w-full h-full object-cover opacity-80 scale-105"
        style={{ zIndex: 1 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10" />
      <div className="relative z-20 text-center text-white px-4 w-full max-w-xl">
        <h2 ref={headingRef} className="text-4xl md:text-6xl font-extrabold drop-shadow-lg tracking-tight mb-8">
          <span className="text-pink-500">Contact</span> Us
        </h2>
        <form ref={formRef} className="bg-black/70 rounded-lg p-8 flex flex-col gap-4 shadow-xl">
          <input type="text" placeholder="Your Name" className="p-3 rounded bg-white/80 text-black placeholder-gray-600 focus:outline-pink-500" />
          <input type="email" placeholder="Your Email" className="p-3 rounded bg-white/80 text-black placeholder-gray-600 focus:outline-pink-500" />
          <textarea placeholder="Your Message" className="p-3 rounded bg-white/80 text-black placeholder-gray-600 focus:outline-pink-500" rows={4} />
          <button type="submit" className="mt-4 px-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-full text-lg font-bold shadow-lg transition-all duration-300 text-white">Send Message</button>
        </form>
      </div>
    </section>
  );
} 