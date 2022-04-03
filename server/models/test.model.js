const mongoose = require("mongoose");
const { Schema } = mongoose;
var autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

const TestSchema = new Schema(
  {
    id: { type: Number, required: true },
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
TestSchema.plugin(autoIncrement.plugin, {
  model: "Test",
  field: "id",
  startAt: 1, //시작
  increment: 1, // 증가
});

module.exports = {
  TestModel: mongoose.model("Test", TestSchema),
};
