// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;
pragma experimental ABIEncoderV2;

import "./Election.sol";

contract ElectionBuilder{
    Election[] public elections;
    uint public electionCount = 0;
    
    function deployElection(string[] memory _partyNames, uint time) public {
        Election election = new Election(_partyNames, time);
        elections.push(election);
        electionCount++;
    }
}