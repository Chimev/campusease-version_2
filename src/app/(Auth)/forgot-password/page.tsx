'use client'
import React, {useState} from 'react'

const page = () => {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    const onChange = (e: any) => {
        setEmail(e.target.value)
    }

    // const onSubmit = async (e) => {
    //   e.preventDefault()

    //   try {
    //     const auth = getAuth()
    //     await sendPasswordResetEmail(auth, email)
        
    //   } catch (error) {
    //     console.log(error)
    //   }

  return (
    <section className='pt-10'>
    <form className='max-w-sm h-72 flex flex-col m-auto'> 
      <h1 className='text-3xl leading-9 text-center font-bold mb-10'>Reset Password</h1>
      <p className='mb-4'>Please enter your email address, you will receive a link to create a new password via email</p>
      <div>
      <input type="email" id='email' 
      value={email} onChange={onChange}
      placeholder='Email' required />
      </div>
      <button 
            type='submit'
            className='w-full p-2 mb-2 text-lg border-none outline-none text-white bg-orange'
            >{loading ? "loading..." : "Sign in" }</button>
    </form>
    
</section>
  )
}

export default page