'use client'

import ListCard from '@/components/listCard/ListCard';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const UserProfile = () => {
  const userParams = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [listings, setListings] = useState([]);
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
      setLoading(false);
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userParams.user]);

  useEffect(() => {
    if (email) {
      fetchListing(email);
    }
  }, [email]);

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
      {/* User Header */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="w-24 h-24 rounded-full bg-secondary text-white flex items-center justify-center text-3xl font-bold mb-3">
          {name?.charAt(0)?.toUpperCase() || '?'}
        </div>
        <h1 className="text-2xl font-semibold text-gray-800">{name || 'Loading...'}</h1>
        <p className="text-sm text-gray-600">{email}</p>
        {phone && <p className="text-sm text-gray-600">{phone}</p>}
      </div>

      {/* Listings */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Listings ({listings.length})
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading listings...</p>
        ) : listings.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {listings.map((listing: any, index: number) => (
              <ListCard key={index} listing={listing} profile={false} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">This user has no listings yet.</p>
        )}
      </div>
    </section>
  );
};

export default UserProfile;
