const JWT = require('jsonwebtoken');
const randomstring  = require('randomstring');
const User = require('../models/User');
const Profile = require('../models/Profile');
const Ticket = require('../models/Ticket');
const { auth } = require('../config');

const eventEmitter = require('../events/ticketEvent');

generateAccessToken = user => {
  return JWT.sign({
    iss: 'User',
    sub: user.id,
    iat: new Date().getTime(), // Current time
    exp: new Date().setDate(new Date().getDate() + 1) //Current time plus 1 day ahead
  }, auth.clientSecret);
}

generateCode = async () => {
  const count = await User.countDocuments();
  const currentDate = new Date();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
  const year = currentDate.getFullYear();
  const number = count.toString().padStart(4, '0');
  return `${month}${year}${number}`;
}

module.exports = {
  register: async (req, res, next) => {
    // Find the user specified in email
    const emailExist = await User.findOne({email: req.value.body.email});
    if (emailExist) { return res.status(400).send('Email already exist.'); }

    // Generate code
    const code = await generateCode();

    // Create new user
    const user = new User({
      code: code,
      username: req.value.body.username,
      email: req.value.body.email,
      password: req.value.body.password
    });

    // Find the leader specified in code
    const leader = await User.findOne({code: req.value.body.code});

    // If leader doesn't exists, handle it
    if (leader) {
      // Assign a leader to new user
      user.leader = leader;

      // Update use level
      user.level = leader.level + 1;

      // Add new user to leader members
      await leader.updateOne({$push: { members: user }});
    }

    // Save the user
    await user.save();

    // Create new profile
    const profile = new Profile({
      firstName: req.value.body.firstName,
      lastName: req.value.body.lastName,
    });

    // Assign a user to profile
    profile.user = user;

    // save the profile
    await profile.save();

    // Generate ticket token
    const token = await randomstring.generate();

    // Set ticket expiration time
    const expireAt = new Date().setDate(new Date().getDate() + auth.ticketExpiration);

    // Issue new ticket
    const ticket = new Ticket({
      token: token,
      expireAt: expireAt
    });

    // Assign a owner to ticket
    ticket.owner = user;

    // save the ticket
    await ticket.save();

    eventEmitter.emit('sendVerifyEmailLink', user.email, ticket.token);

    // Generate access token
    const accessToken = generateAccessToken(user);

    res.status(200).json({ token: accessToken });
  },

  login: async (req, res, next) => {
    // Generate access token
    const token = generateAccessToken(req.user);

    res.status(200).json({ token });
  },

  forgotPassword: async (req, res, next) => {
    // Find the user specified in email
    const user = await User.findOne({email: req.value.body.email});
    if (!user) { return res.status(400).send('Invalid email.'); }

    // Generate ticket token
    const token = await randomstring.generate();

    // Set ticket expiration time
    const expireAt = new Date().setDate(new Date().getDate() + auth.ticketExpiration);

    // Issue new ticket
    const ticket = new Ticket({
      token: token,
      expireAt: expireAt
    });

    // Assign a owner to ticket
    ticket.owner = user;

    // save the ticket
    await ticket.save();

    eventEmitter.emit('sendResetPasswordLink', user.email, ticket.token);

    res.status(200).json({ message: 'Reset password link has been sent to you email.' });
  },

  resetPassword: async (req, res, next) => {
    // Find the ticket specified in token
    const ticket = await Ticket.findOne({ token: req.value.body.token }).populate('owner');
    if (!ticket) { return res.status(400).send('Invalid token.'); }

    // Check token if expired
    const expiredTicket = Date.now() > ticket.expireAt;
    if (expiredTicket) { return res.status(400).send('Token is already expired.'); }

    // Update Password
    ticket.owner.password = req.value.body.password;
    ticket.owner.save();

    // Delete ticket
    ticket.remove();

    res.status(200).json({ message: 'Password has been changed successfully.' });
  },

  verifyEmail: async (req, res, next) => {
    // Find the ticket specified in token
    const ticket = await Ticket.findOne({ token: req.params.token }).populate('owner');
    if (!ticket) { return res.status(400).send('Invalid token.'); }

    // Check token if expired
    const expiredTicket = Date.now() > ticket.expireAt;
    if (expiredTicket) { return res.status(400).send('Token is already expired.'); }

    // Change user status to active
    ticket.owner.updateOne({ status: 'ACTIVE' });

    // Delete ticket
    ticket.remove();

    res.status(200).json({ message: 'Account has been verified successfully.' });
  },
}