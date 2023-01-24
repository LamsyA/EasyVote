import React from 'react'
import { CgLock } from 'react-icons/cg'
import {truncate, useGlobalState, setGlobalState } from '../../store'
import VoterDashboard from './VoterDashboard'



const metadataURI = "https://www.analyticsinsight.net/wp-content/uploads/2021/12/The-Future-of-Robotics-Its-Implications-in-2021-and-Beyond.jpg"
const VotingPoll = () => {
    const [allCand] = useGlobalState('allCand')
    const [showModal] = useGlobalState("showModal") 
    const [eachVoter] = useGlobalState("eachVoter")

  return (

         <div>
         <VoterDashboard/>
         <div className='w-4/5 py-10 mx-auto  '>
            <div>
            <h4 className='flex dark:text-blue-600 text-[#e32970] text-3xl font-bold uppercase justify-center
                item-center'>Voting Poll</h4>
                <div className='grid grid-cols-3 lg:grid-col-4
            gap-6 md:gap-4 lg:gap-4 py-8  '>

                                 
                    {allCand.map((candidate, i)=> (
                        <Card key={i} candidate={candidate}/>
                    ))}   
                </div>
                
            </div>
            </div>
    </div>
  )
}

const Card = ({candidate}) =>{
    const [eachVoter] = useGlobalState("eachVoter")

    const setCandidate = () => {
        setGlobalState("candidate", candidate)
        setGlobalState("showModal", "scale-100")
    }
    return (
        <>
        <div className='flex flex-col items-center'>
    <div className=' mt-5 shadow-xl shadow-black dark:shadow-blue-300 rounded-md overflow-hidden
     bg-gray-800 my-10 p-4 w-full hover:cursor-pointer hover:shadow-orange-600
      dark:hover:shadow-lime-500'>
        <div className='flex justify-center items-center h-56'>
        <img src={`${candidate.ipfs}`} alt='Title' 
        className='flex object-cover shadow-lg shadow-black rounded-full h-48 w-48
        mb-3   justify-center hover:opacity-90 items-center'/>
        </div>
        <h4 className=' text-white font-semibold'> Candidate ID #{candidate.id}  </h4>
        <p className='text-yellow-400 text-sm my-1' > Name: {candidate.name}</p>
        <div className='flex justify-between items-center mt-3 text-white'>
            <div className='flex flex-col'>
            <small className='text-xs'> Age: {candidate.age}</small>
            <p className='text-sm font-semibold'>  Address {truncate(candidate._address, 4,4,11)}</p>
            </div>

           <button className="shadow-lg shadow-black text-white text-xs bg-[#e32970]
            hover:bg-[#bd255f] cursor-pointer rounded-full px-1.5 py-1"> Candidate vote {candidate.voteCount}</button>
        </div>
        { !eachVoter.voter_voted == true ? (
            <div className='flex justify-center items-center'> 
                 <button 
            type='submit'
            className="mt-5 px-6 py-2.5 bg-blue-600 transition duration-150
                 flex justify-center items-center
                  font-medium text-sm leading-tight uppercase rounded-full
                text-white active:bg-yellow-500 ease-in-out      
                   hover:bg-blue-800 "
             onClick={setCandidate }   
                > Vote Candidate</button>
            </div >
        ) : (<div className="mt-5 px-6 py-2.5 bg-blue-600 transition duration-150
        flex justify-center items-center
         font-medium text-sm leading-tight uppercase rounded-full
       text-white active:bg-rose-500 ease-in-out 
        hover:bg-blue-800 " > Voted <CgLock size={15} /></div> ) }
       
    </div>
        <div/>
        </div>
        </>
    
        )
    }

export default VotingPoll