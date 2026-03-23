import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const navLinks = [
  { to: 'hero', label: 'Home', id: 'hero' },
  { to: 'about', label: 'About', id: 'about' },
  { to: 'classes', label: 'Classes', id: 'classes' },
  { to: 'trainers', label: 'Trainers', id: 'trainers' },
  { to: 'gallery', label: 'Gallery', id: 'gallery' },
  { to: 'testimonials', label: 'Testimonials', id: 'testimonials' },
  { to: 'contact', label: 'Contact', id: 'contact' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('hero');

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuItemClick = (linkId) => {
    setActive(linkId);
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md shadow-lg">
      <nav 
        className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <div 
          className="text-2xl font-extrabold text-yellow-400 tracking-widest drop-shadow-lg cursor-pointer select-none"
          role="banner"
        >
          GYM X
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center">
          <ul className="flex gap-8">
            {navLinks.map((link) => (
              <li key={link.to}>
                <ScrollLink
                  to={link.to}
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={500}
                  onSetActive={() => setActive(link.to)}
                  className={`relative cursor-pointer px-2 py-1 text-lg font-semibold transition text-white hover:text-yellow-400 focus:outline-none ${active === link.to ? 'text-yellow-400' : ''}`}
                  role="menuitem"
                  tabIndex="0"
                  aria-current={active === link.to ? 'page' : undefined}
                >
                  {active === link.to && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-0 -bottom-1 w-full h-1 bg-yellow-400 rounded"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      aria-hidden="true"
                    />
                  )}
                  {link.label}
                </ScrollLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={toggleMenu}
            className="mobile-menu-btn text-yellow-400 text-3xl"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-black/90 backdrop-blur-md px-6 py-4 flex flex-col gap-4"
            role="menu"
          >
            {navLinks.map((link) => (
              <ScrollLink
                key={link.to}
                to={link.to}
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                onSetActive={() => handleMenuItemClick(link.to)}
                className={`text-lg font-semibold text-white hover:text-yellow-400 transition cursor-pointer focus:outline-none ${active === link.to ? 'text-yellow-400' : ''}`}
                role="menuitem"
                tabIndex="0"
                aria-current={active === link.to ? 'page' : undefined}
              >
                {link.label}
              </ScrollLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar; 