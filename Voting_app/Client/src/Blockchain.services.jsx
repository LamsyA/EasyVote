import Web3 from 'web3'
import { setGlobalState, getGlobalState } from './store'
import abi from './abis/Voting.json'




const { ethereum } = window
window.web3 = new Web3(ethereum)
window.web3 = new Web3(window.web3.currentProvider)


const connectWallet = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    setGlobalState('connectedAccount', accounts[0].toLowerCase())
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

const startedElection = async () => {
  try {
    const contract = await getEtheriumContract()
    const account = getGlobalState('connectedAccount')
    const start = await contract.methods.startElection().call({from: account})
    console.log(start)
    return start
  } catch (error) {
    reportError(error)
  }
}

const endedElection = async () => {
  try {
    const contract = await getEtheriumContract()
    const account = getGlobalState('connectedAccount')
    const end = await contract.methods.endElection().call({from: account})
    return end
  } catch (error) {
    reportError(error)
  }
}

const electionStatus = async () => {
  try {
    const contract = await getEtheriumContract()

    const status = await contract.methods.getElectionStatus().call()
    console.log(status)
    return status
  } catch (error) {
    reportError(error)
  }
}



const addCan = async ({ address, age, name ,metadataURI }) => {
  try {
  const contract = await getEtheriumContract()
    const account = getGlobalState('connectedAccount')
   const candidate =  await contract.methods.addCandidate(address, age, name ,metadataURI ).send({ from: account})
       console.log(candidate)
    return true
  } catch (error) {
    reportError(error)
  }
}

const getCandidate = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')

    const contract = await getEtheriumContract()
   // const account = getGlobalState('connectedAccount')
    const allCandidate = await contract.methods.getCandidate().call()
    console.log(allCandidate)
     const eachCandidate = allCandidate.map(async (cand) => {
     const singleCandidateData = await contract.methods.getCandidateData(cand).call()
     const pushCandidate = []
     pushCandidate.push(singleCandidateData);
    console.log(singleCandidateData)
    console.log(pushCandidate)

     const candidateImage = await contract.methods.getCandidateImage(cand).call()
     const candidateName = await contract.methods.getCandidateName(cand).call()

    /// console.log(candidateImage)
      console.log(singleCandidateData[0])
      console.log(singleCandidateData[1])
      console.log(singleCandidateData[2])
      console.log(singleCandidateData[3])
      console.log(singleCandidateData[4])
      console.log(singleCandidateData[5])
    //  console.log(candidateName)
      setGlobalState('singleCandidateData', singleCandidateData)
      setGlobalState('pushCandidate', structuredData(pushCandidate))
      setGlobalState('candidateImage', candidateImage)
      setGlobalState('candidateName', candidateName)
      console.log(structuredData(pushCandidate))
    })

} catch (error) {
  reportError(error)
}
}




const structuredData = (pushCandidate) =>  ({
     age: pushCandidate[0][0],
      name: pushCandidate[0][1],
      candidateId: pushCandidate[0][2],
      voteCount: pushCandidate[0][3],
      ipfs: pushCandidate[0][4],
      address: pushCandidate[0][5],
      
    
  })
     




export {connectWallet,
  isWallectConnected,
  getEtheriumContract,
  startedElection,
  endedElection,
  getCandidate,
  addCan,
  electionStatus,
//  getCandidateD,


}