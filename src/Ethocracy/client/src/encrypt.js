const NodeRsa = require('node-rsa');
const crypto = require('crypto');

// let key;

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

// const encrypted = maskBallot("abcde", public_key);

// console.log(encrypted);

const unmaskBallot = (ballot, private_key) => {
    console.log("bal: " + ballot);
    console.log("private_key: " + private_key);
    let buffer = Buffer.from(ballot, "base64");
    let decrypted = crypto.privateDecrypt(private_key, buffer);
    // console.log("res: " + decrypted.toString("utf8"));
    return decrypted.toString("utf8");
    return "abc";
};

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