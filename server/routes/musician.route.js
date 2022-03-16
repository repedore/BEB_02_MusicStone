const express = require("express");
const router = express.Router();
const controller = require("../controller/musician.controller");

router.get("/", controller.musician);
router.post("/register", controller.musician_register_post);

module.exports = router;
