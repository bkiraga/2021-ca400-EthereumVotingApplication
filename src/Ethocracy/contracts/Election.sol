// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;
pragma experimental ABIEncoderV2;

contract Election {
  struct Party {
      string name;
      uint id;
      uint votes;
  }

  mapping(address => bool) public voters;
//   mapping(address => string) public ballots;
  mapping(uint => Party) public parties;
  string[] public ballots;
  uint public partyCount = 0;
  uint public ballotCount = 0;
  address contractOwner;
  uint startTime = block.timestamp;
  uint allowedTime = 30;
  
  Party public winningParty;
  uint public winnerVoteCount = 0;

  string public electionKey;
  string public resultKey;

  bytes32[] public hashedVoterIds;
  uint validVoterCount;

  constructor(string[] memory partyNames, uint _time, string memory _electionKey, string memory _resultKey, address _contractOwner, bytes32[] memory _hashedVoterIds, uint _validVoterCount) public {
    allowedTime = _time;
    electionKey = _electionKey;
    resultKey = _resultKey;
    contractOwner = _contractOwner;
    hashedVoterIds = _hashedVoterIds;
    validVoterCount = _validVoterCount;
    for (uint i = 0; i < partyNames.length; i++) {
        addParty(partyNames[i]);
    }
  }

  function getAddress () public view returns (address) {
      return address(this);
  }

  function releaseResultKey (string memory _resultKey) public {
      resultKey = _resultKey;
  }

  function addParty (string memory _name) private {
      parties[partyCount] = Party(_name, partyCount, 0);
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
      // require(block.timestamp - startTime < allowedTime);
      // require(!voters[msg.sender]);
      require(validateUser(_voterId) == true);
      ballots.push(_vote);
      ballotCount++;
      voters[msg.sender] = true;
  }

//   function castVote (uint _id) public {
//       require(block.timestamp - startTime < allowedTime);
//       require(!voters[msg.sender]);
//       require(_id >= 0 && _id <= partyCount);
//       parties[_id].votes ++;
//       voters[msg.sender] = true;
//   }
  
//   function countVotes () public {
//       require(block.timestamp - startTime >= allowedTime);
//       for (uint i = 0; i < partyCount; i++){
//           if (parties[i].votes > winnerVoteCount) {
//               winningParty = parties[i];
//               winnerVoteCount = parties[i].votes;
//           }
//       }
// //   }
//   function countVotes () public view returns (string[]){
//       return ballots;
//     //   require(block.timestamp - startTime >= allowedTime);

//   }
}