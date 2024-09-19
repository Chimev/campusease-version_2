import React from 'react'

interface Ibutton {
  text: string;
  onClick? : React.MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
  
}

const SecondaryBtn = ({text, onClick, loading } : Ibutton) => {
  return (
    <button type="submit" onClick={onClick}  className='bg-orange text-white border-none text-2xl p-2' >
        {loading ? "loading..." : text}
    </button>
  )
}

export default SecondaryBtn