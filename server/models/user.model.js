const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  id: { type: Number, required: true },
  musician_id: Number,
  name: String,
  account: String,
  register_date: String,
  playlist_id_array: [Number],
});

module.exports = {
  UserModel: mongoose.model("User", UserSchema),
};
