import React from 'react'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/auth';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import ShareBTN from '@/components/profile/shareBtn/ShareBTN';
import Menu from '@/components/profile/Menu';
import SignOut from '@/components/profile/SignOut';


interface User {
    name?: string;
    email?: string;
  }

const Profile = async() => {
  const session = await getServerSession(authOptions) as any;
  if(!session) {
    redirect('/sign-in');
  }
    const user = session.user;
  return (
  <section>
  {/* Display the user information */}
  <div className='text-center text-xl'>
    <p className='font-semibold -mb-4'>{user?.name}</p>
    <p className='font-semibold'>{user?.email}</p>
    <p className='font-semibold'>{user?.phone}</p>
  </div>

  <div className='flex gap-2 justify-center'>
    {/* Button to share profile */}
      <Link href={'/profile/settings'} 
        className='bg-orange p-2  text-white rounded' 
      >
        Edit Profile
      </Link>
      <ShareBTN user={user} />
      <SignOut/>
    </div>
    {/*Link to user's profile */}
    {user && (
      <div className='mb-5 text-center'>
        <Link href={`/user/${user.name}`} className='text-blue-500 underline'>
          View your public profile
        </Link>
      </div>
    )}
    

    <Menu />
  </section>
  )
}

export default Profile
