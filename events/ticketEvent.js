const EventEmitter = require('events');
const mailer = require('../utils/mailer');
const { app, mail } = require('../config');

const eventEmitter = new EventEmitter;

const VerifyEmailHtml = token => `<b>Hello!</b>
    <br />
    <br />
    Please click the link bellow to verify your email address.
    <br />
    <br />
    <br />
    <a href="${app.domain}/auth/email/verify/${token}">${app.domain}/auth/email/verify/${token}</a>
    <br />
    <br />
    <br />
    If you did not create an account, no further action is required.
    <br />
    <br />
    <br />
    Regards,
    <br />
    Administrator
    `;

const resetPasswordHtml = token => `<b>Hello!</b>
    <br />
    <br />
    You are receiving this email because we received a password reset request for your account
    <br />
    <br />
    <br />
    <a href="${app.domain}/auth/password/reset/${token}">${app.domain}/auth/password/reset/${token}</a>
    <br />
    <br />
    <br />
    This password reset link will expire in 60 minutes.
    <br />
    <br />
    If you did not create an account, no further action is required.
    <br />
    <br />
    <br />
    Regards,
    <br />
    Administrator
    `;

eventEmitter.on('sendVerifyEmailLink', async (email, token) => {
  await mailer.sendEmail(mail.fromAddress, email, 'Email Verification', VerifyEmailHtml(token));
});

eventEmitter.on('sendResetPasswordLink', async (email, token) => {
  await mailer.sendEmail(mail.fromAddress, email, 'Reset Password Notification', resetPasswordHtml(token));
});

module.exports = eventEmitter;
