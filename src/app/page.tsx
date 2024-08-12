
import Link from 'next/link';
import CategoryCard from "@/components/categoryCard/CategoryCard";

export const categories = [
  {link:'accommodation', category:'Accommodation', description: "Find Accomodation around campus", img:"/Rent.jpg" },
  {link:'service', category:'Service', description:"Find Service provider around campus", img:"/Service.png" },
  {link:'property', category:'Property', description: "Buy/Sell/Swap properties within campus", img:"/Trade.jpg" },
  {link:'roommates', category:'Roommates', description: "Find roommates within campus", img:"/Roommate.jpg" }
]
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
                  <div className="flex flex-col gap-1 items-center sm:flex-col justify-between mb-5 lg:flex-row">
                    
                    {categories.map( menu => (
                      <Link href={`category/${menu.link}`} key={menu.category}><CategoryCard category={menu.category} description={menu.description} img={menu.img}/></Link>
                    ) )}

                  </div>
            </div>
        </div>
    </main>
  );
}
