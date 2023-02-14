import Header from './Components/Header'
import Home from './Views/Home'
import { BrowserRouter, Route,  Routes } from 'react-router-dom'
import Voters from './Views/Voters'
import { useEffect } from 'react'
import {  connectWallet, 
   getEachVoter,
     electionStatus,
    getCandidate,
     getVoter,
      isWalletConnected,
      startElectStatus,
      winner} from './Blockchain.services'

import AddCandidate from './Components/ElectionPage/AddCandidate'
import Sidebar from './Components/Sidebar/Sidebar'
import ElectionStatus from './Components/ElectionPage/ElectionStatus'
import CandidatePage from './Components/ElectionPage/CandidatePage'
import Loading from './Components/Loading'
import Alert from './Components/Alert'
import VoterDashboard from './Components/ElectionPage/VoterDashboard'
import VoterRegister from './Components/ElectionPage/VoterRegister'
import VotingPoll from './Components/ElectionPage/VotingPoll'
import { useState } from 'react'
import VoteSummary from './Components/ElectionPage/VoteSummary'
import Vote from './Components/ElectionPage/Vote'
import VoterHome from './Components/ElectionPage/VoterHome'
import Summary from './Components/ElectionPage/Summary'
import About from './Components/About'


const App = () => {
  const [loaded, setLoaded] = useState(false)

  useEffect (  () => {
    const loadData = async () => {
      console.log('Blockchain loaded')
      setLoaded(true);
      const result = await isWalletConnected()
   await     startElectStatus()
   await getCandidate() 
   await winner()
   await  electionStatus()
   await  getVoter()
   await getEachVoter()
  };
   loadData();
    
 
  },[])

  return (
    <div className="min-h-screen bg-white text-gray-900
    dark:bg-[#212936] dark:text-gray-300">
    <Header />



      <Routes>
  
    <Route path="/" exact element={<Home/>} />
    <Route  path="/AddCandidate/" element={<AddCandidate/>} />
    <Route  path="/Sidebar/" element={<Sidebar/>} />
    <Route  path="/ElectionStatus/" element={<ElectionStatus/>} />
    <Route  path="/CandidatePage/" element={<CandidatePage />} />
    <Route  path="/VoterDashboard/" element={<VoterDashboard/>} />
    <Route  path="/VoterRegister/"  element={<VoterRegister/>} />
    <Route  path="/VotingPoll/"  element={<VotingPoll/>} />
    <Route  path="/VoteSummary/"  element={<VoteSummary/>} />
    <Route  path="/VoterHome/"  element={<VoterHome/>} />
    <Route  path="/Summary/"  element={<Summary/>} />
    </Routes>


       <Vote/>
       <About/>
        <Loading/>
        <Alert/>
        
      </div>

    

  )
}

export default App