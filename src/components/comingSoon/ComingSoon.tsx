'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { FiArrowLeft, FiMail, FiBell, FiBellOff } from 'react-icons/fi';

export default function ComingSoon() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isNotifying, setIsNotifying] = useState(false);
  
  const handleSubscribe = (e:any) => {
    e.preventDefault();
    if (email) {
      // Here you would typically send this to your backend
      setSubscribed(true);
      setEmail('');
      
      // Reset the subscription state after a few seconds
      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    }
  };

  const toggleNotification = () => {
    setIsNotifying(!isNotifying);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      
      {/* Main content */}
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl w-full">
          {/* Visual elements */}
          <div className="relative">
            {/* Background circles for visual interest - similar to homepage */}
            <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-teal-500/20 blur-2xl"></div>
            <div className="absolute bottom-0 right-20 w-40 h-40 rounded-full bg-amber-400/20 blur-2xl"></div>
          </div>
          
          {/* Content */}
          <div className="text-center px-4 py-12 relative">
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mb-6">
                <span className="mr-2">🚧</span>
                <span>Under Development</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-teal-800 mb-6">
              Coming Soon to campusEase
            </h1>
            
            <div className="h-1 w-24 bg-amber-400 mx-auto my-6"></div>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              We're working hard to bring you an amazing new feature. 
              This page is currently under development and will be available soon!
            </p>
            
            <div className="flex justify-center mb-12">
              <div className="flex space-x-4">
                <div className="w-3 h-3 bg-teal-600 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-teal-600 rounded-full animate-pulse delay-300"></div>
                <div className="w-3 h-3 bg-teal-600 rounded-full animate-pulse delay-600"></div>
              </div>
            </div>
            
          
          
          </div>
        </div>
      </div>
    </main>
  );
}