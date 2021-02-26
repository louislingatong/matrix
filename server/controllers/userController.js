const db = require('../models')

module.exports = {
  index: async (req, res, next) => {
    let users = await db.User
      .find({
        group: req.user.group, leader: req.user
      })
      .populate('profile', 'firstName lastName')
      .select('code name username email');
    res.status(200).json(users);
  },

  getUser: async (req, res, next) => {
    const { userId } = req.params;
    const user = await db.User
      .findOne({
        group: req.user.group,
        _id: req.params.userId
      })
      .populate('profile', 'firstName lastName')
      .select('code name username email');
    res.status(200).json(user);
  },
}