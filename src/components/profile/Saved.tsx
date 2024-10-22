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
    <section className='p-4'>
        <h2 className='font-bold mb-5'>Saved listings ({favoriteList.length})</h2>

        {loading ? (
        <p>Loading...</p> // Handle loading state here
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
            <p className='text-center col-span-full'>No listings found</p>
          )}
        </div>
      )}
    </section>
  )
}

export default Saved