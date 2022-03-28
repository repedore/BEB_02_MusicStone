var { UserModel, MusicianModel } = require("../models/index");

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

// registMusician
const insertMusician = async (musicianInfo, fileInfo) => {
  const { userId, KName, EName, email, description } = stoneInfo;
  const { filename, realfilename, filepath } = fileInfo;
  // 먼저 musiciaon에 넣고
  const Musician = new MusicianModel({
    name_korea: KName,
    name_english: EName,
    email,
    description,
    filename,
    realfilename,
    filepath,
  });
  const isIn = await Musician.save();
  // musiciain id 가져와서 user에 업데이트 해주기
  return isIn
    ? await UserModel.update(
        { id: userId },
        { $addToSet: { musician_id: isIn.id } }
      )
    : {};
};

module.exports = {
  getUserId,
  getUserInfo,
  insertMusician,
};
