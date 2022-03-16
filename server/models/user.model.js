const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema();

module.exports = {
  UserModel: mongoose.model("User", UserSchema),
};
