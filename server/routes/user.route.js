const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "musicians/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const musicians = multer({ storage });
const controller = require("../controller/user.controller");
router.get("/", controller.user_get);
router.get("/:user_account", controller.user_account_get);
router.post("/buytoken_post", controller.user_buytoken_post);
router.post(
  "/register",
  musicians.single("musicianfile"),
  controller.user_register_post
);

module.exports = router;
