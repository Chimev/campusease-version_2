'use client'
import React, { useState } from 'react'
import Listings from './Listings';
import Saved from './Saved';
import { FiHome, FiHeart } from 'react-icons/fi';

const profileTabs = [
  {id: 1, menu: 'Listings', icon: <FiHome />, content: <Listings/> },
  {id: 2, menu: 'Saved', icon: <FiHeart />, content: <Saved/>}
];

const Menu = () => {
  const [activeTab, setActiveTab] = useState(profileTabs[0].id)

  const renderedContent = () => {
    const activeItem = profileTabs.find(item => item.id === activeTab)
    return activeItem ? activeItem.content : null
  }

  return (
    <div className="w-full">
      {/* Tabs navigation */}
      <div className="mb-8 border-b border-gray-200">
        <div className="flex space-x-4">
          {profileTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-4 font-medium text-lg transition-colors ${activeTab === tab.id 
                ? 'text-teal-600 border-b-2 border-teal-500 -mb-px' 
                : 'text-gray-500 hover:text-teal-500'}`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.menu}
            </button>
          ))}
        </div>
      </div>
      
      {/* Tab content */}
      <div className="py-4">
        {renderedContent()}
      </div>
    </div>
  )
}

export default Menu