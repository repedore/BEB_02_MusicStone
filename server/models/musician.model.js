const mongoose = require("mongoose");
const { Schema } = mongoose;

const MusicianSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  name_korea: String,
  name_english: String,
  email: String,
  register_data: String,
  image: String,
  description: String,
  contract_accress: String,
  like: [Number],
});

module.exports = {
  MusicianModel: mongoose.model("Musician", MusicianSchema),
};
