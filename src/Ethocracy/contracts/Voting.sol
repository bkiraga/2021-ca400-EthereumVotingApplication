// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract Voting {
  // Party structure
  struct Party {
      string name;
      uint id;
      uint votes;
  }

  // Contract variables
  mapping(address => bool) public voters;
  mapping(uint => Party) public parties;
  uint public partyCount = 0;
  
  uint startTime = block.timestamp;
//   uint allowedTime = 30;
  
  Party public winningParty;
  uint public winnerVoteCount = 0;

  // Hard coded candidates built during contract instanciation, to be replaced with a read from file.
  constructor() public {
      addParty("Finne Gael");
      addParty("Sinn Fein");
      addParty("Fianna Fail");
      addParty("An Sample Pairti");
  }

  // Private temporary function to hard code candidates
  function addParty (string memory _name) private {
      parties[partyCount] = Party(_name, partyCount, 0);
      partyCount ++;
  }

  function castVote (uint _id) public {
    //   require(block.timestamp - startTime < allowedTime);
      require(!voters[msg.sender]);
      require(_id >= 0 && _id <= partyCount);
      parties[_id].votes ++;
      voters[msg.sender] = true;
  }
  
  function countVotes () public {
    //   require(block.timestamp - startTime >= allowedTime);
      for (uint i = 0; i < partyCount; i++){
          if (parties[i].votes > winnerVoteCount) {
              winningParty = parties[i];
              winnerVoteCount = parties[i].votes;
          }
      }
  }
}
