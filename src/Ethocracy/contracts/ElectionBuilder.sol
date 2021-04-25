// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;
pragma experimental ABIEncoderV2;

import "./Election.sol";

contract ElectionBuilder{
    Election[] public elections;
    uint public electionCount = 0;
    
    function deployElection(string[] memory _partyNames, uint time, string memory electionKey, string memory resultKey, bytes32[] memory hashedVoterIds, uint validVoterCount) public {
        Election election = new Election(_partyNames, time, electionKey, resultKey, hashedVoterIds, validVoterCount);
        elections.push(election);
        electionCount++;
    }
}