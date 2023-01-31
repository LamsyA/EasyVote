import React, { useEffect } from 'react'

import {setGlobalState, truncate, useGlobalState } from '../../store'
import Sidebar from '../Sidebar/Sidebar'


const metadataURI = "https://www.analyticsinsight.net/wp-content/uploads/2021/12/The-Future-of-Robotics-Its-Implications-in-2021-and-Beyond.jpg"
const CandidatePage = () => {
   
    const [allCand] = useGlobalState('allCand') 
    const [showModal] = useGlobalState("showModal")

    
  return (

         <div>
         <Sidebar/>
         <div className='w-4/5 py-10 mx-auto '>
            <div >
            <h4 className='flex dark:text-blue-600 text-[#e32970] text-3xl font-bold uppercase justify-center
                item-center'>Candidate Details</h4>
                <div className='mt-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4
       gap-6 md:gap-4 lg:gap-6 py-2.5     '>

              
                    
                    {allCand.map((candidate, i)=> (
                        <Card key={i} candidate={candidate}/>
                    ))}   
                </div>
            </div>
            </div>
    </div>
  )
}

const Card = ({candidate}) => (

    <div className=' mt-5 shadow-xl shadow-black 
    rounded-md overflow-hidden dark:bg-gray-500
     bg-blue-900 my-10 p-4 w-full'>
        <div className='flex justify-center items-center h-56'>
        <img src={`${candidate.ipfs}`} alt='Title' 
        className='flex object-cover shadow-lg shadow-black rounded-full h-48 w-48
        mb-3   justify-center items-center'/>
        </div>
        <h4 className=' text-white font-semibold'> Candidate #{candidate.candidateId}  </h4>
        <p className='text-yellow-400 text-sm my-1' > Name: {candidate.name}</p>
        <div className='flex justify-between items-center mt-3 text-white'>
            <div className='flex flex-col'>
            <small className='text-xs'> Age: {candidate.age}</small>
           
            <p className='text-sm font-semibold'>  Address {truncate(candidate._address, 4,4,11)}</p>
            
           
            </div>
           <button className=" shadow-lg shadow-black text-white text-sm bg-[#e32970]
            hover:bg-[#bd255f] cursor-pointer rounded-full px-1.5 py-1"
        
            > Total vote {candidate.voteCount} 
            </button>
            
        </div>

    </div>
)
    
export default CandidatePage