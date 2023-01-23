import React from 'react'
import { electionStatus, endElect, startElect, startElectStatus } from '../../Blockchain.services'
import Sidebar from '../Sidebar/Sidebar'
import { useEffect, useState } from 'react' 
import { setLoadingMsg, setAlert, useGlobalState, setGlobalState } from '../../store'



const ElectionStatus = () => {

  const[ended] = useGlobalState("ended")
  const [start] = useGlobalState("start")
    //  const [isElectionInProgress, setIsElectionInProgress] = useState(false);

  const endit =async (e) => {
      e.preventDefault()
    if (startElect == true) 
    return 
        setLoadingMsg("Stopping Election in progress ...")
        try{
          await endElect();

          // setIsElectionInProgress(false)

        setGlobalState("start", false)

          
          setGlobalState("ended",true)
          console.log("Election started")
          setAlert("Election Ended successfully")
        await  startElectStatus()

      } catch (error){
        console.log("Error: ", error)
        setAlert(error.message, "red")
      }
    }
    
      const startit =async (e) => {
        e.preventDefault()
      if (startElect == false) 
      return 
        setLoadingMsg("Wait while we start the Election ...")
        try{
          await startElect();
          // setIsElectionInProgress(true)


          setGlobalState("start", true)
          setGlobalState("ended",false)
          
          console.log("Election started")
          setAlert("Election Started ...")

      } catch (error){
        console.log("Error Uploading Data: ", error)
        setAlert(error.message, "red")
      }
      }
      

     
      // const [loaded, setLoaded] = useState(false)

      // useEffect (  () => {
      //   const loadData = async () => {
      //     console.log('Blockchain loaded')
      //     setLoaded(true);
      //     const result = await setIsElectionInProgress() 
      //     loaded()
      // };
      // loadData();
        

      // },[])


  // useEffect(() => {
  //    setIsElectionInProgress() ;
  // }, [])

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