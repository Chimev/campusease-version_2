'use client'

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { signIn, useSession } from 'next-auth/react';


const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const route = useRouter();
  const [error, setError] = useState("")
  const session = useSession();

  useEffect( () => {
    if(session?.status === "authenticated") {
      route.replace('/')
    }
  },[session, route] )


  const handleLogin = async (e:any) => {
    e.preventDefault()
    const email = e.target[0].value;
    const password = e.target[1].value;

    setLoading(true)

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password
    })

    if(res?.error) {
      setLoading(false)
      setError("Invalid email or password");
      if(res?.url) route.replace("/")
    }else {
      setError("");
    }

   }





  return (
    <section className='pt-10 px-6'>
      <form onSubmit={handleLogin} className='max-w-sm h-72 flex flex-col m-auto'>
        <h1 className='text-3xl leading-9 text-center font-bold mb-10'>
          Sign In
        </h1>
        <div>
          <input
            type="email"
            id="email"
            placeholder="Email"
            required
          />
        </div>
        <div className='relative'>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Password"
            required
          />
          <div className="absolute top-3 right-3">
            {showPassword ? (
              <AiFillEyeInvisible onClick={() => setShowPassword(!showPassword)} />
            ) : (
              <AiFillEye onClick={() => setShowPassword(!showPassword)} />
            )}
          </div>
        </div>
        <button
          type="submit"
          className='w-full p-2 text-lg border-none outline-none text-white bg-orange'
          disabled={loading} // Disable button while loading
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <p className='text-red-600 text-[16px] -mt-1' >{error && error}</p>
        <div className='text-center -mt-7'>
          <p>
            Don't have an account yet?{' '}
            <span
              onClick={() => route.push('/register')}
              className='text-orange cursor-pointer font-semibold text-xs'
            >
              Register
            </span>
          </p>
          <p
            onClick={() => route.push('/forgot-password')}
            className='text-lightBlue cursor-pointer font-semibold -mt-5'
          >
            Forgot Password?
          </p>
        </div>
      </form>
      {/* <ToastContainer /> */}
    </section>
  );
};

export default SignIn;
