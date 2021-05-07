const NodeRsa = require('node-rsa');

const generateKeys = () => {
  const key = new NodeRsa({b:1024});
  const public_key = key.exportKey('public');
  const private_key = key.exportKey('private');
  return {public_key, private_key}
}

const checkElectionComplete = (deadline) => {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  if (deadline < currentTimestamp) {
    return true
  }
  return false
}

module.exports = {
    generateKeys: generateKeys,
    checkElectionComplete: checkElectionComplete
}