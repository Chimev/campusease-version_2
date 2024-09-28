'use client'

// import Listing from '@/components/listings/Listing'
import ListCard from '@/components/listCard/ListCard'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

const page = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true)

  // const session = useSession()
  // const email = session.data?.user?.email;
  // // console.log(email)

  const { data: session, status } = useSession(); // Deconstruct session and status

  useEffect(() => {
    const fetchListing = async () => {
      if (status === 'authenticated' && session?.user?.email) {
        const email = session.user.email;
        console.log(email);  // Email should be available when authenticated

        
        const res = await fetch(`/api/listings/user/${email}`);
        const data = await res.json();
        // console.log(data)
        setLoading(false)
        setListings(data)
      }
    }

    fetchListing();
  }, [status, session]);  // Add status and session to dependencies

  const onDelete = async (id: string) => {
    // console.log(id, image)

    try {
      const res = await fetch(`/api/listings/${id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type" : "application/json"
      },
      })
      console.log("Response",res)
      if (res.ok) {
        const remainingListings = listings.filter((listing:any) => listing._id !== id);
        setListings(remainingListings); // Update state with remaining listings
      } else {
        console.error('Failed to delete listing');
      }

    } catch (error) {
      
    }



  }

  
  const onEdit = () => {
    //
  }

  return (
    <>
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
                onDelete={onDelete} 
                onEdit={onEdit} 
                profile={true} 
              />
            ))
          ) : (
            <p className='text-center col-span-full'>No listings found</p>
          )}
        </div>
      )}
    </>
  );
s  
}

export default page