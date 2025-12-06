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
  accommodationTitle?: string;
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
  image: [
    {
      url: string,
      publicId: string
    }
  ] 
}

const Thumbnail = React.memo(({ img, onClick, isActive }: { img: string; onClick: () => void; isActive?: boolean }) => (
  <div 
    className={`relative h-20 w-20 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${isActive ? 'border-teal-500 shadow-md scale-105' : 'border-transparent hover:border-teal-300'}`} 
    onClick={onClick}
  >
    <Image src={img} alt="Listing image"  fill className="object-cover" />
  </div>
));

const ListingDetails = () => {
  const { listingId, category } = useParams();
  const [details, setDetails] = useState<Details | null>(null);
  const [activeImg, setActiveImg] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState<number>(0);
  const [visibleCount, setVisibleCount] = useState<number>(5);


  useEffect(() => {
  const updateVisibleCount = () => {
    const width = window.innerWidth;

    if (width < 640) setVisibleCount(3);       // small phones
    else if (width < 768) setVisibleCount(4);  // medium devices
    else if (width < 1024) setVisibleCount(5); // tablets
    else setVisibleCount(6);                   // desktops and above
  };

  updateVisibleCount();
  window.addEventListener("resize", updateVisibleCount);
  return () => window.removeEventListener("resize", updateVisibleCount);
}, []);




  useEffect(() => {
    const getListingDetails = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/listings/${listingId}`);
        const data: Details = await res.json();
        setDetails(data);

        // Set the active image once details are fetched
        if (data?.image?.length > 0) {
          setActiveImg(data.image[0].url);
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
          {category === 'accommodation' ? details.accommodationTitle :
           category === 'services' ? details.service :
           category === 'marketplace' ? details.property :
           category === 'roommates' ? details.roommateName : 'Listing Details'}
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

          {/* Thumbnail Gallery with +N overlay and modal */}
          <div className="relative">
            <div className="flex gap-3 flex-wrap">
              {details.image.slice(0, visibleCount).map((img, index) => (
                <Thumbnail 
                  key={index} 
                  img={img.url} 
                  onClick={() => handleImageClick(img.url)} 
                  isActive={activeImg === img.url}
                />
              ))}

              {details.image.length > visibleCount && (
                <div 
                   onClick={() => {
                    setCurrentImgIndex(visibleCount); // Start from the next hidden image
                    setShowModal(true);
                  }} 
                  className="relative h-20 w-20 rounded-lg overflow-hidden cursor-pointer border-2 border-teal-200 hover:shadow-lg flex items-center justify-center bg-black/40 text-white text-xl font-medium"
                >
                  +{details.image.length - visibleCount}
                </div>
              )}
            </div>

            {/* Modal */}
            {showModal && (
              <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                 {/* Close button */}
                  <button 
                    onClick={() => setShowModal(false)} 
                    className="absolute top-3 right-4 text-white hover:text-red-600 text-6xl font-bold"
                  >
                    &times;
                  </button>
                <div className="relative bg-white rounded-lg w-full max-w-xl p-4 shadow-lg flex flex-col items-center">
                  {/* Image preview */}
                  <div className="relative w-full h-[400px] rounded overflow-hidden mb-4">
                    <Image 
                      src={details.image[currentImgIndex].url} 
                      alt={`Image ${currentImgIndex + 1}`} 
                      fill 
                      className="object-cover"
                    />
                  </div>

                  {/* Navigation buttons */}
                  <div className="flex justify-between items-center w-full">
                    <button
                      onClick={() => setCurrentImgIndex((prev) => (prev > 0 ? prev - 1 : prev))}
                      disabled={currentImgIndex === 0}
                      className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50"
                    >
                      Prev
                    </button>

                    <span className="text-sm text-gray-600">
                      {currentImgIndex + 1} of {details.image.length}
                    </span>

                    <button
                      onClick={() => setCurrentImgIndex((prev) => (prev < details.image.length - 1 ? prev + 1 : prev))}
                      disabled={currentImgIndex === details.image.length - 1}
                      className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}

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
