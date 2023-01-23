import React from 'react'
import { useState,useEffect  } from 'react'
import { ethers } from 'ethers';
import Web3Modal from "web3modal";
import axios from 'axios'; 
import { useRoutes } from 'react-router-dom';




// internal Import
import { VotingAddress,VotingAddressABI } from '../constants';

const cilent = ipfsHttpClient("https://infura.io:5001/api/v0")

const fetchContract = (signerorProvider) => new ethers.Contract(VotingAddress, VotingAddressABI, signerorProvider) 

export const VotingContext = React.createContext();

export const VotingProvider = ({children})=> {

    return (
        <VotingContext.Provider value={{}}>
            {children}
        </VotingContext.Provider>
    )
}


