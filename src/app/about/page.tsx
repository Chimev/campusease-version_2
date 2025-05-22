  import MobileAppComp from '@/components/constant/MobileAppComp';
import { TestimonialCard } from '@/components/constant/TestimonialCard';
import { testimonials } from '@/data/testimonials';
import { Metadata } from 'next';
import Link from 'next/link';
import { FiMapPin, FiUsers, FiShoppingBag, FiArrowRight, FiStar, FiCheckCircle } from 'react-icons/fi';
import { FiScissors } from 'react-icons/fi';

export const metadata: Metadata = {
  title: "About",
  description:
    "Redefining student life in Nigeria with one platform for all your campus needs",
  keywords: [
    "CampusEase",
    "student marketplace",
    "campus life",
    "university services",
    "college roommates",
    "student housing",
    "Nigeria student platform",
    "college classifieds",
    "student accommodation",
  ],
  openGraph: {
    title: "About CampusEase | Making Campus Life Easier for Students",
    description:
      "Explore how CampusEase is simplifying campus life through listings, services, and roommate discovery tailored to your university.",
    url: "https://campusease.com/about",
    siteName: "CampusEase",
    type: "website",
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "About CampusEase",
  //   description:
  //     "Learn how CampusEase is helping students manage housing, services, and connections around campus.",
  // },
};



// const FeatureCard = ({ icon, title, description, color }: any) => {
//   return (
//     <div className="bg-white p-6 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-b-4" style={{ borderColor: color }}>
//       <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: color }}>
//         {icon}
//       </div>
//       <h3 className="text-xl font-bold mb-2">{title}</h3>
//       <p className="text-gray-600">{description}</p>
//     </div>
//   );
// };



export default function AboutUsPage() {


  // Features data
  const features = [
    {
      icon: <FiMapPin className="text-white text-xl" />,
      title: "Verified Accommodation",
      description: "Connect with trusted agents for safe and comfortable student housing options near your campus.",
      color: "#1b656a"
    },
    {
      icon: <FiUsers className="text-white text-xl" />,
      title: "Roommate Matching",
      description: "Find roommates that match your lifestyle, study habits, and vibe for a harmonious living experience.",
      color: "#f8ae24"
    },
    {
      icon: <FiShoppingBag className="text-white text-xl" />,
      title: "Campus Marketplace",
      description: "Buy, sell, or swap textbooks, furniture, gadgets, and more with fellow students in your area.",
      color: "#e64c66"
    },
    {
      icon: <FiScissors className="text-white text-xl" />,
      title: "Campus Services",
      description: "Hire local service providers for haircuts, academic help, tech support, and more campus needs.",
      color: "#9c5acd"
    }
  ];

 

  return (
    <main className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[85vh] bg-gradient-to-r from-teal-900 to-teal-700 overflow-hidden">
        {/* Background circles for visual interest */}
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-teal-600/20 blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-80 h-80 rounded-full bg-teal-500/20 blur-3xl"></div>
        
        {/* <div className="absolute inset-0 flex items-center justify-center">
          <Image 
            src="/campus-hero.jpg" 
            alt="Students on campus" 
            layout="fill"
            objectFit="cover"
            priority
            className="opacity-25"
          />
        </div> */}
        
        <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white text-center mb-6 tracking-tight">
            About <span className="text-amber-300">campusEase</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 text-center max-w-3xl mb-10">
            Redefining student life in Nigeria with one platform for all your campus needs
          </p>
          
          {/* CTA */}
          <div className="flex space-x-4">
            <Link
              href="/explore"
              className="mt-1 inline-block px-6 py-3 bg-[#f8ae24] text-white font-semibold rounded-xl hover:bg-[#e49b1c] transition"
            >
              Explore Platform <FiArrowRight className="inline ml-2" />
            </Link>
            <Link
              href="/apply-agent"
              className="mt-1 inline-block px-6 py-3 bg-white text-[#1b656a] font-semibold rounded-xl hover:bg-gray-100 transition"
            >
              Become an Agent
            </Link>
          </div>
          
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
      
      {/* Mission Section with Animated Counter */}
      <section className={`py-16 hover:opacity-100 opacity-90 transition-opacity duration-500`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-1 w-20 bg-teal-500 mx-auto"></div>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 text-teal-800">Our Mission</h2>
            <p className="mt-2 text-lg text-gray-600">
              At CampusEase, we're building a connected, trusted, and convenient community platform that supports every aspect of campus living.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-5xl font-bold text-teal-800">50+</h3>
              <p className="mt-2 text-gray-600">Universities Covered</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-5xl font-bold text-[#f8ae24]">10k+</h3>
              <p className="mt-2 text-gray-600">Verified Properties</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-5xl font-bold text-[#e64c66]">25k+</h3>
              <p className="mt-2 text-gray-600">Daily Transactions</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-5xl font-bold text-[#9c5acd]">100k+</h3>
              <p className="mt-2 text-gray-600">Satisfied Students</p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className={`py-16 bg-teal-50 hover:opacity-100 opacity-90 transition-opacity duration-500`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-1 w-20 bg-amber-400 mx-auto"></div>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 text-teal-800">All-In-One Student Platform</h2>
            <p className="mt-2 text-lg text-gray-600">
              Everything you need for a successful campus life in one convenient platform.
            </p>
          </div>

          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div> */}
        </div>
      </section>

      {/* Testimonials */}
      <section className={`py-16 bg-teal-50 hover:opacity-100 opacity-90 transition-opacity duration-500`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-1 w-20 bg-amber-400 mx-auto"></div>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 text-teal-800">What Students Say</h2>
            <p className="mt-2 text-lg text-gray-600">Join thousands of satisfied users</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} quote={testimonial.quote} name={testimonial.name} university={testimonial.university}  />
            ))}
          </div>
        </div>
      </section>

      {/* Join as Agent Section */}
      <section className={`py-16 hover:opacity-100 opacity-90 transition-opacity duration-500`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-teal-800 to-[#22747a] rounded-2xl overflow-hidden shadow-xl">
            <div className="grid md:grid-cols-2">
              <div className="p-12 text-white">
                <h2 className="text-3xl font-bold mb-6">Become a Verified Agent</h2>
                <p className="mb-8">
                  Are you a local agent passionate about helping students? Join our network and get verified to connect with thousands of students looking for housing.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <FiCheckCircle className="mr-3" /> Access to 100k+ students
                  </li>
                  <li className="flex items-center">
                    <FiCheckCircle className="mr-3" /> Verification badge builds trust
                  </li>
                  <li className="flex items-center">
                    <FiCheckCircle className="mr-3" /> Free marketing tools
                  </li>
                  <li className="flex items-center">
                    <FiCheckCircle className="mr-3" /> Secure payment processing
                  </li>
                </ul>
                <Link href="/apply-agent" className="inline-block bg-white text-teal-800 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition">
                  Apply Now
                </Link>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/agent-photo.jpg)' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact/Help Section */}
      <section className={`py-16 hover:opacity-100 opacity-90 transition-opacity duration-500`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-center mb-12">
            <div className="h-1 w-20 bg-teal-500 mx-auto"></div>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 text-teal-800">Need Help?</h2>
            <p className="mt-2 text-lg text-gray-600">Our dedicated support team is always ready to help</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="text-gray-600">campusease1@gmail.com</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
              <p className="text-gray-600">Available 8am - 8pm WAT</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-gray-600">+234 9078608642</p>
            </div>
          </div>
          
          <div className="mt-12">
            <Link href="/contact" className="inline-block bg-teal-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-teal-700 transition mr-4">
              Support Center
            </Link>
            <Link href="/faq" className="inline-block bg-white border border-teal-800 text-teal-800 px-6 py-3 rounded-xl font-semibold hover:bg-teal-50 transition">
              FAQs
            </Link>
          </div>
        </div>
      </section>

      {/* Download App Banner */}
      <MobileAppComp />
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
              href="/signup" 
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
    </main>
  );
}