import React, {useEffect, useState} from 'react'
import { BarChart,Bar, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts'
import { useGlobalState } from '../../store'
import Sidebar from '../Sidebar/Sidebar'


const Summary = () => {
  const [allCand] = useGlobalState("allCand")
  const [winnerDetails] = useGlobalState("winnerDetails")

  
  const [data,setData] = useState([{
    
  }])

  useEffect(() => {
    setData(allCand.map(candidate => ({ name: candidate.name, voteCount: candidate.voteCount })))
  }, [allCand])

  return (
    <>
   <Sidebar/>
   <div className='flex flex-col p-5 '>
   <div className='flex justify-center items-center mt-5'>
            <p className='text-gradient uppercase font-bold
             md:text-5xl text-xl'> Vote Summary </p> 
          </div>
   </div>
    <div className='p-15 flex sm:flex-[1.5] justify-center items-center mx-auto 
    md:w-full w-4/6  mt-4 overflow-auto text-blue-600 '>
      <BarChart 
        width={850}
        height={400}
        data={data}
        margin={{
          top: 40, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="2 " />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="voteCount" fill="#ff08c5" />
      </BarChart>

    </div>
    </>
  )
}

export default Summary
