import Web3 from 'web3'
import { setGlobalState, getGlobalState , setAlert,} from './store'
import abi from "../build/contracts/Voting.json"


const { ethereum } = window
window.web3 = new Web3(ethereum)
window.web3 = new Web3(window.web3.currentProvider)


const connectWallet = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    setGlobalState('connectedAccount', accounts[0])
  } catch (error) {
    reportError(error)
  }
}

const isWallectConnected = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    const accounts = await ethereum.request({ method: 'eth_accounts' })

     window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload()
    })

    window.ethereum.on('accountsChanged', async () => {
      setGlobalState('connectedAccount', accounts[0].toLowerCase())
      await isWallectConnected()
    })

    if (accounts.length) {
      setGlobalState('connectedAccount', accounts[0].toLowerCase())
    } else {
      alert('Please connect wallet.')
      console.log('No accounts found.')
    }
  } catch (error) {
    reportError(error)
  }
}


const getEtheriumContract = async () => {
  const connectedAccount = getGlobalState('connectedAccount')

  if (connectedAccount) {
    const web3 = window.web3
    const networkId = await web3.eth.net.getId()
    const networkData = await abi.networks[networkId]
    if (networkData) {
      const contract = new web3.eth.Contract(abi.abi, networkData.address)
      return contract
    } else {
      return null
    }
  } else {
    return getGlobalState('contract')
  }
}


const startElect = async () => {
  try {
   const contract = await getEtheriumContract()
    const account = getGlobalState('connectedAccount')
    const started =  await contract.methods.startElection().send({from: account}).then(function(receipt) {
    console.log("Election Started Successfully");
    return true;
    })
    
  } catch (error) {
    setAlert(" Revoked; Only Admin can Start Election", 'red')
    reportError(error)
  }
}


const startElectStatus = async () => {
  try {
    const contract = await getEtheriumContract()
     const account = getGlobalState('connectedAccount')
     const start = await contract.methods.getStartedValue().call()
    // console.log(start)
    setGlobalState('start', start)
    
  } catch (error) {
    
    reportError(error)
  }
}


const endElect = async () => {
  try {
   const contract = await getEtheriumContract()
    const account = getGlobalState('connectedAccount')
    const end =  await contract.methods.endElection().send({from: account}).then(function(receipt) {
    // console.log(end);
    return true
    })   
    console.log("Election has Ended")  
    console.log("ended2: ",end)
    
  } catch (error) {
    setAlert("Revoked; Only Admin can End Election", 'red')
    reportError(error)
  }
}

const endElectStatus = async () => {
  try {
   const contract = await getEtheriumContract()
    const account = getGlobalState('connectedAccount')
    const ended = await contract.methods.getEndedValue().call()
    // console.log(ended)
    
    setGlobalState('ended', ended)
  } catch (error) {
    reportError(error)
  }
}



const electionStatus = async () => {
  try {
   const contract = await getEtheriumContract()
  const account = getGlobalState('connectedAccount')
  const status = await contract.methods.getElectionStatus().call({from: account})
    // console.log(status)
    
  } catch (error) {
    reportError(error)
  }
}



const addCan = async ({ address, age, name ,metadataURI }) => {
  try {
  const contract = await getEtheriumContract()
    const account = getGlobalState('connectedAccount')
   const candidate =  await contract.methods.addCandidate(address, age, name ,metadataURI ).send({ from: account})
        //  console.log(candidate)
        window.location.reload()
    return true
    
  } catch (error) {
   setAlert("Uploading Candidate Data Failed...", "red")
    reportError(error)
  }
}



const addVoter = async ({ name ,metadataURI, age }) => {
  try {
  const contract = await getEtheriumContract()
    const account = getGlobalState('connectedAccount')
   const candidate =  await contract.methods.Addvoter(name ,metadataURI, age ).send({ from: account})
     
    return true
  } catch (error) {
    setAlert("Action Reverted ", 'red')
    reportError(error)
    console.log(JSON.stringify(error))
  }
}


const voterVote = async ({ address ,id}) => {
  try {
  const contract = await getEtheriumContract()
    const account = getGlobalState('connectedAccount')
   const newVote =  await contract.methods.vote(address , id).send({ from: account})
      
      window.location.reload()
    return true
  } catch (error) {
    setAlert("Vote Reverted ", 'red')
    reportError(error)
  }
}

const getEachVoter = async () => {
  try {
    const contract = await getEtheriumContract()
     const account = getGlobalState('connectedAccount')
    
     const eachVoter = await contract.methods.getVoterData().call({from: account})

     setGlobalState('eachVoter', eachVoter)
  } catch (error) {
    
    reportError(error)
  }
}

 const allCandidateVotes =async () => {
  try {
    const contract = await getEtheriumContract()
     const account = getGlobalState('connectedAccount')
     const allVotes = await contract.methods.getAllCandidateVotes().call({from: account})
     setGlobalState('allVotes', allVotes)
  } catch (error) {
    
    reportError(error)
  }
} 

const winner =async () => {
  try {
    const contract = await getEtheriumContract()
     const account = getGlobalState('connectedAccount')
     const winnerDetails = await contract.methods.getWinnerDetails().call({from: account})
     setGlobalState('winnerDetails', winnerDetails)
  } catch (error) {
    
    reportError(error)
  }
} 

const getCandidate = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')

   const contract = await getEtheriumContract()
   const account = getGlobalState('connectedAccount')
    const allCandidate = await contract.methods.getCandidate().call({ from: account})
    // console.log("returnValue1: ",allCandidate)
    //  console.log("getCand",allCandidate)
    
     const allCand = []
 
     const pushCandidate = allCandidate.map(async (cand) => {
     const singleCandidateData = await contract.methods.getCandidateData(cand).call({ from: account})
       allCand.push(singleCandidateData)
      //  console.log(allCand)
       setGlobalState('singleCandidateData', singleCandidateData)
       setGlobalState('allCand', allCand)
       window.location.reload()
    })  
     
}  catch (error) {
   reportError(error)
}
}


const getVoter = async () => {
  try {
   if (!ethereum) return alert('Please install Metamask')

    const contract = await getEtheriumContract()
   const account = getGlobalState('connectedAccount')
    const allVoters = await contract.methods.getVoterList().call({ from: account})
    // console.log("return Voters: ",allVoters)
    //  console.log("getCand",allVoter)
    
    const allVoter = []
 
     const pushvoter = allVoters.map(async (account) => {
      const singleVoterdetails = await contract.methods.getVoterDetails(account).call({ from: account})
      // console.log("SingleVoter",singleVoterdetails)
      allVoter.push(singleVoterdetails)
      // console.log(allVoter)
      setGlobalState('singleVoterdetails', singleVoterdetails)
      setGlobalState('allVoter', allVoter)
    })  
     
}  catch (error) {
    reportError(error)
}
}

const reportError = (error) => {
}


export {connectWallet,
 isWallectConnected,
  getEtheriumContract,
  startElect,
 endElect,
  getCandidate,
  addCan,
  electionStatus,
  addVoter,
  getVoter,
  startElectStatus,
  endElectStatus,
  getEachVoter,
  voterVote,
  winner,
  allCandidateVotes,
}