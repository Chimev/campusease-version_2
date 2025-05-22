import Link from 'next/link'
import React from 'react'

const MobileAppComp = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="p-8 md:p-12 md:w-1/2 flex-[70%]">
            <span className="bg-[#1b656a]/10 text-[#1b656a] px-4 py-2 rounded-full text-sm font-medium">MOBILE APP</span>
            <h2 className="text-3xl font-bold mt-4 mb-4">Get the CampusEase App</h2>
            <p className="text-gray-600 mb-8">
              Download our app to find listings, connect with providers, and manage campus life — all personalized to your school.
            </p>
            <h1 className="text-4xl md:hidden font-bold text-teal-800 mb-6 text-center w-full">
              Coming Soon!!!
            </h1>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="#" className="flex items-center justify-center bg-black px-6 py-3 rounded-xl hover:bg-gray-900 transition text-white">
                <svg viewBox="0 0 24 24" className="w-7 h-7 mr-3">
                  <path fill="currentColor" d="M17.707,9.293l-5-5c-0.391-0.391-1.024-0.391-1.414,0l-5,5C5.898,9.688,6.19,10,6.5,10H9v10
                  c0,0.553,0.447,1,1,1h4c0.553,0,1-0.447,1-1V10h2.5C17.81,10,18.102,9.688,17.707,9.293z"/>
                </svg>
                <div>
                  <div className="text-xs">Download on the</div>
                  <div className="text-xl font-semibold font-sans -mt-1">App Store</div>
                </div>
              </Link>
              
              <Link href="#" className="flex items-center justify-center bg-black px-6 py-3 rounded-xl hover:bg-gray-900 transition text-white">
                <svg viewBox="0 0 24 24" className="w-7 h-7 mr-3">
                  <path fill="currentColor" d="M3,20.5V3.5C3,2.91,3.34,2.39,3.84,2.15L13.69,12L3.84,21.85C3.34,21.6,3,21.09,3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08,20.75,11.5,20.75,12C20.75,12.5,20.5,12.92,20.16,13.19L18.93,14.1L16.39,11.56L18.93,9L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <div>
                  <div className="text-xs">GET IT ON</div>
                  <div className="text-xl font-semibold font-sans -mt-1">Google Play</div>
                </div>
              </Link>
            </div>
          </div>
          
          <h1 className="text-4xl hidden md:block md:text-5xl font-bold text-teal-800 mb-6 text-center w-full">
              Coming Soon!!!
            </h1>
          {/* <div className="relative md:w-1/2 h-64 md:h-auto">
            <Image
              src="/mobile-app.png"
              alt="CampusEase Mobile App"
              fill
              className="object-cover"
            />
          </div> */}
        </div>
      </section>
  )
}

export default MobileAppComp