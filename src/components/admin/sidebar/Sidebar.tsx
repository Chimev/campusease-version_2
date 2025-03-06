'use client';

import SignOut from '@/components/profile/SignOut';
import Link from 'next/link';
import React, { useState } from 'react';
import { MdOutlineArrowDropDown } from 'react-icons/md';

const menu = [
  { id: 2, menu: 'Dashboard', link: 'dashboard' },
  { id: 1, menu: 'User Management', link: 'dashboard/users' },
  {
    id: 3,
    menu: 'Listing',
    icon: <MdOutlineArrowDropDown />,
    submenu: [
      { id: 1, menu: 'Accommodation', link: 'dashboard/accommodation' },
      { id: 2, menu: 'Roommate', link: 'dashboard/roommate' },
      { id: 3, menu: 'Service', link: 'dashboard/service' },
      { id: 4, menu: 'Market Place', link: 'dashboard/marketplace' },
    ],
  },
  // { id: 4, menu: 'Schools', link: 'dashboard/schools' },
];

const Sidebar = () => {
  const [activemenu, setActiveMenu] = useState<string>(menu[0].menu); // Track the active main menu
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null); // Track the active submenu
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null); // Track open submenu

  const toggleSubMenu = (menuName: string) => {
    setOpenSubMenu((prev) => (prev === menuName ? null : menuName));
  };

  return (
    <div className="flex flex-col justify-between flex-1">
      <div>
        {menu.map((menuItem) => (
          <div key={menuItem.id}>
            {/* Main menu item */}
            <Link
              href={menuItem.link ? `/admin/${menuItem.link}` : '#'}
              onClick={() => {
                if(menuItem.link){
                  setActiveMenu(menuItem.menu);
                }
                
                setActiveSubMenu(null); // Reset submenu when main menu is clicked
              }}
              className={`${
                activemenu === menuItem.menu ? 'bg-secondaryLight' : ''
              } flex items-center justify-between rounded-lg p-3 text-md hover:bg-secondaryLight`}
            >  
              <span>{menuItem.menu}</span>
              {menuItem.icon && (
                <span
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSubMenu(menuItem.menu);
                  }}
                >
                  {menuItem.icon}
                </span>
              )}
            </Link>

            {/* Submenu items */}
            {menuItem.submenu && openSubMenu === menuItem.menu && (
              <div className="ml-5 flex flex-col space-y-2 mt-2">
                {menuItem.submenu.map((subItem) => (
                  <Link
                    key={subItem.id}
                    href={`/admin/${subItem.link?.toLowerCase()}`}
                    onClick={() => setActiveSubMenu(subItem.menu)}
                    className={`${
                      activeSubMenu === subItem.menu ? 'bg-secondaryLight' : ''
                    } text-sm text-white hover:bg-secondaryLight p-1 rounded`}
                  >
                    {subItem.menu}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <SignOut />
    </div>
  );
};

export default Sidebar;
