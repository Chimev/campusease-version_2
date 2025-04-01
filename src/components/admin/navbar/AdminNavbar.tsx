import React from 'react'

const AdminNavbar = () => {
  return (
    <nav className='flex justify-between items-center px-5 bg-secondary text-white py-2'>
        <div>
            <h2 className='font-semibold text-lg -mb-3'>Admin Dashboad</h2>
            <p className=' text-sm' >Welcome back, Chime</p>
        </div>

        <div className='flex items-center gap-2 mb-3 '>
            <div>message</div>
            <div>image</div>
        </div>
    </nav>
  )
}

export default AdminNavbar