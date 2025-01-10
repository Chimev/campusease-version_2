'use client'
import Image from "next/image";
import SearchInstitute from "../Search/SearchInstitute";
import SecondaryBtn from "../buttons/SecondaryBtn";
import { useSchoolProvider } from "@/lib/Context/SchholContext";
import React, { useState, useEffect, useContext } from 'react';
import { categories } from "@/data/categories";
import { useParams, useRouter } from 'next/navigation';
// import { Filter_1, Filter_2, Filter_3, Filter_4 } from "../filter/Filte";
import ListCard from "../listCard/ListCard";
import { ListOfInstitutions } from "@/data/listOfInstitution";
import { FavoriteContext } from "@/lib/Context/FavoriteContext";
import { useSession } from "next-auth/react";
import Loading from "../loading/Loading";
// import { listings } from "@/hooks/mock";

const ListPage = () => {
  const route = useRouter();
  const { category: categoryParam } = useParams();
  const [loading, setLoading] = useState(true)
  
  const [category, setCategory] = useState<string | undefined>('');
  const [description, setDescription] = useState<string | undefined>('');
  const [img, setImg] = useState<string | undefined>();

  const [showListing, setShowListing] = useState(false);
  // const [showFilter, setShowFilter] = useState(false);

  //for saved listing
  const {favorite, setFavorite, setFavoriteList} = useContext<any>(FavoriteContext)


  const [listings, setListings] = useState([])

  const {data: session, status} = useSession();

  //For my serchINstution form
  //------START-----//
  const value = useSchoolProvider();

    const changeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedType = e.target.value;
        const selectedInstitutions = ListOfInstitutions.find(int => int.type === selectedType)?.institution || [];
        
        value?.setType(selectedType);
        value?.setInstitutions(selectedInstitutions);
        value?.setInstitution(''); // Reset institution and campus on type change
        value?.setCampus('');
    };

    const changeInstitution = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedInstitution = e.target.value;
        const selectedCampus = value?.institutions.find(int => int.school === selectedInstitution)?.campus || [];
        
        value?.setInstitution(selectedInstitution);
        value?.setCampuses(selectedCampus);
        value?.setCampus(''); // Reset campus on institution change
    };

    const changeCampus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        value?.setCampus(e.target.value);
    };
    // ----END------//

  //Effect for params
  useEffect(() => {
    const cat = categories.find(cate => cate.link == categoryParam);
    if (cat) {  
        setCategory(cat.category);
        setDescription(cat.description);
        setImg(cat.img);
    }
  }, [categoryParam]);

  const getLisiting = async () => {
    try {
      const res = await fetch(`/api/listings/${categoryParam}?type=${value?.type}&institution=${value?.institution}&campus=${value?.campus}`) 
      const data = await res.json()
      // console.log(data)
      setLoading(false)
      setListings(data)
    } catch (error) {
      
      //
    }
  };

  const handleInstituteSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowListing(prev => !prev);
    getLisiting(); 
  }

  

  const handleFavorite = async ( id:any) => {
    const FavouriteList = listings.find((list:any) => list._id == id)
    console.log(id)

    if(!FavouriteList) return
    if(status === "authenticated" && session?.user?.email){
      const email = session.user.email

      const newFavouriteList = {...FavouriteList as any, email: email}
      console.log( "check", newFavouriteList)

      try {
        const res = await fetch('/api/favorite', {
          method: "POST",
          headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(newFavouriteList)
        })
  
        if(res.status === 500){
          setFavorite(false)
          throw new Error("Could not add to save")
        }if(res.status === 200){
          setFavorite(true)
          console.log("success")
        }
      } catch (error) {
        //
      }
  }else {
    route.push('/sign-in')
  }
    console.log("list",FavouriteList)
  }



  

  return (
    <>
      <div className="relative h-72 bg-cover text-white">
        {img && (
          <div className="absolute w-full h-full top-0 -z-10">
            <Image src={img} alt="" fill className="object-cover" />
          </div>
        )}
        <div className="h-3/4 flex justify-center text-center flex-col items-center gap-3 text-2xl">
          <h2 className="text-4xl font-semibold">{category}</h2>
          <p className="-mt-1 font-medium">{description}</p>
        </div>

        <div className="search-container">
          <form onSubmit={handleInstituteSubmit} className="flex flex-col w-10/12">
            {/* institutions */}
              <SearchInstitute value={value} changeType={changeType} changeInstitution={changeInstitution} changeCampus={changeCampus}>
                <SecondaryBtn text="Search" />
              </SearchInstitute>
          </form>
        </div>
      </div>

      <div className="mt-28 w-11/12 flex flex-col gap-1 m-auto">
        {showListing && (
          <>
          {/* Later Feature */}
            {/* <div
              className="px-8 py-3 bg-lightGray2 text-white text-2xl text-center mb-8"
              onClick={() => setShowFilter(prev => !prev)}
            >
              Filter
            </div> */}
            <div>
              {/* Later Implementation */}
              {/* {showFilter && (
                <form action="" className="mt-2 flex flex-col mb-8">
                  {category === 'Accommodation' && <Filter_1 />}
                  {category === 'Service' && <Filter_2 />}
                  {category === 'Property' && <Filter_3 />}
                  {category === 'Roommates' && <Filter_4 />}
                  <SecondaryBtn text="Filter" />
                </form>
              )} */}
             <div>
              {loading ? (
                <Loading big={false}/> // You can replace this with a spinner component or any loading indicator
              ) : (
                <div className="grid gap-2 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {Array.isArray(listings) && listings.length > 0 ? (
                    listings.map((listing: any) => (
                      <ListCard key={listing._id} listing={listing} favorite={favorite} handleFavorite={handleFavorite} />
                    ))
                  ) : (
                    <p>No listings found</p>
                  )}
                </div>
              )}
            </div>

            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ListPage;
