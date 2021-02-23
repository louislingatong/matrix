const EventEmitter = require('events');
const mailer = require('../utils/mailer');
const { app, mail } = require('../config');

const eventEmitter = new EventEmitter;

eventEmitter.on('sendVerifyEmailLink', async (email, token, firstName) => {
  const context = {
    name: firstName,
    verifyEmailLink: `${app.domain}/auth/email/verify/${token}`
  }
  await mailer.sendEmail(mail.fromAddress, email, 'Email Verification', 'verifyEmail', context);
});

eventEmitter.on('sendResetPasswordLink', async (email, token, firstName) => {
  const context = {
    name: firstName,
    resetPasswordLink: `${app.domain}/auth/password/reset/${token}`
  }
  await mailer.sendEmail(mail.fromAddress, email, 'Reset Password Notification', 'resetPassword', context);
});

module.exports = eventEmitter;
