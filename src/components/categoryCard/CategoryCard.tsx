import Image from "next/image";
import { FiChevronRight } from "react-icons/fi";

export const CategoryCard = ({ category, description, img, index, tagline }: any) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
      <div className="relative h-44 overflow-hidden">
        <Image 
          src={img} 
          alt={category}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <h3 className="text-white font-bold text-xl p-4">{category}</h3>
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col justify-between">
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs font-medium bg-teal-50 text-teal-700 py-1 px-2 rounded-full">
            {tagline}
          </span>
          <FiChevronRight className="text-teal-600 h-5 w-5" />
        </div>
      </div>
    </div>
  );
};