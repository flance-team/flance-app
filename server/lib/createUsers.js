const { hasher } = require("../helpers/bcrypt");
const { User } = require("../models");

const USERS = [
  {
    email: "test2@user.com",
    password: hasher("123456"),
    username: "testUser",
    name: "John Doe",
    address: "Tangerang Selatan",
    phoneNumber: "0811111111",
    gender: "male",
    signer: 2,
  },
  {
    email: "test3@user.com",
    password: hasher("123456"),
    username: "testUser",
    name: "Jenny Doe",
    address: "Tangerang Selatan",
    phoneNumber: "0811111111",
    gender: "female",
    signer: 3,
  },
];

const createUsers = async () => {
  await User.bulkCreate(USERS);
};

module.exports = createUsers;
