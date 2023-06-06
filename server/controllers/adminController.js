const approvedEmail = require("../helpers/approvedEmail");
const { passValidator } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const {
  Admin,
  Employer,
  User,
  Category,
  SkillCategory,
  Type,
  Skill,
  Job,
} = require("../models/index");
const { Op } = require("sequelize");

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

  static async dashboard(req, res, next) {
    const totalUsers = await User.count();
    const totalEmployers = await Employer.count();
    const totalJobs = await Job.count();
    const totalCategories = await Category.count();
    const totalTypes = await Type.count();
    const totalSkills = await Skill.count();

    res.status(200).json({
      totalUsers,
      totalEmployers,
      totalJobs,
      totalCategories,
      totalTypes,
      totalSkills,
    });
  }

  static async adminLogin(req, res, next) {
    try {
      const { email, password } = req.body;
      const findAdmin = await Admin.findOne({
        where: { email },
      });
      if (!findAdmin) {
        throw { name: "Not Found", message: "Not Registered", code: 404 };
      }
      if (!passValidator(password, findAdmin.password)) {
        throw {
          name: "Forbidden",
          message: "Email or Password is incorrect",
          code: 403,
        };
      }

      const access_token = signToken({
        email: findAdmin.email,
        role: "admin",
        id: findAdmin.id,
      });

      res.status(200).json({
        access_token,
        role: "admin",
        id: findAdmin.id,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getCategory(req, res, next) {
    const categories = await Category.findAndCountAll({
      include: { model: SkillCategory, include: Skill },
    });
    res.status(200).json(categories);
  }

  static async createCategory(req, res, next) {
    try {
      const { name, skills } = req.body;
      const newCategory = await Category.create({ name });

      let arrSkill = [];

      for (let i = 0; i < skills.length; i++) {
        const [skill, created] = await Skill.findOrCreate({
          where: {
            name: skills[i],
          },
          defaults: {
            name: skills[i],
          },
        });

        arrSkill.push({ skillId: skill.id, categoryId: newCategory.id });
      }

      await SkillCategory.bulkCreate(arrSkill);

      res.status(201).json(newCategory);
    } catch (err) {
      next(err);
    }
  }

  static async editCategory(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const updateCategory = await Category.update(
        {
          name,
        },
        {
          where: { id },
        }
      );
      res.status(200).json({
        message: "update succesfull",
      });
    } catch (err) {
      next(err);
    }
  }
  static async deleteCategory(req, res, next) {
    try {
      const { id } = req.params;
      const findCategory = await Category.findOne({
        where: { id },
      });
      if (!findCategory) {
        throw { name: "Not Found" };
      }
      const destroyCategory = await Category.destroy({
        where: { id },
      });
      res.status(200).json({
        message: "category has been deleted",
      });
    } catch (err) {
      next(err);
    }
  }

  static async getType(req, res, next) {
    const types = await Type.findAndCountAll();
    res.status(200).json(types);
  }

  static async createType(req, res, next) {
    try {
      const { name } = req.body;
      const newType = await Type.create({ name });

      res.status(201).json(newType);
    } catch (err) {
      next(err);
    }
  }

  static async editType(req, res, next) {
    try {
      const { name } = req.body;
      const { id } = req.params;
      const updateType = await Type.update(
        { name },
        {
          where: { id },
        }
      );
      res.status(200).json({
        message: "update succesfull",
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteType(req, res, next) {
    try {
      const { id } = req.params;
      const findType = await Type.findOne({
        where: { id },
      });
      if (!findType) {
        throw { name: "Not Found" };
      }
      const destroyType = await Type.destroy({
        where: { id },
      });
      res.status(200).json({
        message: "type has been deleted",
      });
    } catch (err) {
      next(err);
    }
  }

  static async getSkill(req, res, next) {
    if (Object.keys(req.query).length === 0) {
      const skills = await Skill.findAndCountAll();
      res.status(200).json(skills);
    } else {
      const skills = await Skill.findAll({
        where: {
          name: { [Op.iLike]: `%${req.query.s}%` },
        },
      });
      res.status(200).json(skills);
    }
  }

  static async createSkill(req, res, next) {
    try {
      const { name } = req.body;
      const newSkill = await Skill.create({ name });
      res.status(201).json(newSkill);
    } catch (err) {
      next(err);
    }
  }

  static async editSkill(req, res, next) {
    try {
      const { name } = req.body;
      const { id } = req.params;
      const updateSkill = await Skill.update(
        { name },
        {
          where: { id },
        }
      );
      res.status(200).json({
        message: "update succesfull",
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteSkill(req, res, next) {
    try {
      const { id } = req.params;
      const findSkill = await Skill.findOne({
        where: { id },
      });
      if (!findSkill) {
        throw { name: "Not Found" };
      }
      const destroySkill = await Skill.destroy({ where: { id } });
      res.status(200).json({
        message: "Skill has been deleted",
      });
    } catch (err) {
      next(err);
    }
  }

  static async getEmployerById(req, res, next) {
    try {
      const id = +req.params.id;
      const employer = await Employer.findOne({
        where: {
          id,
        },
        attributes: {
          exclude: ["password"],
        },
      });

      if (!employer) {
        throw { name: "Not Found", message: "Employer not found", code: 404 };
      }

      res.status(200).json(employer);
    } catch (err) {
      next(err);
    }
  }

  static async verifyEmployer(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const patchEmployer = await Employer.update(
        {
          status,
        },
        { where: { id } }
      );

      const sendEmailPayload = {
        sendTo: email,
        subjectEmail: "Verify Your Account",
        bodyEmail: approvedEmail(
          process.env.FRONTEND_URL,
        ),
      };

      sendEmail(sendEmailPayload);
      res.status(200).json({
        message: `employer status changed to ${status}`,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AdminController;
