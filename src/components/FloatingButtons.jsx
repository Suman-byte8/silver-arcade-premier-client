import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { IoIosArrowUp } from 'react-icons/io';

const FloatingButtons = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="fixed bottom-[80px] lg:bottom-6 right-6 flex flex-col gap-4 z-50">
      <div className="group relative">
        <a
          href={`https://wa.me/${import.meta.env.VITE_CONTACT_PHONE}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center"
        >
          <FaWhatsapp size={24} />
        </a>
        <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-black text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          Chat with Us
        </span>
      </div>
      
      {showBackToTop && (
        <div className="group relative">
          <button
            onClick={scrollToTop}
            className="bg-gray-700 hover:bg-gray-800 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center"
          >
            <IoIosArrowUp size={24} />
          </button>
          <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-black text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Go to Top
          </span>
        </div>
      )}
    </div>
  );
};

export default FloatingButtons;