'use client'

import { ChangeEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { FiUser, FiPhone, FiMail, FiLock, FiUsers, FiArrowRight, FiCheck } from 'react-icons/fi'
import { FaGraduationCap } from 'react-icons/fa'
import Link from 'next/link';

const providers = [
  {provider: 'agent', label: 'Agent', description: 'List and manage properties'},
  {provider: 'service', label: 'Service Provider', description: 'Offer campus services'},
  {provider: 'student', label: 'Student', description: 'Find accommodation & services'}
]

const Register = () => {
  const route = useRouter()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [role, setRole] = useState<string[]>([]);
  const [schoolSearch, setSchoolSearch] = useState('')
  const [showDropDown, setShowDropdown] = useState(false)
  const [fetchedSchhol, setFetchedSchhol] = useState<[] | null>([])

  useEffect(() => {
    async function searchSchool() {
      const res = await fetch('/api/schools');
      
      if (!res.ok) {
        setError('Network Error: Failed to fetch schools');
      }
      const schools = await res.json();
      console.log(schools)
      setFetchedSchhol(schools);
    }
    searchSchool()
  }, [])

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setRole((prevSelected) =>
      checked ? [...prevSelected, value] : prevSelected.filter((item) => item !== value)
    );
  };

  const handleSchoolSearchChange = (query:string) => {
    setSchoolSearch(query)

    if(query.trim() === ''){
      setShowDropdown(false);
    }else{
      setShowDropdown(true)
    }
  };

  const searchedSchools = fetchedSchhol?.filter((sch:any) => 
    sch.school.toLowerCase().includes(schoolSearch.toLowerCase())
  );

  const handleRegister = async (e: any) => {
    e.preventDefault();
    if (role.length === 0) {
      setLoading(false);
      setError("You must select at least one role.");
      return;
    }
  
    setLoading(true);
    const name = e.target[0].value;
    const phone = e.target[1].value.toString();
    const email = e.target[2].value;
    const password = e.target[3].value;
    const school = schoolSearch;
  
    // Validate School from db
    const isValidSchool = fetchedSchhol?.some(
      (sch: any) => sch.school.toLowerCase() === school.toLowerCase()
    );
  
    if (!isValidSchool) {
      setError("Please select a valid school from the dropdown.");
      setLoading(false);
      return;
    }
  
    // Determine if agent role is selected
    const isAgentSelected = role.includes("agent");
  
    const userData: any = {
      name,
      phone,
      email,
      password,
      role,
      school,
    };
  
    // If agent is selected, add agentApproval field
    if (isAgentSelected) {
      userData.agentApproval = false;
    }

    console.log(userData)
  
    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      console.log(res);
      if (res.status === 500) {
        setLoading(false);
        setError("Network error");
      }
      if (res.status === 400) {
        setLoading(false);
        setError("This email is already registered");
      }
      if (res.status === 200) {
        setError("");
        route.push("/sign-in");
      }
    } catch (error) {
      setLoading(false);
      setError("Error, try again");
      console.log(error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-amber-50">
      {/* Background decorative elements */}
      <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-amber-200/30 blur-2xl"></div>
      <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full bg-teal-200/30 blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-amber-300/20 blur-xl"></div>

      <section className='relative flex items-center justify-center min-h-screen px-4 py-12'>
        <div className="w-full max-w-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl mb-4 shadow-lg">
              <FiUsers className="text-2xl text-white" />
            </div>
            <h1 className='text-4xl font-bold text-teal-800 mb-2'>
              Join CampusEase
            </h1>
            <p className="text-gray-600 text-lg">
              Create your account and start your campus journey
            </p>
            <div className="h-1 w-16 bg-teal-500 mx-auto mt-4"></div>
          </div>

          {/* Register Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8">
            <form onSubmit={handleRegister} className='space-y-6'>
              {/* Name Input */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your full name"
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  />
                </div>
              </div>

              {/* Phone Input */}
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiPhone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="Enter your phone number"
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Create a password"
                    required
                    className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <AiFillEyeInvisible className="h-5 w-5" />
                    ) : (
                      <AiFillEye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* School Search Input */}
              <div className="space-y-2">
                <label htmlFor="school" className="text-sm font-medium text-gray-700">
                  University/School
                </label>
                <p className="text-xs text-gray-500">Please select from the dropdown menu</p>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaGraduationCap className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="school"
                    value={schoolSearch}
                    onChange={e => handleSchoolSearchChange(e.target.value)}
                    placeholder="Search for your school"
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  />
                  {/* Dropdown */}
                  {showDropDown && searchedSchools && searchedSchools.length > 0 && (
                    <ul className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-40 overflow-y-auto">
                      {searchedSchools.map((sch: any, index) => (
                        <li
                          key={index}
                          className="px-4 py-3 cursor-pointer hover:bg-teal-50 transition-colors border-b border-gray-100 last:border-b-0"
                          onClick={() => {
                            setSchoolSearch(sch.school);
                            setShowDropdown(false);
                          }}
                        >
                          <div className="flex items-center">
                            <FaGraduationCap className="h-4 w-4 text-teal-500 mr-2" />
                            <span className="text-gray-800">{sch.school}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Role Selection */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Register as:</h3>
                  <p className="text-sm text-gray-500">You can select multiple roles</p>
                </div>
                
                <div className="space-y-3">
                  {providers.map((provider) => (
                    <label
                      key={provider.provider}
                      className={`relative flex items-start p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                        role.includes(provider.provider)
                          ? 'border-teal-500 bg-teal-50'
                          : 'border-gray-200 hover:border-teal-300 hover:bg-teal-50/50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        value={provider.provider}
                        onChange={handleCheckboxChange}
                        className="sr-only"
                      />
                      <div className={`flex-shrink-0 w-5 h-5 rounded border-2 mr-3 mt-0.5 flex items-center justify-center transition-colors ${
                        role.includes(provider.provider)
                          ? 'border-teal-500 bg-teal-500'
                          : 'border-gray-300'
                      }`}>
                        {role.includes(provider.provider) && (
                          <FiCheck className="h-3 w-3 text-white" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">{provider.label}</div>
                        <div className="text-sm text-gray-500">{provider.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="p-4 bg-gradient-to-r from-teal-50 to-amber-50 rounded-xl border border-teal-100">
                <p className="text-sm text-gray-600 text-center">
                  By signing up, you agree to our{' '}
                  <Link href="/terms" className="text-teal-600 hover:text-teal-700 font-medium hover:underline">
                    Terms and Conditions
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy-policy" className="text-teal-600 hover:text-teal-700 font-medium hover:underline">
                    Privacy Policy
                  </Link>
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-600 text-sm text-center">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  <div className="flex items-center">
                    Create Account
                    <FiArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </button>
            </form>
          </div>

          {/* Sign In Link */}
          <div className="text-center mt-8">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => route.push("/sign-in")}
                className="text-teal-600 hover:text-teal-700 font-semibold transition-colors"
              >
                Sign In
              </button>
            </p>
          </div>

          {/* Welcome Message */}
          <div className="mt-8 p-6 bg-gradient-to-r from-amber-50 to-teal-50 rounded-2xl border border-amber-100">
            <div className="text-center">
              <h3 className="font-semibold text-teal-800 mb-1">Welcome to CampusEase!</h3>
              <p className="text-sm text-gray-600 mb-3">
                Join our growing community of students, agents, and service providers
              </p>
              <div className="flex justify-center space-x-4 text-xs text-gray-500">
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-teal-400 rounded-full mr-1"></div>
                  Trusted Platform
                </span>
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mr-1"></div>
                  Secure Registration
                </span>
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-teal-400 rounded-full mr-1"></div>
                  Instant Access
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Register