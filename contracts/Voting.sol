//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";

contract Voting {
    using Counters for Counters.Counter;

    Counters.Counter public _voterId;
    Counters.Counter public _id;

    bool started;
    bool ended;

    /*<---------------------Election Status---------------->*/
    constructor() {
        admin = msg.sender;
        started = false;
        ended = true;
    }

    event electiontime(bool started, bool ended);

    function getStartedValue() public view returns (bool) {
        return started;
    }

    function getEndedValue() public view returns (bool) {
        return ended;
    }

    address public admin;

    modifier onlyAdmin() {
        require(
            admin == msg.sender,
            "This is an admin function, Please Contact admin"
        );
        _;
    }

    function endElection() public onlyAdmin {
        require(started == true && ended == false);

        started = false;
        ended = true;

        emit electiontime(started, ended);
    }

    function startElection() public {
        require(msg.sender == admin, "Only Admin can start Election");
        require(started == false && ended == true);

        started = true;
        ended = false;

        emit electiontime(started, ended);
    }

    function getElectionStatus() public view returns (string memory) {
        if (started == true && ended == true) {
            return "Voting has finished";
        }

        if (started == true && ended == false) {
            return "Voting in Progress";
        }

        return "Voting not-started";
    }

    /* <-----------------------Candidate Details---->  */
    struct CandidateStruct {
        uint256 id;
        uint256 age;
        string name;
        uint256 voteCount;
        address _address;
        string ipfs;
    }

    event CreateCandidate(
        uint256 indexed id,
        uint256 age,
        string name,
        uint256 voteCount,
        address _address,
        string ipfs
    );

    address[] private candidateAddress;
    mapping(address => CandidateStruct) private candidates;

    //<----------------voters details----------->

    address[] private votedVoters;
    address[] private votersAddress;
    mapping(address => VoterStruct) private voters;

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

    function addCandidate(
        address _address,
        uint256 _age,
        string memory _name,
        string memory _ipfs
    ) public onlyAdmin {
        require(
            ended == true,
            "You can not add candidate when election is in progress"
        );
        require(
            candidates[_address]._address == address(0),
            "Candidate with this address already exists"
        ); // check if candidate address already exists
        require(_age >= 18, "Ops! you are not eligible to be a Candidate");
        _id.increment();
        uint256 idNumber = _id.current();

        CandidateStruct storage candidate = candidates[_address];

        candidate.age = _age;
        candidate.name = _name;
        candidate.id = idNumber;
        candidate.voteCount = 0;
        candidate._address = _address;
        candidate.ipfs = _ipfs;

        candidateAddress.push(_address);

        emit CreateCandidate(
            idNumber,
            _age,
            _name,
            candidate.voteCount,
            _address,
            _ipfs
        );
    }

    function getCandidate() public view returns (address[] memory) {
        return candidateAddress;
    }

    function getCandidateLength() public view returns (uint256) {
        return candidateAddress.length;
    }

    function getCandidateData(address _address)
        public
        view
        returns (CandidateStruct memory)
    {
        return (candidates[_address]);
    }

    function Addvoter(
        string memory _name,
        string memory _ipfs,
        uint256 _age
    ) public {
        require(started == false, "Election in progress, Right revoked!");
        require(_age >= 18, "Ops! You are underage");

        _voterId.increment();

        uint256 idNumber = _voterId.current();
        VoterStruct storage voter = voters[msg.sender];
        require(voter.voter_allowed == 0);

        voter.voter_allowed = 1;
        voter.voter_name = _name;
        voter.voter_address = msg.sender;
        voter.voter_age = _age;
        voter.voter_voterId = idNumber;
        voter.voter_vote = 1000;
        voter.voter_voted = false;
        voter.voter_ipfs = _ipfs;

        votersAddress.push(msg.sender);

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

    modifier voteIdExists(address _candidateAddress, uint256 _candidateVoteId) {
        bool voteExists = false;
        for (uint256 i = 0; i < candidateAddress.length; i++) {
            if (
                candidateAddress[i] == _candidateAddress &&
                candidates[candidateAddress[i]].id == _candidateVoteId
            ) {
                voteExists = true;
                break;
            }
        }
        require(voteExists, "Invalid candidate or vote ID");
        _;
    }

    function vote(address _candidateAddress, uint256 _candidateVoteId)
        public
        voteIdExists(_candidateAddress, _candidateVoteId)
    {
        VoterStruct storage voter = voters[msg.sender];

        require(!voter.voter_voted, "You have already voted");
        require(
            started == true,
            "You cannot vote now, wait till the poll is opened for voting"
        );
        require(voter.voter_allowed != 0, "you have no right to vote");
        require(
            candidates[_candidateAddress].id != 0,
            "Invalid candidate address"
        );

        voter.voter_voted = true;
        voter.voter_vote = _candidateVoteId;

        votedVoters.push(msg.sender);

        candidates[_candidateAddress].voteCount += voter.voter_allowed;
    }

    function getVoterLength() public view returns (uint256) {
        return votersAddress.length;
    }

    function getVoterDetails(address _address)
        public
        view
        returns (VoterStruct memory)
    {
        return (voters[_address]);
    }

    function getVotedVoterList() public view returns (address[] memory) {
        return votedVoters;
    }

    function getVoterData() public view returns (VoterStruct memory) {
        return (voters[msg.sender]);
    }

    function getVoterList() public view returns (address[] memory) {
        return votersAddress;
    }

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
