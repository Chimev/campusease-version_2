
import Sidebar from '@/components/admin/sidebar/Sidebar'
import React from 'react'

const layout = ({children}: any) => {
  return (
    <div className='bg-blue h-screen  flex'>
        <div className='flex-1 flex flex-col text-white bg-secondary p-5'>  
            <h2 className='mb-2 font-bold'>Admin</h2>
            <Sidebar/>
        </div>
        <div className='flex-[4] p-5'>
            {children}
        </div>
        
    </div>
  )
}

export default layout