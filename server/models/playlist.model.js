const mongoose = require("mongoose");
const { Schema } = mongoose;

const PlaylistSchema = new Schema();

module.exports = {
  PlaylistModel: mongoose.model("Playlist", PlaylistSchema),
};
