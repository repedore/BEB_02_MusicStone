const express = require("express");
const router = express.Router();
const controller = require("../controller/user.controller");

router.get("/", controller.musician_get);
router.post("/buytoken", controller.musician_buytoken_post);
router.post("/register", controller.musician_register_post);

module.exports = router;
