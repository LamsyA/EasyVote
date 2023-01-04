import React from 'react'
import { useGlobalState } from '../../store'
import Sidebar from '../Sidebar/Sidebar'


const metadataURI = "https://www.analyticsinsight.net/wp-content/uploads/2021/12/The-Future-of-Robotics-Its-Implications-in-2021-and-Beyond.jpg"
const CandidatePage = () => {
   // const [pushCandidate] = useGlobalState('pushCandidate')
    const [singleCandidateData] = useGlobalState('singleCandidateData') 

  return (

         <>
         <Sidebar/>
         <div className='w-4/5 py-10 mx-auto '>
            <div>
            <h4 className='flex dark:text-blue-500 text-[#e32970] text-3xl font-bold uppercase justify-center
                item-center'>Candidate Details</h4>
                <div>
                    
                {singleCandidateData.map((el) => (
                <div key={i} >
                  <div >
                    <img src={el[4]} alt="Profile photo" />
                  </div>

                  <div >
                    <p>
                      {el[1]} #{el[2].toNumber()}
                    </p>
                    <p>{el[0]}</p>
                    <p>Address: {el[6].slice(0, 10)}..</p>
                  </div>
                </div>
              ))}


                    
                {/* <img src={singleCandidateData[4]} alt='Title' 
        className='flex object-cover shadow-lg shadow-black rounded-full h-48 w-56
        mb-3   justify-center items-center'/></div>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-col-4
            gap-6 md:gap-4 lg:gap-3 py-8  '>
     */}
                {Array.isArray(singleCandidateData) && singleCandidateData.fill().map((cand, i)=> (
            <Card key={i} cand={cand}/>
            ))}
                </div>
            </div>
            </div>
    </>
  )
}

const Card = ({cand}) =>(
    <div className=' mt-5 shadow-xl shadow-black dark:shadow-blue-200 rounded-md overflow-hidden
     bg-gray-800 my-10 p-4 w-full'>
        <div className='flex justify-center items-center h-56'>
        <img src={cand[4]} alt='Title' 
        className='flex object-cover shadow-lg shadow-black rounded-full h-48 w-56
        mb-3   justify-center items-center'/>
        </div>
        <h4 className=' text-white font-semibold'> Candidate #{cand[2]}  </h4>
        <p className='text-yellow-400 text-sm my-1' > Name{cand[1]}</p>
        <div className='flex justify-between items-center mt-3 text-white'>
            <div className='flex flex-col'>
            <small className='text-xs'> Age</small>
            <p className='text-sm font-semibold'>  Address</p>
            </div>
           <button className="shadow-lg shadow-black text-white text-sm bg-[#e32970]
            hover:bg-[#bd255f] cursor-pointer rounded-full px-1.5 py-1"> Candidate #</button>
        </div>
    </div>
)

export default CandidatePage