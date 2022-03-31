const UserService = require("../services/user.services");
//const serviceContract = require("../contracts/serviceContract");
// userId 반환
exports.user_account_get = async (req, res, next) => {
  try {
    const userAccount = req.params.user_account;
    const user = await UserService.getUserId(userAccount);
    res.status(201).json({ userId: user.id });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// userInfo반환
exports.user_get = async (req, res, next) => {
  try {
    const userId = req.query.userId;
    const userInfo = await UserService.getUserInfo(userId);
    res.status(200).json({ userInfo });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// musician등록
exports.user_register_post = async (req, res, next) => {
  try {
    const musicianInfo = req.body;
    const fileInfo = req.file;
    const isOk = await UserService.insertMusician(musicianInfo, fileInfo);
    //serviceContract.addMinter(musicianInfo.address//);
    console.log(isOk);
    if (isOk === "Double") {
      res.status(200).json({
        message: "이미 뮤지션 등록이 되어있습니다.",
        success: false,
      });
    } else if (isOk === {}) {
      res.status(500).json({ message: e.message });
    } else {
      res.status(201).json({
        message: "뮤지션 등록이 완료되었습니다.",
        success: true,
      });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
