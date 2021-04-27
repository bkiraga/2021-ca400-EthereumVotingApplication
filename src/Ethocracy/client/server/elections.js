const fs = require("fs");

const addElection = (data) => {
    // console.log(process.cwd());
    let electionData = loadElectionData();
    console.log(electionData);
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



// addElection({address: "0x12345678", key: "0x987654321", deadline: "17656001"});
// addElection({address: "0x12245578", key: "0x987654321", deadline: "17656002"});
// addElection({address: "0x16345678", key: "0x987654321", deadline: "17656003"});
// console.log(loadElectionData());
// console.log(lookupElection("0x12245578"));

// const fs = require("fs");

// const addElection = async (data) => {
//     let electionData = await loadElectionData();
//     electionData["elections"].push(data);
//     const dataJSON = JSON.stringify(electionData, null, 2);
//     const target = "./data/ElectionData.json";
//     fs.writeFile(target, dataJSON, (error) => {
//         if (error) {
//             return console.log(error);
//         }
//         console.log("Election added");
//     });
// }


// const loadElectionData = () => {
//     try {
//         const data = fs.readFileSync('./data/ElectionData.json');
//         const dataJSON = data.toString();
//         return JSON.parse(dataJSON);
//     } catch (e) {
//         return []
//     }
// }

// const lookupElection = async (electionAddress) => {
//     let electionData = loadElectionData();
//     // console.log(electionData)
//     const elections = electionData["elections"];
//     if (elections.length > 0) {
//         for (let i = 0; i < elections.length; i++) {
//             if (electionAddress === elections[i].address) {
//                 return elections[i];
//             }
//         }
//     }
// }