import Register from '@/components/(auth)/Register'
import React from 'react'
import { Metadata } from 'next'

export const metadata:Metadata = {
  title: "Register"
}


const page = () => {
  return (
    <Register/>
  )
}

export default page