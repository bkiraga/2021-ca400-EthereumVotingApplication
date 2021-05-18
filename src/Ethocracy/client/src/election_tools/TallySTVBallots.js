export const tallySTVBallots = (ballots, seatsNumber, candidateCount) => {
    const quota = Math.floor(ballots.length / (seatsNumber + 1) + 1);
    let candidates = new Map();
    for (let i = 0; i < candidateCount; i++) {
        candidates.set(i, 0);
    }

    for (let i = 0; i < ballots.length; i++) {
        let value = candidates.get(ballots[i][0]);
        candidates.set(ballots[i][0], value + 1);
    }

    let passedQuota = [];
    let removedCandidates = [];

    let rounds = 0;
    while (rounds < candidateCount) {
        let quotaReached = false;
        let roundWinners = [];
        let roundWinnerIds = [];
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
            for (let i = 0; i < ballots.length; i++) {
                if (ballots[i][0] === lastCandidate){
                    for (let j = 1; j < ballots[i].length; j++) {
                        if (!removedCandidates.includes(ballots[i][j]) && !passedQuota.includes(ballots[i][j])) {
                            let value = candidates.get(ballots[i][j]);
                            candidates.set(ballots[i][j], value + 1);
                            break;
                        } 
                    }
                }
            }
            candidates.delete(lastCandidate);
        } else {
            for (let h = 0; h < roundWinners.length; h++) {
                for (let i = 0; i < ballots.length; i++) {
                    if (roundWinnerIds.includes(ballots[i][0])) {
                        for (let j = 0; j < ballots[i].length; j++) {
                            if (!removedCandidates.includes(ballots[i][j]) && !passedQuota.includes(ballots[i][j])) {
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

    if (passedQuota.length !== seatsNumber) {
        const remainderSeats = seatsNumber - passedQuota.length;
        let count = 0;
        for (let i = removedCandidates.length - 1; i > 0; i--) {
            if (!passedQuota.includes(removedCandidates[i])) {
                passedQuota.push(removedCandidates[i]);
            }
            count += 1;
            if (count === remainderSeats) {
                break
            }
        }
    }

    return passedQuota;
}