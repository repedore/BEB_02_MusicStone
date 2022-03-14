const express = require("express");
const router = express.Router();
const controller = require("../controller/stones.controller");

router.get("/mystone/:account", controller.stone_mystone_get);
router.get("/buystone", controller.stone_buystone_get);
router.get("/:musicstone_id", controller.stone_musicstone_id_get);

module.exports = router;
