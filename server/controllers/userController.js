const { User, Employer, Signer, DepositUser } = require("../models/index");

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

      const newSigner = await Signer.create({ mnemonic: "", addressPublic: "", addressPrivate: "" })

      const newUser = await User.create({
        email,
        password,
        username,
        name,
        address,
        phoneNumber,
        gender,
        signer: newSigner.id,
      });

      const newDepositUser = await DepositUser.create({ userId: newUser.id, signer: newSigner.id, balance: 0 })


      res.status(201).json(newUser);
    } catch (err) {
      next(err);
    }
  }

  static async getUser(req, res, next) {
    try {
      const users = await User.findAndCountAll({
        attributes: { exclude: ["password", "signer"] },
      });
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
