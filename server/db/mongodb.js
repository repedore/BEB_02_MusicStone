require("dotenv").config();
const mongoose = require("mongoose");

module.exports = () => {
  const connect = () => {
    console.log(process.env.MONGODB_URL);
    mongoose.connect(
      "mongodb+srv://koasis03:dmschfhd03!!@cluster0.t8lkv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      { useNewUrlParser: true }
    );
  };
  connect();
  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
  });
  mongoose.connection.on("disconnected", () => {
    console.log("Disconnected to MongoDB");
    connect();
  });
  mongoose.connection.on("reconnected", () => {
    console.log("Reconnected to MongoDB");
  });
  mongoose.connection.on("reconnectFailed", () => {
    console.log("reconnectFailed to MongoDB");
  });
};
