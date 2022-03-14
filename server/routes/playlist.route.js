const express = require("express");
const router = express.Router();
const controller = require("../controller/playlist.controller");

router.get("/:account", controller.playlist_get);
router.post("/:account", controller.playlist_post);

module.exports = router;
