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

  // Hard coded candidates built during contract instanciation, to be replaced with a read from file.
  constructor() public {
      addParty("Fine Gael");
      addParty("Sinn Féin");
      addParty("Fianna Fáil");
      addParty("An Sample Páirtí");
  }

  // Private temporary function to hard code candidates
  function addParty (string memory _name) private {
      parties[partyCount] = Party(_name, partyCount, 0);
      partyCount ++;
  }

  function castVote (uint _id) public {
      // Require the voter to not have voted before
      require(!voters[msg.sender]);

      // Require the voter is voting for a party on the ballot
      require(_id >= 0 && _id <= partyCount);

      // Add a vote to their chosen party
      parties[_id].votes ++;

      // Update voters mapping to reflect the voter has voted
      voters[msg.sender] = true;
  }
}
