const mongoose = require("mongoose");
const { Schema } = mongoose;

const TransactionSchema = new Schema();

module.exports = {
  TransactionModel: mongoose.model("Transaction", TransactionSchema),
};
