"use client";

import Image from 'next/image';
import React, { useState } from 'react';
import { TbCurrencyNaira } from "react-icons/tb";
import { FiEdit2, FiTrash2, FiEye, FiHeart } from "react-icons/fi";
import Link from 'next/link';
import Background from '../background/Background';
import { useSession } from 'next-auth/react';
import { useListing } from '@/lib/Context/ListingContext';
import { redirect } from 'next/navigation';
import { removeFavourite } from '@/lib/functions/favourite/removeFavourite';
import { addFavourite } from '@/lib/functions/favourite/addFavourite';
import { deleteListing } from '@/lib/functions/listings/deleteListing';

interface ListCardProps {
  listing: any;
  onDelete?: any;
  onEdit?: any;
  profile?:boolean;
  setShowBackground?:any;
  showBackground?:any;
  setListings?:any;
  listings?:any;
  setLoading?:any;
  loading?:any;
}

const ListCard = ({ listing, listings, setLoading,  profile, setShowBackground, showBackground, setListings }: ListCardProps) => {
   const [editId, setEditId] = useState<string | null>(null) 
   const [editCategory, setEditCategory] = useState<string | null>(null)
   const {savedListings, setSavedListings} = useListing()

  const {data: session, status} = useSession();

  // This is for favourite listing 
  const isFav = savedListings.some((fav: any) => fav.listingId === listing._id);

  const handleFavourite = async() => {
    try {
      if(status === "authenticated" && session?.user?.email){
      const email = session.user.email
      const listingId = listing._id;

      const result = await addFavourite(email, listingId )
      console.log('Result:', result);

      if(result.ok){
        console.log('Successful')
        // Add the item to savedListings immediately
        setSavedListings((prev: any[]) => {
            const newList = [...prev, { listingId, email }];
            console.log('New savedListings:', newList);
            return newList;
        });
      }else {
          console.log('API returned not ok');
      }
    }else{
      redirect('/sign-in')
    }
    } catch (error) {
      console.error('Error adding to saved listing:', error)
    }
  }


  const handleFavouriteDelete = async(listingId: string) => {
    console.log('Attempting to delete:', listingId);
    try {
      if(status === "authenticated" && session?.user?.email){
      const email = session.user.email
        const res = await removeFavourite(email, listingId);
        console.log('Delete response:', res); // Check what this shows
        console.log('res.ok:', res?.ok);
        
        if(res?.ok){
            console.log('Delete successful, updating UI');
            setSavedListings((prev: any[]) => {
                console.log('Current savedListings:', prev);
                const newList = prev.filter((fav: any) => {
                    console.log('Comparing:', fav.listingId, '!==', listingId);
                    return fav.listingId !== listingId;
                });
                console.log('New savedListings after delete:', newList);
                return newList;
            });
        } else {
            console.log('Delete failed - API returned not ok');
        }
      }
    } catch (error) {
        console.error('Error Deleting SavedListing', error);
    }
}




  const onEdit = (id:string, category:string) => {
    console.log(id, category)
    setEditId(id); // Set the id for editing
    setEditCategory(category)
    // Set showBackground after state updates to ensure id is set
    setTimeout(() => setShowBackground(true), 0);
  }

  const onDelete = async (id: string) => {
  setLoading(true);
  const email = session?.user.email as string
  const listingId = listing._id;

  try {
    const res = await deleteListing(id);

    if (res?.ok) {
      const remainingListings = listings.filter(
        (listing: any) => listing._id !== id
      );
      setListings(remainingListings);
      // Automatically remove from favorites if it was favorited
        if (isFav && session?.user?.email) {
          await handleFavouriteDelete(listingId);
        }
    } else {
      console.error("Failed to delete listing");
    }
  } catch (error) {
    console.error("Error deleting listing:", error);
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      {showBackground && editId && <Background id={editId} category={editCategory} setShowBackground={setShowBackground} />}
      <div className="relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px] pb-3">
        
        
        {/* Image Container */}
        <div className="relative h-48 w-full">
          <Image 
            src={listing.image[0].url || listing.image[1].url || listing.image[2].url || '/placeholder.jpg'} 
            alt="Listing image" 
            fill
            className="object-cover" 
          />
          
          
          {/* Action buttons - positioned absolute over the image */}
          {profile && (
            <>
            <div className="absolute bottom-3 right-3 flex space-x-2">
              <button 
                onClick={() => onEdit(listing._id, listing.category)}
                className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-teal-600 hover:bg-white transition-colors"
                aria-label="Edit listing"
              >
                <FiEdit2 size={16} />
              </button>
              <button 
                onClick={() => onDelete(listing._id)}
                className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-red-500 hover:bg-white transition-colors"
                aria-label="Delete listing"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
            {/* Category Badge */}
            <div className="absolute top-3 left-3 z-10">
              <span className="inline-block bg-teal-500 bg-opacity-80 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full capitalize">
                {listing.category}
              </span>
            </div>
            </>
            
          )}
        </div>

        {
          !profile && (
             <div className="absolute top-3 right-3">
              {true 
              && <button 
                  onClick={isFav ? () => handleFavouriteDelete(listing._id) : handleFavourite}
                  className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-amber-500 hover:bg-white transition-colors"
                  aria-label="Remove from favorites"
                >
                  <FiHeart size={24} className={isFav ? 'fill-amber-500' : ''} />
                </button>}
            </div>
          )
        }
        
        {/* Content */}
        <div className="p-4">
          {/* Institution info - only shown on profile */}
          {profile && (
            <div className="mb-3 pb-3 border-b border-gray-100">
              <div className="flex flex-wrap gap-1 text-xs text-gray-500">
                <span className="bg-gray-100 px-2 py-0.5 rounded-full">{listing.type}</span>
                <span className="bg-gray-100 px-2 py-0.5 rounded-full">{listing.institution}</span>
                <span className="bg-gray-100 px-2 py-0.5 rounded-full">{listing.campus}</span>
              </div>
            </div>
          )}
          
          {/* Listing details based on category */}
          <div className="space-y-2">
            {/* Accommodation details */}
            {listing.category === 'accommodation' && (
              <>
                <h3 className="font-semibold text-gray-800 line-clamp-1">{listing.accommodationTitle}</h3>
                <div className="flex items-center text-lg font-bold text-teal-700">
                  <TbCurrencyNaira className="flex-shrink-0" />
                  <span>{listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                </div>
                <p className="text-sm text-gray-600 capitalize">{listing.accommodationType}</p>
                {listing.videoLink && (
                  <Link 
                    href={listing.videoLink} 
                    className="text-xs text-teal-600 hover:underline inline-flex items-center gap-1"
                    target="_blank"
                  >
                    <span>Watch video tour</span>
                  </Link>
                )}
              </>
            )}
            
            {/* Service details */}
            {listing.category === 'services' && (
              <>
                <h3 className="font-semibold text-gray-800 line-clamp-1">{listing.service}</h3>
              </>
            )}
            
            {/* Marketplace details */}
            {listing.category === 'marketplace' && (
              <>
                <h3 className="font-semibold text-gray-800 line-clamp-1">{listing.property}</h3>
                <div className="flex items-center text-lg font-bold text-teal-700">
                  <TbCurrencyNaira className="flex-shrink-0" />
                  <span>{listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                </div>
              </>
            )}
            
            {/* Roommate details */}
            {listing.category === 'roommates' && (
              <>
                <h3 className="font-semibold text-gray-800 line-clamp-1">{listing.roommateName}</h3>
                <div className="flex flex-wrap gap-1 text-xs text-gray-600">
                  <span className="bg-gray-100 px-2 py-0.5 rounded-full capitalize">{listing.gender}</span>
                  <span className="bg-gray-100 px-2 py-0.5 rounded-full">{listing.level}</span>
                </div>
              </>
            )}
            
            
          </div>
          
          {/* View Details Link */}
          <div className="mt-4 pt-2 border-t border-gray-100">
            <Link 
              href={`/category/${listing.category}/${listing._id}`} 
              className="inline-flex items-center text-sm text-teal-600 hover:text-teal-700 font-medium"
            >
              <span>View Details</span>
              <FiEye className="ml-1" size={16} />
            </Link>
          </div>
        </div>
      </div>
    </>
    
  );
};

export default ListCard;

