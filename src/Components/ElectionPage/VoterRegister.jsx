import React, { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import {MdPersonAdd} from "react-icons/md"
import { setAlert, setGlobalState, setLoadingMsg, useGlobalState } from '../../store'
import { create } from 'ipfs-http-client'
import { Buffer } from 'buffer'
import { addVoter } from '../../Blockchain.services'
import Loading from '../Loading'
import VoterDashboard from './VoterDashboard'

const auth =
  'Basic ' +
  Buffer.from(
    import.meta.env.VITE_INFURA_ID + ':' + import.meta.env.VITE_INFURA_SECRET_KEY,
  ).toString('base64')

const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
})


const VoterRegister = () => {

    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [fileUrl, setFileUrl] = useState('')
     const [picture, setPicture] = useState(null);

    const [modal] = useGlobalState('modal')


        
        
    const handleFileChange = (event) => {
        setPicture(URL.createObjectURL(event.target.files[0]));
      }

    const handleSubmit = async (e) => {
    e.preventDefault()
    if( !age || !name  ) return
    setGlobalState("modal", "scale-0")
    setLoadingMsg("Wait while we upload your data...")

    try{
        const created = await client.add(fileUrl)
         setLoadingMsg(`Registration ${name} in progress...`)
         
        const metadataURI = `https://ipfs.io/ipfs/${created.path}`
        const newData = {  name, metadataURI, age}
     
   await addVoter(newData) 
   setAlert(`${name} Successfully Added...`)
    closeToggle()
    } catch (error){
      console.log("Error Uploading Data: ", error)
      setAlert("Action Reverted ", 'red')
      
    }

}

const changeImage = async (e) => {
    const reader = new FileReader()
    if(e.target.files[0]) reader.readAsDataURL(e.target.files[0])
    reader.onload = (readerEvent) => {
        const file = readerEvent.target.result
        setPicture(file)
        setFileUrl(e.target.files[0]) 
    }
}

    const closeToggle = () => {
        setGlobalState("modal", "scale-0")
        resetForm()
    } 

    const resetForm =() => {
        setName("")
        setAge("")
        setPicture(null)
    }

  return (
    <>
 
   <VoterDashboard/>
    <div className='flex '>
        
        <div className='mx-auto dark:text-white
         mt-10 transparent  font-bold text-2xl' >
        <p className='flex mb-5 text-start uppercase items-center
        text-gradient dark:text-blue-500 justify-center  '>
          This page is Exclusively For Voters to Register  
          </p>
          <div className='flex flex-col justify-center item-center
           mt-10 cursor-pointer hover:animate-pulse' >
            
           <button className=' size
             bg-blue-400 rounded-full  p-2 leading-tight 
      text-white text-xl font-semibold uppercase hover:bg-[#2a08e9]
      dark:text-blue-500 dark:border 
      dark:border-blue-500 dark:shadow-transparent dark:bg-transparent'
       onClick={() => setGlobalState("modal", "scale-100")}
      >
        Register
           </button>
           </div>
        </div>
    <div className={`fixed top-0 left-0 w-screen h-screen flex items-center
          justify-center bg-black bg-opacity-50 transform transition-transform duration-300
          ${modal} z-50 
      `}><div className='bg-white dark:bg-[#212936] shadow-lg
          shadow-[#122643] dark:shadow-gray-500 rounded-xl w-11/12 md:w-2/5
          h-7/12 p-6'> 
        <form onSubmit={handleSubmit} className='flex flex-col'> 
            <div className='flex justify-between items-center'>
                <p className=' font-semibold '>
                     ADD VOTER</p>
                <button type='button' className='border-o
                bg-transparent focus:outline-none'
                onClick={closeToggle}
                >
                    <FaTimes />
                </button>
            </div>
            <div className='flex justify-center items-center mt-5'>
                <div className='rounded-xl overflow-hidden h-20 w-20'>
                <img 
                src= { picture ||
                'https://media.istockphoto.com/id/1316420668/vector/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-web-user-symbol.jpg?s=612x612&w=0&k=20&c=AhqW2ssX8EeI2IYFm6-ASQ7rfeBWfrFFV4E87SaFhJE='}
                alt='Profile Picture'
                className='h-full w-full object-cover cursor-pointer'
                />
                </div>
            </div>
            <div className='flex justify-between items-center border border-gray-500
             rounded-xl mt-5'>
                <input className='block uppercase w-full text-sm bg-transparent border-0' 
                type="text"
                name='name'
                placeholder='  Voter Name'
                onChange={(e)=> setName(e.target.value)}
                value={name}
                required />
            </div>
            <div className='flex justify-between items-center border
             border-gray-500 rounded-xl mt-5'>
                <input className='block w-full text-sm bg-transparent border-0' 
                type="number"
                name='age'
                placeholder=' Voter Age'
                onChange={(e)=> setAge(e.target.value)}
                value={age}
                required />
            </div>

            <div className='flex justify-between items-center border
             border-gray-500 rounded-xl mt-5'>
                <input   accept="image/png,  image/jpeg,"
                className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-[#19212c] file:text-gray-400
                  hover:file:bg-[#1d2631]
                  cursor-pointer focus:ring-0 focus:outline-none"
                type="file"
                onChange={changeImage}
                
                required />
            </div>
            <button 
            type='submit'
            className="mt-5 px-6 py-2.5 bg-blue-600 transition duration-150
                                font-medium text-sm leading-tight uppercase rounded-full
                                text-white active:bg-yellow-500 ease-in-out
                                 hover:bg-blue-800 "
                                 
                           > Create Voter</button>
        </form>
    </div>
    </div>
    </div>
    </>
  )
} 

export default VoterRegister