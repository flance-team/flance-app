const { Signer } = require("../models");

const SIGNERS = [
  {
    mnemonic:
      "region swamp attend unfair toilet renew tumble twist evoke arrange debris skill solve chuckle home naive erupt apology smoke express subway crime puzzle car",
    addressPublic: "0x4e4f243BD06457a9beE3c9E1453cB66F19DD03a2",
    addressPrivate:
      "9f8720ab8b166bc08534bb44c7c2dee3dc01390ab267d58866519cd073c2a039",
  },
  {
    mnemonic:
      "flat stable quarter cream cabin invite essay inmate token mammal yellow wool scheme guard gentle asset junior plug grocery make organ rely stomach increase",
    addressPublic: "0x1fD5143e34e7e3AF9cdb7897D8F34481e8D842F3",
    addressPrivate:
      "886e43bcc1b86722cc35bd68dfd5a0caa502e2778ad0ad29665103273634ecaa",
  },
];

const createSigners = async () => {
  await Signer.bulkCreate(SIGNERS);
};

module.exports = createSigners;
