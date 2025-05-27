'use client'

import { signOut } from 'next-auth/react';
import React from 'react';
import { FiLogOut } from 'react-icons/fi';

const SignOut = ({ nav }: { nav?: boolean }) => {
  return (
    <button
      onClick={() => signOut()}
      className={`${
        nav 
          ? 'bg-teal-600 hover:bg-teal-700 text-white text-center w-full px-4 py-3 rounded-xl font-medium transition-all'
          : 'flex items-center justify-center bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-medium transition-all shadow-lg hover:shadow-xl'
      }`}
    >
      {!nav && <FiLogOut className="mr-2" />}
      Sign Out
    </button>
  );
};

export default SignOut;