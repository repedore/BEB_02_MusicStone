const mongoose = require("mongoose");
const { Schema } = mongoose;

const StoneSchema = new Schema({
  id: { type: Number, required: true },
  musician_id: Number,
  album_id: Number,
  name: String,
  description: String,
  category: String,
  like: [Number],
});

module.exports = {
  StoneModel: mongoose.model("Stone", StoneSchema),
};
