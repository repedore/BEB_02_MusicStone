require("dotenv").config();
//const buyTokenController = require("../controller/user.buytoken.controller");

exports.musician_get = (req, res, next) => {};

exports.user_buytoken_post = (req, res, next) => {
  const { toAccount, amount } = req.body;
  try {
    // var data = await TestService.getTestData({ name: "test" });
    require("../controller/user.buytoken.controller")
      .transferToken(toAccount, amount)
      .then((sendResult) => {
        return res
          .status(200)
          .json({
            status: 200,
            data: sendResult,
            message: "토큰 구매가 완료되었습니다.",
          });
      });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ status: 400, message: e.message });
  }
};

//아래 코드는 시뮬레이션 코드
exports.musician_register_post = (req, res, next) => {
  const { KName, EName, account, email, img, musicianInfo } = req.body;
  console.log(
    "musician register : " + KName,
    EName,
    account,
    email,
    img,
    musicianInfo
  );
  if (musicianInfo === "1") {
    res.send({
      message: "뮤지션 등록이 완료되었습니다.",
      success: true,
    });
  } else {
    res.send({
      message: "이미 등록된 email 입니다.",
      success: false,
    });
  }
};
