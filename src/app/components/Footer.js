import React from 'react';
import { FaFacebook, FaWhatsapp, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white py-9 mt-9">
      <div className="max-w-screen-lg mx-auto text-center">
        <h3 className="text-2xl font-semibold mb-4">About Us</h3>
        <p className="text-lg mb-6">
          TripMe is dedicated to helping you plan the perfect vacation. We offer personalized travel experiences, 
          booking options for accommodations, and the best local insights to ensure you have an unforgettable journey.
        </p>
        <div className="flex justify-center space-x-6 mb-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-white text-3xl hover:text-blue-700 transition" />
          </a>
          <a href="https://wa.me" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="text-white text-3xl hover:text-green-700 transition" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-white text-3xl hover:text-pink-700 transition" />
          </a>
        </div>
        <p className="text-sm">&copy; 2024 TripMe. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
