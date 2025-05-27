'use client'

import React, { useState } from 'react';
import { FiShare2, FiCheck } from 'react-icons/fi';

const ShareBTN = ({ user }: any) => {
  const [copySuccess, setCopySuccess] = useState('');

  // Function to handle copying the profile link
  const handleCopy = () => {
    const profileUrl = `${window.location.origin}/user/${user?.name}`;
    navigator.clipboard.writeText(profileUrl).then(() => {
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    }).catch((err) => {
      console.error('Failed to copy: ', err);
      setCopySuccess('Failed to copy');
      setTimeout(() => setCopySuccess(''), 2000);
    });
  };

  return (
    <>
      <button
        onClick={handleCopy}
        className="flex items-center bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-medium hover:bg-white/30 transition-all"
      >
        {copySuccess ? (
          <>
            <FiCheck className="mr-2" />
            {copySuccess}
          </>
        ) : (
          <>
            <FiShare2 className="mr-2" />
            Share Profile
          </>
        )}
      </button>
    </>
  );
};

export default ShareBTN;