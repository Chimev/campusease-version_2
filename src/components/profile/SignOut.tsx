'use client'
import { signOut } from 'next-auth/react'
import React from 'react'

const SignOut = ({nav}: {nav?:boolean}) => {
  return (
    <div onClick={() => signOut()} className={`${nav ? 'bg-secondary text-white text-center w-full' : 'bg-orange text-white p-2 cursor-pointer' }`}>
        SignOut
    </div>
  )
}

export default SignOut