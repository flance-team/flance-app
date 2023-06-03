const { Signer } = require("../models");

const SIGNERS = [
  {
    mnemonic: "testingMnemonic",
    addressPublic: "testingPublicAddress",
    addressPrivate: "testingPrivateAddress",
  },
];

const createSigners = async () => {
  try {
    await Signer.bulkCreate(SIGNERS);
  } catch (error) {
    console.log(error);
  }
};

module.exports = createSigners;
