module.exports = {
  clientSecret: process.env.CLIENT_SECRET || 'S3cr3t',
  ticketExpiration: parseInt(process.env.TICKET_EXPIRATION) || 1
}