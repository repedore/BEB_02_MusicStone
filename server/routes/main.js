var express = require("express");
require("dotenv").config();

var router = express.Router();

router.get("/", function (req, res, next) {
  console.log(process.env.PORT);
  res.status(404).send("Not found");
});

module.exports = router;
