import AddListing from '@/components/addListing/AddListing'
import React from 'react'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/auth';

const page = async() => {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.name;
  const email = session?.user?.email;
  // const school = session?.user?.school;
  const role = session?.user?.role;


  
  if(!session) {
    redirect('/sign-in');
  }
  return (
       <AddListing email={email} name={userId} role={role}/>
   
  )
}

export default page