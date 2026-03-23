import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import QRPopup from "./QRPopup";
gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    title: "Basic",
    price: "$29/mo",
    img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
    features: ["Gym Access", "Locker Room", "1 Group Class/week"],
  },
  {
    title: "Premium",
    price: "$49/mo",
    img: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=600&q=80",
    features: ["All Basic Features", "Unlimited Classes", "Sauna Access", "Guest Passes"],
  },
  {
    title: "VIP",
    price: "$79/mo",
    img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80",
    features: ["All Premium Features", "Personal Trainer", "Nutrition Plan", "Priority Support"],
  },
];

const bgImg = "https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=1500&q=80";

export default function Membership() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);
  const [isQRPopupOpen, setIsQRPopupOpen] = useState(false);

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

  const handleJoinNow = () => {
    setIsQRPopupOpen(true);
  };

  return (
    <section 
      id="membership"  
      ref={sectionRef} 
      className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden py-20"
      aria-labelledby="membership-heading"
    >
      <img 
        src={bgImg} 
        alt="Membership plans - Gym facilities" 
        className="absolute inset-0 w-full h-full object-cover opacity-70 scale-105" 
        style={{ zIndex: 1 }} 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10" />
      <div className="relative z-20 w-full max-w-5xl mx-auto px-4">
        <h2 
          ref={headingRef} 
          id="membership-heading"
          className="text-4xl md:text-6xl font-extrabold drop-shadow-lg tracking-tight text-center text-white mb-12"
        >
          <span className="text-pink-500">Membership</span> Plans
        </h2>
        <div 
          ref={gridRef} 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          role="list"
        >
          {plans.map((plan) => (
            <article 
              key={plan.title} 
              className="bg-black/70 rounded-xl shadow-xl p-8 flex flex-col items-center text-center text-white border-2 border-pink-500/30 hover:border-pink-500 transition-all focus-within:ring-2 focus-within:ring-yellow-400"
              role="listitem"
            >
              <img 
                src={plan.img} 
                alt={`${plan.title} membership plan`}
                className="w-28 h-28 object-cover rounded-full mb-4 shadow-lg border-4 border-pink-500/40" 
              />
              <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
              <div className="text-3xl font-extrabold text-pink-400 mb-4" aria-label={`Price ${plan.price}`}>
                {plan.price}
              </div>
              <ul className="mb-6 space-y-2 text-left w-full">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="text-base opacity-90 flex items-start">
                    <span className="text-pink-400 mr-2" aria-hidden="true">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={handleJoinNow}
                className="px-6 py-3 bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-full text-lg font-bold shadow-lg transition-all duration-300 text-white min-h-12 w-full"
                aria-label={`Join ${plan.title} membership plan`}
              >
                Join Now
              </button>
            </article>
          ))}
        </div>
      </div>
      
      {/* QR Code Popup */}
      <QRPopup 
        isOpen={isQRPopupOpen} 
        onClose={() => setIsQRPopupOpen(false)} 
      />
    </section>
  );
} 