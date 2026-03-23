import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import QRImage from '../assets/QR.png';

const QRPopup = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previousActiveElement = useRef(null);

  // Manage body scroll and save focus position
  useEffect(() => {
    if (isOpen) {
      // Save the currently focused element
      previousActiveElement.current = document.activeElement;
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
      // Focus the close button when modal opens
      setTimeout(() => {
        if (closeButtonRef.current) {
          closeButtonRef.current.focus();
        }
      }, 100);
    } else {
      // Re-enable body scroll
      document.body.style.overflow = 'unset';
      
      // Restore focus to the element that triggered the modal
      if (previousActiveElement.current && typeof previousActiveElement.current.focus === 'function') {
        previousActiveElement.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Implement focus trap within modal
  useEffect(() => {
    const handleFocusGrab = (e) => {
      if (!isOpen || !modalRef.current) return;

      // Get all focusable elements within the modal
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // Trap focus: if Tab pressed on last element, focus first element
      if (e.key === 'Tab' && e.shiftKey === false && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }

      // Trap focus: if Shift+Tab pressed on first element, focus last element
      if (e.key === 'Tab' && e.shiftKey === true && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleFocusGrab);
    }

    return () => {
      document.removeEventListener('keydown', handleFocusGrab);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="qr-modal-title"
            aria-describedby="qr-modal-description"
          >
            {/* Close button */}
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 rounded-lg transition-all"
              aria-label="Close membership dialog"
              type="button"
            >
              <FiX size={24} aria-hidden="true" />
            </button>

            {/* QR Code Content */}
            <div className="text-center">
              <h2 
                id="qr-modal-title"
                className="text-2xl font-bold text-gray-800 mb-4"
              >
                Scan to Join
              </h2>
              <p 
                id="qr-modal-description"
                className="text-gray-600 mb-6"
              >
                Scan this QR code to get started with your membership
              </p>
              
              {/* QR Code Image */}
              <div className="flex justify-center mb-6">
                <img
                  src={QRImage}
                  alt="QR code leading to gym membership registration"
                  className="w-48 h-48 object-contain border-2 border-gray-200 rounded-lg shadow-lg"
                />
              </div>

              <p className="text-sm text-gray-500 mb-4">
                Use your phone's camera to scan the QR code
              </p>

              <button
                onClick={onClose}
                className="w-full px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                type="button"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QRPopup;
