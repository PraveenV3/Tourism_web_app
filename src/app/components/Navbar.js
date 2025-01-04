import React, { useState, useEffect } from 'react';


const Navbar = ({ handleLoginToggle, handleRegisterToggle, handleContactToggle }) => {

  useEffect(() => {
    if (typeof window !== 'undefined') {
  
    }
  }, []);
  
  return (
    <nav className="flex justify-between items-center p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg fixed w-full z-50 top-0">
      <div className="flex items-center space-x-4">
        <img
          src="logo.png" 
          alt="Logo"
          className="w-12.5 h-12 object-contain"
        />
      </div>
      <div className="space-x-4">
        <button
          className="bg-white text-indigo-600 px-4 py-2 rounded-md hover:bg-gray-200 transition duration-300"
          onClick={handleLoginToggle}
        >
          <b>Login</b>
        </button>
        <button
          className="bg-white text-green-600 px-4 py-2 rounded-md hover:bg-gray-200 transition duration-300"
          onClick={handleRegisterToggle}
        >
          <b>Register</b>
        </button>
        <button
          className="bg-white text-gray-600 px-4 py-2 rounded-md hover:bg-gray-200 transition duration-300"
          onClick={handleContactToggle}
        >
          <b>Contact Us</b>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
