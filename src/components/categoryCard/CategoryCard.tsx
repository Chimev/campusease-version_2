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
    <div className="w-96 h-80 border flex items-end relative  text-white bg-cover md:w-72">
        <div className="pl-5 mb-5 grid gap3"> 
        <h3 className='text-2xl font-semibold'>{category}</h3>
        <p className='font-semibold'>{description}</p>
        </div>
        <div className="absolute w-full h-full top-0 left-0 -z-10">
        <Image src={img} alt='' fill className='object-ontain' />
        </div>
    </div>
  )
}

export default CategoryCard