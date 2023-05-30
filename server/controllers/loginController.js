const { passValidator } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User, Employer } = require("../models/index");

class LoginController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const findUser = await User.findOne({
        where: { email },
      });
      const findEmployer = await Employer.findOne({
        where: { email },
      });

      if (!findUser && !findEmployer) {
        throw { name: "Not Found", mesage: "Not Registered", code: 404 };
      }
      //   console.log(findUser, findEmployer);
      // checking password
      if (findUser) {
        if (!passValidator(password, findUser.password)) {
          throw {
            name: "Forbidden",
            message: "email or password is incorrect",
            code: 403,
          };
        }
      } else if (findEmployer) {
        if (!passValidator(password, findEmployer.password)) {
          throw {
            name: "Forbidden",
            message: "email or password is incorrect",
            code: 403,
          };
        }
      }
      console.log(findEmployer);
      const access_token = signToken({
        email: findUser?.email ? findUser.email : findEmployer.email,
        role: findUser ? "user" : "employer",
        id: findUser?.id ? findUser.id : findEmployer.id,
      });

      res.status(200).json({
        access_token,
        role: findUser ? "user" : "employer",
        id: findUser?.id ? findUser.id : findEmployer.id,
        email: findUser?.email ? findUser.email : findEmployer.email,
      });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = LoginController;
