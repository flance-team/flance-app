"use strict";
const nodemailer = require("nodemailer");

const { NODEMAILER_EMAIL, NODEMAILER_PASS } = process.env;

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail({ sendTo, subjectEmail, bodyEmail, textEmail }) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail", // true for 465, false for other ports
    auth: {
      user: NODEMAILER_EMAIL, // generated ethereal user
      pass: NODEMAILER_PASS, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: NODEMAILER_EMAIL, // sender address
    to: sendTo, // list of receivers
    subject: subjectEmail, // Subject line
    text: textEmail, // plain text body
    html: bodyEmail, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = sendEmail;