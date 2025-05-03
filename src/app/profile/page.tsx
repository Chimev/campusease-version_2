import React from 'react'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/auth';
import Link from 'next/link';
import ShareBTN from '@/components/profile/shareBtn/ShareBTN';
import Menu from '@/components/profile/Menu';
import SignOut from '@/components/profile/SignOut';


interface User {
    name?: string;
    email?: string;
  }

const Profile = async() => {
  const session = await getServerSession(authOptions) as any;
  if(!session) {
    redirect('/sign-in');
  }
    const user = session.user;
  return (
    <section className='px-1'>
    {/* Profile Picture Placeholder (Optional) */}
    <div className="flex justify-center mb-4 pt-4">
      <div className="w-24 h-24 rounded-full bg-secondaryLight text-white flex items-center justify-center text-gray-500 text-2xl font-semibold">
        {user?.name?.charAt(0).toUpperCase()}
      </div>
    </div>
  
    {/* User Info */}
    <div className="text-center mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-1">{user?.name}</h2>
      <p className="text-sm text-gray-600">{user?.email || ""}</p>
      {user?.phone && (
        <p className="text-sm text-gray-600 mt-1">{user.phone || ''}</p>
      )}
    </div>
  
    {/* Actions */}
    <div className="flex justify-center flex-wrap gap-3 mb-6">
      <Link
        href="/profile/settings"
        className="bg-[#f8ae24] hover:bg-[#d9941f] text-white px-5 py-2 rounded text-sm font-medium transition"
      >
        Edit Profile
      </Link>
      <ShareBTN user={user} />
      <SignOut nav={false} />
    </div>
  
    {/* Public Profile Link */}
    <div className="text-center">
      <Link
        href={`/user/${user.name}`}
        className="text-blue-600 hover:underline text-sm"
      >
        View your public profile
      </Link>
    </div>
  

    <Menu />
  </section>
  )
}

export default Profile
