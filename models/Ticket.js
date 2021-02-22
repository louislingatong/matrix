const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user'
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