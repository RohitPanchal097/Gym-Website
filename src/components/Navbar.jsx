import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const navLinks = [
  { to: 'hero', label: 'Home' },
  { to: 'about', label: 'About' },
  { to: 'classes', label: 'Classes' },
  { to: 'trainers', label: 'Trainers' },
  { to: 'gallery', label: 'Gallery' },
  { to: 'testimonials', label: 'Testimonials' },
  { to: 'contact', label: 'Contact' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('hero');

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <div className="text-2xl font-extrabold text-yellow-400 tracking-widest drop-shadow-lg cursor-pointer select-none">
          GYM X
        </div>
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <ScrollLink
              key={link.to}
              to={link.to}
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              onSetActive={() => setActive(link.to)}
              className={`relative cursor-pointer px-2 py-1 text-lg font-semibold transition text-white hover:text-yellow-400 ${active === link.to ? 'text-yellow-400' : ''}`}
            >
              {active === link.to && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute left-0 -bottom-1 w-full h-1 bg-yellow-400 rounded"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              {link.label}
            </ScrollLink>
          ))}
        </div>
        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen((v) => !v)} className="text-yellow-400 text-3xl focus:outline-none">
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-black/90 backdrop-blur-md px-6 py-4 flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <ScrollLink
                key={link.to}
                to={link.to}
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                onSetActive={() => { setActive(link.to); setMenuOpen(false); }}
                className={`text-lg font-semibold text-white hover:text-yellow-400 transition cursor-pointer ${active === link.to ? 'text-yellow-400' : ''}`}
              >
                {link.label}
              </ScrollLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar; 