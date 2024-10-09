"use client"

import { useState, createContext } from "react";

export interface Fav {
    favorite?: boolean;
    setFavorite?: React.Dispatch<React.SetStateAction<boolean>>;
    favoriteList?: any[];
    setFavoriteList?: React.Dispatch<React.SetStateAction<never[]>>
}

export const FavoriteContext = createContext<Fav | null>(null);

export const FavouriteListProvider = ({ children }: { children: any }) => {
    const [favorite, setFavorite]=useState(false)
    const [favoriteList, setFavoriteList] = useState([])

    const value = {
        favorite, 
        setFavorite,
        favoriteList,
        setFavoriteList
    }
    return (
        <FavoriteContext.Provider value={value}>
            {children}
        </FavoriteContext.Provider>
    )
}