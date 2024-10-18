'use client';

import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState, useCallback, ReactNode } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { TbCurrencyNaira } from "react-icons/tb";

interface Details {
  type: string;
  institution: string;
  campus: string;
  accommodationName?: string;
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

const Thumbnail = React.memo(({ img, onClick }: { img: string; onClick: () => void }) => (
  <div className="relative w-[33.3%] h-[100px]" onClick={onClick}>
    <Image src={img} alt="" fill className="object-fill" />
  </div>
));

const ListingDetails = () => {
  const { listingId, category } = useParams();
  const [details, setDetails] = useState<Details | null>(null);
  const [activeImg, setActiveImg] = useState<string>('');

  useEffect(() => {
    const getListingDetails = async () => {
      const res = await fetch(`/api/listings/${listingId}`);
      const data: Details = await res.json(); // Assuming the response is of type Details
      setDetails(data);
      console.log(data)

      // Set the active image once details are fetched
      if (data?.image?.length > 0) {
        setActiveImg(data.image[0]); // Assuming images is an array
      }
    };

    getListingDetails();
  }, [listingId]);

  // Memoized click handler to avoid re-creation
  const handleImageClick = useCallback((img: string) => {
    setActiveImg(img);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Large Main Image */}
      <div className="relative w-full h-[350px] mb-4">
        {activeImg && (
          <Image src={activeImg} alt="Listing image" fill className="absolute object-fill" />
        )}
      </div>

      {/* Smaller Images */}
      <div className="flex gap-1">
        {details?.image.map((img, index) => (
          <Thumbnail key={index} img={img || ""} onClick={() => handleImageClick(img)} />
        ))}
      </div>

      <div className="flex gap-3 justify-center items-center mt-5">
        <div className="bg-[#808080] text-white rounded-md px-2 text-xl">{details?.type}</div>
        <div className="bg-[#808080] text-white rounded-md px-2 text-xl">{details?.institution}</div>
        <div className="bg-[#808080] text-white rounded-md px-2 text-xl">{details?.campus}</div>
      </div>

      {/* Conditional Details by Category */}
      <div className="bg-gray-100 p-4 rounded-lg">
        {category === "accommodation" && details && (
          <>
            <h1 className="text-3xl font-bold mb-4">{details?.accommodationName}</h1>
            <p>Type: {details?.accommodationType}</p>
            <p className="flex items-center text-gray-700"><FaPhoneAlt className="mr-2 text-blue-500" />{details?.phone}</p>
            <p className="flex items-center text-lg text-gray-900"><span>Price: </span><TbCurrencyNaira className="ml-1" />{details?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
            <p className="mb-4 text-gray-700">{details?.description}</p>
            <p className="text-lg mb-2">
              <span className="font-bold">Listed by:</span> {details?.name}
            </p>
          </>
        )}

        {category === "service" && details && (
          <>
            <h1 className="text-3xl font-bold mb-4">{details?.service}</h1>
            <p className="flex items-center text-gray-700"><FaPhoneAlt className="mr-2 text-blue-500" />{details?.phone}</p>
            <p className="mb-4 text-gray-700">{details?.description}</p>
            <p className="text-lg mb-2">
              <span className="font-bold">Listed by:</span> {details?.name}
            </p>
          </>
        )}

        {category === "property" && details && (
          <>
            <h1 className="text-3xl font-bold mb-4">{details?.property}</h1>
            <p className="flex items-center text-gray-700"><FaPhoneAlt className="mr-2 text-blue-500" />{details?.phone}</p>
            <p className="flex items-center text-lg text-gray-900"><span>Price: </span><TbCurrencyNaira className="ml-1" />{details?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
            <p className="mb-4 text-gray-700">{details?.description}</p>
            <p className="text-lg mb-2">
              <span className="font-bold">Listed by:</span> {details?.name}
            </p>
          </>
        )}

        {category === "roommate" && details && (
          <>
            <h1 className="text-3xl font-bold mb-4">{details?.roommateName}</h1>
            <p className="flex items-center text-gray-700"><FaPhoneAlt className="mr-2 text-blue-500" />{details?.phone}</p>
            <p className="flex items-center text-gray-700">Level: {details?.level}</p>
            <p className="flex items-center text-gray-700">Level: {details?.gender}</p>
            <p className="mb-4 text-gray-700">{details?.description}</p>
            <p className="text-lg mb-2">
              <span className="font-bold">Listed by:</span> {details?.name}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ListingDetails;
