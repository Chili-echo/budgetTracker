const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  id: String,
  amount: Number,
  comment: String,
  date: { type: Date, default: Date.now },
  type: String,
});

module.exports = mongoose.model('Transaction', transactionSchema);