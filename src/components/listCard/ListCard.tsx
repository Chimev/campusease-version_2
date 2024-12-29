"use client";

import Image from 'next/image';
import React from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import { TbCurrencyNaira } from "react-icons/tb";

import { MdDelete, MdEdit } from "react-icons/md";
import { GrFavorite } from "react-icons/gr";
import { MdOutlineFavorite } from "react-icons/md";
import Link from 'next/link';

interface ListCardProps {
  listing: any;
  onDelete?: any;
  onEdit?: any;
  profile?:boolean;
  favorite?: boolean;
  handleFavorite?: any;
  handleRemoveFavorite?:any;
}

const   ListCard = ({ listing, onDelete, onEdit, profile, handleFavorite, handleRemoveFavorite, favorite }: ListCardProps) => {

  return (
    
    <div className="relative  border rounded-lg shadow-lg overflow-hidden p-4 bg-white transition hover:shadow-xl">
      
      {/* Uncomment if you want to use an image */}
      <div className="relative h-52 w-full mb-4">
        <Image src={listing.image[0] || listing.image[1] || listing.image[2]} alt='image' fill  className="rounded-t-lg object-cover" />
      </div>
      <Link href={`/${listing.category}/${listing._id}`} className="underline font-semibold">See More</Link>
      <div className="info space-y-0">
        {profile && (
          <>
            <p className="text-sm font-bold text-gray-700">{listing.category}</p>
            <div className="school text-gray-600 space-y-1">
              <p><span className="font-semibold">Institution Type: </span>{listing.type}</p>
              <p><span className="font-semibold">School: </span>{listing.institution}</p>
              <p><span className="font-semibold">Campus: </span>{listing.campus}</p>
            </div>
          </>
        )}


        

        {listing.category === 'accommodation' && (
          <>
            <p className="text-xl font-semibold text-gray-800"><span className='text-base font-semibold'>Name: </span>{listing.accommodationName}</p>
            <Link href={listing.videoLink} className="text-sm  text-gray-800"><span className='text-base font-semibold'>video: </span>{listing.videoLink.length > 30 
          ? `${listing.videoLink.substring(0, 30)}...` 
          : listing.videoLink}</Link>
            <p className="text-xl flex items-center text-gray-900"><span className='text-base font-semibold' >Price: </span><TbCurrencyNaira className="ml-1" />{listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
            <p className="text-xl text-gray-700"><span className='text-base font-semibold'>Type: </span>{listing.accommodationType}</p>
          </>
        )}

        {listing.category === 'service' && (
          <p className="text-gray-700 text-xl"><span className='text-base font-semibold'>Service: </span>{listing.service}</p>
        )}

        {listing.category === 'marketplace' && (
          <>
            <p className="text-xl -my-1  text-gray-800"><span className='text-base font-semibold'>Property: </span>{listing.property}</p>
            <p className="flex  items-center text-gray-900"><span className='text-base font-semibold'>Price: </span><TbCurrencyNaira className="ml-1" />{listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
          </>
        )}

        {listing.category === 'roommate' && (
          <>
            <p className="text-xl text-gray-800"><span>Name: </span>{listing.roommateName}</p>
            <p className="text-xl text-gray-700"><span className='text-base font-semibold'>Gender: </span>{listing.gender}</p>
            <p className="text-xl text-gray-700"><span className='text-base font-semibold'>Level: </span>{listing.level}</p>
          </>
        )}

        <p className="text-gray-600"><span className='text-base font-semibold'>Description: </span>{listing.description.length > 100 
          ? `${listing.description.substring(0, 80)}...` 
          : listing.description}</p>
      </div>
     
      {
        profile && 
          <div className='absolute top-56 right-6 text-2xl text-orange flex'>
            <MdEdit  onClick={() =>  onEdit(listing._id, listing.category)} />
            <MdDelete  onClick={() =>  onDelete(listing._id)} />
          </div>  
        }
        {
        !profile && 
          <div 
          className='absolute top-5 right-6 text-5xl text-orange  flex'
          >
            {/* {favorite ? <MdOutlineFavorite onClick={() => handleRemoveFavorite(listing._id)}  /> : <GrFavorite onClick={() => handleFavorite(listing._id)} /> } */}
            
            
          </div>  
        }
        
    </div>
  );
};

export default ListCard;

