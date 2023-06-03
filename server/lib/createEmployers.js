const { hasher } = require("../helpers/bcrypt");
const { Employer } = require("../models");

const EMPLOYERS = [
  {
    email: "test@employer.com",
    password: hasher("123456"),
    companyName: "Kopi Kenangan",
    address: "Jalan Kopi Kenangan",
    location: "Tangerang Selatan",
    phoneNumber: "0811111111",
    PIC: "John Doe",
    typeId: 1,
    signer: 1,
  },
];

const createEmployers = async () => {
  try {
    await Employer.bulkCreate(EMPLOYERS);
  } catch (error) {
    console.log(error);
  }
};

module.exports = createEmployers;
