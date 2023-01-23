import React, { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import {MdPersonAdd} from "react-icons/md"
import { setAlert, setGlobalState, setLoadingMsg, useGlobalState } from '../../store'
import { voterVote } from '../../Blockchain.services'



const Vote = () => {

    const imageURL = 'https://media.istockphoto.com/id/1316420668/vector/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-web-user-symbol.jpg?s=612x612&w=0&k=20&c=AhqW2ssX8EeI2IYFm6-ASQ7rfeBWfrFFV4E87SaFhJE='


    const [candidate] = useGlobalState("candidate")

    const [address, setAddress] = useState("")
    const [id, setId] = useState("")

    const [showModal] = useGlobalState('showModal')



    const handleSubmit = async (e) => {
      e.preventDefault()
      if(!address || !id  ) return
      setGlobalState("showModal", "scale-0")
      
  
      try{
        setLoadingMsg("Wait while we process your Vote")
          const vote = { address,id}
          setLoadingMsg("Your Vote will be reverted if the poll is not opened for voting. Please wait...")
     await voterVote(vote)
      
        setAlert( "Successfully Voted!");
       

      closeToggle()
      } catch (error){
        console.log("Error Uploading Data: ", error)
        setAlert(error.message, "red")
      }
  
  }



    const closeToggle = () => {
        setGlobalState("showModal", "scale-0")
        resetForm()
    } 

    const resetForm =() => {
      setAddress("")
      setId("")
  
  }
  const [allCand] = useGlobalState('allCand') 

  return (
    <>
   
    <div className='flex '>
       
  
    <div className={`fixed top-0 left-0 w-screen h-screen flex items-center
          justify-center bg-black bg-opacity-50 transform transition-transform duration-300
          ${showModal} z-50 
      `}><div className='bg-white dark:bg-[#212936] shadow-lg
          shadow-[#122643] dark:shadow-gray-500 rounded-xl w-11/12 md:w-3/5 lg:w-2/5 
          h-7/12 p-6'> 
        <div  className='flex flex-col'> 
            <div className='flex justify-between items-center'>
                <p className=' font-semibold '>
                     View Candidate </p>
                <button type='button' className='border-o
                bg-transparent focus:outline-none'
                onClick={() => setGlobalState("showModal", "scale-0")}
                >
                    <FaTimes />
                </button>
            </div>
            <div className='flex justify-center items-center mt-5'>
                <div className='rounded-xl overflow-hidden h-40 w-40'>
                <img 
                src= {`${candidate?.ipfs}`}
                alt='Profile Picture'
                className='h-full w-full object-cover cursor-pointer'
                />
                </div>                
                </div>

                <div className="flex flex-col justify-start rounded-xl mt-5">
            <h4 className="uppercase text-blue-600 font-semibold ">
            NAME: {candidate?.name}
               
              </h4>
            <p className="text-black dark:text-white text-xs my-1">
              Age: {candidate?.age}
              </p>

            <div className="flex justify-between items-center mt-3 text-white">
              <div className="flex justify-start items-center">
               
                <div className="flex flex-col justify-center items-start">
                  <small className="dark:text-yellow-400 text-orange-500
                   font-bold">Address:</small>
                  <small className="dark:text-purple-300 text-orange-500 
                  font-bold mr-2">
                    
                      {candidate?._address} 
                  </small>
                </div>
              </div>

              <div className="flex flex-col">
                <small className="text- dark:text-green-400 text-fuchsia-500 ">Candidate ID</small>
                <p className="ml-8 font-bold dark:text-green-500 text-fuchsia-500 text-sm ">
                 
                   {candidate?.candidateId}</p>
              </div>
            </div>
          </div>


          <form onSubmit={handleSubmit} className='flex flex-col'> 
           
            
            <div className='flex justify-between items-center border
             border-gray-500 rounded-xl mt-5'>
                <input className='block w-full text-sm bg-transparent border-0' 
                type="number"
                name='id'
                placeholder=' Candidate id'
                onChange={(e)=> setId(e.target.value)}
                value={id}
                required />
            </div>
            <div className='flex justify-between items-center border
             border-gray-500 rounded-xl mt-5'>
                <input className='block w-full text-sm bg-transparent border-0' 
                type="text"
                name='address'
                placeholder=' Candidate Address  E.g 0x21....0f90'
                onChange={(e)=> setAddress(e.target.value)}
                value={address}
                required />
            </div>
          { }
            <button 
            type='submit'
            className="mt-5 px-6 py-2.5 bg-red-600 transition duration-150
                                font-medium text-sm leading-tight uppercase rounded-full
                                text-white active:bg-yellow-500 ease-in-out
                                 hover:bg-blue-800 "
                                 
                           > Vote Candidate</button>
        </form>


        </div>
    </div>
    </div>
    </div>
    </>
  )
} 

export default Vote