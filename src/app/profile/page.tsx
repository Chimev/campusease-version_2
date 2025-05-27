import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/auth';
import Link from 'next/link';
import { FiEdit3, FiShare2, FiEye } from 'react-icons/fi';
import ShareBTN from '@/components/profile/shareBtn/ShareBTN';
import Menu from '@/components/profile/Menu';
import SignOut from '@/components/profile/SignOut';

interface User {
  name?: string;
  email?: string;
  phone?: string;
}

const Profile = async () => {
  const session = await getServerSession(authOptions) as any;
  if (!session) {
    redirect('/sign-in');
  }

  const user = session.user;

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero Section with Profile */}
      <section className="relative bg-gradient-to-r from-teal-900 to-teal-700 py-16">
        {/* Background circles for visual interest */}
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-teal-600/20 blur-2xl"></div>
        <div className="absolute bottom-5 right-20 w-40 h-40 rounded-full bg-teal-500/20 blur-2xl"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Profile Picture */}
            <div className="w-24 h-24 bg-amber-300 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-teal-800 shadow-lg">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            
            {/* User Info */}
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {user?.name}
            </h1>
            <p className="text-xl text-white/90 mb-2">
              {user?.email || ""}
            </p>
            {user?.phone && (
              <p className="text-lg text-white/80 mb-6">
                {user.phone}
              </p>
            )}
            
            {/* All Quick Actions at the top */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link 
                href="/profile/settings" 
                className="flex items-center bg-amber-400 hover:bg-amber-500 text-white px-6 py-3 rounded-full font-medium transition-all shadow-lg"
              >
                <FiEdit3 className="mr-2" />
                Edit Profile
              </Link>
              <ShareBTN user={user} />
              <Link 
                href={`/user/${user?.name}`} 
                className="flex items-center bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-medium hover:bg-white/30 transition-all"
              >
                <FiEye className="mr-2" />
                View Public Profile
              </Link>
              <SignOut nav={false} />
            </div>
          </div>
        </div>
      </section>

      {/* User Listings Section - Container for potential multiple listings */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-teal-800">Your Listings</h2>
            <p className="mt-3 text-lg text-gray-600">Manage all your listings in one place</p>
          </div>
          
          {/* Menu component at the bottom */}
          <div className="bg-white overflow-hidden">
            <div className="px-6">
              <Menu />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Profile;