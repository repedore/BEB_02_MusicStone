const mongoose = require("mongoose");
const { Schema } = mongoose;

const PlaylistSchema = new Schema({
  id: { type: Number, required: true },
  user_id: { type: Number, required: true },
  stone_id_arr: [Number],
});

module.exports = {
  PlaylistModel: mongoose.model("Playlist", PlaylistSchema),
};
