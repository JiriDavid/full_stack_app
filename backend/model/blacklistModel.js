const mongoose = require('mongoose');

const blacklistSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true // Ensure only one instance per token
  },
  createdAt: {
    type: Date,
    default: Date.now // Timestamp for potential future cleanup
  }
});

module.exports = mongoose.model('Blacklist', blacklistSchema);
