'use client'

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

interface SignInForm {
  email: string;
  password: string;
}

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const route = useRouter();

  const [formData, setFormData] = useState<SignInForm>({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  // Assuming you have a suitable authentication function
  // const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   try {
  //     setLoading(true);
  //     // Implement your authentication logic here
  //     const user = await authenticate(email, password);
  //     if (user) {
  //       toast.success('Success Notification!');
  //       setTimeout(() => {
  //         route.push('/');
  //       }, 2000);
  //     } else {
  //       toast.error('Invalid email or password');
  //     }
  //   } catch (error) {
  //     toast.error('Error logging in');
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <section className='pt-10'>
      <form className='max-w-sm h-72 flex flex-col m-auto'>
        <h1 className='text-3xl leading-9 text-center font-bold mb-10'>
          Sign In
        </h1>
        <div>
          <input
            type="email"
            id='email'
            value={email}
            onChange={onChange}
            placeholder='Email'
            required
          />
        </div>
        <div className='relative'>
          <input
            type={showPassword ? 'text' : 'password'}
            id='password'
            value={password}
            onChange={onChange}
            placeholder='Password'
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
          type='submit'
          className='w-full p-2 mb-2 text-lg border-none outline-none text-white bg-orange'
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <div className='text-center'>
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
            className='text-lightBlue cursor-pointer font-semibold'
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
