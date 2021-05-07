const fs = require("fs");

const addElection = (data) => {
    let electionData = loadElectionData();
    electionData["elections"].push(data);
    const dataJSON = JSON.stringify(electionData, null, 2);
    const target = "./server/data/ElectionData.json";
    fs.writeFileSync(target, dataJSON);
}


const loadElectionData = () => {
    try {
        const data = fs.readFileSync('./server/data/ElectionData.json');
        const dataJSON = data.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return []
    }
}

const lookupElection = (electionName) => {
    let electionData = loadElectionData();
    const elections = electionData["elections"];
    if (elections.length > 0) {
        for (let i = 0; i < elections.length; i++) {
            if (electionName === elections[i].name) {
                return elections[i];
            }
        }
    }
}

module.exports = {
    addElection: addElection,
    lookupElection: lookupElection
}
