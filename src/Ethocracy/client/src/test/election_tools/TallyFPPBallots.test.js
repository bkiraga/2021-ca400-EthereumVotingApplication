import { tallyFPPBallots } from "../../election_tools/TallyFPPBallots";

describe("TallyFPPBallots", () => {
    it("Should tally a single ballot correctly", () => {
        const candidates = [
            {name: "Candidate0", id: "0"},
            {name: "Candidate1", id: "1"},
            {name: "Candidate2", id: "2"},
            {name: "Candidate3", id: "3"},
            {name: "Candidate4", id: "4"}
        ];
        const ballots = ["2"];
        const tally = tallyFPPBallots(candidates, ballots);
        expect(tally[0]).toEqual({candidate: "Candidate2", votes: 1});
    })
    it("Should tally multiple ballots correctly", () => {
        const candidates = [
            {name: "Candidate0", id: "0"},
            {name: "Candidate1", id: "1"},
            {name: "Candidate2", id: "2"},
            {name: "Candidate3", id: "3"},
            {name: "Candidate4", id: "4"}
        ];
        const ballots = ["3","2","1","4","1","2","4","2","3","2"];
        const tally = tallyFPPBallots(candidates, ballots);
        expect(tally[0]).toEqual({candidate: "Candidate2", votes: 4});
    })
    it("Should NOT be affected by changes in ballot order", () => {
        const candidates = [
            {name: "Candidate0", id: "0"},
            {name: "Candidate1", id: "1"},
            {name: "Candidate2", id: "2"},
            {name: "Candidate3", id: "3"},
            {name: "Candidate4", id: "4"}
        ];
        const ballots = ["2","3","2","4","2","2","3","1","4","1"];
        const tally = tallyFPPBallots(candidates, ballots);
        expect(tally[0]).toEqual({candidate: "Candidate2", votes: 4});
    })
})