var ElectionBuilder = artifacts.require("./ElectionBuilder.sol");

module.exports = function(deployer) {
  deployer.deploy(ElectionBuilder);
};