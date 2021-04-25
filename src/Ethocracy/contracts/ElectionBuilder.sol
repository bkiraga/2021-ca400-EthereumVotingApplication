// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;
pragma experimental ABIEncoderV2;

import "./Election.sol";

contract ElectionBuilder{

    Election[] public elections;
    uint public electionCount = 0;
    string[] public usedNames;

    mapping(address => string) public electionNames;
    mapping(address => string) public electionDeadlines;
    mapping(address => string) public electionTypes;

    function checkDuplicateNames(string memory electionName) public view returns (bool) {
        for (uint i = 0; i < electionCount; i++) {
            if (keccak256(abi.encodePacked(electionName)) == keccak256(abi.encodePacked(usedNames[i]))) {
                return false;
            }
        }
        return true;
    }
    
    function deployElection(string memory electionName, string[] memory partyNames, uint time, string memory timeStr, string memory electionType, string memory electionKey, string memory resultKey, bytes32[] memory hashedVoterIds, uint validVoterCount) public {
        if (checkDuplicateNames(electionName) == true) {
            Election election = new Election(electionName, partyNames, time, timeStr, electionType, electionKey, resultKey, hashedVoterIds, validVoterCount);
            elections.push(election);
            usedNames.push(electionName);
            electionNames[address(election)] = electionName;
            electionDeadlines[address(election)] = timeStr;
            electionTypes[address(election)] = electionType;
            electionCount++;
        }
    }
}