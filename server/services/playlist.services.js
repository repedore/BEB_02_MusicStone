const {
  PlaylistModel,
  UserModel,
  StoneModel,
  MusicianModel,
} = require("../models/index");

// getUserPlaylist (+ musicianInfo 필요한 값들만 추리기, 노래시간불러오기)
const getPlaylist = async (account) => {
  try {
    const user_id = (await UserModel.findOne({ account }, { id: 1, _id: 0 }))
      .id;
    const stoneArr = (
      await PlaylistModel.findOne({ user_id }, { stone_id_arr: 1 })
    ).stone_id_arr;
    // StonModel에  Musician 조인하기
    const info = await StoneModel.aggregate([
      {
        $lookup: {
          from: "musicians",
          let: {
            musician_id: "$musician_id",
            name_korea: "$name_k",
            name_english: "$name_e",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ["$id", "$$musician_id"] }],
                },
              },
            },
          ],
          as: "musicianInfo",
        },
      },
    ]);

    const playInfo = info.filter((el) => {
      return stoneArr.includes(el.id);
    });
    return playInfo;
  } catch (e) {
    throw Error(e);
  }
};

// insertPlaylist
const updatePlaylist = async (user_id, stoneId) => {
  try {
    const isOk = await PlaylistModel.updateOne(
      { user_id },
      { $addToSet: { stone_id_arr: stoneId } }
    );
    return isOk.modifiedCount;
  } catch (e) {
    throw Error(e);
  }
};

// getStonePath
const getStonePath = async (id) => {
  try {
    const path = (await StoneModel.findOne({ id }, { path: 1, _id: 0 })).path;
    return path;
  } catch (e) {
    throw Error(e);
  }
};

module.exports = {
  getPlaylist,
  updatePlaylist,
  getStonePath,
};
