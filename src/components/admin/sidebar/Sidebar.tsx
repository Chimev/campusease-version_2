'use client';
import SignOut from '@/components/profile/SignOut';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { 
  MdDashboard, 
  MdPeople, 
  MdStorefront,
} from 'react-icons/md';
import { IoIosNotifications } from "react-icons/io";


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
    link: 'listings',
    icon: <MdStorefront className="w-5 h-5" />,
  },
  { 
    id: 4, 
    menu: 'Notifications', 
    link: 'notification',
    icon: <IoIosNotifications className="w-5 h-5" />
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [activemenu, setActiveMenu] = useState<string>('');

  // Sync active menu with current route
  useEffect(() => {
    const currentPath = pathname.split('/').pop(); // Get last segment of path
    const activeItem = menu.find(item => item.link === currentPath);
    if (activeItem) {
      setActiveMenu(activeItem.menu);
    }
  }, [pathname]);

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
                  }
                }}
                className="flex items-center justify-between p-4 rounded-r-xl font-medium"
              >
                <div className="flex items-center space-x-3">
                  {menuItem.icon}
                  <span className="text-sm font-medium">{menuItem.menu}</span>
                </div>
              </Link>
            </div>
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

export default Sidebar;