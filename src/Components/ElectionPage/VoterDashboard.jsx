import React ,{useState} from 'react'
import { FaBars } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import {AiOutlineClose} from "react-icons/ai"
import {VoterSidebarData} from "./VoterSidebarData"
import "../Sidebar/Sidebar.css"
import { useGlobalState } from '../../store'



const VoterDashboard = () => {
  const metadataURI = "https://www.analyticsinsight.net/wp-content/uploads/2021/12/The-Future-of-Robotics-Its-Implications-in-2021-and-Beyond.jpg"
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const[eachVoter] = useGlobalState("eachVoter")

  return (
    <>
    <div className='navbar sticky top-20 z-0 dark:bg-gray-700 outline-1  bg-blue-400 '>
        <Link to="#" className='menu-bars cursor-pointer' >
            <FaBars onClick={showSidebar}/> 
        </Link>
    </div>
  
    <nav className={sidebar ? "nav-menu active bg-blue-400 dark:bg-gray-700 " 
    : "nav-menu bg-blue-200 "}>
    <ul className='nav-menu-items'>
      <li onClick={showSidebar} className="navbar-toggle ">
        <Link to="#" className='menu-bars   '>
          <AiOutlineClose />
        </Link>
      </li >
      {VoterSidebarData.map((item, index) =>{
        return(
          <li key={index} className={item.cName}>
            <Link to={item.path} >
              {item.icon}
              <span className='ml-2 '>{item.title}</span>
            </Link>

          </li>
        )
      })}
    </ul>
    </nav>
    
     
      
    </>
  )
}

export default VoterDashboard