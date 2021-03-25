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
  mapping(uint => Party) public parties;
  uint public partyCount = 0;
  
  uint startTime = block.timestamp;
  uint allowedTime = 30;
  
  Party public winningParty;
  uint public winnerVoteCount = 0;

  constructor(string[] memory partyNames, uint time) public {
    allowedTime = time;
    for (uint i = 0; i < partyNames.length; i++) {
        addParty(partyNames[i]);
    }
  }

  function getAddress () public view returns (address) {
      return address(this);
  }

  function addParty (string memory _name) private {
      parties[partyCount] = Party(_name, partyCount, 0);
      partyCount ++;
  }

  function castVote (uint _id) public {
      require(block.timestamp - startTime < allowedTime);
      require(!voters[msg.sender]);
      require(_id >= 0 && _id <= partyCount);
      parties[_id].votes ++;
      voters[msg.sender] = true;
  }
  
  function countVotes () public {
      require(block.timestamp - startTime >= allowedTime);
      for (uint i = 0; i < partyCount; i++){
          if (parties[i].votes > winnerVoteCount) {
              winningParty = parties[i];
              winnerVoteCount = parties[i].votes;
          }
      }
  }
}