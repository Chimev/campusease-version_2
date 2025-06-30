// Sidebar Component
'use client';
import SignOut from '@/components/profile/SignOut';
import Link from 'next/link';
import React, { useState } from 'react';
import { 
  MdOutlineArrowDropDown, 
  MdDashboard, 
  MdPeople, 
  MdHome, 
  MdGroup, 
  MdBuild, 
  MdStorefront,
  MdSchool
} from 'react-icons/md';

const menu = [
  { 
    id: 1, 
    menu: 'Dashboard', 
    link: 'dashboard',
    icon: <MdDashboard className="w-5 h-5" />
  },
  { 
    id: 2, 
    menu: 'User Management', 
    link: 'users',
    icon: <MdPeople className="w-5 h-5" />
  },
  {
    id: 3,
    menu: 'Listings',
    menuIcon: <MdStorefront className="w-5 h-5" />,
    dropdownIcon: <MdOutlineArrowDropDown className="w-5 h-5" />,
    submenu: [
      { 
        id: 1, 
        menu: 'Accommodation', 
        link: 'dashboard/accommodation',
        icon: <MdHome className="w-4 h-4" />
      },
      { 
        id: 2, 
        menu: 'Roommate', 
        link: 'dashboard/roommate',
        icon: <MdGroup className="w-4 h-4" />
      },
      { 
        id: 3, 
        menu: 'Service', 
        link: 'dashboard/service',
        icon: <MdBuild className="w-4 h-4" />
      },
      { 
        id: 4, 
        menu: 'Market Place', 
        link: 'dashboard/marketplace',
        icon: <MdStorefront className="w-4 h-4" />
      },
    ],
  },
  // Uncomment if needed
  // { 
  //   id: 4, 
  //   menu: 'Schools', 
  //   link: 'dashboard/schools',
  //   icon: <MdSchool className="w-5 h-5" />
  // },
];

 const Sidebar = () => {
  const [activemenu, setActiveMenu] = useState<string>(menu[0].menu);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const toggleSubMenu = (menuName: string) => {
    setOpenSubMenu((prev) => (prev === menuName ? null : menuName));
  };

  return (
    <div className="flex flex-col justify-between h-full">
      {/* Menu Section */}
      <div className="space-y-1">
        {menu.map((menuItem) => (
          <div key={menuItem.id} className="space-y-1">
            {/* Main menu item */}
            <div
              className={`${
                activemenu === menuItem.menu 
                  ? 'bg-white/20 text-white border-l-4 border-amber-400' 
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              } group relative rounded-r-xl transition-all duration-200 ease-in-out`}
            >
              <Link
                href={menuItem.link ? `/admin/${menuItem.link}` : '#'}
                onClick={() => {
                  if (menuItem.link) {
                    setActiveMenu(menuItem.menu);
                    setActiveSubMenu(null);
                  }
                }}
                className="flex items-center justify-between p-4 rounded-r-xl font-medium"
              >
                <div className="flex items-center space-x-3">
                  {menuItem.icon || menuItem.menuIcon}
                  <span className="text-sm font-medium">{menuItem.menu}</span>
                </div>
                {menuItem.submenu && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleSubMenu(menuItem.menu);
                    }}
                    className={`p-1 rounded-md transition-transform duration-200 ${
                      openSubMenu === menuItem.menu ? 'rotate-180' : ''
                    }`}
                  >
                    {menuItem.dropdownIcon}
                  </button>
                )}
              </Link>
            </div>

            {/* Submenu items with smooth animation */}
            {menuItem.submenu && (
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openSubMenu === menuItem.menu 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="ml-6 mt-2 space-y-1 border-l-2 border-white/20 pl-4">
                  {menuItem.submenu.map((subItem) => (
                    <Link
                      key={subItem.id}
                      href={`/admin/${subItem.link?.toLowerCase()}`}
                      onClick={() => {
                        setActiveSubMenu(subItem.menu);
                        setActiveMenu(menuItem.menu);
                      }}
                      className={`${
                        activeSubMenu === subItem.menu
                          ? 'bg-white/20 text-white border-l-2 border-amber-400'
                          : 'text-white/70 hover:bg-white/10 hover:text-white'
                      } flex items-center space-x-3 p-3 rounded-lg text-sm font-medium transition-all duration-150 group`}
                    >
                      {subItem.icon}
                      <span>{subItem.menu}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Sign Out at bottom */}
      <div className="mt-8">
        <SignOut />
      </div>
    </div>
  );
};

export default Sidebar