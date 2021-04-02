const NodeRsa = require('node-rsa');
const crypto = require('crypto');

const generateKeys = () => {
    const key = new NodeRsa({b:512});
    const public_key = key.exportKey('public');
    const private_key = key.exportKey('private');
    return {public_key, private_key}
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

module.exports = {
    generateKeys: generateKeys,
    maskBallot: maskBallot,
    unmaskBallot: unmaskBallot
}