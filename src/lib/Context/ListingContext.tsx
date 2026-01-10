"use client"

import { useState, createContext, useContext, useEffect } from "react";
import { getFavourite } from "../functions/favourite/getFavourite";
import { useSession } from "next-auth/react";
import { getListings } from "../functions/listings/getListings";

export interface Fav {
    setSavedListings:any;
    savedListings:any;
    isLoading:boolean;
    listings:any[];
}

export const ListingContext = createContext<Fav | null>(null);

export const ListingProvider = ({ children }: { children: any }) => {
    const [savedListings, setSavedListings] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false);;
    const [listings, setListings] = useState([]);
    const {data: session, status} = useSession();

     useEffect(() => {
        if (!session?.user.email) return;
        fetchListings()
        fetchFavourite();
    },[session?.user.email])

    async function fetchListings  () {
        setIsLoading(true);
        try {
            const data = await getListings()
            // console.log( 'data', data)
            setListings(data)
        } catch (error) {
            console.error('Error fetching listings')
        }finally {
            setIsLoading(false);
        }
    }
    async function fetchFavourite () {
        setIsLoading(true);
        try {
            const data = await getFavourite(session?.user.email as string) 
            // console.log( 'data', data)
            setSavedListings(data)
        } catch (error) {
            console.error('Error fetching saved listings')
        }finally {
            setIsLoading(false);
        }
    }

    const value = {
       setSavedListings,
        savedListings,
        isLoading,
        listings

    }
    return (
        <ListingContext.Provider value={value}>
            {children}
        </ListingContext.Provider>
    )
}


export const useListing = () => {
    const context = useContext(ListingContext);
    if(!context) throw new Error('useListing must be used within the ListingProvider')
        return context
}