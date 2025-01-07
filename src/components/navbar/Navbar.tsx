'use client'

import React, {useState} from 'react'
import Link from 'next/link';
import { GiHamburgerMenu } from 'react-icons/gi'
import { FaSignInAlt } from "react-icons/fa";
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { FaPlus } from "react-icons/fa";

const Navbar = () => {
    const router = useRouter();
    const [open, setOpen] = useState(false)
    const {data: session} : any = useSession();


  return (
    <nav className='h-16 md:h-20 flex justify-between items-center border-none relative z-10
       '>
        {/* left */}
        <Link href={'/'} className='relative w-[250px] h-[36px] md:w-[300px] md:h-[7\60px]'> 
            <Image src='/logo_6.png' alt='' fill className='object-fill absolute' />
        </Link>
        
        
        {/* <div className='flex justify-center items-center'>
        <Image src='/logo_5.png' alt=''  width={400} height={100} className='object-contain ' />
            <div className="flex text-2xl gap-2  pl-5" onClick={() => router.push("/")}>
                    <Image src='/logo_1.png' alt=''  width={30} height={30} className='object-contain' />
                <span>campusEase</span>
            </div>
        </div> */}

        {/* right */}
        <div className="hidden lg:flex justify-between font-bold items-center text-gray-600 text-2xl ">
            <Link className='px-4 py-3 mr-10 ' href="/">Home</Link>
            <Link className='px-4 py-3 mr-10'  href="/about">About</Link>
            <Link className='px-4 py-3 mr-10 flex items-center gap-2'  href={session ? '/profile' : '/sign-in'}>{session ? <>Profile</> : <><FaSignInAlt /> Sign in</>}</Link>
            <Link  className=' bg-secondary text-white px-4 py-3 mr-10 flex items-center gap-2' href='/add-listing'><FaPlus /> Add</Link>
        </div>

        {/* small screen */}
        <div className='lg:hidden'>
            <div className='flex mr-3 gap-2'>
            <GiHamburgerMenu className=' text-4xl text-gray cursor-pointer' onClick={() => setOpen(prev => !prev)} />
            <Link href={'/add-listing'} className='bg-secondary w-fit p-2'>
                <FaPlus  className='text-white font-bold text-xl '/>
            </Link>
            </div>
            
            
            <div className={`absolute text-[18px]  left-4 -z-10 w-11/12 h-16 bg-white bg-opacity-75 flex justify-center gap-5 items-center transition-all duration-500 ease-in-out ${open ? 'top-16' : '-top-96'}`}>
                <Link href="/" onClick={() => setOpen(false)} className='block  hover:text-orange'>Home</Link>
                <Link href="/about" onClick={() => setOpen(false)} className='block  hover:text-orange'>About</Link>
                <Link href={session ? '/profile' : '/sign-in'} onClick={() => setOpen(false)} className='flex items-center gap-2  hover:text-orange'>{session ? <>Profile</> : <><FaSignInAlt /> Sign in</>}</Link>
                <Link href='/add-listing' onClick={() => setOpen(false)} className='bg-secondary text-white px-3 py-3 mr-10 flex items-center gap-2'><FaPlus /> Add</Link>
            </div>
        </div>
         
    </nav>
    
  )
}

export default Navbar