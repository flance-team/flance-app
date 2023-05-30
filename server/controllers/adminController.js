const { Admin } = require("../models/index");

class AdminController {
  static async registerAdmin(req, res, next) {
    try {
      const { email, password } = req.body;
      const newAdmin = await Admin.create({ email, password });
      res.status(201).json(newAdmin);
    } catch (err) {
      next(err);
    }
  }
}
module.exports = AdminController;
