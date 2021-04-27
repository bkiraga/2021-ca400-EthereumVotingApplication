const NodeRsa = require('node-rsa');
const crypto = require('crypto');
const CryptoJS = require('crypto-js');

const generateKeys = () => {
    const key = new NodeRsa({b:512});
    const public_key = key.exportKey('public');
    const private_key = key.exportKey('private');
    return {public_key, private_key}
}

const checkElectionComplete = (deadline) => {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (deadline < currentTimestamp + 40) {    //40 seconds added to account for the fact that ethereum time can be off by up to half a minute
        return true
    }
    return false
}

const maskBallot = (ballot, public_key) => {
    const buffer = Buffer.from(ballot);
    const encrypted = crypto.publicEncrypt(public_key, buffer);
    return encrypted.toString("base64");
};

const unmaskBallot = (ballot, private_key) => {
    let buffer = Buffer.from(ballot, "base64");
    let decrypted = crypto.privateDecrypt(private_key, buffer);
    return decrypted.toString("utf8");
};

const hashVoterId = (id) => {
    const hash = CryptoJS.SHA256(CryptoJS.enc.Hex.parse(id));
    return "0x" + hash.toString();
}

module.exports = {
    generateKeys: generateKeys,
    maskBallot: maskBallot,
    unmaskBallot: unmaskBallot,
    hashVoterId: hashVoterId,
    checkElectionComplete: checkElectionComplete
}