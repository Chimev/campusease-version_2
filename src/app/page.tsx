import Image from "next/image";
import Link from 'next/link';
import { categrories } from "@/data/Category";
import CategoryCard from "@/components/navbar/categoryCard/CategoryCard";


export default function Home() {
  return (
    <main className='homepage'>
        <div className="hero">
            <div className="w-11/12 text-center text-4xl">
            <h1>Find Comfort with campusEase</h1>
            <p>Discover Accomodation, Services, Properties and Roommate within your campus - All in One Place!</p>
            </div>
        </div>

        <div className="pt-5">
            <div className="w-11/12 m-auto ">
              <hr className="bg-orange border-none h-2 w-20 m-auto" />
                <h2 className="mb-10 text-center text-3xl relative">Categories</h2>
                <div className="flex justify-between items-center mb-5 ">
                  {categrories.map( category =>  <Link href={'/property'} key={category.category}>
                    <CategoryCard  category={category.category} description={category.description} img={category.img}/>
                  </Link>)}
                </div>
            </div>
        </div>
    </main>
  );
}
