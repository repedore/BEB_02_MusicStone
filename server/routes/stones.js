var express = require("express");
var router = express.Router();

router.get("/mystone/:account", function (req, res, next) {});

router.get("/buystone", function (req, res, next) {});

router.get("/:musicstone_id", function (req, res, next) {});

module.exports = router;
