const ElectionBuilder = artifacts.require("./ElectionBuilder.sol");

contract("ElectionBuilder", accounts => {
    it("deployElection should create new election", async () => {
        const electionBuilderInstance = await ElectionBuilder.deployed();
        const candidates = ["testCandidate1", "testCandidate2", "testCandidate3"];
        const time = 30;
        const electionkey = "abcd";
        const resultKey = "efgh";
        const voterIds = ["0x3a103a4e5729ad68c02a678ae39accfbc0ae208096437401b7ceab63cca0622f", "0x0bb404b255c8235d6d5113cc3e49262a99c374b16f16cd6bf2380052b091c876", "0xe8587c7a3951cfa2c372e2edcc4e31d7e1de736f9f2cd0eb5d047bea7d729c64"]
        const voterCount = 3;
        await electionBuilderInstance.deployElection(candidates, time, electionkey, resultKey, voterIds, voterCount, {from: accounts[0]});
        const electionCount = await electionBuilderInstance.electionCount.call();
        assert.equal("count: " + electionCount, "count: 1", "Election count not incremented by 1");
        assert.notEqual("count: " + electionCount, "count: 2", "Election incremented by more than 1");
        
        try {
            const election = await electionBuilderInstance.elections(0);
            assert.typeOf(election, "string");
        } catch (e) {
            assert.fail("Election not found");
        }
    })
})