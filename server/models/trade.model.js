const mongoose = require("mongoose");
const { Schema } = mongoose;

const TradeSchema = new Schema();

module.exports = {
  TradeModel: mongoose.model("Trade", TradeSchema),
};
