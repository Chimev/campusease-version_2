"use client";

import Image from 'next/image';
import React from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import { TbCurrencyNaira } from "react-icons/tb";

const ListCard = ({ listing }: any) => {
  const profile = false;
  return (
    <div className="border rounded-lg shadow-lg overflow-hidden p-4 bg-white transition hover:shadow-xl">
      {/* Uncomment if you want to use an image */}
      <div className="relative h-48 w-full mb-4">
        <Image src={'/Roommate.jpg'} alt='image' layout="fill" objectFit="cover" className="rounded-t-lg" />
      </div>
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
            <p className="text-xl font-semibold text-gray-800"><span>Name: </span>{listing.accommodationName}</p>
            <p className="flex items-center text-lg text-gray-900"><span>Price: </span><TbCurrencyNaira className="ml-1" />{listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
            <p className="text-gray-700"><span>Type: </span>{listing.accommodationType}</p>
          </>
        )}

        {listing.category === 'service' && (
          <p className="text-gray-700"><span>Service: </span>{listing.service}</p>
        )}

        {listing.category === 'property' && (
          <>
            <p className="text-xl font-semibold text-gray-800"><span>Property: </span>{listing.property}</p>
            <p className="flex items-center text-lg text-gray-900"><span>Price: </span><TbCurrencyNaira className="ml-1" />{listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
          </>
        )}

        {listing.category === 'roommate' && (
          <>
            <p className="text-xl font-semibold text-gray-800"><span>Name: </span>{listing.roommateName}</p>
            <p className="text-gray-700"><span>Gender: </span>{listing.gender}</p>
            <p className="text-gray-700"><span>Level: </span>{listing.level}</p>
          </>
        )}

        <p className="flex items-center text-gray-700">
          <FaPhoneAlt className="mr-2 text-blue-500" />{listing.phone}
        </p>
        <p className="text-gray-600"><span className="font-semibold">Description: </span>{listing.description}</p>
      </div>
    </div>
  );
};

export default ListCard;
