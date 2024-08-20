'use client'
import { useRouter } from 'next/navigation'
import  { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'



interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const route = useRouter()
  const [loading, setLoading] = useState(false)
   //for showing password
   const [showPassword, setShowPassword] = useState(false)
   const [error, setError] = useState("");

   const handleRegister = async (e:any) => {
    e.preventDefault()
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      })
      if(res.status === 400){
        setError("This email is already registered");
      }if(res.status === 200){
        setError("");
        route.push("/sign-in");
      }
    } catch (error) {
       setError("Error, try again");
       console.log(error)
    }
   }


  return (
    <section className='pt-10'>
        <form onSubmit={handleRegister} className='max-w-sm h-72 flex flex-col m-auto'>
            <h1 className='text-3xl leading-9 text-center font-bold mb-10'>Sign Up</h1>
            <div>
            <input type="text" id='name' 
            placeholder='Name' required />
            </div>
            <div>
            <input type="email" id='email' 
            placeholder='Email' required />
            </div>

            <div className='relative'>
            <input  type={showPassword ? "test" : "password"} id='password' 
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
            <p className='text-red-600 text-[16px] mb-4' >{error && error}</p>

            <div className='text-center'>
            <p>Already have an account? <span onClick={() => route.push("/sign-in")}  className='text-lightBlue cursor-pointer font-semibold'>Sign In </span></p>
            </div>
        </form>
        {/* <ToastContainer /> */}
    </section>
  )
}

export default Register