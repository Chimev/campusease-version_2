'use client'

import Link from 'next/link';
import {  FiHome, FiSearch } from 'react-icons/fi';


export default function NotFound() {

  const handleWhatsAppSupportAdvanced = () => {
  const phoneNumber = '2349078608642';
  const message = encodeURIComponent('Hi CampusEase support, I need help...');
  const url = `https://wa.me/${phoneNumber}?text=${message}`;
  
  try {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined') {
      // Try to open WhatsApp
      const newWindow = window.open(url, '_blank');
      
      // Check if popup was blocked
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        // Fallback: redirect in same window
        window.location.href = url;
      }
    }
  } catch (error) {
    console.error('Error opening WhatsApp:', error);
    alert('Unable to open WhatsApp. Please make sure it\'s installed on your device.');
  }
};
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main content */}
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="max-w-3xl w-full">
          {/* Visual elements */}
          <div className="relative h-64 mb-8">
            {/* Background circles for visual interest - similar to homepage */}
            <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-teal-500/20 blur-2xl"></div>
            <div className="absolute bottom-0 right-20 w-40 h-40 rounded-full bg-amber-400/20 blur-2xl"></div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-9xl font-bold text-teal-800">404</h1>
                <div className="h-1 w-20 bg-amber-400 mx-auto my-4"></div>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="text-center px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-teal-800 mb-4">Page Not Found</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
              Oops! It seems the page you're looking for has moved or doesn't exist. 
              Let's help you find your way back to campus comfort.
            </p>
            
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link
                replace={true}
                href="/"
                className="flex items-center px-6 py-3 bg-[#f8ae24] text-white font-semibold rounded-xl hover:bg-[#e49b1c] transition w-full sm:w-auto justify-center"
              >
                <FiHome className="mr-2" />
                Back to Homepage
              </Link>
              
              <Link
                replace={true}
                href="/#find-what-you-need"
                className="flex items-center px-6 py-3 bg-white text-teal-700 font-semibold rounded-xl border border-teal-700 hover:bg-teal-50 transition w-full sm:w-auto justify-center"
              >
                <FiSearch className="mr-2" />
                Search Listings
              </Link>
            </div>
            
            {/* Quick links */}
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-teal-800">Popular Destinations</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                <Link replace={true} href="/accommodations" className="text-teal-600 hover:text-teal-800 hover:underline py-2">
                  Accommodations
                </Link>
                <Link replace={true} href="/category/roommates" className="text-teal-600 hover:text-teal-800 hover:underline py-2">
                  Find Roommates
                </Link>
                <Link replace={true} href="/category/services" className="text-teal-600 hover:text-teal-800 hover:underline py-2">
                  Student Services
                </Link>
                <Link replace={true} href="/category/marketplace" className="text-teal-600 hover:text-teal-800 hover:underline py-2">
                  Campus Marketplace
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-teal-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="mb-4">Still need help? Contact our support team.</p>
          <button
            // href="/contact"
            onClick={handleWhatsAppSupportAdvanced}
            className="inline-block px-6 py-2 bg-teal-700 hover:bg-teal-600 rounded-full text-sm font-medium transition"
          >
            Contact Support
          </button>
          <p className="mt-6 text-sm text-teal-200">© {new Date().getFullYear()} campusEase. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}