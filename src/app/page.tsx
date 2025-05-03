
import Link from 'next/link';
import CategoryCard from "@/components/categoryCard/CategoryCard";
import { categories } from '@/data/categories';


export default function Home() {
  return (
    <main>
        <div className="hero lg:h-[calc(100vh-80px)] ">
            <div className="text-center w-[90%] max-w-[1300px]">
              <h1 className='text-5xl'>Find Comfort with campusEase</h1>
              <p className='-mt-5 text-lg font-semibold'>Discover Accommodation, Roommate Services and MarketPlace  within your campus - All in One Place!</p>
            </div>
        </div>

        <div className="pt-5 max-w-[1300px] mx-auto">
            <div className="w-11/12 m-auto ">
              <hr className="bg-orange border-none h-1 w-20 m-auto" />
              <h2 className="text-3xl text-center font-semibold mb-6 text-[#1b656a]">Category</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  
                  {categories.map( menu => (
                    <Link href={`${menu.link}`} key={menu.category}><CategoryCard category={menu.category} description={menu.description} img={menu.img}/></Link>
                  ) )}

                </div>
            </div>
        </div>
    </main>
  );
}
