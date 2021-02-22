const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const { mail } = require('../config');
const path = require('path');

const mailConfig = {
  host: mail.host,
  port: mail.port,
  secure: true,
  auth: {
    user: mail.username,
    pass: mail.password
  }
};

const transporter = nodemailer.createTransport(mailConfig);

const handlebarsOptions = {
  viewEngine: {
    defaultLayout: 'main',
    layoutsDir: './mail-templates/main-layout/'
  },
  viewPath: path.resolve('./mail-templates/'),
  extName: '.html',
};

transporter.use('compile', hbs(handlebarsOptions));

module.exports = {
  sendEmail: async (from, to, subject, template, context) => {
    try {
      await transporter.sendMail({from, to, subject, template, context});
    } catch (err) {
      console.log(err);
    };
  }
}