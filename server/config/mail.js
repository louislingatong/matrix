module.exports = {
  host: process.env.MAIL_HOST || 'smtp.mailgun.org',
  port: process.env.MAIL_PORT || 587,
  username: process.env.MAIL_USERNAME || '',
  password: process.env.MAIL_PASSWORD || '',
  fromAddress: process.env.MAIL_FROM_ADDRESS || 'no-reply@example.test'
}