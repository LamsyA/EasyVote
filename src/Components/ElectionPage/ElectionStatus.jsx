import React from 'react'
import { electionStatus, endElect, startElect, startElectStatus } from '../../Blockchain.services'
import Sidebar from '../Sidebar/Sidebar'
import { useEffect, useState } from 'react' 
import { setLoadingMsg, setAlert, useGlobalState, setGlobalState } from '../../store'
import { useNavigate } from 'react-router-dom';


const ElectionStatus = () => {

  const[ended] = useGlobalState("ended")
  const [start] = useGlobalState("start")
    //  const [isElectionInProgress, setIsElectionInProgress] = useState(false);

    const navigateTo = useNavigate();
  const endit =async (e) => {
      e.preventDefault()
    if (startElect == true) 
    return 
        // setLoadingMsg("Stopping Election in progress ...")
        try{
         const result = await endElect();
          setGlobalState("start", false)
          setGlobalState("ended",true)
          
          
          
        await  startElectStatus()
        // if (start === true ) { 
        //   setAlert("Election successfully ended")}
        //   else if (startElectStatus() === false )
        //    { setAlert("Error occurred", "red") }
        

      } catch (error){
        console.log("Error: ", error)
        setAlert(error.message, "red")
      }
    }
    
      const startit =async (e) => {
        e.preventDefault()
      if (startElect == false) 
      return 
        // setLoadingMsg("Wait while we start the Election ...")
        try{
         const result = await startElect();
          // setIsElectionInProgress(true)


          setGlobalState("start", true)
          setGlobalState("ended",false)
          
          // if (startElectStatus() === false ) { 
          //   setAlert("Election Started")}
          //   else if (startElectStatus() === true )
          //   {
          //      setAlert("Error occurred", "red") }
          // navigateTo('/CandidatePage')
      } catch (error){
        console.log("Error Uploading Data: ", error)
        setAlert(error.message, "red")
      }
      }
      

     
     

    {startElectStatus()}
    electionStatus()
  return (
    <>
    <div>

    <Sidebar/>



   <div className='p-10 flex items-center justify-center'>
    { start ?  (
      <button className='bg-red-500 text-white font-medium py-2 px-4 rounded-md hover:bg-red-600'
      onClick={endit} 
      > End Election </button>
    ) :   (
      <button className=' bg-indigo-500 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-600'
      onClick={ startit } 
      > Start Election </button>
    )}

  
      </div>
      </div>

        </>
        
      )
    }

    export default ElectionStatus