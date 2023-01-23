import React from 'react'
import * as AiIcons from "react-icons/ai"
import {AiOutlineUsergroupAdd} from "react-icons/ai"
import {VscArrowSwap} from "react-icons/vsc"
import {CgUserList} from "react-icons/cg"
import {HiViewList} from "react-icons/hi"

export const VoterSidebarData =[
    {
        title:"Dashboard",
        path:'/VoterHome',
        icon: <AiIcons.AiFillHome/>,
        cName: 'nav-text '
    },
    {
        title:"Register",
        path:'/VoterRegister',
        icon: <AiOutlineUsergroupAdd />,
        cName: 'nav-text'
    },
    {
        title:"Voting Poll",
        path:'/VotingPoll',
        icon: <AiIcons.AiOutlineUsergroupAdd/>,
        cName: 'nav-text'
    },
    {
        title:"Vote Summary",
        path:'/VoteSummary',
        icon: <HiViewList/>,
        cName: 'nav-text'
    },


]