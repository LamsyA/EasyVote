
import {GiVote} from "react-icons/gi"
import {MdLightMode} from "react-icons/md"
import {FaMoon} from "react-icons/fa" 
import { useEffect, useState } from "react"
import { truncate, useGlobalState } from '../store'
import { connectWallet } from "../Blockchain.services"




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

    // const connectWalletHandler = () =>{
    //     if(typeof window !== "undefined" && typeof window.ethereum !== "undefined"){
    //         window.ethereum.request({method: "eth_requestAccounts"})
    //         console.log("connected")
    //     }
    //     else {
    //         console.log("please install metamask")
    //     }

    // }
  return (
    <div className='sticky top-0 z-50 dark:text-blue-500'>
        <nav className='navbar navbar-expand-lg shadow-md py-2 relative 
        flex items-center w-full justify-between bg-white
        dark:bg-[#212936]'>
        <div className='px-5 w-full flex flex-wrap items-center
        justify-between'>

            <div className='grow flex justify-between items-center p-2'>
                <a  className='flex justify-start items-center space-x-3'  >
                    <GiVote  size={40}/>
                    <span className="invisible md:visible dark:text-gray-300">EasyVote
                    </span>
                </a>

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