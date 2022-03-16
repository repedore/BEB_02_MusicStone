const mongoose = require("mongoose");
const { Schema } = mongoose;

const MusicianSchema = new Schema();

module.exports = {
  MusicianModel: mongoose.model("Musician", MusicianSchema),
};
