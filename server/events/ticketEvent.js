const EventEmitter = require('events');
const mailer = require('../utils/mailer');
const { app, mail } = require('../config');

const eventEmitter = new EventEmitter;

eventEmitter.on('sendVerifyEmailLink', async (name, email, token) => {
  const context = {
    name,
    verifyEmailLink: `${app.domain}/auth/email/verify/${token}`
  }
  await mailer.sendEmail(mail.fromAddress, email, 'Email Verification', 'verifyEmail', context);
});

eventEmitter.on('sendResetPasswordLink', async (name, email, token) => {
  const context = {
    name,
    resetPasswordLink: `${app.domain}/auth/password/reset/${token}`
  }
  await mailer.sendEmail(mail.fromAddress, email, 'Reset Password Notification', 'resetPassword', context);
});

module.exports = eventEmitter;
