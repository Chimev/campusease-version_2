'use client';


import React, { useState, useEffect } from 'react';
import { getListings } from '@/lib/functions/listings/getListings';
import { 
  MdAdd, 
  MdDownload, 
  MdRefresh,
  MdListAlt,
  MdChevronLeft,
  MdChevronRight,
  MdSearch
} from 'react-icons/md';
import { useSchoolContext } from '@/lib/Context/SchoolContext';
import ListingTable from '@/components/admin/tables/ListingTable';

const ListingManagementPage = () => {
  const {uniqueTypes, schools, setSelectedType, selectedType, setFilteredSchool, filteredSchool, selectedSchool, setSelectedSchool} = useSchoolContext();
  const [listingData, setListingData] = useState({
    listings: [],
    totalListings: 0,
    totalPages: 0,
    currentPage: 1
  });
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [isFiltered, setIsFiltered] = useState(false);


  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if(!query.trim()){
        fetchListings();
        return;
      }

      setLoading(true);

      try {
        const res = await fetch(`/api/search/listing?q=${query}`)
        const data = await res.json();
        setListingData(prev => ({
          ...prev,
          listings: data.listings || [],
          totalListings: 0,
          totalPages: 0,
          currentPage: 1
        }))
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    }, 500);

    //Cleanup to prevent mltiple calls
    return () => clearTimeout(delayDebounce);
  }, [query])

  const fetchListings = async (page = 1) => {
    setLoading(true);
    try {
      const data = await getListings(page);
      setListingData(prev => ({
        listings: data,
        totalListings: data.length,
        totalPages: Math.ceil(data.length / 10),
        currentPage: page
      }));
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch filtered listings
  const fetchFilteredListings = async (page = 1) => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (selectedSchool) query.append('school', selectedSchool);
      if (status) query.append('status', status);
      if (category) query.append('category', category);
      query.append('page', page.toString());

      const res = await fetch(`/api/listings?${query.toString()}`);
      const data = await res.json();
      setListingData({ ...data, currentPage: page });
    } catch (err) {
      console.error('Filter fetch failed', err);
    } finally {
      setLoading(false);
    }
  };

  // Decide fetch strategy
  const fetchBasedOnState = (page: number) => {
    if (isFiltered) {
      fetchFilteredListings(page);
    } else {
      fetchListings(page);
    }
  };

  // Filter logic
  const handleFilterSearch = () => {
    setIsFiltered(true);
    fetchFilteredListings(1);
  };

  const handleClearFilters = () => {
    setSelectedType('');
    setSelectedSchool('');
    setStatus('');
    setCategory('');
    setIsFiltered(false);
    fetchListings(1);
  };

  const handlePrevious = () => {
    if (listingData.currentPage > 1) {
      fetchBasedOnState(listingData.currentPage - 1);
    }
  };

  const handleNext = () => {
    if (listingData.currentPage < listingData.totalPages) {
      fetchBasedOnState(listingData.currentPage + 1);
    }
  };

  const handleRefresh = () => {
    if (isFiltered) {
      fetchFilteredListings(listingData.currentPage);
    } else {
      fetchListings(listingData.currentPage);
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
    console.log('Exporting listings...');
  };

  const handleSearchChange = (e: any) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim()) {
      console.log(`Searching for listings with title containing: "${value}"`);
    } else {
      console.log('Search cleared, showing all listings');
    }
  };

  const handleClearSearch = () => {
    setQuery('');
  };

  // Fetch listings
  useEffect(() => {
    fetchListings();
  }, []);

  // Calculate stats
  // const approvedListings = listingData.listings.filter((l: any) => l.status === 'approved').length;
  // const pendingListings = listingData.listings.filter((l: any) => l.status === 'pending').length;
  // const rejectedListings = listingData.listings.filter((l: any) => l.status === 'rejected').length;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center space-x-3 mb-4 sm:mb-0">
            <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl flex items-center justify-center">
              <MdListAlt className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Listing Management</h1>
              <p className="text-gray-600">Review and manage all listings on the platform</p>
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
            <button className="flex items-center space-x-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl transition-colors">
              <MdAdd className="w-4 h-4" />
              <span className="hidden sm:inline">Add Listing</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Listings</p>
              <p className="text-2xl font-bold text-gray-900">{listingData.totalListings}</p>
            </div>
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <MdListAlt className="w-5 h-5 text-amber-600" />
            </div>
          </div>
        </div>
        
        {/* <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-green-600">{approvedListings}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <MdCheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div> */}
        
        {/* <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold text-amber-600">{pendingListings}</p>
            </div>
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <MdPending className="w-5 h-5 text-amber-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-red-600">{rejectedListings}</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <MdCancel className="w-5 h-5 text-red-600" />
            </div>
          </div>
        </div> */}
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
                className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
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
                className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
              >
                <option value="">All Schools</option>
                {filteredSchool.map((school: any) => (
                  <option key={school.school} value={school.school}>
                    {school.school}
                  </option>
                ))}
              </select>

              <select
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>

              <select
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
              >
                <option value="">All Categories</option>
                <option value="accommodation">Accommodation</option>
                <option value="textbooks">Textbooks</option>
                <option value="electronics">Electronics</option>
                <option value="furniture">Furniture</option>
                <option value="services">Services</option>
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
              <h3 className="text-lg font-semibold text-gray-900">Search Listings</h3>
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
                placeholder="Type to search listings by title..."
                value={query}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
            Showing <span className="font-medium text-gray-900">{listingData?.listings?.length}</span> of{' '}
            <span className="font-medium text-gray-900">{listingData.totalListings}</span> listings
          </p>
          <p>
            Page <span className="font-medium text-gray-900">{listingData.currentPage}</span> of{' '}
            <span className="font-medium text-gray-900">{listingData.totalPages}</span>
          </p>
        </div>
      </div>

      {/* Listing Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-600">Loading listings...</span>
            </div>
          </div>
        ) : (
          <ListingTable listings={listingData.listings} setListingData={setListingData} setLoading={setLoading} />
        )}
      </div>

      {/* Pagination */}
      <div className="bg-white p-4 rounded-2xl border flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {(listingData.currentPage - 1) * 10 + 1} -{' '}
          {Math.min(listingData.currentPage * 10, listingData.totalListings)} of {listingData.totalListings}
        </p>
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrevious}
            disabled={listingData.currentPage <= 1}
            className="px-3 py-2 rounded-xl bg-gray-100 disabled:text-gray-400"
          >
            <MdChevronLeft />
          </button>
          {[...Array(listingData.totalPages).keys()].slice(0, 5).map((num) => (
            <button
              key={num}
              onClick={() => fetchBasedOnState(num + 1)}
              className={`px-3 py-2 rounded-xl ${listingData.currentPage === num + 1
                ? 'bg-amber-600 text-white'
                : 'bg-gray-100 text-gray-700'
              }`}
            >
              {num + 1}
            </button>
          ))}
          <button
            onClick={handleNext}
            disabled={listingData.currentPage >= listingData.totalPages}
            className="px-3 py-2 rounded-xl bg-gray-100 disabled:text-gray-400"
          >
            <MdChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingManagementPage;