const ElectionBuilder = artifacts.require("./ElectionBuilder.sol");
const Election = artifacts.require("./Election.sol");

contract("Contracts", accounts => {
    let electionBuilderInstance = null;
    let electionAddress = null;
    let electionInstance = null;
    before(async () => {
        electionBuilderInstance = await ElectionBuilder.deployed();
    })

    it("Should deploy the ElectionBuilder contract", async () => {
        assert(electionBuilderInstance.address != "");
    });

    it("deployElection should create new Election contract", async () => {
        const electionName = "Election"
        const candidates = ["testCandidate1", "testCandidate2", "testCandidate3"];
        const time = 30;
        const timeStr = "18:00/12/Jan/2022";
        const electionType = "FPP";
        const stvSeatCount = 0;
        const electionkey = "abcd";
        const voterIds = ["0x4bf5122f344554c53bde2ebb8cd2b7e3d1600ad631c385a5d7cce23c7785459a","0x3a103a4e5729ad68c02a678ae39accfbc0ae208096437401b7ceab63cca0622f", "0x0bb404b255c8235d6d5113cc3e49262a99c374b16f16cd6bf2380052b091c876", "0xe8587c7a3951cfa2c372e2edcc4e31d7e1de736f9f2cd0eb5d047bea7d729c64"]
        const voterCount = 3;
        await electionBuilderInstance.deployElection(electionName, candidates, time, timeStr, electionType, stvSeatCount, electionkey, voterIds, voterCount, {from: accounts[0]});
        electionAddress = await electionBuilderInstance.elections(0);
        // console.log(electionAddress);
        electionInstance = await Election.at(electionAddress);
        // console.log(electionInstance);
        assert(electionInstance.address != "");
    });

    it("deployElection should increment electionCount", async () => {
        const electionCount = await electionBuilderInstance.electionCount();
        assert.equal(electionCount, 1);
    });

    it("deployElection should store election address", async () => {
        const election = await electionBuilderInstance.elections(0);
        assert.typeOf(election, "string");
        assert.equal(election.length, 42);
    });

    it("deployElection should store used names", async () => {
        const usedName = await electionBuilderInstance.usedNames(0);
        assert.typeOf(usedName, "string");
    });

    it("deployElection should increment user election count", async () => {
        const userElectionCount = await electionBuilderInstance.userElectionCount(accounts[0]);
        assert.equal(userElectionCount, 1);
    });

    it("deployElection should add user address to electionCreators", async () => {
        const userCreator = await electionBuilderInstance.electionCreators(accounts[0], 0);
        assert.equal(userCreator.length, 42);
        assert.typeOf(userCreator, "string");
    });

    it("checkDuplicatNames should return false when election name is taken", async () => {
        const electionName = "Election";
        const result = await electionBuilderInstance.checkDuplicateNames(electionName);
        assert.equal(result, false);
    });

    it("checkDuplicatNames should return true when election name is not taken", async () => {
        const electionName = "Election2";
        const result = await electionBuilderInstance.checkDuplicateNames(electionName);
        assert.equal(result, true);
    });

    it("addUserBallot should increment the userBallotCount", async () => {
        const name = "Election";
        const electionAddress = "0x46ECc6aC6776bB7006619a6f3ffE1E53D8DDd113";
        const ballot = "wefer33ef323233sdde3vvfd";
        await electionBuilderInstance.addUserBallot(name, electionAddress, ballot);
        const ballotCount = await electionBuilderInstance.userBallotCount(electionAddress);
        assert.equal(ballotCount, 1);       
    });

    it("addUserBallot should add ballot information to the userBallots", async () => {
        const userBallots = await electionBuilderInstance.userBallots("0x46ECc6aC6776bB7006619a6f3ffE1E53D8DDd113", 0);
        assert.equal(userBallots.name, "Election");
        assert.equal(userBallots.electionAddress, "0x46ECc6aC6776bB7006619a6f3ffE1E53D8DDd113");
        assert.equal(userBallots.ballot, "wefer33ef323233sdde3vvfd");
    });

    it("getUserBallots should return all ballots", async () => {
        const allBallots = await electionBuilderInstance.getUserBallots("0x46ECc6aC6776bB7006619a6f3ffE1E53D8DDd113");
        const ballotCount = await electionBuilderInstance.userBallotCount("0x46ECc6aC6776bB7006619a6f3ffE1E53D8DDd113");   
        assert.equal(allBallots.length, ballotCount)    ;
    });

    it("getUserBallots returns correct ballot data", async () => {
        const allBallots = await electionBuilderInstance.getUserBallots("0x46ECc6aC6776bB7006619a6f3ffE1E53D8DDd113");  
        assert.equal(allBallots[0].name, "Election");
        assert.equal(allBallots[0].electionAddress, "0x46ECc6aC6776bB7006619a6f3ffE1E53D8DDd113");
        assert.equal(allBallots[0].ballot, "wefer33ef323233sdde3vvfd");
        await electionBuilderInstance.addUserBallot("Election", "0x46ECc6aC6776bB7006619a6f3ffE1E53D8DDd113", "sdfweefergeggrg");
        const allBallotsUpdated = await electionBuilderInstance.getUserBallots("0x46ECc6aC6776bB7006619a6f3ffE1E53D8DDd113");
        assert.equal(allBallotsUpdated[1].name, "Election");
        assert.equal(allBallotsUpdated[1].electionAddress, "0x46ECc6aC6776bB7006619a6f3ffE1E53D8DDd113");
        assert.equal(allBallotsUpdated[1].ballot, "sdfweefergeggrg");
    });

    it("Election status starts as inProgress", async () => {
        const electionState = await electionInstance.electionStatus();
        assert.equal(electionState, "inProgress");
    });

    it("Election gets deployed without the result key", async () => {
        const resultKey = await electionInstance.resultKey();
        assert.equal(resultKey, "noKey");
    });

    it("Validate user should accept a valid id ", async () => {
        const validateUser = await electionInstance.validateUser("0x1");
        assert.equal(validateUser, true);
    });

    it("Validate user should reject a invalid ids ", async () => {
        const validateUser = await electionInstance.validateUser("0x56");
        assert.equal(validateUser, false);
    });
})