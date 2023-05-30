const { User, Employer } = require("../models/index");

class UserController {
  static async registerUser(req, res, next) {
    try {
      const { email, password, username, name, address, phoneNumber, gender } =
        req.body;

      // checking if email is already registered on Employer

      const checkEmail = await Employer.findOne({
        where: { email },
      });
      if (checkEmail) {
        throw {
          name: "Bad Request",
          message: "email has already registered in another entity",
          code: 400,
        };
      }
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
