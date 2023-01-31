import React from 'react'
import { truncate, useGlobalState } from '../../store'
import VoterDashboard from './VoterDashboard'

const VoterHome = () => {
    const [eachVoter] = useGlobalState("eachVoter")
    const [connectedAccount] = useGlobalState("connectedAccount")
   

  return (
    <div>
        <VoterDashboard/>
        <div className='flex flex-col justify-center items-center mx-auto mt-10 '>
          <h1 className='dark:text-red-500 text-yellow-400 text-2xl font-semibold
          uppercase '>Welcome {eachVoter.voter_name} To EasyVote </h1>
            <div className='mt-10 flex-col font-medium transition-transform 
             dark:text-white text-slate-900 animate-pulse ease-in '>
              <p> Navigate to the How to vote page to read more on the how to vote
              </p>
              </div>
        </div>
         <div className=' justify-center items-center w-3/5 p-10  mx-auto  '>
      <div className='grid grid-cols-1 md:grid-cols- lg:grid-cols-2
       gap-6 md:gap-4 lg:gap-3 py-2.5 '>
        
      <div className=' mt-5 shadow-xl shadow-black dark:shadow-blue-300 rounded-md overflow-hidden
     bg-gray-900 my-10 p-4 w-full hover:cursor-pointer'>
        <div className='flex justify-center items-center h-56'>
        <img src={`${eachVoter[7]}` } alt='Title' 
        className='flex object-cover shadow-lg shadow-black rounded-full h-40 w-40
        mb-3   justify-center items-center'/>
        </div>
        <h4 className=' text-white font-semibold'> Voter ID #{ connectedAccount ?   (`${eachVoter.voter_voterId}`): null } </h4>
        <p className='text-pink-300 text-sm my-2 font-medium' >Voter's Name: { connectedAccount ?  (`${eachVoter.voter_name}`) : null}</p>
        <div className='flex justify-between items-center mt-3 text-white'>
            <div className='flex flex-col'>
            <small className='text-xs'> Age: { connectedAccount ?  (`${eachVoter.voter_age}`) : null}</small>
            {/* <p className='text-sm font-semibold'>  Address {truncate(singleVoterdetails._address, 4,4,11)}</p> */}
            </div>
           <button className="shadow-lg shadow-black text-white  bg-[#f60808]
            hover:bg-[#bd267f] cursor-pointer rounded-full px-1.5 text-sm py-1">Voted For: { connectedAccount ?  (`${eachVoter.voter_vote}`) : null}   </button>
        </div>
       
    </div>
   
      </div>
      </div>

    </div>
  )
}

export default VoterHome