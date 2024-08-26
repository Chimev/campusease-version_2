
import React from 'react'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';


const Profile = async () => {
  const session = await getServerSession();
  console.log(session)
  if(!session) {
    redirect('/sign-in');
  }
  return (
    <div>Choose any of the menu </div>
  )
}

export default Profile