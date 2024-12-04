import React from 'react'


const Loading = ({big}: any) => {
  return (
    <div className={big ? "loader" : "loader-2"}></div>
  )
}

export default Loading