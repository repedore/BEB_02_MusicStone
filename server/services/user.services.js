var { UserModel, MusicianModel } = require("../models/index");
const CaverExtKAS = require("caver-js-ext-kas");
// insertUser and getUserId
const getUserId = async (account) => {
  try {
    const User = new UserModel({ account });
    const user = await UserModel.findOne({ account });
    return user ? user : User.save();
  } catch (e) {
    throw Error(e);
  }
};

// getUserInfo
const getUserInfo = async (id) => {
  try {
    return await UserModel.find({ id });
  } catch (e) {
    throw Error(e);
  }
};

// registerMusician (+ Contract연결하기)
const insertMusician = async (musicianInfo, fileInfo) => {
  const { userId, KName, EName, email, description, snsList, account } =
    musicianInfo;
  const { filename, originalname, path } = fileInfo;
  console.log(typeof snsList);
  // 먼저 musician에 넣고 id값 User에 musician_id로 업데이트
  const Musician = new MusicianModel({
    name_korea: KName,
    name_english: EName,
    email,
    description,
    sns_list: [snsList],
    filename,
    originalname,
    path,
  });
  const isIn = await Musician.save();
  // musiciain id 가져와서 user에 업데이트 해주기
  // return 전 contract에 addMinter
  // 체크
  return isIn
    ? await UserModel.updateOne(
        { id: userId },
        { $addToSet: { musician_id: isIn.id } }
      )
    : {};
};

const addMinter = async (account) => {
  const caver = new CaverExtKAS();
  const chainId = 1001;
  caver.initKASAPI();
};

module.exports = {
  getUserId,
  getUserInfo,
  insertMusician,
};
