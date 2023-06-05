const { User, Employer, Signer, DepositUser, SkillList, Skill } = require("../models/index");
const axios = require("axios");
class UserController {
  static async registerUser(req, res, next) {
    try {
      const { email, password, username, name, address, phoneNumber, gender, skills } =
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
      const dataSigner = await axios.get("https://flance-agreement-api.tianweb.dev/wallets")

      await newSigner.update({ addressPublic: dataSigner.data.walletAddress.cAddresses[0], addressPrivate: dataSigner.data.walletAddress.privateKeys[0], mnemonic: dataSigner.data.mnemonic })

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

        arrSkill.push({ skillId: skill.id, userId: newUser.id });
      }

      const newSkills = await SkillList.bulkCreate(arrSkill);


      res.status(201).json(newUser);
    } catch (err) {
      next(err);
    }
  }

  static async getUser(req, res, next) {
    try {
      const users = await User.findAll({
        attributes: { exclude: ["password", "signer"] },
      });
      res.status(200).json(users);
    } catch (err) {

    }
  }

  static async getUserById(req, res, next) {
    try {
      const id = +req.params.id;

      const user = await User.findOne({
        where: { id },
      });
      if (!user) {
        throw {
          name: "Not Found",
          message: "User not found",
          code: 404,
        };
      }

      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  static async getSkills(req, res, next) {
    try {
      const skills = await Skill.findAll();

      res.status(200).json(skills);
    } catch (err) {
      next(err);
    }
  }

  static async addSkills(req, res, next) {
    try {
      const id = req.identity.id;
      const { skills } = req.body;
      const user = await User.findOne({
        where: { id },
      });


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

        arrSkill.push({ skillId: skill.id, userId: user.id });
      }

      const newSkills = await SkillList.bulkCreate(arrSkill);

      res.status(201).json(newSkills);


    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
