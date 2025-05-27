'use client';

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState, useCallback, ReactNode } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { TbCurrencyNaira } from "react-icons/tb";

interface Details {
  type: string;
  institution: string;
  campus: string;
  accommodationName?: string;
  videoLink?:string;
  accommodationType?: string;
  service?: string;
  property?:string
  phone?: string;
  roommateName?:string;
  level?:string;
  gender?:string;
  price?: string;
  description?: string;
  name?: string;
  image: string[]; // Assuming this is an array of image URLs
}

const Thumbnail = React.memo(({ img, onClick, isActive }: { img: string; onClick: () => void; isActive?: boolean }) => (
  <div 
    className={`relative h-20 w-20 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${isActive ? 'border-teal-500 shadow-md scale-105' : 'border-transparent hover:border-teal-300'}`} 
    onClick={onClick}
  >
    <Image src={img} alt="" fill className="object-cover" />
  </div>
));

const ListingDetails = () => {
  const { listingId, category } = useParams();
  const [details, setDetails] = useState<Details | null>(null);
  const [activeImg, setActiveImg] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getListingDetails = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/listings/${listingId}`);
        const data: Details = await res.json();
        setDetails(data);

        // Set the active image once details are fetched
        if (data?.image?.length > 0) {
          setActiveImg(data.image[0]);
        }
      } catch (error) {
        console.error('Error fetching listing details:', error);
      } finally {
        setLoading(false);
      }
    };

    getListingDetails();
  }, [listingId]);

  // Memoized click handler to avoid re-creation
  const handleImageClick = useCallback((img: string) => {
    setActiveImg(img);
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-32 w-32 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-4 w-48 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500 text-lg">Listing not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 py-8">
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="inline-block bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-1 rounded-full capitalize">
            {details.type}
          </span>
          <span className="inline-block bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-1 rounded-full capitalize">
            {details.institution}
          </span>
          <span className="inline-block bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-1 rounded-full capitalize">
            {details.campus}
          </span>
          <span className="inline-block bg-amber-500 text-white text-xs font-medium px-2.5 py-1 rounded-full capitalize">
            {category as string}
          </span>
        </div>

        {/* Title based on category */}
        <h1 className="text-3xl font-bold text-gray-800 mb-1">
          {category === 'accommodation' ? details.accommodationName :
           category === 'service' ? details.service :
           category === 'marketplace' ? details.property :
           category === 'roommate' ? details.roommateName : 'Listing Details'}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Image Gallery */}
        <div className="lg:col-span-2 space-y-4">
          {/* Large Main Image */}
          <div className="relative w-full h-[350px] rounded-lg overflow-hidden shadow-lg">
            {activeImg && (
              <Image 
                src={activeImg} 
                alt="Listing image" 
                fill 
                className="object-cover" 
                priority
              />
            )}
          </div>

          {/* Thumbnail Gallery */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {details.image.map((img, index) => (
              <Thumbnail 
                key={index} 
                img={img || ""} 
                onClick={() => handleImageClick(img)} 
                isActive={activeImg === img}
              />
            ))}
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="space-y-6">
          {/* Price for accommodation and marketplace */}
          {(category === 'accommodation' || category === 'marketplace') && details.price && (
            <div className="bg-teal-50 p-4 rounded-lg">
              <h2 className="text-sm font-medium text-gray-500 mb-1">Price</h2>
              <div className="flex items-center text-2xl font-bold text-teal-700">
                <TbCurrencyNaira size={24} className="flex-shrink-0" />
                <span>{details.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
              </div>
            </div>
          )}

          {/* Details Cards */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 space-y-4">
            {/* Accommodation-specific details */}
            {category === 'accommodation' && (
              <>
                <div className="space-y-1">
                  <h2 className="text-sm font-medium text-gray-500">Accommodation Type</h2>
                  <p className="text-gray-800 capitalize">{details.accommodationType}</p>
                </div>
                
                {details.videoLink && (
                  <div className="space-y-1">
                    <h2 className="text-sm font-medium text-gray-500">Video Tour</h2>
                    <a 
                      href={details.videoLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-teal-600 hover:text-teal-800 hover:underline inline-flex items-center gap-1"
                    >
                      Watch video
                    </a>
                  </div>
                )}
              </>
            )}

            {/* Roommate-specific details */}
            {category === 'roommate' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <h2 className="text-sm font-medium text-gray-500">Level</h2>
                    <p className="text-gray-800 capitalize">{details.level}</p>
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-sm font-medium text-gray-500">Gender</h2>
                    <p className="text-gray-800 capitalize">{details.gender}</p>
                  </div>
                </div>
              </>
            )}

            {/* Phone number - for all categories */}
            <div className="space-y-1">
              <h2 className="text-sm font-medium text-gray-500">Contact</h2>
              <div className="flex items-center gap-2">
                <FaPhoneAlt className="text-teal-500" size={14} />
                <span className="text-gray-800">{details.phone}</span>
              </div>
            </div>

            {/* Listed By - for all categories */}
            <div className="space-y-1 pt-2 border-t border-gray-100">
              <h2 className="text-sm font-medium text-gray-500">Listed by</h2>
              <Link 
                href={`/user/${details.name}`} 
                className="text-teal-600 hover:text-teal-800 hover:underline"
              >
                {details.name}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="mt-8 bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Description</h2>
        <p className="text-gray-700 whitespace-pre-line">{details.description}</p>
      </div>
    </div>
  );
};

export default ListingDetails;
