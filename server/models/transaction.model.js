const mongoose = require("mongoose");
const { Schema } = mongoose;

const TransactionSchema = new Schema({
  id: { type: Number, required: true },
  type: String,
  hash: String,
});

module.exports = {
  TransactionModel: mongoose.model("Transaction", TransactionSchema),
};
