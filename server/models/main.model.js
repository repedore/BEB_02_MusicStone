const mongoose = require("mongoose");
const { Schema } = mongoose;

const MainSchema = new Schema();

module.exports = {
  Main: mongoose.model("Main", MainSchema),
};
