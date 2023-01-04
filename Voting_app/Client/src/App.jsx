import Header from './Components/Header'
import Home from './Views/Home'
import { BrowserRouter, Route,  Routes } from 'react-router-dom'
import Voters from './Views/Voters'
import Voterscard from './Components/Voterscard'
import { useEffect } from 'react'
import { electionStatus, getCandidate,  isWallectConnected } from './Blockchain.services'
import AddCandidate from './Components/AdminPage/AddCandidate'
import Sidebar from './Components/Sidebar/Sidebar'
import ElectionStatus from './Components/AdminPage/ElectionStatus'
import { ToastContainer } from 'react-toastify'
import { connectWallet } from './Blockchain.services'
import CandidatePage from './Components/AdminPage/CandidatePage'







const App = () => {
  useEffect ( () => {
   isWallectConnected() 
   getCandidate() 
   electionStatus()
  // getCandidateD()
  },[])

  return (
    <div className="min-h-screen bg-white text-gray-900
    dark:bg-[#212936] dark:text-gray-300">
    <Header />
    {/* <BrowserRouter> */} 

      <Routes>
    <Route path="/" exact element={<Home/>} />
    <Route  path="/Voterscard/" element={<Voterscard/>} />
    <Route  path="/AddCandidate/" element={<AddCandidate/>} />
    <Route  path="/Sidebar/" element={<Sidebar/>} />
    <Route  path="/ElectionStatus/" element={<ElectionStatus/>} />
    <Route  path="/CandidatePage/" element={<CandidatePage />} />
    
    </Routes>
    
    {/* </BrowserRouter> */}

    <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      </div>

    

  )
}

export default App