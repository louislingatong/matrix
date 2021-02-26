const JWT = require('jsonwebtoken');
const randomstring  = require('randomstring');
const User = require('../models/User');
const Profile = require('../models/Profile');
const Ticket = require('../models/Ticket');
const { auth } = require('../config');
const { responseError } = require('../helpers/errorHelper');
const { app } = require('../config')

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
    // Check email if already exist
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) { return responseError(res, 422, { email: 'Email is already exist.' }); }

    // Check username if already exist
    const usernameExist = await User.findOne({username: req.body.username});
    if (usernameExist) { return responseError(res, 422, { username: 'Username is already exist.' }); }

    // Find the leader specified in code
    const leader = await User.findOne({code: req.body.code});

    // Disallow user registration if already in maximum number of members
    // Disallow user registration if already in maximum level
    // If leader exists, handle it
    if (leader) {
      // Count leader members
      const membersCount = await User.countDocuments({ leader });
      // Check if leader members is already in maximum number of members
      if (membersCount >= app.maxMembers) {
        return responseError(res, 400, `Code ${leader.code} is already in maximum of ${app.maxMembers} members`);
      }
      // Check if leader level is already in maximum level
      if (leader.level >= app.maxLevel) {
        return responseError(res, 400, `User level is limited only for ${app.maxLevel} levels`);
      }
    }

    // Generate code
    const code = await generateCode();

    // Construct a user name
    const name = `${req.body.firstName} ${req.body.lastName}`

    // Create new user
    const user = new User({
      code,
      name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    // If leader exists, handle it
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
      firstName: req.body.firstName,
      lastName: req.body.lastName,
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

    eventEmitter.emit('sendVerifyEmailLink', user.name, user.email, ticket.token);

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
    const user = await User.findOne({email: req.body.email});
    if (!user) { return responseError(res, 422, { email: 'Email is invalid'}); }

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

    eventEmitter.emit('sendResetPasswordLink', user.name, user.email, ticket.token);

    res.status(200).json({ message: 'Reset password link has been sent to your email' });
  },

  resetPassword: async (req, res, next) => {
    // Find the ticket specified in token
    const ticket = await Ticket.findOne({ token: req.body.token }).populate('owner');
    if (!ticket) { return responseError(res, 422, { token: 'Token is invalid'}); }

    // Check token if expired
    const expiredTicket = Date.now() > ticket.expireAt;
    if (expiredTicket) { return responseError(res, 422, { token: 'Token is already expired'}); }

    // Update Password
    ticket.owner.password = req.body.password;
    ticket.owner.save();

    // Delete ticket
    ticket.remove();

    res.status(200).json({ message: 'Password has been changed successfully' });
  },

  verifyEmail: async (req, res, next) => {
    // Find the ticket specified in token
    const ticket = await Ticket.findOne({ token: req.params.token }).populate('owner');
    if (!ticket) { return responseError(res, 400, 'Invalid token'); }

    // Check token if expired
    const expiredTicket = Date.now() > ticket.expireAt;
    if (expiredTicket) { return responseError(res, 400, 'Token is already expired'); }

    // Change user status to active
    ticket.owner.updateOne({ status: 'ACTIVE' });

    // Delete ticket
    ticket.remove();

    res.status(200).json({ message: 'Account has been verified successfully' });
  },

  me: async (req, res, next) => {
    const user = await User.findOne({_id: req.user.id})
      .populate('leader', ['code', 'name']);
    res.status(200).json(user);
  }
}