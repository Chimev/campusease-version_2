'use client'

import { ChangeEvent } from 'react';

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import Link from 'next/link';

const providers = [
  {provider: 'agent', label: 'agent'},
  {provider: 'service', label: 'service provider'},
  {provider: 'student', label: 'student'}
]

const Register = () => {
  const route = useRouter()
  const [loading, setLoading] = useState(false)
  // For showing password
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  // For agent option
  const [role, setRole] = useState<string[]>([]);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setRole((prevSelected) =>
      checked ? [...prevSelected, value] : prevSelected.filter((item) => item !== value)
    );
  };

  const handleRegister = async (e: any) => {
    e.preventDefault()
    if (role.length === 0) {
      setLoading(false)
      setError("You must select at least one role.");
      return;
    }
    setLoading(true)
    const name = e.target[0].value
    const phone = e.target[1].value.toString()
    const email = e.target[2].value
    const password = e.target[3].value


    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          password,
          role, // Include the isAgent field in the body
        })
      })

      console.log(res)
      if (res.status === 500) {
        setLoading(false)
        setError("Network error")
      }
      if (res.status === 400) {
        setLoading(false)
        setError("This email is already registered")
      }
      if (res.status === 200) {
        setError("")
        route.push("/sign-in")
      }
    } catch (error) {
      setLoading(false)
      setError("Error, try again")
      console.log(error)
    }
  }

  return (
    <section className='pt-10 px-6'>
      <form onSubmit={handleRegister} className='max-w-sm h-auto flex flex-col m-auto'>
        <h1 className='text-3xl leading-9 text-center font-bold mb-10'>Sign Up</h1>
        
        <div className='mb-4'>
          <input 
            type="text" 
            id='name' 
            placeholder='Name' 
            required 
            className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange'
          />
        </div>

        <div className='mb-4'>
          <input 
            type="tel" 
            id='phone' 
            placeholder='Phone' 
            required 
            className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange'
          />
        </div>

        <div className='mb-4'>
          <input 
            type="email" 
            id='email' 
            placeholder='Email' 
            required 
            className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange'
          />
        </div>

        <div className='relative mb-4'>
          <input 
            type={showPassword ? "text" : "password"} 
            id='password' 
            placeholder='Password' 
            required 
            className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange'
          />
          <div className="absolute top-3 right-3 text-gray-500 cursor-pointer">
            {showPassword
              ? <AiFillEyeInvisible onClick={() => setShowPassword(prev => !prev)} />
              : <AiFillEye onClick={() => setShowPassword(prev => !prev)} />}
          </div>
        </div>

        {/* Agent checkbox with styled elements */}
        {/* <div className='flex mb-6'>
          <input 
            type="checkbox" 
            checked={isAgent} 
            onChange={() => setIsAgent(prev => !prev)} 
            id="isAgent" 
            className='w-4 h-4 text-orange bg-gray-100 border-gray-300 rounded focus:ring-orange focus:ring-2'
          />
          <label htmlFor="isAgent" className='ml-2 text-gray-700 text-lg'>
            Register as an agent
          </label>
        </div> */}
        <p className="text-xl font-semibold mb-4">Register as:</p>
        <p className='-mt-3 text-xs'>(you can pick more than one)</p>
        <div className="mb-6">
          {providers.map((provider) => (
            <div key={provider.provider} className="flex items-center mb-4">
              <input
                type="checkbox"
                value={provider.provider}
                onChange={handleCheckboxChange}
                id={provider.provider}
                className="w-4 h-4 text-orange bg-gray-100 border-gray-300 rounded focus:ring-orange focus:ring-2"
              />
              <label htmlFor={provider.provider} className="ml-2 text-gray-700 text-lg">
                {provider.label}
              </label>
            </div>
          ))}
        </div>
        <div className='-mt-7 text-center text-sm text-gray-600'>
        <p>
          By signing up, you agree to our 
          <Link href="/terms" className='text-lightBlue hover:underline mx-1'>Terms and Conditions</Link> 
          and 
          <Link href="/privacy-policy" className='text-lightBlue hover:underline mx-1'>Privacy Policy</Link>.
        </p>
      </div>
        

        

        <button 
          type='submit'
          className='w-full p-2 mb-2 text-lg border-none outline-none text-white bg-orange rounded-md hover:bg-orange-600 transition-all duration-300'
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>

        

        <p className='text-red-600 text-[16px] mb-4'>{error && error}</p>

        <div className='text-center -mt-10'>
          <p>Already have an account? 
            <span onClick={() => route.push("/sign-in")} className='text-lightBlue cursor-pointer font-semibold ml-1'>Sign In</span>
          </p>
        </div>
      </form>
      
    </section>
  )
}

export default Register