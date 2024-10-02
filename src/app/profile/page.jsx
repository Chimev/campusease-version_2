
import React from 'react'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/auth';


const Profile = async () => {
  const session = await getServerSession(authOptions);
  console.log("session",session)
  if(!session) {
    redirect('/sign-in');
  }
  return (
    <div>Choose any of the menu </div>
  )
}

export default Profile