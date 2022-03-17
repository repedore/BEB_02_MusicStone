require("dotenv").config();

var TestService = require("../services/test.services");

exports.test = async (req, res, next) => {
  try {
    // var data = await TestService.getTestData({ name: "test" });
    var data = await TestService.getAllDataInTestTable();
    // await TestService.makeTestData({
    //   email: "test1@test.com",
    //   name: "test1",
    //   age: 27,
    //   intarr: [1, 2, 3],
    // });
    // await TestService.makeTestData({
    //   email: "test2@test.com",
    //   name: "test2",
    //   age: 28,
    //   intarr: [1, 2, 3, 4],
    // });
    // await TestService.makeTestData({
    //   email: "test3@test.com",
    //   name: "test3",
    //   age: 29,
    //   intarr: [1, 2, 3, 5],
    // });
    return res
      .status(200)
      .json({ status: 200, data: data, message: "Succesfully" });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ status: 400, message: e.message });
  }
};
