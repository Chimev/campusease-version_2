'use client'

// import Listing from '@/components/listings/Listing'
import ListCard from '@/components/listCard/ListCard'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

const page = () => {
  const [listings, setListings] = useState([]);

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
        setListings(data)
      }
    }

    fetchListing();
  }, [status, session]);  // Add status and session to dependencies

  

  return (
    <>
     <h2 className='font-bold mb-5'>My listings ({listings.length})</h2>
     <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.isArray(listings) && listings.length > 0 ? (
          listings.map((listing: any, index: number) => (
            <ListCard key={index} listing={listing} />
          ))
        ) : (
          <p className=' text-center'>No listings found </p>
        )}
      </div>

    </>
  )
}

export default page