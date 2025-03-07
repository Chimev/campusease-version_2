'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import SignOut from '../profile/SignOut';
import { FaPlus } from "react-icons/fa";
import { FaSignInAlt } from "react-icons/fa";
import { NavbarContext } from '@/lib/Context/NavContext';

// Updated navMenu to handle dynamic authentication
const getNavMenu = (isAuthenticated: boolean) => [
  { id: 1, menu: 'Home', link: '/' },
  { id: 2, menu: 'About', link: '/about' },
  { id: 3, menu: isAuthenticated ? 'Profile' : 'Sign In', link: isAuthenticated ? '/profile' : '/sign-in', icon: !isAuthenticated && <FaSignInAlt /> },
  { id: 6, menu: 'Add', icon: <FaPlus />, link: '/add-listing' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLDivElement>(null);
  const [authorization, setAuthorization] = useState(false);
  const pathname = usePathname();
  const session = useSession();
  const context = useContext(NavbarContext)
  const showNavbar = context?.showNavbar
  


  useEffect(() => {
    setAuthorization(session.status === 'authenticated');
    
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [session.status]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navMenuItems = getNavMenu(authorization);


  //Dynamic Navbar
  useEffect(() => {
    if (!context) return 
    
    if(pathname === '/'){
      context.setShowNavbar(true)
    }else if( ['/admin/dashboard'].includes(pathname) ) {
      context.setShowNavbar(false)
    }
    
  }, [pathname, context])
  


  if (!showNavbar) return null

  return (
    <nav className="text-primary text-xl px-2 sticky top-0 bg-white shadow-md z-50">
      <div className="flex justify-between items-center max-w-[1300px] mx-auto w-full py-3">
        {/* Logo */}
        <Link href="/">
          <Image src="/2.png" width={250} height={100} alt="logo" className="" />
        </Link>

        {/* Desktop Menu */}
        <div className="items-center hidden lg:flex">
          <div className="flex gap-6 flex-grow justify-end pr-6">
            {navMenuItems.map((menu) => (
              <Link
                href={menu.link}
                key={menu.id}
                className={` ${menu.menu === 'Add' && 'bg-secondary text-white py-1 px-2 hover:text-white'} ${pathname === menu.link && 'border-b-secondary border-b-2 text-secondary hover:text-secondary px-3 py-1'} hover:text-secondary transition-colors flex items-center gap-1 font-semibold`}
              >
                {menu.icon}
                {menu.menu} 
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div ref={toggleButtonRef} className="lg:hidden">
          <GiHamburgerMenu
            className="text-4xl text-gray-600 cursor-pointer hover:text-secondary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" />
      )}

      {/* Mobile Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 w-[280px] h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsOpen(false)}
              className="text-3xl text-gray-600 hover:text-blue-600 transition-colors"
            >
              ×
            </button>
          </div>
          
          <div className="flex flex-col gap-4 px-6 py-4">
            {navMenuItems.map((menu) => (
              <Link
                href={menu.link}
                key={menu.id}
                className={` ${menu.menu === 'Add' && 'bg-secondary text-white py-1 px-2 w-fit'} ${pathname === menu.link && 'text-secondary hover:text-secondary'} hover:text-secondary transition-colors flex items-center gap-1 font-semibold`}
                onClick={() => setIsOpen(false)}
              >
                {menu.icon}
                {menu.menu}
              </Link>
            ))} 
            {
              authorization && <SignOut nav={true}/>
            }
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;