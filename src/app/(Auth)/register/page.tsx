'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

const Register = () => {
  const route = useRouter()
  const [loading, setLoading] = useState(false)
  // For showing password
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  // For agent option
  const [isAgent, setIsAgent] = useState(false)

  const handleRegister = async (e: any) => {
    e.preventDefault()
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
          isAgent, // Include the isAgent field in the body
        })
      })
      if (res.status === 400) {
        setLoading(false)
        setError("This email is already registered")
      }
      if (res.status === 200) {
        setError("")
        route.push("/sign-in")
      }
    } catch (error) {
      setError("Error, try again")
      setLoading(false)
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
        <div className='flex mb-6'>
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
        </div>

        <button 
          type='submit'
          className='w-full p-2 mb-2 text-lg border-none outline-none text-white bg-orange rounded-md hover:bg-orange-600 transition-all duration-300'
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>

        <p className='text-red-600 text-[16px] mb-4'>{error && error}</p>

        <div className='text-center'>
          <p>Already have an account? 
            <span onClick={() => route.push("/sign-in")} className='text-lightBlue cursor-pointer font-semibold ml-1'>Sign In</span>
          </p>
        </div>
      </form>
    </section>
  )
}

export default Register