'use client';

import UserTable from '@/components/admin/user/UserTable';
import React, { useState, useEffect } from 'react';
import { getUsers } from '@/lib/functions/users/getUsers';
import { 
  MdSearch, 
  MdFilterList, 
  MdAdd, 
  MdDownload, 
  MdRefresh,
  MdPeople,
  MdChevronLeft,
  MdChevronRight
} from 'react-icons/md';

const UserManagementPage = () => {
  const [userData, setUserData] = useState({
    users: [],
    totalUsers: 0,
    totalPages: 0,
    currentPage: 1
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState({
    type: 'All',
    category: 'All',
    status: 'All'
  });

  const fetchUsers = async (page = 1) => {
    setLoading(true);
    try {
      const data = await getUsers(page);
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

  const handleFilterChange = (e: any) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleRefresh = () => {
    fetchUsers(userData.currentPage);
  };

  const handleExport = () => {
    // Export functionality
    console.log('Exporting users...');
  };

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
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <MdFilterList className="text-gray-500 w-5 h-5" />
            
            <select
              name="type"
              value={filter.type}
              onChange={handleFilterChange}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
            >
              <option value="All">All Types</option>
              <option value="Federal">Federal</option>
              <option value="State">State</option>
              <option value="Polytechnic">Polytechnic</option>
            </select>

            <select
              name="category"
              value={filter.category}
              onChange={handleFilterChange}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
            >
              <option value="All">All Categories</option>
              <option value="Federal">Federal</option>
              <option value="State">State</option>
              <option value="Polytechnic">Polytechnic</option>
            </select>

            <select
              name="status"
              value={filter.status}
              onChange={handleFilterChange}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
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
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {((userData.currentPage - 1) * 10) + 1} to{' '}
            {Math.min(userData.currentPage * 10, userData.totalUsers)} of{' '}
            {userData.totalUsers} results
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrevious}
              disabled={userData.currentPage <= 1}
              className={`flex items-center space-x-1 px-4 py-2 rounded-xl transition-colors ${
                userData.currentPage <= 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <MdChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
            
            {/* Page Numbers */}
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, userData.totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => fetchUsers(pageNum)}
                    className={`w-10 h-10 rounded-xl transition-colors ${
                      userData.currentPage === pageNum
                        ? 'bg-teal-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={handleNext}
              disabled={userData.currentPage >= userData.totalPages}
              className={`flex items-center space-x-1 px-4 py-2 rounded-xl transition-colors ${
                userData.currentPage >= userData.totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <span>Next</span>
              <MdChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagementPage;