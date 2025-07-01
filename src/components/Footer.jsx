import React from 'react';

const Footer = () => (
  <footer className="w-full bg-black/90 text-white text-center py-8 mt-8 flex flex-col items-center gap-4">
    <div>
      <b>GYM X</b> &copy; {new Date().getFullYear()} | All Rights Reserved
    </div>
    <div className="flex gap-8 justify-center">
      <a href="#" className="text-yellow-400 hover:text-white text-lg transition">Instagram</a>
      <a href="#" className="text-yellow-400 hover:text-white text-lg transition">Facebook</a>
      <a href="#" className="text-yellow-400 hover:text-white text-lg transition">Twitter</a>
    </div>
  </footer>
);

export default Footer; 