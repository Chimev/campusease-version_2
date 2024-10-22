'use client'
import React, { useState } from 'react'
import Listings from './Listings';
import Saved from './Saved';


const profileAds = [
  {id:1, menu: 'listings', content: <Listings/> },
  {id:2, menu: 'saved', content: <Saved/>}
];

const Menu = () => {

  const [activeMenu, setActiveMenu] = useState(profileAds[0].id)

  const renderedMenu = () => {
    const activeItem = profileAds.find(item => item.id === activeMenu)
    return activeItem ? activeItem.content : null
  }

  return (
    <>
    <div className="flex text-lg gap-4 items-center justify-center px-4 py-1 font-medium">
      {profileAds.map(menu => <div
       className={`text-orange cursor-pointer ${activeMenu === menu.id && 'border-b-2' }`}
       onClick={() => setActiveMenu(menu.id)}
        key={menu.id} >
          {menu.menu}
          </div>)}
      {/* <div className="text-white bg-orange px-2 py-1 cursor-pointer" onClick={() => signOut()}>Sign Out</div> */}
   </div>
   <div>
      { renderedMenu()}
   </div>
        
    </>
  )
}

export default Menu