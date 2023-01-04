// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.6.0 <0.9.0;

contract Voting {
    bool started;
    bool ended;

    struct Voter {
        uint256 weight;
        bool voted;
        uint256 vote;
    }

    struct electionDetails {
        bytes32 name;
        uint256 voteCount;
    }

    mapping(address => Voter) public voters;

    electionDetails[] public candidateDetails;

    address public admin;

    constructor() {
        admin = msg.sender;
        started = true;
        ended = false;
        voters[admin].weight = 1;
    }

    function addCandidate(bytes32[] memory candidate) public {
        for (uint256 i = 0; i < candidate.length; i++) {
            candidateDetails.push(
            electionDetails({name: candidate[i], voteCount: 0})
            );
        }
    }

    function giveRightToVote(address voter) public {
        require(
            msg.sender == admin,
            "Contact the admin for permission to vote"
        );
        require(!voters[voter].voted, "You have voted.");
        require(voters[voter].weight == 0);
        voters[voter].weight = 1;
    }

    function vote(uint256 candidateId) public {
        require(started == true && ended == false);
        Voter storage sender = voters[msg.sender];
        require(sender.weight != 0, "Has no right to vote");
        require(!sender.voted, "You already voted.");
        sender.voted = true;
        sender.vote = candidateId;

        candidateDetails[candidateId].voteCount += sender.weight;
    }

    function winningCandidate() public view returns (uint256 winningProposal_) {
        uint256 winningVoteCount = 0;
        for (
            uint256 highestVote = 0;
            highestVote < candidateDetails.length;
            highestVote++
        ) {
            if (candidateDetails[highestVote].voteCount > winningVoteCount) {
                winningVoteCount = candidateDetails[highestVote].voteCount;
                winningProposal_ = highestVote;
            }
        }
    }

    function winnerName() public view returns (bytes32 winnerName_) {
        winnerName_ = candidateDetails[winningCandidate()].name;
    }

    function startElection() public {
        require(msg.sender == admin);
        require(started == true && ended == true);

        started = true;
        ended = false;
    }

    function endElection() public {
        require(msg.sender == admin);
        require(started == true && ended == false);

        started = true;
        ended = true;
    }

    function getStatus() public view returns (string memory) {
        if (started == true && ended == true) {
            return "Voting has finished";
        }

        if (started == true && ended == false) {
            return "Voting in Progress";
        }

        return "Voting not-started";
    }
}
