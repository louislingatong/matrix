const User = require('../models/User')

module.exports = {
  index: async (req, res, next) => {
    const users = await User.find();
    res.status(200).json(users);
  },

  getUser: async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.findOne({_id: userId});
    res.status(200).json(user);
  }
}