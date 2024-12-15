"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import {
  FaFacebookF,
  FaLinkedinIn,
  FaGoogle,
  FaEnvelope,
  FaKey,
} from "react-icons/fa";
<<<<<<< HEAD
import Image from 'next/image';
=======
>>>>>>> 0273bc7af9b8b17aee779f6750f3d12b5dbe8cb5

function LoginSignupPage() {
  const [isClient, setIsClient] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter(); // Add this hook
  
  const handleSignIn = (e) => {
    e.preventDefault();
    router.push('/'); 
  };

  // Ensure the component is client-rendered
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center py-2 bg-white">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-slate-100 rounded-xl shadow-2xl flex w-2/3 max-w-4xl overflow-hidden transition-all duration-500">
          {/* Left Section (Login/Sign-Up Form) */}
          <div
            className={`w-3/5 p-5 transition-transform duration-500 ${
              isLogin ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="text-left font-semibold mb-9">
              <span className="text-blue-400">Rupee</span>Flow
            </div>
            <div className="py-2 text-3xl font-bold text-blue-400 ">
              {isLogin ? "Sign in to Account" : "Create Account"}
            </div>
            <div className="border-2 w-14 inline-block mb-2 rounded-sm border-blue-400"></div>
            <div className="flex flex-row justify-center py-2 gap-8 mb-2">
              <a href="#" className="border-2 rounded-full p-2 border-gray-200">
                <FaFacebookF />
              </a>
              <a href="#" className="border-2 rounded-full p-2 border-gray-200">
                <FaGoogle />
              </a>
              <a href="#" className="border-2 rounded-full p-2 border-gray-200">
                <FaLinkedinIn />
              </a>
            </div>
            <p className="text-gray-400 mb-5">
              or use your {isLogin ? "email account" : "email to sign up"}
            </p>
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="bg-gray-200 w-64 p-1 rounded-md text-gray-400 flex items-center flex-row gap-2">
                <FaEnvelope className="m-2" />
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  className="bg-gray-200 flex-1 text-sm outline-none"
                />
              </div>
              <div className="bg-gray-200 w-64 p-1 rounded-md text-gray-400 flex items-center flex-row gap-2">
                <FaKey className="m-2" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="bg-gray-200 flex-1 text-sm outline-none"
                />
              </div>
              {!isLogin && (
                <div className="bg-gray-200 w-64 p-1 rounded-md text-gray-400 flex items-center flex-row gap-2">
                  <FaKey className="m-2" />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="bg-gray-200 flex-1 text-sm outline-none"
                  />
                </div>
              )}
              <a
                 onClick={(e) => {
                    e.preventDefault();
                    router.push('/'); // Navigate to the home page
                  }}
                className=" border-2 bg-blue-400 py-2 px-10 border-none rounded-full text-white font-bold"
              >
                {isLogin ? "Login" : "Sign Up"}
              </a>
            </div>
          </div>

          {/* Right Section */}
          <div
            className={`w-2/5 bg-blue-400 rounded-r-xl text-white py-36 px-12 transition-transform duration-500 ${
              isLogin ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <h3 className="text-3xl font-bold mb-1">
              {isLogin ? "Hello, Friend!" : "Welcome Back!"}
            </h3>
            <div className="border-2 w-14 inline-block mb-2 rounded-sm"></div>
            <p className="mb-10">
              {isLogin
                ? "Welcome to the journey of financial freedom"
                : "Already have an account? Sign in now!"}
            </p>
            <button
              onClick={handleSignIn}
              className="border-2 py-1 px-8 rounded-full inline-block font-semibold hover:bg-white hover:text-blue-400"
            >
              {isLogin ? "Sign up" : "Login"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LoginSignupPage;