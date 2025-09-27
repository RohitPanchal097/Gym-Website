import { useEffect, useRef, useState } from "react";
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
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus('Please fill in all fields');
      return;
    }

    if (!formData.email.includes('@')) {
      setSubmitStatus('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('');

    // Create mailto link
    const subject = `Contact Form Message from ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    
    const mailtoLink = `mailto:rohitpanchal.8535@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Reset form after a short delay
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
      setSubmitStatus('Email client opened! Please send your message.');
    }, 1000);
  };

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
        <form ref={formRef} onSubmit={handleSubmit} className="bg-black/70 rounded-lg p-8 flex flex-col gap-4 shadow-xl">
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Your Name" 
            className="p-3 rounded bg-white/80 text-black placeholder-gray-600 focus:outline-pink-500" 
            required
          />
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Your Email" 
            className="p-3 rounded bg-white/80 text-black placeholder-gray-600 focus:outline-pink-500" 
            required
          />
          <textarea 
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Your Message" 
            className="p-3 rounded bg-white/80 text-black placeholder-gray-600 focus:outline-pink-500" 
            rows={4}
            required
          />
          
          {/* Status Message */}
          {submitStatus && (
            <div className={`text-center text-sm font-medium ${
              submitStatus.includes('opened') ? 'text-green-400' : 'text-red-400'
            }`}>
              {submitStatus}
            </div>
          )}
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`mt-4 px-6 py-3 rounded-full text-lg font-bold shadow-lg transition-all duration-300 text-white ${
              isSubmitting 
                ? 'bg-gray-500 cursor-not-allowed' 
                : 'bg-pink-600 hover:bg-pink-700'
            }`}
          >
            {isSubmitting ? 'Opening Email...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
} 