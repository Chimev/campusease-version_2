'use client'

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

// Define the structure of the user data
interface User {
  name: string;
  email: string;
}

const Profile = () => {
  const { data: session } = useSession();  // UseSession might return null initially
  const [user, setUser] = useState<User | null>(null);  // User is initially null
  const [copySuccess, setCopySuccess] = useState<string>(''); // State for copy success message

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.email) {
        const email = session.user.email;

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
  }, [session]);  // Dependency on session data

  // Function to handle copying the profile link
  const handleCopy = () => {
    const profileUrl = `${window.location.origin}/user/${user?.name}`; // Construct the URL
    navigator.clipboard.writeText(profileUrl).then(() => {
      setCopySuccess('Profile link copied to clipboard!');  // Set success message
      setTimeout(() => setCopySuccess(''), 3000);  // Clear message after 3 seconds
    }).catch((err) => {
      console.error('Failed to copy: ', err);
      setCopySuccess('Failed to copy link.');
    });
  };

  return (
    <section>
      {/* Display the user information */}
      <div className='text-center'>
        <p>Name: {user?.name || 'Loading...'}</p>
        <p>Email: {user?.email || 'Loading...'}</p>
      </div>

      <div className='flex gap-2 justify-center'>
        {/* Button to share profile */}
          <Link href={'/profile/settings'} 
            className='bg-orange p-2  text-white rounded' 
          >
            Edit Profile
          </Link>
            {/* Button to share profile */}
          <button 
            className='bg-orange p-2 text-white rounded' 
            onClick={handleCopy}
            disabled={!user}  // Disable the button if user data is not available
          >
            Share Profile
          </button>
          {/* Show copy success message */}
          {copySuccess && <p className="text-green-500 mt-2">{copySuccess}</p>}
      </div>
      

      {/* Optional: Link to user's profile */}
      {user && (
        <div className='mt-4'>
          <Link href={`/user/${user.name}`} className='text-blue-500 underline'>
            View your public profile
          </Link>
        </div>
      )}
    </section>
  );
}

export default Profile;
