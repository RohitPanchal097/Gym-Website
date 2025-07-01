import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: "What are your opening hours?",
    a: "We are open 5am–11pm, 7 days a week."
  },
  {
    q: "Do you offer personal training?",
    a: "Yes! Our certified trainers offer 1-on-1 and group sessions."
  },
  {
    q: "Is there a free trial?",
    a: "Yes, we offer a free 3-day pass for new members."
  },
  {
    q: "What amenities are included?",
    a: "All memberships include locker rooms, showers, and sauna access."
  },
];

const bgImg = "https://images.unsplash.com/photo-1514512364185-4c2b67857b39?auto=format&fit=crop&w=1500&q=80";

export default function FAQ() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 60 },
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
      listRef.current,
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
    <section ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden py-20">
      <img src={bgImg} alt="FAQ" className="absolute inset-0 w-full h-full object-cover opacity-70 scale-105" style={{ zIndex: 1 }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10" />
      <div className="relative z-20 w-full max-w-3xl mx-auto px-4">
        <h2 ref={headingRef} className="text-4xl md:text-6xl font-extrabold drop-shadow-lg tracking-tight text-center text-white mb-12">
          <span className="text-pink-500">FAQ</span>
        </h2>
        <div ref={listRef} className="space-y-8">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-black/70 rounded-xl shadow-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-2 text-pink-400">{faq.q}</h3>
              <p className="text-base opacity-90">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 