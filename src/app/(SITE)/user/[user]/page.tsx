'use client'

import ListCard from '@/components/listCard/ListCard';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { categories } from '@/data/categories';
import { FiUser, FiMail, FiPhone } from 'react-icons/fi';

const UserProfile = () => {
  const userParams = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch(`/api/user/${userParams.user}`);
      const data = await res.json();
      if (data && data.email) {
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const fetchListing = async (email: string) => {
    try {
      const res = await fetch(`/api/listings/user/${email}`);
      const data = await res.json();
      setListings(data);
      setFilteredListings(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };
  
  // Filter listings when category changes
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredListings(listings);
    } else {
      const filtered = listings.filter((listing: any) => 
        listing.category.toLowerCase() === selectedCategory
      );
      setFilteredListings(filtered);
    }
  }, [selectedCategory, listings]);

  useEffect(() => {
    fetchUser();
  }, [userParams.user]);

  useEffect(() => {
    if (email) {
      fetchListing(email);
    }
  }, [email]);

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero Section with Profile */}
      <section className="relative bg-gradient-to-r from-teal-900 to-teal-700 py-16">
        {/* Background circles for visual interest */}
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-teal-600/20 blur-2xl"></div>
        <div className="absolute bottom-5 right-20 w-40 h-40 rounded-full bg-teal-500/20 blur-2xl"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Profile Picture */}
            <div className="w-24 h-24 bg-amber-300 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-teal-800 shadow-lg">
              {name?.charAt(0)?.toUpperCase() || '?'}
            </div>
            
            {/* User Info */}
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {name || 'Loading...'}
            </h1>
            
            <div className="flex flex-col items-center justify-center space-y-2 text-white/90">
              {email && (
                <div className="flex items-center">
                  <FiMail className="mr-2" />
                  <span>{email}</span>
                </div>
              )}
              
              {phone && (
                <div className="flex items-center">
                  <FiPhone className="mr-2" />
                  <span>{phone}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Listings Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-teal-800">
                {name}'s Listings <span className="text-teal-600 ml-2">({filteredListings.length}/{listings.length})</span>
              </h2>
            </div>
            
            {/* Category Filter */}
            {!loading && listings.length > 0 && (
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
            )}
            
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="w-10 h-10 border-t-2 border-b-2 border-teal-500 rounded-full animate-spin"></div>
              </div>
            ) : filteredListings.length > 0 ? (
              <div className="grid gap-3 grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
                {filteredListings.map((listing: any, index: number) => (
                  <ListCard key={index} listing={listing} profile={false} />
                ))}
              </div>
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-500 text-lg">No listings found</p>
                {selectedCategory !== 'All' ? (
                  <p className="text-gray-400 mt-2">Try selecting a different category</p>
                ) : (
                  <p className="text-gray-400 mt-2">This user hasn't posted any listings yet</p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default UserProfile;
