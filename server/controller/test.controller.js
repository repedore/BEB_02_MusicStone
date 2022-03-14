require("dotenv").config();

var TestService = require("../services/test.services");

exports.test = async (req, res, next) => {
  try {
    await TestService.saveTestData();
    var data = await TestService.getTestData({ name: "test" });
    return res
      .status(200)
      .json({ status: 200, data: data, message: "Succesfully" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
