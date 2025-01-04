'use client';

import SignOut from '@/components/profile/SignOut';
import Link from 'next/link';
import React, { useState } from 'react';
import { MdOutlineArrowDropDown } from 'react-icons/md';

const menu = [
  { id: 2, menu: 'Dashboard', link: 'dashboard' },
  { id: 1, menu: 'Users', link: 'dashboard/users' },
  { id: 4, menu: 'Schools', link: 'dashboard/schools' },
  {
    id: 3,
    menu: 'Admin',
    icon: <MdOutlineArrowDropDown />,
    submenu: [
      { id: 1, menu: 'Manage Admins', link: 'dashboard/admins' },
      { id: 2, menu: 'Manage Staffs', link: 'dashboard/staffs' },
      { id: 3, menu: 'Manage Pastors', link: 'dashboard/pastors' },
      { id: 4, menu: 'Manage Workers', link: 'dashboard/workers' },
      { id: 4, menu: 'Manage Member', link: 'dashboard/members' },
      { id: 4, menu: 'Manage First-Timers', link: 'dashboard/first-timers' },
    ],
  },
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
              href={menuItem.link ? `/admin/${menuItem.link.toLowerCase()}` : '#'}
              onClick={() => {
                setActiveMenu(menuItem.menu);
                setActiveSubMenu(null); // Reset submenu when main menu is clicked
              }}
              className={`${
                activemenu === menuItem.menu ? 'bg-[#52699e]' : ''
              } flex items-center justify-between rounded-lg p-3 text-md hover:bg-[#52699e]`}
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
                      activeSubMenu === subItem.menu ? 'bg-[#52699e]' : ''
                    } text-sm text-white hover:bg-[#52699e] p-1 rounded`}
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
