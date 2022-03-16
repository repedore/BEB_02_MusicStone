const mongoose = require("mongoose");
const { Schema } = mongoose;

const StoneSchema = new Schema();

module.exports = {
  StoneModel: mongoose.model("Stone", StoneSchema),
};
