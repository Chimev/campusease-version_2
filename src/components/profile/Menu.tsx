'use client'
import React from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';


const link = [ 'listings', 'saved'];
const Menu = () => {
  const pathname = usePathname();
  return (
    <>
    <div className="flex text-lg items-center justify-center px-4 py-1 font-medium">
        {link.map(links => <Link className={`text-gray p-4 ${pathname === `/profile/${links}` && 'text-orange'}`} href={`/profile/${links}`} key={links} >{links}</Link>)}
        <div className="text-white bg-orange px-2 py-1 cursor-pointer" onClick={() => signOut()}>Sign Out</div>
   </div>
        
    </>
  )
}

export default Menu