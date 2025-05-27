'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FiMail, FiLock, FiUser, FiArrowRight } from 'react-icons/fi';
import { signIn, useSession } from 'next-auth/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const route = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session?.status === "authenticated") {
      toast.success("Login Successful");
      setTimeout(() => {
        route.replace('/')
      }, 1000);
    }
  }, [session, route])

  const handleLogin = async (e: any) => {
    e.preventDefault()
    const email = e.target[0].value;
    const password = e.target[1].value;

    setLoading(true)

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password
    })

    console.log("res", res)

    if (!res?.ok) {
      setLoading(false);
      toast.error("Error while trying to login")
    }

    if (res?.error === "Error: querySrv ETIMEOUT _mongodb._tcp.cluster0.dgonc.mongodb.net") {
      console.log(res?.error)
      setLoading(false)
      toast.error("Network Error");
    }
    if (res?.error === "CredentialsSignin") {
      console.log(res?.error)
      setLoading(false)
      toast.error("Invalid email or password");
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-amber-50">
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-teal-200/30 blur-2xl"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-amber-200/30 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-teal-300/20 blur-xl"></div>

      <section className='relative flex items-center justify-center min-h-screen px-4 py-12'>
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl mb-4 shadow-lg">
              <FiUser className="text-2xl text-white" />
            </div>
            <h1 className='text-4xl font-bold text-teal-800 mb-2'>
              Welcome Back
            </h1>
            <p className="text-gray-600 text-lg">
              Sign in to continue your campus journey
            </p>
            <div className="h-1 w-16 bg-amber-400 mx-auto mt-4"></div>
          </div>

          {/* Sign In Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8">
            <form onSubmit={handleLogin} className='space-y-6'>
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
                    placeholder="Enter your password"
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

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className='w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group'
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing In...
                  </div>
                ) : (
                  <div className="flex items-center">
                    Sign In
                    <FiArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </button>

              {/* Forgot Password */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => route.push('/forgot-password')}
                  className='text-teal-600 hover:text-teal-700 font-medium text-sm transition-colors'
                >
                  Forgot your password?
                </button>
              </div>
            </form>
          </div>

          {/* Sign Up Link */}
          <div className='text-center mt-8'>
            <p className="text-gray-600">
              Don't have an account yet?{' '}
              <button
                onClick={() => route.push('/register')}
                className='text-amber-600 hover:text-amber-700 font-semibold transition-colors'
              >
                Create Account
              </button>
            </p>
          </div>

          {/* Additional CTA */}
          <div className="mt-8 p-6 bg-gradient-to-r from-teal-50 to-amber-50 rounded-2xl border border-teal-100">
            <div className="text-center">
              <h3 className="font-semibold text-teal-800 mb-1">New to CampusEase?</h3>
              <p className="text-sm text-gray-600 mb-3">
                Join thousands of students finding their perfect campus life
              </p>
              <div className="flex justify-center space-x-4 text-xs text-gray-500">
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-teal-400 rounded-full mr-1"></div>
                  50+ Campuses
                </span>
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mr-1"></div>
                  10k+ Users
                </span>
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-teal-400 rounded-full mr-1"></div>
                  5k+ Listings
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SignIn;