const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  name: String,
  holding_ids: Array, // String ids
});

// Export
module.exports = mongoose.model('Portfolio', portfolioSchema);