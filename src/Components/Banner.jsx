import React, { useEffect } from 'react'
import { endElectStatus, startElectStatus } from '../Blockchain.services'
import { useGlobalState } from '../store'
import "./logo.png"


const Banner = () => {


   console.log("election.....", startElectStatus())
   const [connectedAccount] = useGlobalState('connectedAccount')

   const [start] = useGlobalState("start")
   const [ended] = useGlobalState("ended")

   useEffect(() => {
    endElectStatus()
   startElectStatus() 
  }, [start]) 

  const URI = `https://www.aclu-ky.org/sites/default/files/styles/hero_big_wide_1200x530/public/field_banner_image/2022_august_restoration_of_voting_right_webpage_header_0.png?itok=9yfgR2Pe`
  {console.log("start:............", start)}
  return (
    <div>
    <div className='p-8 mx-auto '>
        <h2 className=' flex text-gradient md:justify-center justify-center font-semibold text-3xl mb-5 
        cursor-pointer dark:text-gradient hover:animate-bounce uppercase md:text-6xl '>ONLINE VOTING dapp</h2>
        <p className="flex flex-col md:justify-start justify-center hover:animate-pulse uppercase
         text-2xl scroll-m-1 mt-20 text-gradient">The End of Vote buying is here </p>
 
        <hr className='my-6 border-gray-300 dark:border-gray-500' />
        <p className='flex  items-end md:justify-end justify-center dark:text-[#f7ff85] uppercase shadow-sm mt-4'> 
          {start == true && ended==false ? 'Election In Progress': 'It is not Yet time for Election'}
        </p>
        <div>
        <img src={URI} alt="voting" className="mx-36  object-contain" /> </div>
        </div>

        </div>
  
        
  )
}

export default Banner