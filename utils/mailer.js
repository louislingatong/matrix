const nodemailer = require('nodemailer');
const { mail } = require('../config');

const mailConfig = {
  host: mail.host,
  port: mail.port,
  secure: true,
  auth: {
    user: mail.username,
    pass: mail.password
  }
};

const transport = nodemailer.createTransport(mailConfig);

module.exports = {
  sendEmail: async (from, to, subject, html) => {
    try {
      await transport.sendMail({from, to, subject, html});
    } catch (err) {
      console.log(err);
    };
  }
}