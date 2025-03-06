"use client"

import { createContext, ReactElement, useState } from "react";

type NavbarType = {
    showNavbar : boolean;
    setShowNavbar: React.Dispatch<React.SetStateAction<boolean>>
}

export const NavbarContext = createContext<NavbarType | null>(null)

export const NavbarContextProvider = ({children}: {children: ReactElement}) => {
    const [showNavbar, setShowNavbar] = useState(true)
    return(
        <NavbarContext.Provider value={{
            showNavbar,
            setShowNavbar
        }}>
            {children}
        </NavbarContext.Provider>
    )
}


// create a component for wrapping
export const NavbarProvider = ({children}: {children: ReactElement}) => {
    return (
        <NavbarContextProvider>
            {children}
        </NavbarContextProvider>
    )
}