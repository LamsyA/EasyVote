import React from 'react'
import * as AiIcons from "react-icons/ai"
import {VscArrowSwap} from "react-icons/vsc"
import {CgUserList} from "react-icons/cg"
import {HiViewList} from "react-icons/hi"

export const AdminSidebarData =[
    {
        title:"Home",
        path:'/Sidebar',
        icon: <AiIcons.AiFillHome/>,
        cName: 'nav-text '
    },
    {
        title:"Add Candidate",
        path:'/AddCandidate',
        icon: <AiIcons.AiOutlineUsergroupAdd/>,
        cName: 'nav-text'
    },
    {
        title:"Election Status",
        path:'/ElectionStatus',
        icon: <VscArrowSwap/>,
        cName: 'nav-text'
    },
    {
        title:"Candidate Details",
        path:'/CandidatePage',
        icon: <HiViewList/>,
        cName: 'nav-text'
    },

]