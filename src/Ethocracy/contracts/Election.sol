// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;
pragma experimental ABIEncoderV2;

import "./ElectionBuilder.sol";

contract Election {

    struct Party {
        string name;
        uint id;
    }

    //solidity provides getter and setter functions for all mappings/varriables
    mapping(address => bool) public voters;
    mapping(uint => Party) public parties;
    mapping(bytes => bool) public spentVoterIds;

    string public electionName;
    string public electionDeadline;
    string public electionType;
    string public electionStatus;

    string[] public ballots;
    uint public partyCount = 0;
    uint public ballotCount = 0;
    uint startTime = block.timestamp;
    uint allowedTime;

    Party public winningParty;
    uint public winnerVoteCount = 0;

    string public electionKey;
    string public resultKey = "noKey";

    bytes32[] public hashedVoterIds;
    uint validVoterCount;

    uint public stvSeatCount;
    ElectionBuilder public electionBuilder;

    constructor(string memory _electionName, string[] memory partyNames, uint _time, string memory timeStr, string memory _electionType, uint _stvSeatCount, string memory _electionKey, bytes32[] memory _hashedVoterIds, uint _validVoterCount, address _electionBuilder) public {
        electionName = _electionName;
        allowedTime = _time;
        electionDeadline = timeStr;
        electionType = _electionType;
        electionKey = _electionKey;
        hashedVoterIds = _hashedVoterIds;
        validVoterCount = _validVoterCount;
        stvSeatCount = _stvSeatCount;
        electionBuilder = ElectionBuilder(_electionBuilder);
        electionStatus = "inProgress";
        for (uint i = 0; i < partyNames.length; i++) {
            addParty(partyNames[i]);
        }
    }

    function getAddress () public view returns (address) {
        return address(this);
    }

    function getBallots() public view returns (string[] memory) {
        return ballots;
    }

    function releaseResultKey (string memory _resultKey) public {
        resultKey = _resultKey;
        electionStatus = "complete";
    }

    function addParty (string memory _name) private {
        parties[partyCount] = Party(_name, partyCount);
        partyCount ++;
    }

    function validateUser (bytes memory _voterId) public view returns (bool) {
        bytes32 hashedVoterId = sha256(_voterId);
        for (uint i = 0; i < validVoterCount; i++) {
            if (hashedVoterId == hashedVoterIds[i]) {
                return true;
            }
        }
        return false;
    }

    function castVote (string memory _vote, bytes memory _voterId) public {
        require(block.timestamp - startTime < allowedTime);
        require(!voters[msg.sender]);
        require(!spentVoterIds[_voterId]);
        require(validateUser(_voterId) == true);
        ballots.push(_vote);
        ballotCount++;
        voters[msg.sender] = true;
        spentVoterIds[_voterId] = true;
        electionBuilder.addUserBallot(electionName, msg.sender, _vote);
    }
}