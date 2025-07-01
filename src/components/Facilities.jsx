import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const facilities = [
  {
    title: "Cardio Zone",
    img: "https://images.unsplash.com/photo-1517960413843-0aee8e2d471c?auto=format&fit=crop&w=600&q=80",
    desc: "State-of-the-art treadmills, bikes, and ellipticals for all levels."
  },
  {
    title: "Free Weights",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
    desc: "Dumbbells, barbells, benches, and racks for strength training."
  },
  {
    title: "Sauna",
    img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
    desc: "Relax and recover in our modern sauna facilities."
  },
  {
    title: "Locker Rooms",
    img: "https://images.unsplash.com/photo-1514512364185-4c2b67857b39?auto=format&fit=crop&w=600&q=80",
    desc: "Spacious, secure, and clean locker rooms with showers."
  },
];

const bgImg = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80";

export default function Facilities() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);

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
      gridRef.current,
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
      <img src={bgImg} alt="Facilities" className="absolute inset-0 w-full h-full object-cover opacity-70 scale-105" style={{ zIndex: 1 }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10" />
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4">
        <h2 ref={headingRef} className="text-4xl md:text-6xl font-extrabold drop-shadow-lg tracking-tight text-center text-white mb-12">
          Our <span className="text-pink-500">Facilities</span>
        </h2>
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {facilities.map((f) => (
            <div key={f.title} className="bg-black/70 rounded-xl shadow-xl p-6 flex flex-col items-center text-center text-white">
              <img src={f.img} alt={f.title} className="w-32 h-32 object-cover rounded-lg mb-4 shadow-lg" />
              <h3 className="text-xl font-bold mb-2">{f.title}</h3>
              <p className="text-base opacity-80">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 