import { GiVote} from "react-icons/gi"
import { MdLightMode} from "react-icons/md"
import {FaLock, FaMoon} from "react-icons/fa" 
import { useEffect, useState } from "react"
import { setGlobalState, truncate, useGlobalState } from '../store'
import { connectWallet, endElectStatus, startElectStatus } from "../Blockchain.services"
import {FaUnlockAlt} from "react-icons/fa"
import { Link } from "react-router-dom"



const Header = () => {
    const [theme, setTheme] = useState(localStorage.theme)
    const themeColor = theme === 'dark' ? 'light' : 'dark'
    const darken = theme ==='dark' ? true : false
 const [connectedAccount] = useGlobalState('connectedAccount')

    useEffect(() => {
        const root = window.document.documentElement
        root.classList.remove(themeColor)
        root.classList.add(theme)
        localStorage.setItem('theme', theme)
    }, [themeColor, theme])

    const toggleLight =() => {
        const root = window.document.documentElement
        root.classList.remove(themeColor)
        root.classList.add(theme)
        localStorage.setItem("theme", theme)
        setTheme(themeColor)
    }

    const [start] = useGlobalState("start")
    const [ended] = useGlobalState("ended")
 
    useEffect(() => {
        endElectStatus()
        startElectStatus() 
   }, [start]) 


  return (
    <div className='sticky top-0 z-50 dark:text-blue-500'>
        <nav className='navbar navbar-expand-lg shadow-md py-2 relative 
        flex items-center w-full justify-between bg-white
        dark:bg-[#212936]'>
        <div className='px-5 w-full flex flex-wrap items-center
        justify-between'>

            <div className='grow flex justify-between items-center p-2 '>
                <Link to="/" className='flex justify-start items-center space-x-3 cursor-pointer'  >
                    <GiVote 
                    className="text-blue-700" size={40}/>
                    <span className="invisible md:visible dark:text-gray-300 text
                    font-bold uppercase text-gradient text-lg">EasyVote
                    </span>
                </Link>

                <div className='flex  items-end  justify-center dark:text-[#ebff11]
                 text-[#ffac11] uppercase shadow-sm mt-4'> 
          {start == true && ended==false ?

          (<div>
             <FaUnlockAlt
           className="cursor-pointer animate-pulse "
            size={35}/><p className="invisible md:visible font-semibold text-lg text-gradient">LIVE</p>
             </div>)
           : 
          ( 
          <div className="flex items-center mb-3">
            <FaLock
                    className="cursor-pointer text-blue-500 ml-10  "
                     size={35}/> <span className="md:font-bold  text-lg
                     ml-3 text-gradient invisible md:visible">Voting not started</span>
            </div> )
           }
           </div>
           <div>
             <button className="mr text-xs font-semibold md:text-lg text-gradient "
             onClick={() => setGlobalState("aboutModal", "scale-100")}>How to Vote</button>
             </div>
            

                <div className="flex justify-center items-center space-x-5">
                    {darken ? 
                    <FaMoon onClick={toggleLight}
                    className="cursor-pointer"
                     size={25}/>
                    :
                    <MdLightMode onClick={toggleLight}
                    className="cursor-pointer"
                     size={25}/>  }

                        {connectedAccount ? (
                            <button className="px-4 py-2.5 active:bg-gradient-to-r from-blue-200 bg-blue-500
                            hover:from-green-500 font-medium text-sm leading-tight 
                            uppercase rounded-full shadow-md shadow-gray-400 transition duration-150
                            ease-in-out dark:text-blue-500 dark:border 
                            dark:border-blue-500 dark:shadow-transparent dark:bg-transparent text-white " 
                             > {truncate(connectedAccount, 4,4,11)} </button>
                        ) : (
                            <button className="px-4 py-2.5 active:bg-gradient-to-r from-blue-200 bg-blue-500
                        hover:from-green-500 font-medium text-sm leading-tight 
                        uppercase rounded-full shadow-md shadow-gray-400 transition duration-150
                        ease-in-out dark:text-blue-500 dark:border 
                        dark:border-blue-500 dark:shadow-transparent dark:bg-transparent text-white "
                         onClick={connectWallet}  > Connect Wallet</button>
                        )}
                       
                </div>
            </div>
            
        </div>
        </nav>
    </div>
  )
}

export default Header