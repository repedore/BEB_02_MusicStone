const express = require("express");
const router = express.Router();

var main = require("./main.route");
var musician = require("./musician.route");
var playlist = require("./playlist.route");
var stones = require("./stones.route");
var user = require("./user.route");

router.use("/", main);
router.use("/musician", musician);
router.use("/playlist", playlist);
router.use("/stones", stones);
router.use("/user", user);

var test = require("./test.route");
router.use("/test", test);

module.exports = router;
