'use client';

import UserTable from '@/components/admin/user/UserTable';
import React, { useState, useEffect } from 'react';
import { getUsers } from '@/lib/functions/users/getUsers';
import { 
  MdAdd, 
  MdDownload, 
  MdRefresh,
  MdPeople,
  MdChevronLeft,
  MdChevronRight,
  MdSearch
} from 'react-icons/md';
import { useSchoolContext } from '@/lib/Context/SchoolContext';

const UserManagementPage = () => {
  const {uniqueTypes, schools, setSelectedType, selectedType, setFilteredSchool, filteredSchool, selectedSchool, setSelectedSchool} = useSchoolContext();
  const [userData, setUserData] = useState({
    users: [],
    totalUsers: 0,
    totalPages: 0,
    currentPage: 1
  });
  const [role, setRole] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [isFiltered, setIsFiltered] = useState(false);
  
  

  const fetchUsers = async (page = 1) => {
    setLoading(true);
    try {
      const data = await getUsers(page);
      console.log('users', data.data)
      setUserData(prev => ({
        ...data,
        currentPage: page
      }));
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

   // Fetch filtered users
  const fetchFilteredUsers = async (page = 1) => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (selectedSchool) query.append('school', selectedSchool);
      if (role) query.append('role', role);
      query.append('page', page.toString());

      const res = await fetch(`/api/user?${query.toString()}`);
      const data = await res.json();
      setUserData({ ...data, currentPage: page });
    } catch (err) {
      console.error('Filter fetch failed', err);
    } finally {
      setLoading(false);
    }
  };

   // Decide fetch strategy
  const fetchBasedOnState = (page: number) => {
    if (isFiltered) {
      fetchFilteredUsers(page);
    } else {
      fetchUsers(page);
    }
  };

    // Filter logic
  const handleFilterSearch = () => {
    setIsFiltered(true);
    fetchFilteredUsers(1);
  };

    const handleClearFilters = () => {
    setSelectedType('');
    setSelectedSchool('');
    setRole('');
    setIsFiltered(false);
    fetchUsers(1);
  };

    const handlePrevious = () => {
    if (userData.currentPage > 1) {
      fetchBasedOnState(userData.currentPage - 1);
    }
  };

  const handleNext = () => {
    if (userData.currentPage < userData.totalPages) {
      fetchBasedOnState(userData.currentPage + 1);
    }
  };

  const handleRefresh = () => {
    if (isFiltered) {
      fetchFilteredUsers(userData.currentPage);
    } else {
      fetchUsers(userData.currentPage);
    }
  };
  
  // School filter on type change
  useEffect(() => {
    if (selectedType) {
      const filtered = schools.filter((s) => s.type === selectedType);
      setFilteredSchool(filtered);
    }
  }, [selectedType, schools]);


  const handleExport = () => {
    // Export functionality
    console.log('Exporting users...');
  };



  const handleSearchChange = (e:any) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Real-time search as user types
    if (value.trim()) {
      console.log(`Searching for users with name containing: "${value}"`);
      // Here you would make your server call for search
      // For now, just logging the search term
    } else {
      console.log('Search cleared, showing all users');
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    console.log('Search cleared');
  };


    
//fetxch users
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center space-x-3 mb-4 sm:mb-0">
            <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
              <MdPeople className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
              <p className="text-gray-600">Manage all users across the platform</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={handleRefresh}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors"
            >
              <MdRefresh className="w-4 h-4" />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button
              onClick={handleExport}
              className="flex items-center space-x-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl transition-colors"
            >
              <MdDownload className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl transition-colors">
              <MdAdd className="w-4 h-4" />
              <span className="hidden sm:inline">Add User</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{userData.totalUsers}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <MdPeople className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-green-600">{Math.floor(userData.totalUsers * 0.85)}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">New This Month</p>
              <p className="text-2xl font-bold text-amber-600">{Math.floor(userData.totalUsers * 0.12)}</p>
            </div>
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Inactive Users</p>
              <p className="text-2xl font-bold text-red-600">{Math.floor(userData.totalUsers * 0.15)}</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="space-y-6">
          {/* Filters Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
              <button
                onClick={handleClearFilters}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              <select
                name="type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
              >
                <option value="">All Types</option>
                {uniqueTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              <select
                name="school"
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
              >
                <option value="">All Schools</option>
                {filteredSchool.map((school:any) => (
                  <option key={school.school} value={school.school}>
                    {school.school}
                  </option>
                ))}
              </select>

              <select
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
              >
                <option value="">All Roles</option>
                <option value="agent">Agent</option>
                <option value="service">Service</option>
                <option value="student">Student</option>
              </select>
              
              <button
                onClick={() => handleFilterSearch()}
                className="flex items-center space-x-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
              >
                <span>Apply Filters</span>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200"></div>

          {/* Search Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Search Users</h3>
              <button
                onClick={handleClearSearch}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Clear Search
              </button>
            </div>
            
            <div className="relative max-w-md">
              <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Type to search users by name..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            
            {searchTerm && (
              <div className="text-sm text-gray-600">
                Searching for: <span className="font-medium text-gray-900">"{searchTerm}"</span>
              </div>
            )}
          </div>
        </div>

        {/* Results Summary */}
        <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-600">
          <p>
            Showing <span className="font-medium text-gray-900">{userData.users.length}</span> of{' '}
            <span className="font-medium text-gray-900">{userData.totalUsers}</span> users
          </p>
          <p>
            Page <span className="font-medium text-gray-900">{userData.currentPage}</span> of{' '}
            <span className="font-medium text-gray-900">{userData.totalPages}</span>
          </p>
        </div>
      </div>

      {/* User Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 border-2 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-600">Loading users...</span>
            </div>
          </div>
        ) : (
          <UserTable users={userData.users} />
        )}
      </div>

      {/* Pagination */}
       {/* Pagination */}
      <div className="bg-white p-4 rounded-2xl border flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {(userData.currentPage - 1) * 10 + 1} -{' '}
          {Math.min(userData.currentPage * 10, userData.totalUsers)} of {userData.totalUsers}
        </p>
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrevious}
            disabled={userData.currentPage <= 1}
            className="px-3 py-2 rounded-xl bg-gray-100 disabled:text-gray-400"
          >
            <MdChevronLeft />
          </button>
          {[...Array(userData.totalPages).keys()].slice(0, 5).map((num) => (
            <button
              key={num}
              onClick={() => fetchBasedOnState(num + 1)}
              className={`px-3 py-2 rounded-xl ${userData.currentPage === num + 1
                ? 'bg-teal-600 text-white'
                : 'bg-gray-100 text-gray-700'
              }`}
            >
              {num + 1}
            </button>
          ))}
          <button
            onClick={handleNext}
            disabled={userData.currentPage >= userData.totalPages}
            className="px-3 py-2 rounded-xl bg-gray-100 disabled:text-gray-400"
          >
            <MdChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserManagementPage;