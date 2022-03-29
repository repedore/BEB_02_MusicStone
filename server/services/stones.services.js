const {
  StoneModel,
  UserModel,
  TradeModel,
  AlbumModel,
} = require("../models/index");

// AlbumList({id, name})
const getAlbumList = async (userAccount) => {
  try {
    const musician_id = (
      await UserModel.findOne({ account: userAccount }, { musician_id: 1 })
    ).musician_id;
    const albumList = await AlbumModel.find(
      { musician_id },
      { id: 1, name: 1 }
    );
    return albumList;
  } catch (e) {
    throw Error(e);
  }
};

// getUserStone (+ contract연결)
const getMyStoneList = async (userId) => {
  try {
    // userId로 userAccount가져와서 가진 stone조회
    const user = await UserModel.findOne({ id: userId }, { account: 1 });
    if (user) {
      const userAccount = user.account;
      // Contract에서 userAccount가 가진 SFTList 가져오기
    } else {
      return "";
    }
  } catch (e) {
    throw Error(e);
  }
};

// insertTradeStone
const insertTrade = async (sellStoneInfo, userId) => {
  const { stoneId, seller, quantity, unitPrice } = sellStoneInfo;
  try {
    const Trade = new TradeModel({
      stone_id: stoneId,
      sell_user_id: userId,
      price: unitPrice,
      amount: quantity,
    });
    return await Trade.save();
  } catch (e) {
    throw Error(e);
  }
};

// insertStone
const insertStone = async (stoneInfo, fileInfo, account) => {
  try {
    const {
      stoneName,
      description,
      lyricist,
      composer,
      lyrics,
      category,
      albumId,
      totalBalance,
    } = stoneInfo;
    const { filename, originalname, path } = fileInfo;
    // account로 UserModel에서 musician_id찾기
    const musicianId = await UserModel.findOne(
      { account: account },
      { musician_id: 1 }
    );
    // stone저장
    const Stone = new StoneModel({
      musician_id: musicianId.musician_id,
      name: stoneName,
      album_id: albumId,
      description,
      lyricist,
      composer,
      lyrics,
      category,
      filename,
      originalname,
      path,
      totalBalance,
    });
    return await Stone.save();
  } catch (e) {
    throw Error(e);
  }
};

// getSellStoneList (+ 검색, errorhandling)
const getSellStone = async (userId, listInfo) => {
  const { startIndex, endIndex, keyword } = listInfo;
  try {
    console.log(listInfo);
    let sellList = [];
    if (keyword === undefined || keyword === "") {
      sellList = await TradeModel.find()
        .skip(startIndex - 1)
        .limit(endIndex - startIndex + 1);
    } else {
      const regex = (pattern) => new RegExp(`.*${pattern}.*`);
      const keywordRegex = regex(keyword);
      const query = {
        name: { $regex: keywordRegex, $options: "i" },
      };
      const stoneIdList = (await StoneModel.find(query, { id: 1 })).map(
        (el) => el.id
      );
      console.log(stoneIdList);

      // 검색어로 검색한 stone_id가 여러개가 나오는 경우 TradeStone에서 가져오기
      // 이 때, 하나의 stone_id에서도 여러가지의 TradeStone정보가 나올 수 있다.
    }
    return sellList;
  } catch (e) {
    throw Error(e);
  }
};

// getStoneDetail & getStoneTradeInfo
const getStoneDetail = async (stoneId) => {
  try {
    const stoneDetail = await StoneModel.find({ id: stoneId });
    const stoneTrade = await TradeModel.find(
      { stone_id: stoneId },
      { id: 1, sell_user_id: 1, amount: 1, price: 1 }
    );
    return { stoneDetail, stoneTrade };
  } catch (e) {
    throw Error(e);
  }
};

// updateBuyStoneInfo (+ contract)
const updateBuyStoneInfo = async (tradeInfo, stoneId) => {
  try {
    const { buyer, seller, quantity, unitPrice, sellAmount, tradeId } =
      tradeInfo;
    // contract연결 (SFT소유주이동)
    // buyer 계좌로 qunatity만큼 SFT이동, buyer지갑에서 quantity * unitPrice만큼 seller계좌로 kalytn이동
    // 성공하면, DB내용수정
    // TradeModel에서 sellerId와 musicianId와 일치하는 거래정보 찾아서
    // quantity만큼(buyer)가 구매한 만큼 차감시켜주기
    // 나머지 정보는 현재 db가 아닌 contract에서 관리함(user가 소유한 SFT목록)
    if (quantity === 0) {
      return "구매수량은 1개 이상이어야 합니다.";
    } else if (quantity > sellAmount) {
      return "판매수량보다 더 많은 수량은 구매하실 수 없습니다.";
    } else {
      const isOk = await TradeModel.updateOne(
        { id: tradeId },
        { $set: { amount: sellAmount - quantity } }
      );
      return isOk.acknowledged;
    }
  } catch (e) {
    throw Error(e);
  }
};

module.exports = {
  insertStone,
  getMyStoneList,
  insertTrade,
  getSellStone,
  getStoneDetail,
  getAlbumList,
  updateBuyStoneInfo,
};
