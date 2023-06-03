const { hasher } = require("../helpers/bcrypt");
const { User } = require("../models");

const USERS = [
  {
    email: "test2@user.com",
    password: hasher("123456"),
    username: "testUser",
    name: "John Doe",
    address: "Jalan Kopi Kenangan",
    phoneNumber: "0811111111",
    gender: "male",
    signer: 2,
  },
];

const createUsers = async () => {
  try {
    console.log("Users created");
    await User.bulkCreate(USERS);
  } catch (error) {
    console.log(error);
  }
};

module.exports = createUsers;
