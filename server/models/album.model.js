const mongoose = require("mongoose");
const { Schema } = mongoose;

const AlbumSchema = new Schema();

module.exports = {
  AlbumModel: mongoose.model("Album", AlbumSchema),
};
