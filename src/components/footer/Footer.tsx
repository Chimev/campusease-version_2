// components/Footer.tsx

import Link from "next/link";
import React from "react";
import { FaInstagram } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

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
              href="https://www.instagram.com/campus_ease/profilecard/?igsh=ZWFrdnI4eWQycmE="
              target="_blank"
              className="text-lg"
            >
              <FaInstagram />
            </Link>
            <Link
              href="https://x.com/campus_ease?t=IdwfU5HNyOb0ocr9AaGrUg&s=09"
              target="_blank"
              className="text-lg"
            >
              <FaXTwitter />
            </Link>
            <Link
              href="https://whatsapp.com/channel/0029VaqvVfRC1FuGeFs2Mi1A"
              target="_blank"
              className="text-lg"
            >
              <FaWhatsapp />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
