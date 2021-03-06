const EventEmitter = require('events');
const mailer = require('../helpers/mailHelper');
const { app, mail } = require('../../../config');

const eventEmitter = new EventEmitter;

eventEmitter.on('sendVerifyEmailLink', async (name, email, token) => {
  const context = {
    name,
    verifyEmailLink: `${app.domain}/auth/email/verify/${token}`,
    expirationMinutes: app.ticketExpirationMinutes
  }
  await mailer.sendEmail(mail.fromAddress, email, 'Email Verification', 'verifyEmail', context);
});

eventEmitter.on('sendResetPasswordLink', async (name, email, token) => {
  const context = {
    name,
    resetPasswordLink: `${app.domain}/reset-password/${token}`,
    expirationMinutes: app.ticketExpirationMinutes
  }
  await mailer.sendEmail(mail.fromAddress, email, 'Reset Password Notification', 'resetPassword', context);
});

module.exports = eventEmitter;
