const User = require('../models/User')

module.exports = {
  index: async (req, res, next) => {
    const users = await User.find();
    res.status(200).json(users);
  },

  getUser: async (req, res, next) => {
    const { userId } = req.value.params;
    const user = await User.findById(userId);
    res.status(200).json(user);
  },

  replaceUser: async (req, res, next) => {
    // should require all the fields of the req.body
    const { userId } = req.value.params;
    const newUser = req.value.body;
    const result = await User.findByIdAndUpdate(userId, newUser);
    res.status(200).json({ success: true });
  },

  updateUser: async (req, res, next) => {
    // should require any of the fields of the req.body
    const { userId } = req.value.params;
    const newUser = req.value.body;
    const result = await User.findByIdAndUpdate(userId, newUser);
    res.status(200).json({ success: true });
  },

  getMembers: async (req, res, next) => {
    const { userId } = req.value.params;
    const user = await User.findById(userId);
    res.status(200).json(user.members);
  },
}