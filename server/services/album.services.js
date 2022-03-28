const { AlbumModel, UserModel, StoneModel } = require("../models/index");

// getAlbumInfo & getAlbumStoneInfo
const getAlbumInfo = async (id, userId) => {
  try {
    const albumInfo = await AlbumModel.find({ id });
    const stoneList = await StoneModel.find({ album_id: id });
    let isLike = await AlbumModel.find({
      $and: [{ like: userId }, { id }],
    });
    isLike = isLike = isLike.length === 0 ? false : true;
    return { albumInfo, stoneList, isLike };
  } catch (e) {
    throw Error(e);
  }
};

// like or unlike
const updateLike = async (album_id, userId, isLike) => {
  try {
    let isOk;
    if (isLike) {
      if (userId !== null && userId !== "" && userId !== undefined) {
        isOk = await AlbumModel.update(
          { id: album_id },
          { $addToSet: { like: [userId] } }
        );
      } else {
        isOk = { acknwledged: false };
      }
    } else {
      isOk = await AlbumModel.updateOne(
        { id: album_id },
        { $pull: { like: userId } }
      );
    }
    return isOk;
  } catch (e) {
    throw Error(e);
  }
};

// insertAlbum
const insertAlbum = async (albumInfo, fileInfo) => {
  try {
    const { albumName, userId, description } = albumInfo;
    const { filename, realfilename, filepath } = fileInfo;
    //userId로 musicianId가져오기
    const musician = await UserModel.findOne(
      { id: userId },
      { musician_id: 1 }
    );
    const Album = new AlbumModel({
      musician_id: musician.musician_id,
      name: albumName,
      description,
      filename,
      realfilename,
      filepath,
    });
    const isIn = await Album.save();
    return;
  } catch (e) {
    throw Error(e);
  }
};

module.exports = {
  insertAlbum,
  getAlbumInfo,
  updateLike,
};
