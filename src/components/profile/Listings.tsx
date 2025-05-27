'use client'

import ListCard from '@/components/listCard/ListCard'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import Loading from '../loading/Loading'
import Link from 'next/link'
import { categories } from '@/data/categories'

const Listings = () => {
  const [showBackground, setShowBackground] = useState(false)
  // const [editId, setEditId] = useState<string | null>(null) 
  // const [editCategory, setEditCategory] = useState<string | null>(null)
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
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
          setFilteredListings(data);
        } catch (error) {
          console.error("Error fetching listings:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchListing();
  }, [status, session, showBackground]); 
  
  // Filter listings when category changes
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredListings(listings);
    } else {
      const filtered = listings.filter((listing: any) => 
        listing.category === selectedCategory
      );
      setFilteredListings(filtered);
    }
  }, [selectedCategory, listings]);


  return (
    <section className='w-full'>
      <div className="flex justify-between items-center mb-6">
        <h2 className='text-2xl font-bold text-teal-800'>My Listings <span className="text-teal-600 ml-2">({filteredListings.length}/{listings.length})</span></h2>
        
        <Link href="/add-listing" className="inline-flex items-center bg-amber-400 hover:bg-amber-500 text-white px-4 py-2 rounded-lg font-medium transition-all">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New
        </Link>
      </div>
      
      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === 'All'
                ? 'bg-teal-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.category}
              onClick={() => setSelectedCategory(cat.category.toLowerCase())}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === cat.category.toLowerCase()
                  ? 'bg-teal-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <Loading big={false}/>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {Array.isArray(filteredListings) && filteredListings.length > 0 ? (
            filteredListings.map((listing: any) => (
              <ListCard 
                key={listing._id} 
                listing={listing} 
                listings={listings}
                loading={loading}
                setLoading={setLoading}
                setShowBackground={setShowBackground}
                showBackground={showBackground}
                setListings={setListings}
                // onEdit={onEdit} 
                profile={true} 
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className='text-gray-500 text-lg'>No listings found</p>
              <p className='text-gray-400 mt-2'>Create your first listing to get started</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default Listings;
