const NodeRsa = require('node-rsa');
const crypto = require('crypto');

// let key;

const generateKeys = () => {
    const key = new NodeRsa({b:512});
    const public_key = key.exportKey('public');
    const private_key = key.exportKey('private');
    return {public_key, private_key}
}

// const keys = generateKeys();

// const public_key = keys.public_key;
// const private_key = keys.private_key;
// console.log("public key: " + public_key);
// console.log("private key: " + private_key);
// const public_key = key.exportKey('public');
// const private_key = key.exportKey('private');


const maskBallot = (ballot, public_key) => {
    const buffer = Buffer.from(ballot);
    const encrypted = crypto.publicEncrypt(public_key, buffer);
    return encrypted.toString("base64");
};

// const encrypted = maskBallot("abcde", public_key);

// console.log(encrypted);

const unmaskBallot = (ballot, private_key) => {
    const buffer = Buffer.from(ballot, "base64");
    const decrypted = crypto.privateDecrypt(private_key, buffer);
    return decrypted.toString("utf8");
};

// console.log(unmaskBallot(encrypted, private_key));

module.exports = {
    generateKeys: generateKeys,
    maskBallot: maskBallot,
    unmaskBallot: unmaskBallot
}

//////////////////

// const NodeRsa = require('node-rsa');
// const crypto = require('crypto');

// let key;

// const generateKeys = () => {
//     key = new NodeRsa({b:512});
//     const public_key = key.exportKey('public');
//     const private_key = key.exportKey('private');
//     return {public_key, private_key}
// }

// // console.log(generateKeys());
// // console.log(generateKeys().public_key);
// generateKeys();
// public_key = generateKeys().public_key;
// private_key = generateKeys().private_key;


// const maskBallot = (ballot, public_key) => {
//     const buffer = Buffer.from(ballot);
//     const maskedBallot = crypto.publicEncrypt(public_key, buffer);
//     return maskedBallot.toString("base64");
// };

// encrypted = maskBallot("abcde", public_key);

// console.log(encrypted);

// const unmaskBallot = (ballot, private_key) => {
//     const buffer = Buffer.from(ballot, "base64");
//     const decrypted = crypto.privateDecrypt(private_key, buffer);
//     return decrypted.toString("utf8");
// };

// console.log(unmaskBallot(encrypted, private_key));