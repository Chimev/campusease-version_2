import Image from "next/image";
import { FiStar } from "react-icons/fi";




export const TestimonialCard = ({ name, university, quote, avatar }: any) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <div className="flex items-center gap-3 mb-4">
        {/* <Image 
          src={''} 
          alt={name} 
          width={48}
          height={48}
          className="rounded-full object-cover"
        /> */}
        <div>
          <h4 className="font-semibold text-teal-800">{name}</h4>
          <p className="text-xs text-gray-500">{university}</p>
        </div>
      </div>
      <p className="text-gray-600 italic">"{quote}"</p>
      <div className="flex mt-3 text-amber-400">
        {[...Array(5)].map((_, i) => (
          <FiStar key={i} className="fill-current" />
        ))}
      </div>
    </div>
  );
};