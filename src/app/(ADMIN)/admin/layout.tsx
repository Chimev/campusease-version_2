import AdminNavbar from '@/components/admin/navbar/AdminNavbar'
import Sidebar from '@/components/admin/sidebar/Sidebar'
import Image from 'next/image'
import React from 'react'
import SchoolLayout from './SchoolLayout'
import "@/app/globals.css";

const Adminlayout = ({ children }: any) => {
  return (
    <div className='bg-blue min-h-screen flex overflow-hidden'>  
      {/* Sidebar Section */}
      <div className='flex-1 flex flex-col text-white bg-secondary p-5'>  
        <Image src="/1.png" width={150} height={150} alt="logo" className="mb-7" />
        <h2 className='mb-2 font-bold'>Menu</h2>
        <Sidebar />
      </div>

      {/* Main Content Section */}
      <div className='flex-[4] h-screen overflow-auto'>
        <div className='px-5 py-7 bg-secondaryLight flex-1'>
          <SchoolLayout>
            {children}
          </SchoolLayout>
        </div>
      </div>
    </div>
  )
}

export default Adminlayout
