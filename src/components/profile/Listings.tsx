'use client'

import ListCard from '@/components/listCard/ListCard'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import Background from '../background/Background'

const Listings = () => {
  const [showBackground, setShowBackground] = useState(false)
  const [editId, setEditId] = useState<string | null>(null) 
  const [editCategory, setEditCategory] = useState<string | null>(null)
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true)

  const { data: session, status } = useSession(); 

  useEffect(() => {
    const fetchListing = async () => {
      if (status === 'authenticated' && session?.user?.email) {
        const email = session.user.email;

        try {
          const res = await fetch(`/api/listings/user/${email}`);
          const data = await res.json();
          setListings(data);
        } catch (error) {
          console.error("Error fetching listings:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchListing();
  }, [status, session, showBackground]); 

  const onDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/listings/${id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type" : "application/json"
      },
      })
      if (res.ok) {
        const remainingListings = listings.filter((listing: any) => listing._id !== id);
        setListings(remainingListings); 
      } else {
        console.error('Failed to delete listing');
      }
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  }

  const onEdit = (id:string, category:string) => {
    setEditId(id); // Set the id for editing
    setEditCategory(category)
    setShowBackground(true);
  }

  return (
    <section className='p-4'>
      {showBackground && <Background id={editId} category={editCategory} setShowBackground={setShowBackground} />} {/* Pass editId to Background */}

      <h2 className='font-bold mb-5'>My listings ({listings.length})</h2>
      
      {loading ? (
        <p>Loading...</p> 
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.isArray(listings) && listings.length > 0 ? (
            listings.map((listing: any) => (
              <ListCard 
                key={listing._id} 
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
    </section>
  );
}

export default Listings;
