// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;
pragma experimental ABIEncoderV2;

import "./Election.sol";

contract ElectionBuilder{
    Election[] public elections;
    uint public electionCount = 0;
    address public contractOwner = msg.sender;

    // function checkElectionExistance(string memory _address) public {
    //     for (uint i = 0; i < electionCount; i++){
    //         if (StringUtils.equal(abi.encodePacked(elections[i].getAddress), abi.encodePacked(_address))){

    //         }
    //     }
    // }
    
    function deployElection(string[] memory _partyNames, uint time, string memory electionKey, string memory resultKey, address _contractOwner, bytes32[] memory hashedVoterIds, uint validVoterCount) public {
        Election election = new Election(_partyNames, time, electionKey, resultKey, contractOwner, hashedVoterIds, validVoterCount);
        elections.push(election);
        electionCount++;
    }
}