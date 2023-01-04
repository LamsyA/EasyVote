import React ,{useState} from 'react'
import { FaBars } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import {AiOutlineClose} from "react-icons/ai"
import {AdminSidebarData} from "./AdminSidebarData"
import "./Sidebar.css"

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
    <div className='navbar dark:bg-gray-700 outline-1  bg-blue-400 '>
        <Link to="#" className='menu-bars cursor-pointer' >
            <FaBars onClick={showSidebar}/> 
        </Link>
    </div>
    <p className='flex item-center py-4 text-center justify-center text-lg font-semibold
    shadow dark:shadow-yellow-200 shadow-red-800 uppercase '>Admin Page</p>
    <nav className={sidebar ? "nav-menu active bg-blue-400 dark:bg-gray-700 " 
    : "nav-menu bg-blue-200 "}>
    <ul className='nav-menu-items'>
      <li onClick={showSidebar} className="navbar-toggle ">
        <Link to="#" className='menu-bars   '>
          <AiOutlineClose />
        </Link>
      </li >
      {AdminSidebarData.map((item, index) =>{
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

export default Sidebar