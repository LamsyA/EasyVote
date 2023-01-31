import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { endElectStatus, startElectStatus } from '../Blockchain.services'
import { useGlobalState } from '../store'
import logo from '../assets/logo.png'
import Typewriter from 'typewriter-effect';


const Banner = () => {


  //  console.log("election.....", startElectStatus())
   const [connectedAccount] = useGlobalState('connectedAccount')

   const [start] = useGlobalState("start")
   const [ended] = useGlobalState("ended")

   useEffect(() => {
    endElectStatus()
   startElectStatus() 
  }, [start]) 

  // {console.log("start:............", start)}
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
        ): 
       (
         <div className='flex items-center justify-center  '> 
       <div className='w-1/2'>
       <img src={logo}
       />
       </div>
       <div className='w-1/2'>
        <div className='mt-10 mb-10 font-bold text-5xl dark:text-white
         text-blue-500 uppercase'>
       <Typewriter
             options={{
               strings: [
                 
                 "Blockchain-based voting",
                 "Peer-to-peer election process",
                 "Distributed voting system",
                 "Secure and transparent voting",
                 "Decentralized vote counting",
                 "Empowered citizens through decentralization",
                 "Democratizing the voting process",
                 "Trustless voting mechanism",
                 "No intermediaries in the voting process",
                 "Voting on the blockchain",
                 'Faultless System',
               ],
               autoStart: true,
               loop: true,
             }}
           />
       
       </div>
       <div> 
         <p className='font-semibold dark:text-slate-400 text-slate-900 text-3xl'> EasyVote uses 
         revolutionary approach to the traditional
          election process that utilizes the power of blockchain technology to create a secure,
           transparent, and tamper-proof method of conducting election.</p>
       </div>
       </div>
       
     </div>
        )}
        
        </div>
  
        
  )
}

export default Banner