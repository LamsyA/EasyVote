import React from 'react'
import * as AiIcons from "react-icons/ai"
import {VscArrowSwap} from "react-icons/vsc"
import {SiStatuspage} from "react-icons/si"
import {HiViewList} from "react-icons/hi"

export const AdminSidebarData =[

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
    {
        title:"Vote Summary",
        path:'/Summary',
        icon: <SiStatuspage/>,
        cName: 'nav-text '
    },

]