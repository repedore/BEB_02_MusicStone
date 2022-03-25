const { MusicianModel, AlbumModel } = require("../models/index");

// getMusicianList
const getMusicians = async (musicianReq) => {
  const { startIndex, endIndex, keyword } = musicianReq;
  try {
    let musicianList;
    if (keyword === undefined || keyword === "") {
      musicianList = await MusicianModel.find()
        .skip(startIndex - 1)
        .limit(endIndex);
    } else {
      const regex = (pattern) => new RegExp(`.*${pattern}.*`);
      const keywordRegex = regex(keyword);
      const query = {
        $or: [
          { name_korea: { $regex: keywordRegex } },
          { name_english: { $regex: keywordRegex, $options: "i" } },
        ],
      };
      musicianList = await MusicianModel.find(query)
        .skip(startIndex - 1)
        .limit(endIndex);
    }
    return musicianList;
  } catch (e) {
    throw Error(e);
  }
};

// getMusicianInfo
const getMusicianInfo = async (musicianId) => {
  try {
    const musicianInfo = await MusicianModel.find({ id: musicianId });
    return musicianInfo;
  } catch (e) {
    throw Error(e);
  }
};

// getAlbumInfo
const getAlbumInfo = async (musicianId) => {
  try {
    const albumInfo = await AlbumModel.find({ musician_id: musicianId });
    return albumInfo;
  } catch (error) {
    throw Error(error);
  }
};

// isLike
const getLike = async (userId, musicianId) => {
  try {
    let isLike = await MusicianModel.find({
      $and: [{ like: userId }, { id: musicianId }],
    });
    isLike = isLike.length === 0 ? false : true;
    return isLike;
  } catch (e) {
    throw Error(e);
  }
};

// like or unlike
const updateLike = async (musicianId, userId, isLike) => {
  try {
    let isOk;
    if (isLike) {
      isOk = await MusicianModel.updateOne(
        { id: musicianId },
        { $pull: { like: userId } }
      );
    } else {
      if (userId !== null && userId !== "" && userId !== undefined) {
        isOk = await MusicianModel.update(
          { id: musicianId },
          { $addToSet: { like: [userId] } }
        );
      } else {
        isOk = { acknwledged: false };
      }
    }
    return isOk;
  } catch (e) {
    throw Error(e);
  }
};

module.exports = {
  getMusicians,
  getMusicianInfo,
  getAlbumInfo,
  getLike,
  updateLike,
};
