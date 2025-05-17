import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const Signup = () => {
  return (
    // <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="bg-white p-10 rounded-2xl shadow-md w-full min-w-md max-w-md text-center">
      <div className="flex justify-center mb-6">
        {/* Logo Placeholder */}
        {/* <svg
          className="w-12 h-12 text-blue-500"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 0L13.09 8.26L21 9.27L15 14.14L16.18 22.02L12 18.26L7.82 22.02L9 14.14L3 9.27L10.91 8.26L12 0Z" />
        </svg> */}
      </div>
      <h2 className="text-3xl font-semibold mb-1">Welcome to IAT</h2>
      <p className="text-gray-600 text-sm font-normal mb-6">
        Your Gateway to Automate the Sytem
      </p>

      <form className="space-y-4">
        <h1 className="flex self-start font-medium mb-2 text-sm">Email</h1>
        <input
          type="email"
          placeholder="Email address"
          className="w-full px-4 py-2 shadow-sm border-[0.1px] border-gray-300 rounded-lg text-sm focus:outline-none  "
        />
        <button
          type="submit"
          className="w-full py-2 text-white rounded-lg bg-blue-500 cursor-pointer hover:opacity-90 transition"
        >
          Submit
        </button>
      </form>

      <p className="text-sm mt-4 text-gray-400">
        Already have an account?{' '}
        <a href="#" className="text-blue-600 font-medium hover:underline">
          Login
        </a>
      </p>

      <div className="my-4 flex items-center text-sm text-gray-400">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="px-4 pb-1 bg-white">or continue with</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <button className="group w-full py-2 px-4 border border-gray-300 rounded-lg flex items-center justify-center relative overflow-hidden transition-all duration-300 shadow-sm cursor-pointer">
        {/* Icon */}
        <div className="flex items-center justify-center transition-all duration-300 group-hover:translate-x-[-3.5rem]">
          <FcGoogle className="text-xl" />
        </div>

        {/* Text */}
        <span className="absolute transform group-hover:translate-x-[10px] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in text-sm whitespace-nowrap">
          Google account
        </span>
      </button>
    </div>
    // </div>
  );
};

export default Signup;
