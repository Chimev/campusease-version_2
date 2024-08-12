'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

const Register = () => {
  const route = useRouter()
  const [loading, setLoading] = useState(false)
   //for showing password
   const [showPassword, setShowPassword] = useState(false)

   //hook for the forms
   const [formData, setFormData] = useState({
    name: "",
    email : "",
    password : ""
})

const {name, email, password} = formData;

 //for the input values
 const onChange = (e) => {
  setFormData(prev => ({
      ...prev,
      [e.target.id] : e.target.value
  }))
}

   //Form Hanndler
//    const onSubmit = async (e) => {
//     e.preventDefault()
    
//     try {
//         //auth is gettting the getAuth methos from firebase
//         const auth = getAuth()
//         //userCredential returns a promise with the following data
//         const userCredential = await createUserWithEmailAndPassword(auth, email, password)
//         //We are using this method to get our Name from the form (stil part of the UC)
//         updateProfile(auth.currentUser, {displayName : name})
//         const user =  userCredential.user;

//         //We are storing the Auth in the Database without the password here
//         const formDataCopy = {...formData}
//         delete formDataCopy.password
//         //this would help us with time it was created
//         formDataCopy.timestamp = serverTimestamp();

//         //Saving in DataBase
//         await setDoc(doc(db, "users", user.uid), formDataCopy)
//         toast.success("Success Notification !");
//         setTimeout(() => {
//             navigate("/")
//         }, 2000);
//     } catch (error) {
//         toast.error("Error!");
//         console.log(error)
//     }
// }




  return (
    <section className='pt-10'>
        <form className='max-w-sm h-72 flex flex-col m-auto'>
            <h1 className='text-3xl leading-9 text-center font-bold mb-10'>Sign Up</h1>
            <div>
            <input type="text" id='name' 
            value={name} onChange={onChange}
            placeholder='Name' required />
            </div>
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
            <p>Already have an account? <span onClick={() => route.push("/sign-in")}  className='text-lightBlue cursor-pointer font-semibold'>Sign In </span></p>
            </div>
        </form>
        {/* <ToastContainer /> */}
    </section>
  )
}

export default Register