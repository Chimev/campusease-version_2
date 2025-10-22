import { getListings } from '@/lib/functions/listings/getListings';
import { getSchools } from '@/lib/functions/schools/getSchools';
import { getUsers } from '@/lib/functions/users/getUsers';
import Link from 'next/link';
import { MdGroups, MdListAlt, MdSchool, MdTrendingUp } from "react-icons/md";



export const revalidate = 60;

const Page = async () => {
  const users = await getUsers()
  const listings = await getListings()
  const schools = await getSchools()
      
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-white">Welcome back! Here's what's happening with campusEase today.</p>
      </div>

      {/* Metrics Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Users</p>
              <p className="text-3xl font-bold text-gray-900">{users.totalUsers}</p>
              <div className="flex items-center mt-2">
                <MdTrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+12% from last month</span>
              </div>
            </div>
            <div className="w-14 h-14 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
              <MdGroups className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Active Listings</p>
              <p className="text-3xl font-bold text-gray-900">{listings.length}</p>
              <div className="flex items-center mt-2">
                <MdTrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+8% from last month</span>
              </div>
            </div>
            <div className="w-14 h-14 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl flex items-center justify-center">
              <MdListAlt className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Schools</p>
              <p className="text-3xl font-bold text-gray-900">{schools.length}</p>
              <div className="flex items-center mt-2">
                <MdTrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+5% from last month</span>
              </div>
            </div>
            <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <MdSchool className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href={'/admin/users'} className="p-4 text-left rounded-xl border-2 border-dashed border-gray-200 hover:border-teal-300 hover:bg-teal-50 transition-colors">
            <MdGroups className="w-8 h-8 text-teal-600 mb-2" />
            <p className="font-medium text-gray-900">User Managment</p>
            <p className="text-sm text-gray-500">Create user account</p>
          </Link>
          
          <Link href={'/admin/listings'} className="p-4 text-left rounded-xl border-2 border-dashed border-gray-200 hover:border-amber-300 hover:bg-amber-50 transition-colors">
            <MdListAlt className="w-8 h-8 text-amber-600 mb-2" />
            <p className="font-medium text-gray-900">Review Listings</p>
            <p className="text-sm text-gray-500">Moderate content</p>
          </Link>
          
          <Link href={'admin/schools'} className="p-4 text-left rounded-xl border-2 border-dashed border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors">
            <MdSchool className="w-8 h-8 text-purple-600 mb-2" />
            <p className="font-medium text-gray-900">Add School</p>
            <p className="text-sm text-gray-500">Partner institutions</p>
          </Link>
          
          <button className="p-4 text-left rounded-xl border-2 border-dashed border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors">
            <MdTrendingUp className="w-8 h-8 text-green-600 mb-2" />
            <p className="font-medium text-gray-900">View Analytics</p>
            <p className="text-sm text-gray-500">Platform insights</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;