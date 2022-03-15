const mongoose = require("mongoose");
const { Schema } = mongoose;

const AlbumSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  musician_id: Number,
  name: String,
  image: String,
  like: [Number],
});

module.exports = {
  AlbumModel: mongoose.model("Album", AlbumSchema),
};
