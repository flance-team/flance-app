const { Employer, User, DepositEmployer, Signer } = require("../models/index");
const confirmationEmail = require("../helpers/confirmationEmailEmployerRegister");
const sendEmail = require("../helpers/sendEmail");
const axios = require("axios");
class EmployerController {
  static async registerEmployer(req, res, next) {
    try {
      const {
        email,
        password,
        companyName,
        address,
        location,
        phoneNumber,
        PIC,
        imgUrl,
        typeId,
        status
      } = req.body;

      // checking if email is already registered on User

      const checkEmail = await User.findOne({
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

      const newEmployer = await Employer.create({
        email,
        password,
        companyName,
        address,
        location,
        phoneNumber,
        PIC,
        imgUrl,
        typeId,
        signer: newSigner.id,
        status: status || "pending",
      });

      const newDepositEmployer = await DepositEmployer.create({ employerId: newEmployer.id, signer: newSigner.id, balance: 0 })
      const dataSigner = await axios.get("https://flance-agreement-api.tianweb.dev/wallets")

      await newSigner.update({ addressPublic: dataSigner.data.walletAddress.cAddresses[0], addressPrivate: dataSigner.data.walletAddress.privateKeys[0], mnemonic: dataSigner.data.mnemonic })

      const sendEmailPayload = {
        sendTo: email,
        subjectEmail: "Verify Your Account",
        bodyEmail: confirmationEmail(
          process.env.ZOOM_LINK,
          process.env.FRONTEND_URL,
        ),
      };

      sendEmail(sendEmailPayload)

      res.status(201).json(newEmployer);
    } catch (err) {
      next(err);
    }
  }

  static async getEmployer(req, res, next) {
    const employers = await Employer.findAndCountAll({
      attributes: { exclude: ["password", "signer"] },
    });
    res.status(200).json(employers);
  }
}

module.exports = EmployerController;
