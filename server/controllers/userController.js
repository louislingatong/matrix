const User = require('../models/User')

module.exports = {
  index: async (req, res, next) => {
    const users = await User.find({leader: req.user.leader})
      .select(['code', 'name']);
    res.status(200).json(users[0].members);
  },

  getUser: async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.findOne({_id: userId})
      .select(['code', 'name']);
    res.status(200).json(user);
  },
}