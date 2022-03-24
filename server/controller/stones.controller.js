require("dotenv").config();
exports.stone_mystone_get = (req, res, next) => {};
exports.stone_buystone_get = (req, res, next) => {};
exports.stone_musicstone_id_get = (req, res, next) => {};

//아래 코드는 시뮬레이션 코드
exports.stone_register_post = (req, res, next) => {
  const { stoneName, account, stoneInfo } = req.body;
  console.log("stone register : " + stoneName, account, stoneInfo);
  if (stoneInfo === "1") {
    res.send({
      message: "스톤 등록이 완료되었습니다.",
      success: true,
    });
  } else {
    res.send({
      message: "이미 등록된 스톤 입니다.",
      success: false,
    });
  }
};
