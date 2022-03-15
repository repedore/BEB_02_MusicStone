var { TestModel } = require("../models/index");

var saveTestData = async () => {
  try {
    var data = await getTestData({ email: "test@test.com" });
    if (data.length) {
      console.log("data exist");
    } else {
      console.log("data not exist");
      const newTestModel = new TestModel();
      newTestModel.email = "test@test.com";
      newTestModel.name = "test";
      newTestModel.age = 26;
      newTestModel.intarr = [1, 2, 3];
      return newTestModel.save();
    }
  } catch (e) {
    throw Error("Error");
  }
  //   console.log(process.env.PORT);
};
var getTestData = async (query) => {
  try {
    return TestModel.find(query);
  } catch (e) {
    throw Error("Error");
  }
};

module.exports = {
  saveTestData: saveTestData,
  getTestData: getTestData,
};
