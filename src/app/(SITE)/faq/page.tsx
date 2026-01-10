'use client'

import { useState } from 'react';
import Link from 'next/link';
import { FiChevronDown, FiChevronUp, FiSearch, FiMessageSquare } from 'react-icons/fi';
import { Metadata } from 'next';

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openQuestion, setOpenQuestion] = useState(null);
  
  const toggleQuestion = (index:any) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  // FAQ categories
  const categories = [
    { name: 'General', icon: '🏠' },
    { name: 'Accommodation', icon: '🏢' },
    { name: 'Roommates', icon: '👥' },
    { name: 'Marketplace', icon: '🛒' },
    { name: 'Account', icon: '👤' },
    { name: 'Payments', icon: '💸' },
  ];
  
  // FAQ questions
  const faqQuestions = [
    {
      category: 'General',
      questions: [
        {
          question: 'What is campusEase?',
          answer: 'campusEase is a comprehensive platform designed specifically for students to find accommodation, roommates, and marketplace items within their campus. Our mission is to simplify campus life by providing all essential services in one place.'
        },
        {
          question: 'Which universities does campusEase support?',
          answer: "We currently support over 20 campuses across the country To check if your school is supported, simply start the sign-up process and type in your university name — if it shows up, you're in! We're always adding more schools, so stay tuned if yours isn't listed yet.!"
        },
        {
          question: 'Is campusEase free to use?',
          answer: 'Yes! CampusEase is completely free to browse, search, and connect. We only charge a small fee if you choose to list something on the platform (like a service, property, or item). No hidden costs — just pay when you want to post.'
        }
      ]
    },
    {
      category: 'Accommodation',
      questions: [
        {
          question: 'How do I list my property on campusEase?',
          answer: 'To list your property, simply create an account, click on "List Your Property" in the Accommodation section, and follow the step-by-step process. Make sure to include clear photos, accurate details about amenities, and fair pricing to attract potential tenants.'
        },
        {
          question: 'Are the accommodations verified?',
          answer: 'While we encourage property owners to provide accurate information, campusEase recommends that students verify all details before making any commitments. For premium listings, we offer a verification badge that indicates the listing has been reviewed by our team.'
        },
        {
          question: 'How can I report an issue with a listing?',
          answer: 'If you encounter any suspicious or problematic listings, please use the "Report Listing" button that appears on each accommodation page. Our team will review your report and take appropriate action within 24-48 hours.'
        }
      ]
    },
    {
      category: 'Roommates',
      questions: [
        {
          question: 'How does roommate matching work?',
          answer: "Right now, you can browse through potential roommates based on their profiles, preferences, and campus location. While messaging isn't available yet, you can select someone who vibes with you and take it from there! Make sure to fill out your profile for better visibility."
        },
        {
          question: 'Can I message potential roommates before deciding?',
          answer: 'Absolutely! We encourage users to communicate thoroughly before making roommate arrangements. You can use our in-app messaging system to ask questions, discuss expectations, and even schedule video calls to ensure compatibility.'
        }
      ]
    },
    {
      category: 'Marketplace',
      questions: [
        {
          question: 'What items can I sell on the marketplace?',
          answer: 'You can sell furniture, electronics, tickets for campus events, and other items relevant to student life. Please note that we prohibit the sale of illegal items, alcohol, tobacco products, prescription medications, and offensive material.'
        },
                  {
          question: 'How do transactions work?',
          answer: 'campusEase serves as a platform to connect buyers and sellers but does not handle transactions between users. We recommend meeting in safe, public locations on campus for exchanges, and users should arrange their own payment methods directly with each other. For your safety, we recommend using secure payment methods for these person-to-person transactions.'
        }
      ]
    },
    {
      category: 'Payments',
      questions: [
        {
          question: 'How does payment work on campusEase?',
          answer: 'campusEase only charges users who wish to list their properties, items, or services on our platform. We do not handle or process payments between users for accommodations, marketplace items, or services. Users arrange their own payment methods directly with each other.'
        },
      ]
    }
  ];

  const filteredQuestions = searchQuery 
    ? faqQuestions.map(category => ({
        ...category,
        questions: category.questions.filter(q => 
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.questions.length > 0)
    : faqQuestions;

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-teal-900 to-teal-700 py-24">
        {/* Background circles for visual interest */}
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-teal-600/20 blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-80 h-80 rounded-full bg-teal-500/20 blur-3xl"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
            Find answers to common questions about using campusEase for your student life needs
          </p>
          
        
        </div>
      </section>
      
      {/* Category Navigation */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto pb-2 scrollbar-hide space-x-4">
            {categories.map((category, index) => (
              <a 
                key={index}
                href={`#${category.name}`}
                className="flex-shrink-0 bg-teal-50 hover:bg-teal-100 px-5 py-3 rounded-lg flex items-center transition"
              >
                <span className="mr-2 text-xl">{category.icon}</span>
                <span className="font-medium text-teal-800">{category.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((category, categoryIndex) => (
              <div key={categoryIndex} id={category.category} className="mb-12">
                <div className="flex items-center mb-6">
                  <h2 className="text-2xl font-bold text-teal-800">{category.category} Questions</h2>
                  <div className="h-1 flex-grow ml-4 bg-amber-300 rounded-full"></div>
                </div>
                
                <div className="space-y-4">
                  {category.questions.map((faq, faqIndex) => (
                    <div 
                      key={faqIndex} 
                      className="bg-white rounded-xl shadow-md overflow-hidden"
                    >
                      <button
                        onClick={() => toggleQuestion(`${categoryIndex}-${faqIndex}`)}
                        className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                      >
                        <span className="font-medium text-lg text-gray-800">{faq.question}</span>
                        {openQuestion === `${categoryIndex}-${faqIndex}` ? (
                          <FiChevronUp className="text-teal-600 text-xl" />
                        ) : (
                          <FiChevronDown className="text-teal-600 text-xl" />
                        )}
                      </button>
                      
                      {openQuestion === `${categoryIndex}-${faqIndex}` && (
                        <div className="px-6 pb-5 text-gray-600 border-t border-gray-100 pt-3">
                          <p>{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto bg-teal-50 rounded-full flex items-center justify-center mb-4">
                <FiSearch className="text-3xl text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No results found</h3>
              <p className="text-gray-600 mb-6">We couldn't find any FAQs matching your search. Try different keywords or browse by category.</p>
              <button
                onClick={() => setSearchQuery('')}
                className="px-5 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* Still Have Questions */}
      <section className="py-12 bg-teal-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-teal-800 mb-4">Still Have Questions?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Our support team is here to help you with any other questions or concerns you might have about using campusEase.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMessageSquare className="text-2xl text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Contact Support</h3>
              <p className="text-gray-600 mb-4">Get help from our dedicated support team within 24 hours</p>
              <Link 
                href="/contact"
                className="inline-block px-6 py-3 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition"
              >
                Send a Message
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Help Center</h3>
              <p className="text-gray-600 mb-4">Browse our detailed guides and tutorials</p>
              <Link 
                href="/help-center"
                className="inline-block px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
              >
                Visit Help Center
              </Link>
            </div>
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
    </main>
  );
}