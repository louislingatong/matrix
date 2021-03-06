const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { user } = require('../../../config');

const autoHashPassword = async function (next) {
  try {
    console.log(this.password);
    // Generate a password hash
    const hashedPassword = await bcrypt.hash(this.password, 10);

    // Override hashed password to the password
    this.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
};

const autoPopulateMembers = function (next) {
  try {
    this.populate({
      path: 'members',
      select: 'level code name email',
      populate: {
        path: 'profile',
        select: 'firstName lastName'
      }
    });
    next();
  } catch (err) {
    next(err);
  }
};

const Schema = mongoose.Schema;

const userSchema = new Schema({
  code: String,
  group: String,
  level: {
    type: Number,
    default: 1,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    min: 3,
    max: 20,
    required: true
  },
  status: {
    type: String,
    enum: user.statuses,
    default: 'PENDING',
    required: true
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'profile'
  },
  leader: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }]
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

userSchema
  .pre('save', autoHashPassword)
  .pre('find', autoPopulateMembers)
  .pre('findOne', autoPopulateMembers);

userSchema.methods.validatePassword = async function(password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = mongoose.model('user', userSchema);