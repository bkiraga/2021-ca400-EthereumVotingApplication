const ballots = [[1,2,3,0],[0,1,2,3],[3,1,2,0],[1,0,3,2],[0,2,3,1],[2,0,3,1],[2,0,3,1],[2,0,2,1],[1,3,2,0],[2,3,0,1]];

const tallySTVBallots = (ballots, seatsNumber, candidateCount) => {
    const quota = Math.floor(ballots.length / (seatsNumber + 1) + 1);
    console.log(quota);
    candidates = new Map();
    for (let i = 0; i < candidateCount; i++) {
        candidates.set(i, 0);
    }

    for (let i = 0; i < ballots.length; i++) {
        let value = candidates.get(ballots[i][0]);
        candidates.set(ballots[i][0], value + 1);
    }
    console.log(candidates);
    
    let passedQuota = [];
    let quotaReached = false;
    let removedCandidates = []
    for (let [key, value] of candidates.entries()) {
        if (value >= quota) {
            passedQuota.push(key);
            candidates.delete(key);
            removedCandidates.push(key);
            quotaReached = true;
        }
    }
    
    console.log(candidates);

    //ends calculation early if all seats are filled
    if (passedQuota.length > seatsNumber) {
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
        //dont forget to account of candidates tied for lowest place
        candidates.delete(lastCandidate);
        removedCandidates.push(lastCandidate);
        for (let i = 0; i < ballots.length; i++) {
            if (ballots[i][0] === lastCandidate){
                if (!removedCandidates.includes(ballots[i][1])) {
                    let value = candidates.get(ballots[i][1])
                    candidates.set(ballots[i][1], value + 1);
                }
            }
        }
    }

    for (let i = 0; i < ballots.length; i++) {
        if (passedQuota.includes(ballots[i][0])) {
            if (!removedCandidates.includes(ballots[i][1])) {
                let value = candidates.get(ballots[i][1]);
                candidates.set(ballots[i][1], value + 1);
            }
        }
    }

    //remove ballots that reached the quota
    for (let i = 0; i < ballots.length; i++) {
        for (let j = 0; j < ballots[i].length; j++) {
            if (passedQuota.includes(ballots[i][j])) {
                
            }
        }
    }

    return passedQuota;
}

// tallySTVBallots(ballots, 2, 4)
console.log(tallySTVBallots(ballots, 2, 4));