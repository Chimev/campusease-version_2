// components/Footer.tsx

import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-6">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
          <Link href="/privacy-policy" className="hover:underline mb-2">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:underline">
            Terms and Conditions
          </Link>
        </div>
        <div className="flex flex-col items-center text-center md:text-right">
          <p className="mb-2">© {new Date().getFullYear()} Creative Chime Production</p>
          <div className="flex space-x-4">
            <Link
              href="/"
              target="_blank"
              className="hover:underline"
            >
              Instagram
            </Link>
            <Link
              href="/"
              target="_blank"
              className="hover:underline"
            >
              X
            </Link>
            <Link
              href="/"
              target="_blank"
              className="hover:underline"
            >
              WhatsApp
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
