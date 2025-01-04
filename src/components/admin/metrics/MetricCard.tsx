import React from 'react'

const MetricCard = ({metricTitle, icon, number}: any) => {
  return (
    <div className=' flex items-center  justify-between gap-4 bg-white px-6 rounded-lg shadow-md text-xl font-semibold'>
        <div className='flex items-center justify-between gap-3 text-2xl '>
            <p>{icon}</p>
            <h4 className=''>{metricTitle}</h4>
        </div>
        <p className='md:text-lg font-bold text-gray-700'>
            {number}
        </p>
    </div>
  )
}

export default MetricCard
