import React from 'react'

const page = () => {
  const changeDetail = true;
  return (
    <>
      <div className='settings'>
    <form >
    <h3 className='text-3xl font-semibold mb-5'>Settings</h3>

    <input type="text" id='name'  placeholder='Name'  disabled/>

    <input type="email" id='email' placeholder='Email'  disabled />

    <p className='-mt-0 '>Do want to change your name? 
      <span className='text-orange cursor-pointer font-extralight text-sm'>
      {changeDetail ? " Apply Change" : " Edit"}
      </span></p>
    </form>
    </div>
    </>
  )
}

export default page