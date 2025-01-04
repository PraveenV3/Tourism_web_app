import React from 'react';

const RegisterForm = ({ formData, handleRegisterChange, handleRegisterSubmit, closeModal }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-full sm:w-96 shadow-lg">
        <button
          onClick={closeModal} // Close modal when clicked
          className="absolute top-2 right-2 text-black font-bold text-xl"
        >
          X
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
        <form onSubmit={handleRegisterSubmit}>
          <input 
            type="text" 
            name="full_name" 
            placeholder="Full Name" 
            value={formData.full_name} 
            onChange={handleRegisterChange} 
            className="w-full mb-4 p-3 border border-gray-300 rounded-md text-black" 
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={formData.email} 
            onChange={handleRegisterChange} 
            className="w-full mb-4 p-3 border border-gray-300 rounded-md text-black" 
          />
          <input 
            type="text" 
            name="country" 
            placeholder="Country" 
            value={formData.country} 
            onChange={handleRegisterChange} 
            className="w-full mb-4 p-3 border border-gray-300 rounded-md text-black" 
          />
          <input 
            type="text" 
            name="mobile_number" 
            placeholder="Mobile Number" 
            value={formData.mobile_number} 
            onChange={handleRegisterChange} 
            className="w-full mb-4 p-3 border border-gray-300 rounded-md text-black" 
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={formData.password} 
            onChange={handleRegisterChange} 
            className="w-full mb-4 p-3 border border-gray-300 rounded-md text-black" 
          />
          <button 
            type="submit" 
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-md"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
