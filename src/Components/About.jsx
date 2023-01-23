import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { useGlobalState,setGlobalState } from '../store'

const About = () => {
    const [aboutModal] = useGlobalState("aboutModal")
  return (
    <div   >
         <div className={`fixed top-0 left-0 w-screen h-screen flex items-center
          justify-center bg-black bg-opacity-50 transform transition-transform duration-300 
          ${aboutModal} z-50 `}>
            <div className='bg-white dark:bg-[#111b3e] shadow-lg
          shadow-[#122643] dark:shadow-amber-200 rounded-xl w-11/12 md:w-3/5 lg:w-2/5 
          h-7/12 p-6'> 
             <div className='flex  justify-between '>
             <p className='flex text-blue-500 text-3xl dark:text-white uppercase mt-5
            justify-center items-center'
            >How to Vote</p>
             <button type='button' className='border-0 bg-transparent  focus:outline-none'
            onClick={() => setGlobalState("aboutModal", "scale-0")}
            >
                <FaTimes />
            </button>
             </div>
           
            <div className='flex flex-col '>
            <div className='flex justify-center items-center  mt-5'>
            <p className='text-blue-500 text-lg dark:text-white  '>
             
              <li className='mb-2 '>Connect Your Wallet, make sure you are using Goerli network</li>
             <li className='mb-2'> Click on Voter Login</li>
             <li className='mb-2'>Register yourself</li>
             <li className='mb-2'>Wait For Admin to start the Election</li>
            <span className='mb-2'>Note, Once the Admin starts the election, 
            the lock on the Navbar will be opened.
            You will not be able to register
             and the poll will be opened for voting.</span> 
            
            </p>

            </div>
           

            
            </div>
          </div>
          </div>
     
        
    
    </div>
  )
}

export default About