"use client"

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

const SignIn = () => {
    // const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const route = useRouter()

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const {email, password} = formData;


    const onChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.id] : e.target.value
        }))
    }

    // const onSubmit = async (e) => {
    //     e.preventDefault()

    //     try {
    //         console.log("first")
    //         setLoading(true)
    //         const auth = getAuth();
    //         const userCredentials = await signInWithEmailAndPassword(auth, email, password)
    //         if(userCredentials.user){
    //             toast.success("Success Notification !");
    //             setTimeout(() => {
    //                 navigate("/")
    //             }, 2000);
    //             setLoading(false)
    //         }
    //     } catch (error) {
    //         toast.error("Error!");
    //         setLoading(false)
    //         console.log(error)
    //     }
    // }
  return (
    <section className='pt-10'>
        
        <form className='max-w-sm h-72 flex flex-col m-auto' >
            <h1 className='text-3xl leading-9 text-center font-bold mb-10'>Sign In</h1>
            <div>
            <input type="email" id='email' 
            value={email} onChange={onChange}
            placeholder='Email' required />
            </div>

            <div className='relative'>
            <input  type={showPassword ? "test" : "password"} id='password' 
            value={password} onChange={onChange} 
            placeholder='Password' required />
            <div className="absolute top-3 right-3">
            {showPassword 
            ? <AiFillEyeInvisible onClick={() => setShowPassword(prev => !prev)}/> 
            : <AiFillEye onClick={() => setShowPassword(prev => !prev)}/>}
            </div>
            </div>
            <button 
            type='submit'
            className='w-full p-2 mb-2 text-lg border-none outline-none text-white bg-orange'
            >{loading ? "loading..." : "Sign in" }</button>
            <div className='text-center'>
            <p>Don't have an account yet <span onClick={() => route.push('/register')} className='text-orange cursor-pointer fomt-semibold text-xs' >Register</span></p>
            <p onClick={() => route.push('/forgot-password')} className='text-lightBlue cursor-pointer font-semibold'>Forgot Password?</p>
            </div>
        </form>
        {/* <ToastContainer /> */}
    </section>
  )
}

export default SignIn