import Link from 'next/link';
import { categories } from '@/data/categories';
import { FiSearch, FiMapPin, FiUsers, FiShoppingBag, FiChevronRight, FiStar, FiArrowRight, FiBookmark } from 'react-icons/fi';
import { TestimonialCard } from '@/components/constant/TestimonialCard';
import { CategoryCard } from '@/components/categoryCard/CategoryCard';
import { testimonials } from '@/data/testimonials';
import MobileAppComp from '@/components/constant/MobileAppComp';
import { useSession } from 'next-auth/react';


export const metadata = {
  title: "Campusease",
  description:
    "Find affordable housing, services, and items around your campus. CampusEase helps students connect, list, and discover essentials for campus life.",
  keywords: [
    "CampusEase",
    "student housing Nigeria",
    "student hostel",
    "campus services",
    "university services",
    "roommates",
    "college roommates",
    "university roommates",
    "sell on campus",
    "student marketplace",
    "university marketplace",
    "university classifieds",
    "student tech Nigeria",
    "student listings",
  ],
  openGraph: {
    title: "CampusEase | Simplifying Campus Life in Nigeria",
    description:
      "Discover a smarter way to live on campus. Find roommates, post services, and buy or sell essentials – all in one place.",
    url: "https://campusease.com",
    siteName: "CampusEase",
    type: "website",
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "CampusEase",
  //   description:
  //     "Explore affordable student listings, roommates, and services in your university community with CampusEase.",
  // },
};






export default function Home() {
  // Mock data for featured listings
  // const featuredListings = [
  //   {
  //     title: "Modern Studio Apartment",
  //     location: "5 min from Campus",
  //     price: "850/mo",
  //     image: "/images/listings/apartment1.jpg",
  //     tags: ["Private Bath", "Furnished"]
  //   },
  //   {
  //     title: "Shared 3BR Townhouse",
  //     location: "University Heights",
  //     price: "550/mo",
  //     image: "/images/listings/apartment2.jpg",
  //     tags: ["Utilities Included", "Pet Friendly"]
  //   },
  //   {
  //     title: "Private Room in 4BR",
  //     location: "College Street",
  //     price: "625/mo",
  //     image: "/images/listings/apartment3.jpg",
  //     tags: ["Parking", "Laundry"]
  //   }
  // ];

  return (
    <main className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[85vh] bg-gradient-to-r from-teal-900 to-teal-700 overflow-hidden">
        {/* Background circles for visual interest */}
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-teal-600/20 blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-80 h-80 rounded-full bg-teal-500/20 blur-3xl"></div>
        
        {/* <div className="absolute inset-0 flex items-center justify-center">
          <Image 
            src="/images/campus-life.jpg" 
            alt="Students on campus" 
            layout="fill"
            objectFit="cover"
            priority
            className="opacity-25"
          />
        </div> */}
        
        <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white text-center mb-6 tracking-tight">
            Find <span className="text-amber-300">Comfort</span> with campusEase
          </h1>
          <p className="text-xl md:text-2xl text-white/90 text-center max-w-3xl mb-10">
            Find Accommodation, Roommate Services and MarketPlace within your campus - All in One Place!
          </p>
          
          {/* CTA */}
          <Link
            href="#find-what-you-need"
            className="mt-1 inline-block px-6 py-3 bg-[#f8ae24] text-white font-semibold rounded-xl hover:bg-[#e49b1c] transition"
          >
            Find What You Need
          </Link>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            <div className="flex items-center bg-white/20 backdrop-blur-sm text-white px-5 py-2 rounded-full">
              <FiMapPin className="mr-2" />
              <span>50+ Campuses</span>
            </div>
            <div className="flex items-center bg-white/20 backdrop-blur-sm text-white px-5 py-2 rounded-full">
              <FiUsers className="mr-2" />
              <span>10k+ Users</span>
            </div>
            <div className="flex items-center bg-white/20 backdrop-blur-sm text-white px-5 py-2 rounded-full">
              <FiShoppingBag className="mr-2" />
              <span>5k+ Listings</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section id="find-what-you-need" className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-1 w-20 bg-teal-500 mx-auto"></div>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 text-teal-800">Find What You Need</h2>
            <p className="mt-2 text-lg text-gray-600">Browse through our popular categories</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((menu, index) => (
              <Link href={menu.link} key={menu.category} className="block">
                <CategoryCard 
                  category={menu.category} 
                  description={menu.description} 
                  img={menu.img} 
                  index={index}
                  tagline={menu.tagline}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Listings */}
      {/* <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-teal-800">Featured Listings</h2>
              <p className="mt-2 text-gray-600">Check out these popular options near you</p>
            </div>
                          <Link href="/listings" className="flex items-center text-teal-600 hover:text-teal-700 font-medium">
                View all <FiArrowRight className="ml-2" />
              </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredListings.map((listing, index) => (
              <FeaturedListing key={index} {...listing} />
            ))}
          </div>
        </div>
      </section>
       */}
      {/* How It Works */}
      <section className="py-16 bg-teal-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-teal-800">How campusEase Works</h2>
            <p className="mt-3 text-lg text-gray-600">Simple steps to find what you need</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-md text-center">
              <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Create an Account</h3>
              <p className="text-gray-600">Sign up with your email to access exclusive listings and features.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-md text-center">
              <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Browse Listings</h3>
              <p className="text-gray-600">Search through accommodations, roommate, services, or marketplace items.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-md text-center">
              <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect & Enjoy</h3>
              <p className="text-gray-600">Contact vendors directly and find your perfect match with ease..</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-1 w-20 bg-amber-400 mx-auto"></div>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 text-teal-800">What Students Say</h2>
            <p className="mt-2 text-gray-600">Join thousands of satisfied users</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-teal-800 to-[#22747a] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-8 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Campus Comfort?</h2>
            <p className="text-xl text-white/80 max-w-xl">
              Join thousands of students who've found their perfect accommodation, roommates, and more!
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/register" 
              className="bg-[#f8ae24] hover:bg-[#d9941f] text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
            >
              Sign Up Now
            </Link>
            <Link 
              href="/about" 
              className="bg-white text-[#1b656a] px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-all"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
      
        {/* Download App Banner */}
      <MobileAppComp />
      
    </main>
  );
}