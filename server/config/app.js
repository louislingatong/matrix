module.exports = {
  domain: process.env.APP_DOMAIN || 'http://localhost:3000',
  maxMembers: parseInt(process.env.MAX_MEMBERS) || 3,
  maxLevel: parseInt(process.env.MAX_LEVEL) || 4
}