const { User } = require("../models/index");

class UserController {
  static async registerUser(req, res, next) {
    try {
      const newUser = await User.create;
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
