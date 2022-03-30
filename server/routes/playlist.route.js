const express = require("express");
const router = express.Router();
const controller = require("../controller/playlist.controller");

router.get("/:account", controller.playlist_get);
router.post("/:account", controller.playlist_post);
router.get("/streaming/:stone_id", controller.playlist_streaming_get);
module.exports = router;
