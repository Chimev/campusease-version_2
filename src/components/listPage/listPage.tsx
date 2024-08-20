'use client'
import Image from "next/image"
import SearchInstitute from "../Search/SearchInstitute";
import SecondaryBtn from "../buttons/SecondaryBtn";
import { SchoolContextProvider } from "@/lib/Context/SchholContext";
import React, { useState, useEffect } from 'react'
import { categories } from "@/data/categories";
import { useParams } from 'next/navigation'
import { Filter_1, Filter_2, Filter_3, Filter_4 } from "../filter/Filte";



const ListPage = () => {
  const categoryMenu = useParams();

  
  const [category, setCategory] = useState<string | undefined>('');
  const [description, setDescription] = useState<string | undefined>('');
  const [img, setImg] = useState<string | undefined>('');

  const [showListing, setShowListing] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  
  
  useEffect(() => {
    const cat = categories.find(cate => cate.link == categoryMenu.category);
    if (cat) {
        setCategory(cat.category);
        setDescription(cat.description);
        setImg(cat.img);
    }
}, [categoryMenu.category]);

const handleInstituteSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  setShowListing(prev => !prev)
}
  return (
    <>
      <div className="relative h-72 bg-cover text-white">
        <div className="absolute w-full h-full top-0 -z-10">
            <Image src={img || ''} alt="" fill className='object-cover' />
        </div>
        <div className="h-3/4 flex justify-center flex-col items-center gap-3 text-2xl">
            <h2 className="text-4xl font-semibold">{category}</h2>
            <p className="-mt-1  font-medium">{description}</p>
        </div>

        <div className="search-container">
        <form onSubmit={handleInstituteSubmit} className="flex flex-col w-10/12">
         {/* institutions  */}
        <SchoolContextProvider>
          <SearchInstitute>
            <SecondaryBtn text='Search'/>
          </SearchInstitute>
        </SchoolContextProvider>
        </form>
        </div>
      </div>
      <div className="mt-28 w-11/12 flex flex-col gap-1 m-auto">
       {showListing && <div className="px-8 py-3 bg-lightGray2 text-white text-2xl text-center" onClick={() => setShowFilter(prev => !prev)} >Filter</div>}
       {
        showFilter && 
        <form action="" className="mt-2 flex flex-col">
          {category === 'Accommodation' && <Filter_1/>}
          {category === 'Service' && <Filter_2 />}
          {category === 'Property' && <Filter_3 />}
          {category === 'Roommates' && <Filter_4/>}
          <SecondaryBtn text='Filter'/>
        </form>
       }
      </div>
    </>
  )
}

export default ListPage