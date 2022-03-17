const mongoose = require("mongoose");
const { Schema } = mongoose;
var autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

const TransactionSchema = new Schema({
  id: { type: Number, required: true },
  type: String,
  hash: String,
});
TransactionSchema.plugin(autoIncrement.plugin, {
  model: "Transaction",
  field: "id",
  startAt: 1, //시작
  increment: 1, // 증가
});

module.exports = {
  TransactionModel: mongoose.model("Transaction", TransactionSchema),
};
