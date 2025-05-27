"use client"
import ListCard from '@/components/listCard/ListCard'
import { useSession } from 'next-auth/react'
// import ListCard from '@/components/listCard/ListCard'
import React, {  useEffect, useState } from 'react'

const Saved = () => {
    const [loading, setLoading] = useState(true)
    const [favoriteList, setFavoriteList] = useState([]);

    const {data: session, status} = useSession();

    

    useEffect(() => {
        const getFavorite = async() => {
            if(status === "authenticated" && session?.user?.email){
                const email = session.user.email
                const res = await fetch(`/api/favorite/${email}`)
                const data = await res.json()
                setFavoriteList(data)
                setLoading(false)
            }
        }
        getFavorite();
    }, [status, session])

    const handleRemoveFavorite = async(id:any) => {
      console.log(id)

      const res = await fetch(`/api/favorite/${id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        },
      })

      if(res.ok) {
        const remainingFavorite = favoriteList.filter((fv:any) => fv._id !== id)
        setFavoriteList(remainingFavorite)
      }else {
        console.error('Failed to delete favoritw');
      }
    }

  return (
    <section className='w-full'>
      <div className="flex justify-between items-center mb-6">
        <h2 className='text-2xl font-bold text-teal-800'>Saved Listings <span className="text-teal-600 ml-2">({favoriteList.length})</span></h2>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-t-2 border-b-2 border-teal-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {Array.isArray(favoriteList) && favoriteList.length > 0 ? (
            favoriteList.map((listing: any, index: number) => (
              <ListCard
                key={index} 
                listing={listing}
                profile={false}
                favorite={true}
                handleRemoveFavorite={handleRemoveFavorite}
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <p className='text-gray-500 text-lg'>No saved listings yet</p>
              <p className='text-gray-400 mt-2'>Items you save will appear here</p>
            </div>
          )}
        </div>
      )}
    </section>
  )
}

export default Saved