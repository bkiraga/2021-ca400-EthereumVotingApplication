var ElectionBuilder = artifacts.require("./ElectionBuilder.sol");

module.exports = function(deployer) {
  deployer.deploy(ElectionBuilder);
};

// var Election = artifacts.require("./Election.sol");

// module.exports = function(deployer) {
//   deployer.deploy(Election);
// };