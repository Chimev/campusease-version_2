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
    <nav className='h-20 flex justify-between items-center border-none relative z-10 '>
        {/* left */}
        <div>
            <div className="flex text-3xl gap-2  pl-10" onClick={() => router.push("/")}>
                <div className='relative w-8 h-8 '> 
                    <Image src='/logo.png' alt='' fill className='object-contain' />
                </div>
                <span>campusEase</span>
            </div>
        </div>

        {/* right */}
        <div className="flex justify-between items-center text-gray-600 text-2xl">
            <Link className='px-4 py-3 mr-10' href="/">Home</Link>
            <Link className='px-4 py-3 mr-10'  href="/about">About</Link>
            <Link className='px-4 py-3 mr-10 flex items-center gap-2'  href="/profile">{hiddenMenu ? "Profile" : <><FaSignInAlt/>Sign in</>}</Link>
            <Link  className='px-4 py-3 mr-10 flex items-center gap-2' href='/add-listing'><FaPlus /> Add</Link>

            <div onClick={() => setOpen(prev => !prev)} className='hidden'>
                <GiHamburgerMenu className='burger'/>
                {/* <img src="./menu.png" alt="" /> */}
            </div>
            <div className={open ? 'menu active' : 'hidden'}>
            <Link href="/" onClick={() => setOpen(prev => !prev)}>Home</Link>
            <Link href="/about" onClick={() => setOpen(prev => !prev)}>About</Link>
            <Link href="/profile" onClick={() => setOpen(prev => !prev)} className='register'>{hiddenMenu ? "Profile" : <><FaSignInAlt/>Sign in</>}</Link>
            <Link href='/add-listing' onClick={() => setOpen(prev => !prev)} className='plus'><FaPlus /> Add</Link>
            </div>
        </div>
    </nav>
  )
}

export default Navbar