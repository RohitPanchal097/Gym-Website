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
  const statusRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [statusType, setStatusType] = useState(''); // 'error' or 'success'

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
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitStatus('Please correct the errors below');
      setStatusType('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('');
    setStatusType('');

    // Create mailto link
    const subject = `Contact Form Message from ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    
    const mailtoLink = `mailto:rohitpanchal.8535@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Reset form after a short delay
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
      setIsSubmitting(false);
      setSubmitStatus('Email client opened! Please send your message.');
      setStatusType('success');
      // Announce to screen readers
      if (statusRef.current) {
        statusRef.current.focus();
      }
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
        alt="Contact Us - Gym Background"
        className="absolute inset-0 w-full h-full object-cover opacity-80 scale-105"
        style={{ zIndex: 1 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10" />
      <div className="relative z-20 text-center text-white px-4 w-full max-w-xl">
        <h2 ref={headingRef} className="text-4xl md:text-6xl font-extrabold drop-shadow-lg tracking-tight mb-8">
          <span className="text-pink-500">Contact</span> Us
        </h2>
        
        {/* Status Message with ARIA live region */}
        {submitStatus && (
          <div 
            ref={statusRef}
            role="alert"
            aria-live="polite"
            aria-atomic="true"
            tabIndex="-1"
            className={`mb-4 p-4 rounded-lg text-center font-medium ${
              statusType === 'error' 
                ? 'bg-red-500/20 text-red-300 border border-red-400' 
                : 'bg-green-500/20 text-green-300 border border-green-400'
            }`}
          >
            {submitStatus}
          </div>
        )}

        <form 
          ref={formRef} 
          onSubmit={handleSubmit} 
          className="bg-black/70 rounded-lg p-8 flex flex-col gap-4 shadow-xl"
          noValidate
          aria-label="Contact form"
        >
          {/* Name Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-name" className="text-white font-semibold text-left">
              Name <span className="text-red-400" aria-label="required">*</span>
            </label>
            <input 
              id="contact-name"
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name" 
              className={`p-3 rounded bg-white/80 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                errors.name ? 'ring-2 ring-red-500' : ''
              }`}
              aria-describedby={errors.name ? "name-error" : undefined}
              required
            />
            {errors.name && (
              <div id="name-error" className="error-message text-red-400 text-sm font-medium">
                {errors.name}
              </div>
            )}
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-email" className="text-white font-semibold text-left">
              Email <span className="text-red-400" aria-label="required">*</span>
            </label>
            <input 
              id="contact-email"
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email address" 
              className={`p-3 rounded bg-white/80 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                errors.email ? 'ring-2 ring-red-500' : ''
              }`}
              aria-describedby={errors.email ? "email-error" : undefined}
              required
            />
            {errors.email && (
              <div id="email-error" className="error-message text-red-400 text-sm font-medium">
                {errors.email}
              </div>
            )}
          </div>

          {/* Message Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-message" className="text-white font-semibold text-left">
              Message <span className="text-red-400" aria-label="required">*</span>
            </label>
            <textarea 
              id="contact-message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Enter your message" 
              className={`p-3 rounded bg-white/80 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none ${
                errors.message ? 'ring-2 ring-red-500' : ''
              }`}
              rows={4}
              aria-describedby={errors.message ? "message-error" : undefined}
              required
            />
            {errors.message && (
              <div id="message-error" className="error-message text-red-400 text-sm font-medium">
                {errors.message}
              </div>
            )}
          </div>
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`mt-4 px-6 py-3 rounded-full text-lg font-bold shadow-lg transition-all duration-300 text-white min-h-12 ${
              isSubmitting 
                ? 'bg-gray-500 cursor-not-allowed opacity-60' 
                : 'bg-pink-600 hover:bg-pink-700 focus:outline-pink-500'
            }`}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? 'Opening Email...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
} 