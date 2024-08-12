import React from 'react'

interface Ibutton {
  text: string;
  onClick? : React.MouseEventHandler<HTMLButtonElement> 
  
}

const SecondaryBtn = ({text, onClick}: Ibutton) => {
  return (
    <button type="submit" onClick={onClick}  className='bg-orange border-none text-2xl p-2' >
        {text}
    </button>
  )
}

export default SecondaryBtn