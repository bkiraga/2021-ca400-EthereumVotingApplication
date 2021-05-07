// SPDX-License-Identifier: MIT

//boilerplate code from truffle's version of create react app bootstrap: https://www.trufflesuite.com/boxes/react
pragma solidity >=0.4.22 <0.8.0;

contract Migrations {
  address public owner;
  uint public last_completed_migration;

  modifier restricted() {
    if (msg.sender == owner) _;
  }

  constructor() public {
    owner = msg.sender;
  }

  function setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
  }
}
