'use client';

import React, { useState, useEffect } from 'react';
import { 
  MdAdd, 
  MdDownload, 
  MdRefresh,
  MdNotifications,
  MdChevronLeft,
  MdChevronRight,
  MdSearch
} from 'react-icons/md';
import { useSchoolContext } from '@/lib/Context/SchoolContext';
import NotificationTable from '@/components/admin/tables/NotificationTable';
import { getNotifications } from '@/lib/functions/notifications/getNotifications';

const NotificationManagementPage = () => {
  const {uniqueTypes, schools, setSelectedType, selectedType, setFilteredSchool, filteredSchool, selectedSchool, setSelectedSchool} = useSchoolContext();
  const [notificationData, setNotificationData] = useState({
    notifications: [],
    totalNotifications: 0,
    totalPages: 0,
    currentPage: 1
  });
  const [type, setType] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if(!query.trim()){
        fetchNotifications();
        return;
      }

      setLoading(true);

      try {
        const res = await fetch(`/api/search/notifications?q=${query}`)
        const data = await res.json();
        console.log('1', data)
        setNotificationData(prev => ({
          ...prev,
          notifications: data.notification || [],
          totalNotifications: data.notifications?.length || 0,
          totalPages: 1,
          currentPage: 1
        }))
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query])

  const fetchNotifications = async (page = 1) => {
    setLoading(true);
    try {
      const data = await getNotifications(page);
      setNotificationData(prev => ({
         ...prev,
          notifications: data.notifications || [],
          totalNotifications: data.notifications?.length || 0,
          totalPages: 1,
          currentPage: page,
      }));
      
        
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch filtered notifications
  const fetchFilteredNotifications = async (page = 1) => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (selectedSchool) query.append('school', selectedSchool);
      if (type) query.append('type', type);
      if (priority) query.append('priority', priority);
      if (status) query.append('status', status);
      query.append('page', page.toString());

      const res = await fetch(`/api/notifications?${query.toString()}`);
      const data = await res.json();
      setNotificationData({ ...data, currentPage: page });
    } catch (err) {
      console.error('Filter fetch failed', err);
    } finally {
      setLoading(false);
    }
  };

  // Decide fetch strategy
  const fetchBasedOnState = (page: number) => {
    if (isFiltered) {
      fetchFilteredNotifications(page);
    } else {
      fetchNotifications(page);
    }
  };

  // Filter logic
  const handleFilterSearch = () => {
    setIsFiltered(true);
    fetchFilteredNotifications(1);
  };

  const handleClearFilters = () => {
    setSelectedType('');
    setSelectedSchool('');
    setType('');
    setPriority('');
    setStatus('');
    setIsFiltered(false);
    fetchNotifications(1);
  };

  const handlePrevious = () => {
    if (notificationData.currentPage > 1) {
      fetchBasedOnState(notificationData.currentPage - 1);
    }
  };

  const handleNext = () => {
    if (notificationData.currentPage < notificationData.totalPages) {
      fetchBasedOnState(notificationData.currentPage + 1);
    }
  };

  const handleRefresh = () => {
    if (isFiltered) {
      fetchFilteredNotifications(notificationData.currentPage);
    } else {
      fetchNotifications(notificationData.currentPage);
    }
  };

  // School filter on type change
  useEffect(() => {
    if (selectedType) {
      const filtered = schools.filter((s) => s.type === selectedType);
      setFilteredSchool(filtered);
    } else {
      setFilteredSchool(schools);
    }
  }, [selectedType, schools]);

  const handleExport = () => {
    console.log('Exporting notifications...');
  };

  const handleSearchChange = (e: any) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handleClearSearch = () => {
    setQuery('');
  };

  // Fetch notifications
  useEffect(() => {
    fetchNotifications();
  }, []);


  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center space-x-3 mb-4 sm:mb-0">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <MdNotifications className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Notification Management</h1>
              <p className="text-gray-600">Send and manage notifications across the platform</p>
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
              className="flex items-center space-x-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-xl transition-colors"
            >
              <MdDownload className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors">
              <MdAdd className="w-4 h-4" />
              <span className="hidden sm:inline">Send Notification</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Notifications</p>
              <p className="text-2xl font-bold text-gray-900">{notificationData.totalNotifications}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <MdNotifications className="w-5 h-5 text-purple-600" />
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
                name="schoolType"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
              >
                <option value="">All School Types</option>
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
                className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
              >
                <option value="">All Schools</option>
                {filteredSchool.map((school: any) => (
                  <option key={school.school} value={school.school}>
                    {school.school}
                  </option>
                ))}
              </select>

              <select
                name="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
              >
                <option value="">All Types</option>
                <option value="announcement">Announcement</option>
                <option value="alert">Alert</option>
                <option value="reminder">Reminder</option>
                <option value="update">Update</option>
              </select>


              
              <button
                onClick={handleFilterSearch}
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
              <h3 className="text-lg font-semibold text-gray-900">Search Notifications</h3>
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
                placeholder="Type to search notifications by title or message..."
                value={query}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            {query && (
              <div className="text-sm text-gray-600">
                Searching for: <span className="font-medium text-gray-900">"{query}"</span>
              </div>
            )}
          </div>
        </div>

        {/* Results Summary */}
        <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-600">
          <p>
            Showing <span className="font-medium text-gray-900">{notificationData?.notifications?.length}</span> of{' '}
            <span className="font-medium text-gray-900">{notificationData.totalNotifications}</span> notifications
          </p>
          <p>
            Page <span className="font-medium text-gray-900">{notificationData.currentPage}</span> of{' '}
            <span className="font-medium text-gray-900">{notificationData.totalPages}</span>
          </p>
        </div>
      </div>

      {/* Notification Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-600">Loading notifications...</span>
            </div>
          </div>
        ) : (
          <NotificationTable notifications={notificationData.notifications} setNotificationData={setNotificationData} setLoading={setLoading} />
        )}
      </div>

      {/* Pagination */}
      <div className="bg-white p-4 rounded-2xl border flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {(notificationData.currentPage - 1) * 10 + 1} -{' '}
          {Math.min(notificationData.currentPage * 10, notificationData.totalNotifications)} of {notificationData.totalNotifications}
        </p>
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrevious}
            disabled={notificationData.currentPage <= 1}
            className="px-3 py-2 rounded-xl bg-gray-100 disabled:text-gray-400"
          >
            <MdChevronLeft />
          </button>
          {[...Array(notificationData.totalPages).keys()].slice(0, 5).map((num) => (
            <button
              key={num}
              onClick={() => fetchBasedOnState(num + 1)}
              className={`px-3 py-2 rounded-xl ${notificationData.currentPage === num + 1
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700'
              }`}
            >
              {num + 1}
            </button>
          ))}
          <button
            onClick={handleNext}
            disabled={notificationData.currentPage >= notificationData.totalPages}
            className="px-3 py-2 rounded-xl bg-gray-100 disabled:text-gray-400"
          >
            <MdChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationManagementPage;