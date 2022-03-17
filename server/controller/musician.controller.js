require("dotenv").config();
exports.musician = (req, res, next) => {};
// exports.musician_buytoken_post = (req, res, next) => {};
// exports.musician_register_post = (req, res, next) => {};

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
