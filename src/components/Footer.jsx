import React from 'react';

const Footer = () => (
  <footer 
    className="w-full bg-black/90 text-white text-center py-8 mt-8 flex flex-col items-center gap-4"
    role="contentinfo"
  >
    <div>
      <p>
        <strong>GYM X</strong> &copy; {new Date().getFullYear()} | All Rights Reserved
      </p>
    </div>
    <nav aria-label="Social media links">
      <ul className="flex gap-8 justify-center list-none p-0 m-0">
        <li>
          <a 
            href="#instagram-profile" 
            className="text-yellow-400 hover:text-white text-lg transition focus:outline-pink-500"
            aria-label="Visit our Instagram profile"
          >
            Instagram
          </a>
        </li>
        <li>
          <a 
            href="#facebook-profile" 
            className="text-yellow-400 hover:text-white text-lg transition focus:outline-pink-500"
            aria-label="Visit our Facebook profile"
          >
            Facebook
          </a>
        </li>
        <li>
          <a 
            href="#twitter-profile" 
            className="text-yellow-400 hover:text-white text-lg transition focus:outline-pink-500"
            aria-label="Visit our Twitter profile"
          >
            Twitter
          </a>
        </li>
      </ul>
    </nav>
  </footer>
);

export default Footer; 