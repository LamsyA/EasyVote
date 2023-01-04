//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";

contract Voting {
    using Counters for Counters.Counter;

    Counters.Counter public _voterId;
    Counters.Counter public _candidateId;

    bool started;
    bool ended;

    /*<---------------------Election Status---------------->*/
    constructor() {
        admin = msg.sender;
        started = false;
        ended = true;
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
    }

    function startElection() public {
        require(msg.sender == admin, "Only Admin can start Election");
        require(started == false && ended == true);

        started = true;
        ended = false;
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
    struct Candidate {
        uint256 candidateId;
        uint256 age;
        string name;
        uint256 voteCount;
        address _address;
        string ipfs;
    }

    event CreateCandidate(
        uint256 indexed candidateId,
        uint256 age,
        string name,
        uint256 voteCount,
        address _address,
        string ipfs
    );

    address[] public candidateAddress;
    mapping(address => Candidate) public candidates;

    //<----------------voters details----------->

    address[] public votedVoters;
    address[] public votersAddress;
    mapping(address => Voter) public voters;

    struct Voter {
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
        _candidateId.increment();
        uint256 idNumber = _candidateId.current();

        Candidate storage candidate = candidates[_address];

        candidate.age = _age;
        candidate.name = _name;
        candidate.candidateId = idNumber;
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
        returns (
            uint256,
            string memory,
            uint256,
            uint256,
            string memory,
            address
        )
    {
        return (
            candidates[_address].age,
            candidates[_address].name,
            candidates[_address].candidateId,
            candidates[_address].voteCount,
            candidates[_address].ipfs,
            candidates[_address]._address
        );
    }

    function voteRight(
        address _address,
        string memory _name,
        string memory _ipfs,
        uint256 _age
    ) public {
        require(started == false, "Election in progress, Right revoked!");
        require(_age >= 18, "Ops! You are underage");

        _voterId.increment();

        uint256 idNumber = _voterId.current();
        Voter storage voter = voters[_address];
        require(voter.voter_allowed == 0);

        voter.voter_allowed = 1;
        voter.voter_name = _name;
        voter.voter_address = _address;
        voter.voter_age = _age;
        voter.voter_voterId = idNumber;
        voter.voter_vote = 1000;
        voter.voter_voted = false;
        voter.voter_ipfs = _ipfs;

        votersAddress.push(_address);

        emit CreatedVoter(
            idNumber,
            _name,
            _address,
            _age,
            voter.voter_allowed,
            voter.voter_voted,
            voter.voter_vote,
            _ipfs
        );
    }

    function vote(address _candidateAddress, uint256 _candidateVoteId) public {
        Voter storage voter = voters[msg.sender];

        require(!voter.voter_voted, "You have already voted");
        require(
            started == true,
            "You cannot vote now, wait till the poll is opened for voting"
        );
        require(voter.voter_allowed != 0, "you have no right to vote");

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
        returns (
            uint256,
            string memory,
            address,
            uint256,
            string memory,
            bool
        )
    {
        return (
            voters[_address].voter_voterId,
            voters[_address].voter_name,
            voters[_address].voter_address,
            voters[_address].voter_age,
            voters[_address].voter_ipfs,
            voters[_address].voter_voted
        );
    }

    function getVotedVoterList() public view returns (address[] memory) {
        return votedVoters;
    }

    function getVoterList() public view returns (address[] memory) {
        return votersAddress;
    }
}