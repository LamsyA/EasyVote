import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
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
        </div>
        {connectedAccount ? (<div className='flex flex-col mt-10  justify-center '>
          <div className='flex justify-center items-center'>
          <Link to='/VoterHome' className='flex flex-col justify-center items-center text-2xl  '>
            {<button className=' uppercase  justify-center items-center
         hover:bg-blue-900 bg-blue-600 rounded-full px-5 py-2 shadow-xl
          shadow-black'> Voter Login</button>}           
          </Link>
          </div>
          <div className='flex mt-5 justify-center '>
          <Link to='/CandidatePage' className='flex flex-col justify-center items-center text-2xl  '>
          {<button className=' uppercase  justify-center items-center
         hover:bg-amber-900 bg-blue-600 rounded-full px-6 py-3 shadow-xl
          shadow-black'> Admin Login</button>}
          </Link>
          </div>
        </div>
        ): null}
        
        </div>
  
        
  )
}

export default Banner