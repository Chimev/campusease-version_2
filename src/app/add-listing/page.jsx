import AddListing from '@/components/addListing/AddListing'
import React from 'react'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { SchoolContextProvider } from "@/lib/Context/SchholContext";
import { authOptions } from '../api/auth/[...nextauth]/auth';

const page = async() => {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.name;
  const email = session?.user?.email;
  const school = session?.user?.school;

  
  if(!session) {
    redirect('/sign-in');
  }
  return (
    <SchoolContextProvider>
       <AddListing email={email} name={userId} school={school}/>
    </SchoolContextProvider>
   
  )
}

export default page