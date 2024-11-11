import React from 'react'
import EditListing from '../editListing/EditListing'
import { IoClose } from "react-icons/io5";

const Background = ({category, id, setShowBackground} : any) => {
  console.log("first", id)
  return (
    <div className='bg-[#000000e3] z-50 fixed top-0 left-0 w-screen h-screen overflow-hidden px-3 pr-4'>
      <IoClose className='text-5xl text-orange' onClick={() => setShowBackground(false)}/>
        <EditListing category={category} id={id} setShowBackground={setShowBackground} />
    </div>
  )
}

export default Background