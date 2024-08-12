'use client'

import React, {useState} from 'react'
import Link from 'next/link';
import { GiHamburgerMenu } from 'react-icons/gi'
import { FaPlus } from "react-icons/fa";
import { FaSignInAlt } from "react-icons/fa";
import { useRouter } from 'next/navigation'
import Image from 'next/image';

const Navbar = () => {
    const router = useRouter();
    const [hiddenMenu, setHiddenMenu] = useState(false);
    const [open, setOpen] = useState(false)
  return (
    <nav className='h-20 flex justify-between items-center border-none relative z-10
       '>
        {/* left */}
        <div>
            <div className="flex text-3xl gap-2  pl-5" onClick={() => router.push("/")}>
                <div className='relative w-8 h-8 '> 
                    <Image src='/logo.png' alt='' fill className='object-contain' />
                </div>
                <span>campusEase</span>
            </div>
        </div>

        {/* right */}
        <div className="hidden lg:flex justify-between items-center text-gray-600 text-2xl ">
            <Link className='px-4 py-3 mr-10 ' href="/">Home</Link>
            <Link className='px-4 py-3 mr-10'  href="/about">About</Link>
            <Link className='px-4 py-3 mr-10 flex items-center gap-2'  href="/profile">{hiddenMenu ? "Profile" : <><FaSignInAlt/>Sign in</>}</Link>
            <Link  className=' bg-blue text-white px-4 py-3 mr-10 flex items-center gap-2' href='/add-listing'><FaPlus /> Add</Link>
        </div>

        {/* small screen */}
        <div className='lg:hidden'>
            <GiHamburgerMenu className=' mr-6 text-5xl text-gray cursor-pointer' onClick={() => setOpen(prev => !prev)} />
            
            <div className={`absolute text-[18px]  left-2 -z-10  h-16 bg-white bg-opacity-75 flex justify-center gap-5 items-center transition-all duration-500 ease-in-out ${open ? 'top-16' : '-top-96'}`}>
                <Link href="/" onClick={() => setOpen(false)} className='block px-4  hover:text-orange'>Home</Link>
                <Link href="/about" onClick={() => setOpen(false)} className='block px-4  hover:text-orange'>About</Link>
                <Link href="/sign-in" onClick={() => setOpen(false)} className='flex items-center gap-2 px-4 hover:text-orange'>{hiddenMenu ? "Profile" : <><FaSignInAlt /> Sign in</>}</Link>
                <Link href='/add-listing' onClick={() => setOpen(false)} className='bg-blue text-white px-4 py-3 mr-10 flex items-center gap-2'><FaPlus /> Add</Link>
            </div>
        </div>
        
    </nav>
    
  )
}

export default Navbar