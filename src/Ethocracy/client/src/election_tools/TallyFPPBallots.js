//FPP tally uses a modified selectionsort

export const tallyFPPBallots = (candidates, ballots) => {
    let resultMap = new Map();
    for (let i = 0; i < candidates.length; i++) {
      resultMap.set(candidates[i].name, 0);
    }
    for (let i = 0; i < ballots.length; i++) {
      for (let [key, value] of resultMap.entries()) {
        if (key === candidates[parseInt(ballots[i], 10)].name) {
          resultMap.set(key, value+1);
        }
      }
    }
    let results = [];
    for (let [key,value] of resultMap.entries()) {
      results.push({candidate: key, votes: value});
    }

    for (let i = 0; i < results.length; i++) {
      let min = i;
      for (let j = i+1; j < results.length; j++) {
        if (results[j].votes < results[min].votes){
          min = j
        }
      }
      if (min !== i) {
        let tmp = results[i];
        results[i] = results[min];
        results[min] = tmp;
      }
    }
    results = results.reverse();
    return results
}