require("dotenv").config();
const StoneService = require("../services/stones.services");

// stone등록 페이지 들어올때 req(account or id(user) or id(musician))를 통해 AlnumId와 AlnumName 반환
exports.stones_get = async (req, res, next) => {
  const userAccount = req.params.user_account;
  try {
    const albumList = await StoneService.getAlbumList(userAccount);
    res.status(200).json({ data: { message: "Ok", albumList: albumList } });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// userId로 user가 보유한 stone가져오기
exports.stones_mystone_get = async (req, res, next) => {
  const userId = req.params.user_id;
  try {
    const stoneList = await StoneService.getMyStoneList(userId);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// userId로 user가 보유한 스톤 판매등록
exports.stones_mystone_post = async (req, res, next) => {
  const sellStoneInfo = req.body;
  const userId = req.params.user_id;
  try {
    const isOk = await StoneService.insertTrade(sellStoneInfo, userId);
    isOk
      ? res.status(201).json({ message: "Ok" })
      : res.status(500).json({ message: "Fail" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// userAddr로 stone등록하는 페이지 (userId로 musicianId 찾아서 넣기)
exports.stones_register_post = async (req, res, next) => {
  const stoneInfo = req.body;
  const fileInfo = req.file;
  try {
    const isOk = await StoneService.insertStone(stoneInfo, fileInfo);
    isOk
      ? res.status(201).json({ message: "Ok", success: true })
      : res.status(500).json({ message: "Fail", success: false });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// 판매등록 되어 있는 스톤 요청한 개수만큼 반환
exports.stones_buystone_get = async (req, res, next) => {
  try {
    const listInfo = req.query;
    const sellStones = await StoneService.getSellStone(listInfo);
    res.status(201).json({ data: sellStones });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// stone클릭시 stone상세정보 가져오기(stoneDetail, stoneTrade)
exports.stones_info_get = async (req, res, next) => {
  try {
    const stoneId = req.params.musicstone_id;
    const stoneInfo = await StoneService.getStoneDetail(stoneId);
    res.status(201).json({ data: stoneInfo });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// 거래중인 스톤의 상세내용
exports.stones_tradestone_get = async (req, res, next) => {
  try {
    const stoneId = req.params.musicstone_id;
    const stoneInfo = await StoneService.getStoneDetail(stoneId);
    res.status(201).json({ data: stoneInfo });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// stone 구매 눌렀을때 구매 요청
exports.stones_tradestone_post = async (req, res, next) => {
  try {
    const tradeInfo = req.body;
    const musicStoneId = req.params.musicstone_id;
    const isOk = await StoneService.updateBuyStoneInfo(tradeInfo, musicStoneId);
    if (isOk === true) {
      res.status(200).json({ message: "Ok" });
    } else {
      res.status(500).json({ message: isOk });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
