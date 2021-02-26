const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { user } = require('../config');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  code: String,
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
  leader: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
  status: {
    type: String,
    enum: user.statuses,
    default: 'PENDING',
    required: true
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

userSchema.pre('save', async function(next) {
  try {
    // Generate a password hash
    const hashedPassword = await bcrypt.hash(this.password, 10);

    // Override hashed password to the password
    this.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.pre(['find', 'findOne'], async function(next) {
  try {
    this.populate('members');
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.validatePassword = async function(password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = mongoose.model('user', userSchema);