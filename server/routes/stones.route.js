const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "stones/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const stones = multer({ storage });
const controller = require("../controller/stones.controller");
// stone등록 페이지 들어올때 req(account or id(user) or id(musician))를 통해 AlbumId랑 name 보내주기.
router.get("/:user_account", controller.stones_get);
router.get("/mystone/:user_id", controller.stones_mystone_get);
router.post("/mystone/:user_id", controller.stones_mystone_post);

router.post(
  "/register",
  stones.single("stonefile"),
  controller.stones_register_post
);
router.get("/buystone", controller.stones_buystone_get);
router.get("/info/:musicstone_id", controller.stones_info_get);
router.get("/tradestone/:musicstone_id", controller.stones_tradestone_get);
router.post("/tradestone/:musicstone_id", controller.stones_tradestone_post);

module.exports = router;
