const mongoose = require("mongoose");
const { Schema } = mongoose;
var autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

const PlaylistSchema = new Schema({
  id: { type: Number, required: true },
  user_id: { type: Number, required: true },
  stone_id_arr: { type: [Number], default: [] },
});
PlaylistSchema.plugin(autoIncrement.plugin, {
  model: "Playlist",
  field: "id",
  startAt: 1, //시작
  increment: 1, // 증가
});

module.exports = {
  PlaylistModel: mongoose.model("Playlist", PlaylistSchema),
};
