// components/Footer.tsx
'use client'
import { categories } from "@/data/categories";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {

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
    <footer className="bg-teal-900 text-teal-200 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Image src="/4.png" width={150} height={150} alt="logo" className="mb-7" />
              <p className="mb-4">Making campus life easier, one connection at a time.</p>
              <div className="flex space-x-4">
                {/* Social icons would go here */}
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Categories</h4>
              <ul className="space-y-2">
                {categories.map(cat => (
                  <li key={cat.category}>
                    <Link href={cat.link} className="hover:text-white">{cat.category}</Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Contact Us</h4>
              <Link className="mb-2" href="mailto:campusease1@gmail.com">campusease1@gmail.com</Link>
              <p onClick={handleWhatsAppSupportAdvanced} className="cursor-pointer">09078608642</p>
            </div>
          </div>
          
          <div className="border-t border-teal-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} campusEase. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
