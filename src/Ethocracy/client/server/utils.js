const NodeRsa = require('node-rsa');

const generateKeys = () => {
  const key = new NodeRsa({b:512});
  const public_key = key.exportKey('public');
  const private_key = key.exportKey('private');
  return {public_key, private_key}
}

const checkElectionComplete = (deadline) => {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  if (deadline < currentTimestamp) {    //40 seconds added to account for the fact that ethereum time can be off by up to half a minute
    return true
  }
  return false
}

module.exports = {
    generateKeys: generateKeys,
    checkElectionComplete: checkElectionComplete
}