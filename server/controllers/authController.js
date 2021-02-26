const JWT = require('jsonwebtoken');
const randomstring  = require('randomstring');
const db = require('../models');
const { auth, app } = require('../config');
const { responseError } = require('../helpers/errorHelper');

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
  const count = await db.User.countDocuments();
  const currentDate = new Date();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
  const year = currentDate.getFullYear();
  const number = count.toString().padStart(4, '0');
  return `${month}${year}${number}`;
}

createUser = async (data, leader) => {
  const user = new db.User(data);
  await user.save();
  if (leader) {
    await user.updateOne({
      leader,
      level: leader.level + 1
    })
    await leader.updateOne({
      $push: {
        members: user
      }
    });
  }
  return user;
};

createProfile = async (data, user) => {
  const profile = await db.Profile.create(data);
  await user.updateOne({ profile })
  return profile;
};

createTicket = async (data) => {
 const ticket = await db.Ticket.create(data);
 return ticket;
};

module.exports = {
  register: async (req, res, next) => {
    const emailExist = await db.User.findOne({email: req.body.email});
    if (emailExist) { return responseError(res, 422, { email: 'Email is already exist.' }); }

    const usernameExist = await db.User.findOne({username: req.body.username});
    if (usernameExist) { return responseError(res, 422, { username: 'Username is already exist.' }); }

    const leader = await db.User.findOne({code: req.body.code});

    if (leader) {
      const membersCount = await db.User.countDocuments({ leader });
      if (membersCount >= app.maxMembers) {
        return responseError(res, 400, `Code ${leader.code} is already in maximum of ${app.maxMembers} members`);
      }

      if (leader.level >= app.maxLevels) {
        return responseError(res, 400, `User level is limited only for ${app.maxLevel} levels`);
      }
    }

    const code = await generateCode();
    const group = leader ? leader.group : code;
    const name = `${req.body.firstName} ${req.body.lastName}`

    const user = await createUser({
      code,
      group,
      name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }, leader)

    await createProfile( {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    }, user);

    const token = await randomstring.generate();
    const expireAt = new Date().setDate(new Date().getDate() + auth.ticketExpiration);

    const ticket = await createTicket({ user, token, expireAt });

    eventEmitter.emit('sendVerifyEmailLink', user.name, user.email, ticket.token);

    const accessToken = generateAccessToken(user);

    res.status(200).json({ token: accessToken });
  },

  login: async (req, res, next) => {
    const token = generateAccessToken(req.user);

    res.status(200).json({ token });
  },

  forgotPassword: async (req, res, next) => {
    const user = await db.User.findOne({email: req.body.email});
    if (!user) { return responseError(res, 422, { email: 'Email is invalid'}); }

    const token = await randomstring.generate();
    const expireAt = new Date().setDate(new Date().getDate() + auth.ticketExpiration);

    const ticket = await createTicket({ user, token, expireAt });

    eventEmitter.emit('sendResetPasswordLink', user.name, user.email, ticket.token);

    res.status(200).json({ message: 'Reset password link has been sent to your email' });
  },

  resetPassword: async (req, res, next) => {
    const ticket = await db.Ticket.findOne({ token: req.body.token }).populate('owner');
    if (!ticket) { return responseError(res, 422, { token: 'Token is invalid'}); }

    const expiredTicket = Date.now() > ticket.expireAt;
    if (expiredTicket) { return responseError(res, 422, { token: 'Token is already expired'}); }

    ticket.owner.updateOne({ password: req.body.password });

    ticket.remove();

    res.status(200).json({ message: 'Password has been changed successfully' });
  },

  verifyEmail: async (req, res, next) => {
    const ticket = await db.Ticket.findOne({ token: req.params.token }).populate('owner');
    if (!ticket) { return responseError(res, 400, 'Invalid token'); }

    const expiredTicket = Date.now() > ticket.expireAt;
    if (expiredTicket) { return responseError(res, 400, 'Token is already expired'); }

    ticket.owner.updateOne({ status: 'ACTIVE' });

    ticket.remove();

    res.status(200).json({ message: 'Account has been verified successfully' });
  },

  me: async (req, res, next) => {
    const user = await db.User
      .findById(req.user.id)
      .populate('profile', 'firstName lastName')
      .select('code name username email');

    res.status(200).json(user);
  }
}