import { tallySTVBallots } from "../../election_tools/TallySTVBallots";

describe("TallySTVBallots", () => {

    it("Should tally ballots correctly", () => {
        const ballots = [[1,2,3,0],[0,1,2,3],[3,1,2,0],[2,0,3,1],[0,2,3,1],[3,0,2,1],[2,0,3,1],[3,2,0,1],[2,3,1,0],[2,3,0,1]];
        
        const seatNumber = 2;
        const candidateNumber = 4;
        const tally = tallySTVBallots(ballots, seatNumber, candidateNumber);
        expect(tally).toEqual([2, 3]);
    })

    it("Should change result if candidate order on ballot is changed", () => {
        const ballots = [[0,3,2,1],[3,2,1,0],[0,2,1,3],[2,0,3,1],[0,2,3,1],[3,0,2,1],[2,0,3,1],[2,0,3,1],[2,3,1,0],[2,3,0,1]];
        const seatNumber = 2;
        const candidateNumber = 4;
        const tally = tallySTVBallots(ballots, seatNumber, candidateNumber);
        expect(tally).not.toEqual([2, 3]);
    })

    it("Should NOT be affected by ballot order", () => {
        const ballots = [[0,1,2,3],[1,2,3,0],[3,1,2,0],[2,0,3,1],[0,2,3,1],[3,0,2,1],[3,2,0,1],[2,0,3,1],[2,3,1,0],[2,3,0,1]];
        const seatNumber = 2;
        const candidateNumber = 4;
        const tally = tallySTVBallots(ballots, seatNumber, candidateNumber);
        expect(tally).toEqual([2, 3]);
    })
    
    it("Should accept ballots with variable number of candidates filled in ", () => {
        const ballots = [[1,2,3],[0,1,2,3],[3,1,2,0],[2,0,3],[0,2,3,1],[3,0,2,1],[2,0,3,1],[3,2,0],[2,3,1,0],[2,3,0]];
        const seatNumber = 2;
        const candidateNumber = 4;
        const tally = tallySTVBallots(ballots, seatNumber, candidateNumber);
        expect(tally).toEqual([2, 3]);
    })

    it("Should change result depending on seats up for election", () => {
        const ballots = [[1,2,3,0],[0,1,2,3],[3,1,2,0],[2,0,3,1],[0,2,3,1],[3,0,2,1],[2,0,3,1],[3,2,0,1],[2,3,1,0],[2,3,0,1]];
        const seatNumber = 3;
        const candidateNumber = 4;
        const tally = tallySTVBallots(ballots, seatNumber, candidateNumber);
        expect(tally).toEqual([2, 3, 0]);
    })

    it("Should break if incorrect candidate number is given", () => {
        const ballots = [[1,2,3,0],[0,1,2,3],[3,1,2,0],[2,0,3,1],[0,2,3,1],[3,0,2,1],[2,0,3,1],[3,2,0,1],[2,3,1,0],[2,3,0,1]];
        const seatNumber = 2;
        const candidateNumber = 2;
        const tally = tallySTVBallots(ballots, seatNumber, candidateNumber);
        expect(tally).not.toEqual([2, 0]);
    })

})