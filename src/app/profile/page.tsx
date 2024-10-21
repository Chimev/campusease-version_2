import React from 'react'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/auth';
import Link from 'next/link';
import ShareBTN from '@/components/shareBtn/ShareBTN';


interface User {
    name?: string;
    email?: string;
  }

  
export const fetchUserData = async (email:string) : Promise<User | null> => {
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}`  // Production (Vercel)
    : 'http://localhost:3000';             // Local development


    try {
      const res = await fetch(`${baseUrl}/api/user/${email}`);
        if (!res.ok) {
          throw new Error('Failed to fetch user data');
        }
        return await res.json();
    } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
    }
} 

export const Profile = async() => {
    const session = await getServerSession(authOptions) as any;
    console.log("new",session)
    if(!session) {
        redirect('/sign-in');
      }
      const user = await fetchUserData(session?.user?.email)

  return (
    <section>
    {/* Display the user information */}
    <div className='text-center'>
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
    </div>

    <div className='flex gap-2 justify-center'>
        {/* Button to share profile */}
          <Link href={'/profile/settings'} 
            className='bg-orange p-2  text-white rounded' 
          >
            Edit Profile
          </Link>
         <ShareBTN user={user} />
      </div>
      {/* Optional: Link to user's profile */}
      {user && (
        <div className='mt-2 text-center'>
          <Link href={`/user/${user.name}`} className='text-blue-500 underline'>
            View your public profile
          </Link>
        </div>
      )}

  </section>
  )
}
