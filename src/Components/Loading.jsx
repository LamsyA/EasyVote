import React from 'react'
import { useGlobalState } from '../store'

const Loading = () => {
  const [loading] = useGlobalState('loading')
  return (
    <div
        className={`fixed top-0 left-0 w-screen h-screen
        flex items-center justify-center dark:bg-[#8b82c6] 
        dark:bg-opacity-50 bg-[#8573e8] bg-opacity-40
        transform transition-transform duration-300 ${loading.show ? 
          "scale-100": "scale-0"}`}>
        <div
        className='bg-[#600be9] dark:bg-[#151c25] shadow-xl shadow-[#565457]
        rounded-xl min-w-min px-10 pb-2 '
        > 
            <div
            className='flex flex-col text-white'
            > <div className='flex justify-center items-center'>
            <div className='lds-dual-ring scale-50'>  </div>
                <p className='text-lg'>processing...</p>      
                </div>
                <small className='text-center'>{loading.msg}</small>
            </div>
        </div>
    </div>
  )
}

export default Loading