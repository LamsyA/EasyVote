import React from 'react'
import Sidebar from '../Sidebar/Sidebar'

const ElectionStatus = () => {
  return (
    <>
    <Sidebar/>
    <div className='p-10 flex items-center justify-center'>
      <button className=' bg-blue-400 rounded-full p-2 leading-snug
      text-white text-xl font-semibold uppercase hover:bg-[#2a08e9]'>
        Start Election 
      </button>

    </div>
    </>
    
  )
}

export default ElectionStatus