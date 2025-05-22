import Image from "next/image";
import { FiBookmark, FiMapPin } from "react-icons/fi";

const FeaturedListing = ({ title, location, price, image, tags }: any) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="relative h-40">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="transition-all duration-300 hover:scale-105"
        />
        <button className="absolute top-2 right-2 bg-white/80 p-1 rounded-full hover:bg-white">
          <FiBookmark className="text-teal-600" />
        </button>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-gray-800">{title}</h3>
          <span className="font-bold text-teal-600">${price}</span>
        </div>
        <div className="flex items-center mt-1 text-gray-500 text-sm">
          <FiMapPin className="inline mr-1" size={14} />
          <span>{location}</span>
        </div>
        <div className="flex gap-2 mt-3">
          {tags.map((tag: any, i: any) => (
            <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
