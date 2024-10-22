'use client'

import React, { useState } from 'react'

const ShareBTN = ({user}: any) => {
    
  const [copySuccess, setCopySuccess] = useState<string>(''); // State for copy success message

     // Function to handle copying the profile link
  const handleCopy = () => {
    const profileUrl = `${window.location.origin}/user/${user?.name}`; // Construct the URL
    navigator.clipboard.writeText(profileUrl).then(() => {
      setCopySuccess('Profile link copied to clipboard!');  // Set success message
      setTimeout(() => setCopySuccess(''), 1000);  // Clear message after 3 seconds
    }).catch((err) => {
      console.error('Failed to copy: ', err);
      setCopySuccess('Failed to copy link.');
    });
  };

  return (
       <>
        {/* Button to share profile */}
       <button 
       className={`${copySuccess ? 'bg-blue text-white p-2' : 'bg-orange p-2 text-white rounded' }`} 
       onClick={handleCopy}
    //    disabled={!user}  // Disable the button if user data is not available
     >
       {copySuccess ? 'Copied!' : 'Share Profile'}
     </button>
     {/* Show copy success message */}
       </>
  )
}

export default ShareBTN