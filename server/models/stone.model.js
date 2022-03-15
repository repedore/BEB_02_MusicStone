const mongoose = require("mongoose");
const { Schema } = mongoose;
var autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

const StoneSchema = new Schema({
  id: { type: Number, required: true },
  musician_id: Number,
  album_id: Number,
  name: String,
  description: String,
  category: String,
  like: { type: [Number], default: [] },
});
StoneSchema.plugin(autoIncrement.plugin, {
  model: "Stone",
  field: "id",
  startAt: 1, //시작
  increment: 1, // 증가
});

module.exports = {
  StoneModel: mongoose.model("Stone", StoneSchema),
};
