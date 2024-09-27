"use client"

import { useSession } from 'next-auth/react';
import React, {useEffect, useState} from 'react'

interface User {
  name: string;
  email: string;
}

const page = () => {
  const changeDetail = true;
  const {data: session} = useSession()
  const [user, setUser] = useState<User | null>(null); // Set initial state to null

  useEffect(() => {
    const fetchUserData = async () => {
      // Check if session exists, indicating authentication
      if (session?.user?.email) {
        const email = session.user.email;
        console.log(email);  // Email should be available when authenticated

        try {
          const res = await fetch(`/api/user/${email}`);
          
          if (!res.ok) {
            throw new Error('Failed to fetch user data');
          }

          const data = await res.json();
          setUser(data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [session]);  // Add session as a dependency
  
  return (
    <>
      <div className='settings'>
    <form >
    <h3 className='text-3xl font-semibold mb-5'>Settings</h3>

    <input type="text" id='name'  placeholder={user?.name}  disabled/>

    <input type="email" id='email' placeholder={user?.email}  disabled />

    <p className='-mt-0 '>Do want to change your name? 
      <span className='text-orange cursor-pointer font-extralight text-sm'>
      {changeDetail ? " Apply Change" : " Edit"}
      </span></p>
    </form>
    </div>
    </>
  )
}

export default page