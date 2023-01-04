import React from 'react'
import "./logo.png"


const Banner = () => {
  const URI = `https://cdn-attachments.timesofmalta.com/f8e7921e015c7d265c207ea9c51dc97c96ab8e18-1577000925-5dff1fdd-1920x1280.jpg`
  return (
    <div className='p-8 mx-auto '>
        <h2 className=' flex dark:text-gradient md:justify-center justify-center font-semibold text-2xl mb-5 
        cursor-pointer dark:text-gradient hover:animate-bounce'>ONLINE VOTING Dapp</h2>
        <p className="flex flex-grow md:justify-start justify-center hover:animate-pulse uppercase text-md scroll-m-1 text-gradient">The End of Vote buying is here</p>

        <hr className='my-6 border-gray-300 dark:border-gray-500' />
        <p className='flex  items-end md:justify-end justify-center dark:text-[#f7ff85] uppercase shadow-sm mt-4'> 
          {false ? 'Election In Progress': 'It is not Yet time for Election'}
        </p>
        <div className='flex flex-wrap justify-center items-center mt-4'>
          <div className='relative shadow-sl shadow-black p-3
          bg-gradient dark:bg-[#fff9e9] rounded-lg w-64 h-64 object-contain bg-no-repeat bg-cover overflow-hidden
           mr-2 mb-2 cursor-pointer transition-all duration-75 delay-100
          hover:shadow-[#bd2e7f] outline-none 
          ' style={{backgroundImage: `url(${URI})`}}
          >
            <div className='absolute top-0 left-0 right-0 flex justify-between items-center
            text-white p-4 w-full'>Hello

            </div>
          </div>

        </div>
        </div>
  )
}

export default Banner