const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  token: {
    type: String,
    required: true,
  },
  expireAt: {
    type: Date,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

module.exports = mongoose.model('ticket', ticketSchema);