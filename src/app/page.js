'use client';

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from '../app/components/Footer';
import Link from "next/link";
import RegisterForm from './components/RegisterForm'; 
import LoginForm from './components/LoginForm'; 

const Home = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    country: '',
    mobile_number: '',
    password: '',
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [query, setQuery] = useState('');

  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [userData, setUserData] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);

  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState(''); // 'error' or 'success'

  const placesToVisit = [
    { id: "temple-of-tooths", title: "Temple of Tooths", description: "A sacred temple in Kandy", image: "/temple.jpg" },
    { id: "sigiriya-rock-fortress", title: "Sigiriya Rock Fortress", description: "An ancient rock fortress", image: "/sigiriya.jpg" },
    { id: "galle-fort", title: "Galle Fort", description: "A historic fort in Galle", image: "/galle.jpg" },
  ];
  
  const hotelsAndResorts = [
    { id: "grand-hotel", title: "The Grand Hotel", description: "Luxury hotel in Kandy", image: "/grand-hotel.jpg" },
    { id: "heritance-kandalama", title: "Heritance Kandalama", description: "Resort near Sigiriya", image: "/heritance.jpg" },
    { id: "jetwing-lighthouse", title: "Jetwing Lighthouse", description: "Hotel in Galle with ocean views", image: "/jetwing.jpg" },
  ];

  const images = [
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const filterResults = () => {
      if (query.trim() === '') {
        setFilteredPlaces(placesToVisit);
        setFilteredHotels(hotelsAndResorts);
      } else {
        const lowerQuery = query.toLowerCase();
        setFilteredPlaces(
          placesToVisit.filter((place) =>
            place.title.toLowerCase().includes(lowerQuery) || place.description.toLowerCase().includes(lowerQuery)
          )
        );
        setFilteredHotels(
          hotelsAndResorts.filter((hotel) =>
            hotel.title.toLowerCase().includes(lowerQuery) || hotel.description.toLowerCase().includes(lowerQuery)
          )
        );
      }
    };
    filterResults();
  }, [query]);

  const handleRegisterChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleContactChange = (e) => {
    setContactData({
      ...contactData,
      [e.target.name]: e.target.value,
    });
  };

  const validateRegister = () => {
    const { full_name, email, country, mobile_number, password } = formData;
    if (!full_name || !email || !country || !mobile_number || !password) {
      return "All fields are required!";
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }

    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }

    return null;
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateRegister();
    if (validationError) {
      setModalMessage(validationError);
      setModalType('error');
      return;
    }

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.message === 'Registration successful!') {
      setUserData(data.user);
      setShowRegister(false);
      setModalMessage('Registration Successful!');
      setModalType('success');
    } else {
      setModalMessage(data.message || 'Registration failed');
      setModalType('error');
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      setModalMessage("Email and Password are required!");
      setModalType('error');
      return;
    }

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();

    if (data.message === 'Login successful!') {
      setModalMessage('Login Successful!');
      setModalType('success');
      setShowLogin(false);
    } else {
      setModalMessage(data.message || 'Login failed');
      setModalType('error');
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    const { name, email, message } = contactData;
    if (!name || !email || !message) {
      setModalMessage("All fields are required!");
      setModalType('error');
      return;
    }

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });

    const data = await response.json();

    if (data.message === 'Message sent successfully!') {
      setModalMessage('Your message has been sent.');
      setModalType('success');
      setShowContact(false);
    } else {
      setModalMessage(data.message || 'Failed to send message');
      setModalType('error');
    }
  };

  const handleRegisterToggle = () => {
    setShowRegister(!showRegister);
    setShowLogin(false);
  };

  const handleLoginToggle = () => {
    setShowLogin(!showLogin);
    setShowRegister(false);
  };

  const handleContactToggle = () => {
    setShowContact(!showContact);
  };

  const handleImageChange = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="font-sans bg-gray-100">
      <Navbar handleLoginToggle={handleLoginToggle} handleRegisterToggle={handleRegisterToggle} handleContactToggle={handleContactToggle} />
      
      {/* Carousel Section */}
      <div className="my-8 relative max-w-full w-full mx-auto">
        <div className="relative">
          <img
            src={images[currentIndex]}
            alt={`carousel-${currentIndex}`}
            className="w-full h-auto rounded-xl shadow-lg transition-all duration-500"
          />
          <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="text-center">
              <h1 className="text-white text-6xl font-bold drop-shadow-lg">
                WELCOME TO SRI LANKA
              </h1>
              <p className="text-white text-2xl mt-4 font-medium">
                Plan Your Vacation With Us
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button key={index} onClick={() => handleImageChange(index)} className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-gray-400'} transition`} ></button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="my-12 text-center">
        <div className="flex justify-center items-center space-x-4">
          <input type="text" placeholder="Search for places or hotels" value={query} onChange={(e) => setQuery(e.target.value)} className="w-full max-w-md p-4 text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-bold text-black bg-white transition duration-300 ease-in-out"
          />
          <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition duration-300 ease-in-out">
            Search
          </button>
        </div>
      </div>

      {/* Places and Hotels Section */}
      <div className="my-12">
        <h2 className="text-3xl font-semibold text-center mb-6 text-black">Places to Visit</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces.map((place, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <Link href={`/place/${place.id}`}>
                <img src={place.image} alt={place.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800">{place.title}</h3>
                  <p className="text-gray-600">{place.description}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="my-12">
        <h2 className="text-3xl font-semibold text-center mb-6 text-black">Hotels & Resorts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <Link href={`/hotel/${hotel.id}`}>
                <img src={hotel.image} alt={hotel.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800">{hotel.title}</h3>
                  <p className="text-gray-600">{hotel.description}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Modals for Messages */}
      {modalMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className={`bg-white p-8 rounded-lg w-full sm:w-96 shadow-lg ${modalType === 'error' ? 'border-red-500' : 'border-green-500'}`}>
            <h2 className="text-2xl font-semibold mb-4 text-center text-black">{modalType === 'error' ? 'Error' : 'Success'}</h2>
            <p className="text-center text-xl text-black">{modalMessage}</p>
            <button onClick={() => setModalMessage('')} className="mt-4 w-full py-3 bg-blue-600 text-white font-bold rounded-md">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Forms */}
      {showRegister && <RegisterForm formData={formData} handleRegisterChange={handleRegisterChange} handleRegisterSubmit={handleRegisterSubmit} />}
      {showLogin && <LoginForm loginData={loginData} handleLoginChange={handleLoginChange} handleLoginSubmit={handleLoginSubmit} />}
      
      {/* Contact Form */}
      {showContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <form onSubmit={handleContactSubmit} className="bg-white p-8 rounded-lg w-full sm:w-96 shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-4 text-black">Contact Us</h2>
            <input
              type="text"
              name="name"
              value={contactData.name}
              onChange={handleContactChange}
              placeholder="Your Name"
              className="w-full p-4 mb-4 text-black bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="email"
              name="email"
              value={contactData.email}
              onChange={handleContactChange}
              placeholder="Your Email"
              className="w-full p-4 mb-4 text-black bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              name="message"
              value={contactData.message}
              onChange={handleContactChange}
              placeholder="Your Message"
              className="w-full p-4 mb-4 text-black bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button type="submit" className="w-full py-3 bg-blue-600 text-white font-bold rounded-md">Send Message</button>
          </form>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Home;
