const {
  AlbumModel,
  UserModel,
  StoneModel,
  MusicianModel,
} = require("../models/index");

// getAlbumInfo & getAlbumStoneInfo (+ stones like값 넣기)
const getAlbumInfo = async (id, userId) => {
  console.log(`albumId: ${id}`);
  try {
    const albumInfo = await AlbumModel.findOne({ id });
    const musicianInfo = await MusicianModel.findOne(
      { id: albumInfo.musician_id },
      { name_korea: 1, name_english: 1 }
    );
    const stoneList = await StoneModel.find(
      { album_id: id },
      { _id: 0, release_date: 0 }
    );

    // 객체에 isLike값 넣기
    const stones = stoneList.map((el) => {
      console.log(typeof el);
      const isLike = el.like.indexOf(userId) !== -1 ? true : false;
      Object.assign(el, { isLike: true });
      return el;
    });

    let isLike = await AlbumModel.find({
      $and: [{ like: userId }, { id }],
    });
    isLike = isLike = isLike.length === 0 ? false : true;
    return { musicianInfo, albumInfo, stones, isLike };
  } catch (e) {
    throw Error(e);
  }
};

// like or unlike
const updateLike = async (likeInfo) => {
  try {
    const { type, likeId, userId, isLike } = likeInfo;
    const model = type === "album" ? AlbumModel : StoneModel;
    let isOk;
    if (isLike) {
      if (userId !== null && userId !== "" && userId !== undefined) {
        isOk = await model.update(
          { id: likeId },
          { $addToSet: { like: [userId] } }
        );
      } else {
        isOk = { acknwledged: false };
      }
    } else {
      isOk = await model.updateOne({ id: likeId }, { $pull: { like: userId } });
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
