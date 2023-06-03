const { Signer } = require("../models");

const SIGNERS = [
  {
    mnemonic: "testingMnemonic",
    addressPublic: "testingPublicAddress",
    addressPrivate: "testingPrivateAddress",
  },
  {
    mnemonic: "testingMnemonic2",
    addressPublic: "testingPublicAddress2",
    addressPrivate: "testingPrivateAddress2",
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
