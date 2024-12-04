import React from 'react'
import Loading from '../loading/Loading'

const LoadingBackground = () => {
  return (
    <div className='bg-[#00000025] z-50 fixed top-0 left-0 w-screen h-screen overflow-hidden px-3 pr-4 flex justify-center items-center'>
        <div className='w-[50%]'>
        <Loading big={true}/>
        </div>
    </div>
  )
}

export default LoadingBackground