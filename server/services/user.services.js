const { UserModel, MusicianModel } = require("../models/index");

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

// registerMusician (+ Contract연결하기, sns추가하기 )
const insertMusician = async (musicianInfo, fileInfo) => {
  const { userId, KName, EName, email, description, account } = musicianInfo;
  const { filename, originalname, path } = fileInfo;
  const isMusician = (
    await UserModel.findOne({ account }, { musician_id: 1, _id: 0 })
  ).musician_id;
  if (isMusician === 0) {
    const Musician = new MusicianModel({
      name_korea: KName,
      name_english: EName,
      email,
      description,
      filename,
      originalname,
      path,
    });
    const isIn = await Musician.save();
    console.log(isIn);
    return isIn !== {}
      ? await UserModel.updateOne({ id: userId }, { musician_id: isIn.id })
      : {};
  } else {
    return "Double";
  }
};

module.exports = {
  getUserId,
  getUserInfo,
  insertMusician,
};
