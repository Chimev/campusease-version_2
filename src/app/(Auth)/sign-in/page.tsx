import React from 'react'
import SignIn from '@/components/(auth)/SignIn'
import { Metadata } from 'next'

export const metadata:Metadata = {
  title: "SignIn"
}

const page = () => {
  return (
    <SignIn/>
  )
}

export default page