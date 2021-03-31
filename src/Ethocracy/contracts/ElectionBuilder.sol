// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;
pragma experimental ABIEncoderV2;

import "./Election.sol";

contract ElectionBuilder{
    Election[] public elections;
    uint public electionCount = 0;

    // function checkElectionExistance(string memory _address) public {
    //     for (uint i = 0; i < electionCount; i++){
    //         if (StringUtils.equal(abi.encodePacked(elections[i].getAddress), abi.encodePacked(_address))){

    //         }
    //     }
    // }
    
    function deployElection(string[] memory _partyNames, uint time, string memory electionKey) public {
        Election election = new Election(_partyNames, time, electionKey);
        elections.push(election);
        electionCount++;
    }
}