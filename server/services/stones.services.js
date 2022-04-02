const {
  StoneModel,
  UserModel,
  TradeModel,
  AlbumModel,
  MusicianModel,
} = require("../models/index");
const ServiceContract = require("../contracts/ServiceContract");

// AlbumList({id, name})
const getAlbumList = async (userAccount) => {
  try {
    const musician_id = (
      await UserModel.findOne({ account: userAccount }, { musician_id: 1 })
    ).musician_id;
    const albumList = await AlbumModel.find(
      { musician_id },
      { id: 1, name: 1, _id: 0 }
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
    const user = await UserModel.findOne(
      { id: userId },
      { account: 1, musician_id: 1, _id: 0 }
    );

    const isMusician = user.musician_id === 0 ? false : true;
    if (user) {
      const userAccount = user.account;
      // Contract에서 userAccount가 가진 SFTList 가져오기
      const myStoneList = await ServiceContract.getMySFTs(userAccount);
      const myStoneInfo = myStoneList.map((el) => {
        return { token_id: el[0], userBalance: el[1] };
      });
      let stoneIdList = [];
      for (let stone of myStoneInfo) {
        stoneIdList.push(
          (
            await StoneModel.findOne(
              { token_id: stone.token_id },
              { id: 1, _id: 0 }
            )
          ).id
        );
      }
      const info = await StoneModel.aggregate([
        {
          $lookup: {
            from: "musicians",
            let: {
              musician_id: "$musician_id",
              name_korea: "$name_k",
              name_english: "$name_e",
              originalname: "$originalname",
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
      const stoneInfo = info.filter((el) => {
        return stoneIdList.includes(el.id);
      });
      return { stoneInfo, myStoneInfo, isMusician };
    } else {
      return "";
    }
  } catch (e) {
    throw Error(e);
  }
};

// insertTradeStone
const insertTrade = async (sellStoneInfo, userId) => {
  const { stoneId, seller, quantity, unitPrice, itemId, tradeId } =
    sellStoneInfo;
  try {
    const Trade = new TradeModel({
      stone_id: stoneId,
      sell_user_id: userId,
      price: unitPrice,
      amount: quantity,
      item_id: itemId,
      trade_id: tradeId,
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
      album,
      stoneName,
      description,
      lyricist,
      composer,
      lyrics,
      category,
      totalBalance,
      tokenId,
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
      album_id: album,
      description,
      lyricist,
      composer,
      lyrics,
      category,
      filename,
      originalname,
      path,
      totalBalance,
      tokenId,
    });
    return await Stone.save();
  } catch (e) {
    throw Error(e);
  }
};

// getSellStoneList (+ 검색, errorhandling)
const getSellStone = async (userId, listInfo) => {
  // img, musician_name, stone_name, minPrice, prePrice, myBalance
  const { startIndex, endIndex, keyword } = listInfo;
  try {
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
    const stoneDetail = await StoneModel.findOne({ id: stoneId });
    const sellList = await TradeModel.find(
      { stone_id: stoneId },
      {
        id: 1,
        sell_user_id: 1,
        amount: 1,
        price: 1,
        musician_id: 1,
        item_id: 1,
        trade_id: 1,
        _id: 0,
      }
    );
    const musician = await MusicianModel.findOne(
      {
        id: stoneDetail.musician_id,
      },
      { image: 1, name_korea: 1, name_english: 1, _id: 0 }
    );
    const minPrice = Math.min.apply(
      null,
      sellList
        .filter((el) => {
          return el.price !== undefined;
        })
        .map((el) => Number(el.price))
    );

    return { stoneDetail, musician, sellList, minPrice };
  } catch (e) {
    throw Error(e);
  }
};

// updateBuyStoneInfo (+ contract는 client에서 수행. 수행후 어떤 정보 저장할 것인가)
const updateBuyStoneInfo = async (tradeInfo, stoneId) => {
  try {
    const { buyer, seller, quantity, unitPrice, sellAmount, tradeId } =
      tradeInfo;
    // if (quantity === 0) {
    //   return "구매수량은 1개 이상이어야 합니다.";
    // } else if (quantity > sellAmount) {
    //   return "판매수량보다 더 많은 수량은 구매하실 수 없습니다.";
    // } else {
    //   const isOk = await TradeModel.updateOne(
    //     { id: tradeId },
    //     { $set: { amount: sellAmount - quantity } }
    //   );
    //   return isOk.acknowledged;
    // }
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
