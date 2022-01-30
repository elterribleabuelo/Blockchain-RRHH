const CertificadoContract = artifacts.require("CertificadosContract");

module.exports = function (deployer) {
  deployer.deploy(CertificadoContract);
};

