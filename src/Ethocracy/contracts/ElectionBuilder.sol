// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;
pragma experimental ABIEncoderV2;

import "./Election.sol";

contract ElectionBuilder{
    Election[] public elections;
    uint public electionCount = 0;
    
    function deployElection(string[] memory _partyNames) public {
        Election election = new Election(_partyNames);
        elections.push(election);
        electionCount++;
    }
    //     function deployElection() public {
    //     Election election = new Election();
    //     elections.push(election);
    //     electionCount++;
    // }
}