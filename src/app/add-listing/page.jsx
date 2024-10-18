import AddListing from '@/components/addListing/AddListing'
import React from 'react'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { SchoolContextProvider } from "@/lib/Context/SchholContext";

const page = async() => {
  const session = await getServerSession();
  const userId = session?.user?.name;
  const email = session?.user?.email;
  
  console.log(userId)
  if(!session) {
    redirect('/sign-in');
  }
  console.log(userId)
  return (
    <SchoolContextProvider>
       <AddListing email={email} name={userId}/>
    </SchoolContextProvider>
   
  )
}

export default page