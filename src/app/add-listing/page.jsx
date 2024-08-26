import AddListing from '@/components/addListing/AddListing'
import React from 'react'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const page = async() => {
  const session = await getServerSession();
  if(!session) {
    redirect('/sign-in');
  }
  return (
    <AddListing/>
  )
}

export default page