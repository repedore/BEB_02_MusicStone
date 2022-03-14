require("dotenv").config();
const mongoose = require("mongoose");

module.exports = () => {
  const connect = () => {
    mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });
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
