'use client';

import UserTable from '@/components/admin/user/UserTable';
import React, { useState, useEffect } from 'react';
import { getUsers } from '@/lib/functions/users/getUsers';

const UserManagementPage = () => {
  const [userData, setUserData] = useState({
    users: [],
    totalUsers: 0,
    totalPages: 0,
    currentPage: 1
  });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    type: 'Federal',
    category: 'Federal'
  });

  const fetchUsers = async (page = 1) => {
    setLoading(true);
    try {
      const data = await getUsers(page);
      setUserData(prev => ({
        ...data,
        currentPage: page // ✅ Make sure to update currentPage properly
      }));
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchUsers();
  }, []);

  const handlePrevious = () => {
    if (userData.currentPage > 1) {
      fetchUsers(userData.currentPage - 1);
    }
  };

  const handleNext = () => {
    if (userData.currentPage < userData.totalPages) {
      fetchUsers(userData.currentPage + 1);
    }
  };

  const handleFilterChange = (e:any) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
    // You could implement filtering logic here or modify the API call
  };
  

  return (
    <section>
      <div>
        <h2 className='text-white font-bold text-lg'>User Management</h2>
        <p className='text-white font-extralight -mt-2'>Manage all users across the platform</p>
      </div>

      {/* Search and Filters */}
      <div className='bg-white p-3 rounded-t-md'>
        <div className='grid grid-cols-3 gap-4'>
          <select
            name="type"
            id="type"
            value={filter.type}
            onChange={handleFilterChange}
            className='bg-[#87C6CB] w-full text-[#535252] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange placeholder:text-white p-2'
          >
            <option value="Federal">Federal</option>
            <option value="State">State</option>
            <option value="Polytechnic">Polytechnic</option>
          </select>
          <select
            name="category"
            id="category"
            value={filter.category}
            onChange={handleFilterChange}
            className='bg-[#87C6CB] w-full text-[#535252] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange placeholder:text-white p-2'
          >
            <option value="Federal">Federal</option>
            <option value="State">State</option>
            <option value="Polytechnic">Polytechnic</option>
          </select>
          <div className="col-span-1">
            {/* Additional filter or search input could go here */}
          </div>
        </div>
        <p className='text-[#535252] mb-0 mt-2'>
          Showing {userData.users.length} of {userData.totalUsers} Users 
          (Page {userData.currentPage} of {userData.totalPages})
        </p>
      </div>

      {/* User data */}
      {loading ? (
        <div className="bg-white p-10 text-center">Loading users...</div>
      ) : (
        <UserTable users={userData.users} />
      )}

      {/* Pagination */}
      <div className='flex justify-end gap-2 mt-2'>
        <button 
          onClick={handlePrevious}
          disabled={userData.currentPage <= 1}
          className={`p-2 rounded-lg ${
            userData.currentPage <= 1 
              ? 'bg-gray-200 text-gray-500' 
              : 'bg-white hover:bg-secondaryLight hover:text-white'
          }`}
        >
          Previous
        </button>
        <button 
          onClick={handleNext}
          disabled={userData.currentPage >= userData.totalPages}
          className={`p-2 rounded-lg ${
            userData.currentPage >= userData.totalPages 
              ? 'bg-gray-200 text-gray-500' 
              : 'bg-white hover:bg-secondaryLight hover:text-white'
          }`}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default UserManagementPage;
