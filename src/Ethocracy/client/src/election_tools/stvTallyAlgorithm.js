// // const ballots = [[1,2,3,0],[0,1,2,3],[3,1,2,0],[2,0,3,1],[0,2,3,1],[3,0,2,1],[2,0,3,1],[2,0,2,1],[2,3,1,0],[2,3,0,1]];
// const ballots = [[0,3,2,1],[2,3,0,1],[0,1,2,3],[1,0,3,2],[2,0,1,3],[2,0,3,1],[1,3,0,2],[0,1,2,3],[2,0,1,3],[2,3,1,0]];
// const ballots = [[0,3,2,1],[0,3,2,1],[1,2,3,0],[3,2,0,1],[1,0,3,2],[0,2,3,1],[1,2,0,3],[3,2,1,0],[3,2,1,0],[3,2,1,0]];
// const ballots = [[0,3,2,1],[0,3,2,1],[0,3,2,1]]   //a,d,c,b
// const ballots = [[0,3,2,1],[2]]


const tallySTVBallots = (ballots, seatsNumber, candidateCount) => {
    const quota = Math.floor(ballots.length / (seatsNumber + 1) + 1);
    console.log(quota);
    let candidates = new Map();
    for (let i = 0; i < candidateCount; i++) {
        candidates.set(i, 0);
    }

    for (let i = 0; i < ballots.length; i++) {
        let value = candidates.get(ballots[i][0]);
        candidates.set(ballots[i][0], value + 1);
    }

    console.log("abc");

    let passedQuota = [];
    let removedCandidates = [];

    let rounds = 0;
    while (rounds < candidateCount) {
        let quotaReached = false;
        let roundWinners = [];
        let roundWinnerIds = [];
        console.log(candidates);
        for (let [key, value] of candidates.entries()) {
            if (value >= quota) {
                let excessBallotRatio = (value - quota) / quota;
                passedQuota.push(key);
                roundWinners.push({winner: key, excessBallotRatio: excessBallotRatio});
                roundWinnerIds.push(key);
                candidates.delete(key);
                removedCandidates.push(key);
                quotaReached = true;
            }
        }

        if (passedQuota.length === seatsNumber) {
            return passedQuota;
        }

        //if quota is not reached by any candidate the lowest scoring candidate, second choice on its ballots are allocated to other candidates
        if (!quotaReached) {
            let lastCandidate;
            let smallestValue;
            for (let [key, value] of candidates.entries()) {
                if (candidates.get(key) < smallestValue || smallestValue === undefined) {
                    smallestValue = candidates.get(key);
                    lastCandidate = key;
                }
            }
            removedCandidates.push(lastCandidate);
            // console.log(candidates);
            for (let i = 0; i < ballots.length; i++) {
                if (ballots[i][0] === lastCandidate){
                    for (let j = 0; j < ballots[i].length; j++) {
                        if (!removedCandidates.includes(ballots[i][j]) || !passedQuota.includes(ballots[i][j])) {
                            let value = candidates.get(ballots[i][j]);
                            candidates.set(ballots[i][j], value + 1);
                            break;
                        } 
                    }
                }
            }
            for (let [key,value] of candidates.entries()) {
                if (value >= quota) {
                    passedQuota.push(key);
                }
            }
            candidates.delete(lastCandidate);
        } else {
            for (let h = 0; h < roundWinners.length; h++) {
                for (let i = 0; i < ballots.length; i++) {
                    if (roundWinnerIds.includes(ballots[i][0])) {
                        for (let j = 0; j < ballots[i].length; j++) {
                            if (!removedCandidates.includes(ballots[i][j]) || !passedQuota.includes(ballots[i][j])) {
                                let value = candidates.get(ballots[i][j]);
                                candidates.set(ballots[i][j], value + (1 * roundWinners[h].excessBallotRatio)); // weigh down 1 based on the number of ballots over the quota
                                break
                            }
                        }
                    }
                }
            }
        }

        rounds += 1;
    }
    // console.log("xyz");
    return passedQuota;
}

// console.log(tallySTVBallots(ballots, 2 , 4));

export default tallySTVBallots;