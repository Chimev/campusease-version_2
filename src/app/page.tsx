
import Link from 'next/link';
import CategoryCard from "@/components/categoryCard/CategoryCard";
import { categories } from '@/data/categories';
import Loading from '@/components/loading/Loading';


export default function Home() {
  return (
    <main className='homepage'>
        <div className="hero lg:h-[calc(100vh-80px)]">
            <div className="text-center w-[90%]">
              <h1 className='text-5xl'>Find Comfort with campusEase</h1>
              <p className='-mt-5 text-lg font-semibold'>Discover Accommodation, Services, Properties and Roommate within your campus - All in One Place!</p>
            </div>
        </div>

        <div className="pt-5">
            <div className="w-11/12 m-auto ">
              <hr className="bg-orange border-none h-2 w-20 m-auto" />
                <h2 className="mb-10 text-center text-3xl relative font-bold">Categories</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    
                    {categories.map( menu => (
                      <Link href={`${menu.link}`} key={menu.category}><CategoryCard category={menu.category} description={menu.description} img={menu.img}/></Link>
                    ) )}

                  </div>
            </div>
        </div>

        <Loading/>
    </main>
  );
}
