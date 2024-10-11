'use client'

import ListCard from '@/components/listCard/ListCard';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const UserProfile = () => {
  const userParams = useParams(); // Getting the user param from the URL
  const [email, setEmail] = useState('');
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the user's email from the server using the URL param
  const fetchUser = async () => {
    try {
      const res = await fetch(`/api/user/${userParams.user}`);
      const data = await res.json();
      if (data && data.email) {
        setEmail(data.email);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  // Fetch listings using the email
  const fetchListing = async (email: string) => {
    try {
      const res = await fetch(`/api/listings/user/${email}`);
      const data = await res.json();
      setListings(data);
      setLoading(false)
      console.log('user listings:', data);
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };

  // First, fetch the user and then fetch the listings when the email is set
  useEffect(() => {
    const loadUserAndListings = async () => {
      await fetchUser(); // Fetch user information
    };
    loadUserAndListings();
  }, [userParams.user]);

  useEffect(() => {
    if (email) {
      fetchListing(email); // Fetch listings only when the email is set
    }
  }, [email]);

  return (
    <section>
      <div>
        <p>Name: Chime</p> {/* Static for now, should come from user data */}
        <p>Email: {email || 'Loading...'}</p> {/* Display email */}
      </div>

      <div>
      <h2 className='font-bold mb-5'>My listings ({listings.length})</h2>
        {loading ? (
        <p>Loading...</p> // Handle loading state here
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.isArray(listings) && listings.length > 0 ? (
            listings.map((listing: any, index: number) => (
              <ListCard
                key={index} 
                listing={listing} 
                profile={true} 
              />
            ))
          ) : (
            <p className='text-center col-span-full'>No listings found</p>
          )}
        </div>
      )}
      </div>
    </section>
  );
};

export default UserProfile;
