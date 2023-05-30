const { User } = require("../models/index");

class UserController {
  static async registerUser(req, res, next) {
    try {
      const { email, password, username, name, address, phoneNumber, gender } =
        req.body;
      const newUser = await User.create({
        email,
        password,
        username,
        name,
        address,
        phoneNumber,
        gender,
        signer: "INIRAND0M$TRinG",
      });
      res.status(201).json(newUser);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
