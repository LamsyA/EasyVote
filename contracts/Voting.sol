//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

// Imports the Counters.sol file from the OpenZeppelin library

import "@openzeppelin/contracts/utils/Counters.sol";

// Defines the Voting contract
contract Voting {
    // Declares that the Counters library will be used for the Counter data type
    using Counters for Counters.Counter;

    // Public variables for counting the number of voters and proposals
    Counters.Counter public _voterId;
    Counters.Counter public _id;

    // Boolean variables used to keep track of the election status
    bool started;
    bool ended;

    /*<---------------------Election Status---------------->*/
    // Constructor function - sets the admin address and initializes the election status variables

    constructor() {
        admin = msg.sender; // msg.sender is the address of the contract creator
        started = false;
        ended = true;
    }

    // Event declaration - emits when the election status changes

    event electiontime(bool started, bool ended);

    // Function to get the current value of started
    function getStartedValue() public view returns (bool) {
        return started;
    }

    // Function to get the current value of ended
    function getEndedValue() public view returns (bool) {
        return ended;
    }

    // Address variable for storing the contract admin
    address public admin;

    // Modifier function - restricts access to admin-only functions
    modifier onlyAdmin() {
        require(
            admin == msg.sender,
            "This is an admin function, Please Contact admin"
        );
        _;
    }

    // Function to end the election - can only be called by the admin
    function endElection() public onlyAdmin {
        // Ensure that the election is in progress
        require(started == true && ended == false);

        // Update the election status

        started = false;
        ended = true;

        // Emit the electiontime event with the updated status
        emit electiontime(started, ended);
    }

    // Function to start the election - can only be called by the admin
    function startElection() public {
        // Ensure that the caller is the admin and that the election has not yet started
        require(msg.sender == admin, "Only Admin can start Election");
        require(started == false && ended == true);

        // Update the election status
        started = true;
        ended = false;

        // Emit the electiontime event with the updated status
        emit electiontime(started, ended);
    }

    // Function to get the current election status as a string
    function getElectionStatus() public view returns (string memory) {
        if (started == true && ended == true) {
            return "Voting has finished";
        }

        if (started == true && ended == false) {
            return "Voting in Progress";
        }

        return "Voting not-started";
    }

    /* ===========================================
       ==============Candidate Details============
       =========================================== */

    // Struct to store information about a candidate

    struct CandidateStruct {
        uint256 id;
        uint256 age;
        string name;
        uint256 voteCount;
        address _address;
        string ipfs;
    }

    // Event that is emitted when a new candidate is created
    event CreateCandidate(
        uint256 indexed id,
        uint256 age,
        string name,
        uint256 voteCount,
        address _address,
        string ipfs
    );

    // Array to store the addresses of all candidates
    address[] private candidateAddress;
    // Mapping to store information about each candidate, keyed by their address
    mapping(address => CandidateStruct) private candidates;

    //<----------------voters details----------->

    // Array to store the addresses of all voters who have cast a vote
    address[] private votedVoters;
    // Array to store the addresses of all voters
    address[] private votersAddress;
    // Mapping to store information about each voter, keyed by their address
    mapping(address => VoterStruct) private voters;

    // Struct to store information about a voter
    struct VoterStruct {
        uint256 voter_voterId;
        string voter_name;
        address voter_address;
        uint256 voter_age;
        uint256 voter_allowed;
        bool voter_voted;
        uint256 voter_vote;
        string voter_ipfs;
    }

    // Event that is emitted when a new voter is created
    event CreatedVoter(
        uint256 indexed voter_voterId,
        string voter_name,
        address voter_address,
        uint256 voter_age,
        uint256 voter_allowed,
        bool voter_voted,
        uint256 voter_vote,
        string voter_ipfs
    );

    // This function allows an admin to add a new candidate to the election.
    // It takes in the candidate's Ethereum address, age, name, and IPFS hash.
    function addCandidate(
        address _address,
        uint256 _age,
        string memory _name,
        string memory _ipfs
    ) public onlyAdmin {
        // Check if the election has ended before adding a new candidate.
        require(
            ended == true,
            "You can not add candidate when election is in progress"
        );
        // Check if a candidate with the given address already exists.
        require(
            candidates[_address]._address == address(0),
            "Candidate with this address already exists"
        );
        // Check if the candidate's age is at least 18.
        require(_age >= 18, "Ops! you are not eligible to be a Candidate");

        // Increment the ID counter and assign the new ID to the candidate.
        _id.increment();
        uint256 idNumber = _id.current();

        // Create a new CandidateStruct and set its attributes.
        CandidateStruct storage candidate = candidates[_address];

        candidate.age = _age;
        candidate.name = _name;
        candidate.id = idNumber;
        candidate.voteCount = 0;
        candidate._address = _address;
        candidate.ipfs = _ipfs;

        // Add the candidate's Ethereum address to an array of candidate addresses.
        candidateAddress.push(_address);

        // Emit an event to notify the client of the new candidate's creation.
        emit CreateCandidate(
            idNumber,
            _age,
            _name,
            candidate.voteCount,
            _address,
            _ipfs
        );
    }

    // This function returns an array of all candidate addresses.
    function getCandidate() public view returns (address[] memory) {
        return candidateAddress;
    }

    // This function returns the length of the candidateAddress array.
    function getCandidateLength() public view returns (uint256) {
        return candidateAddress.length;
    }

    // This function takes in a candidate's Ethereum address and returns their candidate data.
    function getCandidateData(address _address)
        public
        view
        returns (CandidateStruct memory)
    {
        return (candidates[_address]);
    }

    // This function allows a user to add themselves as a voter.
    // It takes in the voter's name, IPFS hash, and age.
    function Addvoter(
        string memory _name,
        string memory _ipfs,
        uint256 _age
    ) public {
        // Check if the election has started before allowing a new voter.
        require(started == false, "Election in progress, Right revoked!");
        // Check if the voter's age is at least 18.
        require(_age >= 18, "Ops! You are underage");

        // Increment the ID counter and assign the new ID to the voter.
        _voterId.increment();

        uint256 idNumber = _voterId.current();

        // Create a new VoterStruct and set its attributes.
        VoterStruct storage voter = voters[msg.sender];
        require(voter.voter_allowed == 0); // Check if the voter already exists.

        voter.voter_allowed = 1;
        voter.voter_name = _name;
        voter.voter_address = msg.sender;
        voter.voter_age = _age;
        voter.voter_voterId = idNumber;
        voter.voter_vote = 0;
        voter.voter_voted = false;
        voter.voter_ipfs = _ipfs;

        // Add the voter's Ethereum address to an array of voter addresses.
        votersAddress.push(msg.sender);

        // Emit an event to notify the client of the new voter's creation.
        emit CreatedVoter(
            idNumber,
            _name,
            msg.sender,
            _age,
            voter.voter_allowed,
            voter.voter_voted,
            voter.voter_vote,
            _ipfs
        );
    }

    // This modifier checks if the candidate address and vote ID exist
    modifier voteIdExists(address _candidateAddress, uint256 _candidateVoteId) {
        bool voteExists = false;
        // iterate over all candidate addresses
        for (uint256 i = 0; i < candidateAddress.length; i++) {
            // check if the candidate address and vote ID match
            if (
                candidateAddress[i] == _candidateAddress &&
                candidates[candidateAddress[i]].id == _candidateVoteId
            ) {
                // set the flag to true and break the loop
                voteExists = true;
                break;
            }
        }
        // require that the flag is true
        require(voteExists, "Invalid candidate or vote ID");
        _;
    }

    // this function allows a voter to cast a vote for a candidate
    function vote(address _candidateAddress, uint256 _candidateVoteId)
        public
        voteIdExists(_candidateAddress, _candidateVoteId)
    {
        // retrieve the voter's information
        VoterStruct storage voter = voters[msg.sender];

        // require that the voter has not already voted
        require(!voter.voter_voted, "You have already voted");

        // require that the election has started
        require(
            started == true,
            "You cannot vote now, wait till the poll is opened for voting"
        );
        // require that the voter is allowed to vote
        require(voter.voter_allowed != 0, "you have no right to vote");
        // require that the candidate address is valid
        require(
            candidates[_candidateAddress].id != 0,
            "Invalid candidate address"
        );
        // set the voter's voted flag to true and update their vote
        voter.voter_voted = true;
        voter.voter_vote = _candidateVoteId;
        // add the voter to the list of voted voters
        votedVoters.push(msg.sender);

        // increment the candidate's vote count by the number of votes the voter has

        candidates[_candidateAddress].voteCount += voter.voter_allowed;
    }

    // Returns the number of voters
    function getVoterLength() public view returns (uint256) {
        return votersAddress.length;
    }

    // Returns the details of a specific voter
    function getVoterDetails(address _address)
        public
        view
        returns (VoterStruct memory)
    {
        return (voters[_address]);
    }

    // Returns a list of addresses for voters who have voted
    function getVotedVoterList() public view returns (address[] memory) {
        return votedVoters;
    }

    // Returns the details of the caller (current user)
    function getVoterData() public view returns (VoterStruct memory) {
        return (voters[msg.sender]);
    }

    // Returns a list of all the addresses for registered voters
    function getVoterList() public view returns (address[] memory) {
        return votersAddress;
    }

    /* This function retrieves the details of the candidate who received the maximum votes, including their vote count,
 name and address. It loops through all the candidate addresses, retrieves the candidate details, and stores the
 details of the candidate with the highest vote count. It then returns the details of the winner.
   */
    function getWinnerDetails()
        public
        view
        returns (
            uint256,
            string memory,
            address
        )
    {
        uint256 maxVotes = 0;
        string memory winnerName;
        address winnerAddress;
        for (uint256 i = 0; i < candidateAddress.length; i++) {
            address candidateAddr = candidateAddress[i];
            CandidateStruct storage candidate = candidates[candidateAddr];
            if (candidate.voteCount > maxVotes) {
                maxVotes = candidate.voteCount;
                winnerName = candidate.name;
                winnerAddress = candidate._address;
            }
        }
        return (maxVotes, winnerName, winnerAddress);
    }

    // This function returns two arrays, one containing the addresses of all the candidates and the other containing
    // their respective vote counts. It loops through all the candidate addresses, retrieves the candidate details,
    // and stores their address and vote count in two separate arrays. It then returns both arrays.

    function getAllCandidateVotes()
        public
        view
        returns (address[] memory, uint256[] memory)
    {
        address[] memory candidateAddresses = new address[](
            candidateAddress.length
        );
        uint256[] memory candidateVotes = new uint256[](
            candidateAddress.length
        );
        for (uint256 i = 0; i < candidateAddress.length; i++) {
            address candidateAddr = candidateAddress[i];
            CandidateStruct storage candidate = candidates[candidateAddr];
            candidateAddresses[i] = candidateAddr;
            candidateVotes[i] = candidate.voteCount;
        }
        return (candidateAddresses, candidateVotes);
    }
}
