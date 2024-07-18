import Image from 'next/image';
import React from 'react'

type Card = {
    category: string;
    img: string;
    description: string; 
}

const CategoryCard = ({category, img, description}: Card ) => {
  return (
    // card
    <div className="w-72 h-96 border flex items-end relative font-extralight text-white ">
        <div className="pl-5 mb-5 grid gap3"> 
        <h3 className='text-2xl'>{category}</h3>
        <p>{description}</p>
        </div>
        <div className="absolute w-full h-full top-0 left-0 -z-10">
        <Image src={img} alt='' fill className='object-cover' />
        </div>
    </div>
  )
}

export default CategoryCard