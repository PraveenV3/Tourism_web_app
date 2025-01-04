import React from 'react';

const LoginForm = ({ loginData, handleLoginChange, handleLoginSubmit }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-full sm:w-96 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <form onSubmit={handleLoginSubmit}>
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={loginData.email} 
            onChange={handleLoginChange} 
            className="w-full mb-4 p-3 border border-gray-300 rounded-md text-black" 
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={loginData.password} 
            onChange={handleLoginChange} 
            className="w-full mb-4 p-3 border border-gray-300 rounded-md text-black" 
          />
          <button 
            type="submit" 
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
