// 2_deploy_contracts.js
 
const CropInsurance = artifacts.require("CropInsurance");

module.exports = function (deployer) {
  deployer.deploy(CropInsurance);
};
