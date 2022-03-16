const mongoose = require("mongoose");
const { Schema } = mongoose;

const TestSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: String,
    age: { type: Number, min: 18, max: 50 },
    intarr: [Number],
  },
  {
    timestamps: true,
  }
);

module.exports = {
  TestModel: mongoose.model("Test", TestSchema),
};
