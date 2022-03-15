const mongoose = require("mongoose");
const { Schema } = mongoose;

const TradeSchema = new Schema({
  id: { type: Number, required: true },
  stone_id: { type: Number, required: true },
  sell_user_id: { type: Number, required: true },
  price: { type: Number, required: true },
  amount: { type: Number, required: true },
  open_date: { type: Date, required: true, default: Date.now },
  closed: { type: Number, required: true },
});

module.exports = {
  TradeModel: mongoose.model("Trade", TradeSchema),
};
