const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");

describe("MusicToken", () => {
  let tokenFactory;
  let token;
  let totalSupply;

  let sftFactory;
  let sft;

  let serviceFactory;
  let service;

  let owner;
  let user1;
  let user2;
  let user3;
  let user4;
  let user5;
  let user6;
  let user7;
  let user8;
  let addrs;
  const provider = waffle.provider;

  beforeEach(async () => {
    serviceFactory = await ethers.getContractFactory("MusicStoneService");
    service = await serviceFactory.deploy();
    await service.deployed();
    tokenFactory = await ethers.getContractFactory("MusicStoneToken");
    token = await tokenFactory.deploy();
    await token.deployed();
    sftFactory = await ethers.getContractFactory("MusicStoneSFT");
    sft = await sftFactory.deploy("testlink.com");
    await sft.deployed();

    await token.transferOwnership(service.address);
    await sft.addAuthorized(service.address);
    await service.setToken(token.address);
    await service.setSFT(sft.address);
    await token.addMinter(service.address);

    [owner, user1, user2, user3, user4, user5, user6, user7, user8, ...addrs] =
      await ethers.getSigners();

    // await token.approve(service.address, await token.balanceOf(owner.address));
    // console.log(await service.getAllowance());
  });

  describe("token test", async () => {
    it("deployment", async () => {
      expect(await token.name()).to.equal("MusicStoneToken");
      expect(await token.symbol()).to.equal("MTK");
      expect(await token.decimals()).to.equal(18);
      expect(await token.totalSupply()).to.equal(
        "999999999000000000000000000000"
      );
      expect(await token.owner()).to.equal(service.address);
    });
  });

  it("should assign the total supply of tokens to the owner", async () => {
    const tokenBalance = await token.getBalanceOf();
    expect(await token.totalSupply()).to.equal(tokenBalance);
  });

  describe("sft test", async () => {
    it("make sft", async () => {
      await sft.setSFTURI("changeURI.com");
      await sft.mintMusicStone(user1.address, 100);
      await sft.mintMusicStone(user1.address, 200);
      await sft.mintMusicStone(user1.address, 200);
      await sft.mintMusicStone(user1.address, 100);
      console.log(await sft.balanceOf(owner.address, 0));
      console.log(await sft.balanceOf(owner.address, 1));
      console.log(await sft.balanceOf(user1.address, 0));
      console.log(await sft.balanceOf(user1.address, 1));
      console.log(await sft.balanceOf(user2.address, 0));
      console.log(await sft.balanceOf(user2.address, 1));
      console.log(await sft.balanceOf(user2.address, 2));
    });
  });

  describe("service test", async () => {
    it("buy, sell, deposit, ", async () => {
      // user1 이 100클레이 보내서 token buy
      console.log("service", await provider.getBalance(service.address));
      console.log("user1", await provider.getBalance(user1.address));

      await service
        .connect(user1)
        .buyToken({ value: ethers.utils.parseEther("100") });
      await service.buyToken({ value: ethers.utils.parseEther("100") });

      // user1 의 token balance 가 500인지 확인
      expect(await token.balanceOf(user1.address)).to.equal(
        ethers.utils.parseEther("50000")
      );

      // 클레이 잔고 확인
      console.log("service", await provider.getBalance(service.address));
      console.log("user1", await provider.getBalance(user1.address));

      // user1 이 1000 토큰 팔기 원할때
      await token
        .connect(user1)
        .approve(service.address, ethers.utils.parseEther("1000"));
      await service.connect(user1).sellToken(ethers.utils.parseEther("1000"));

      // user1 의 token balance 가 49000인지 확인
      expect(await token.balanceOf(user1.address)).to.equal(
        ethers.utils.parseEther("49000")
      );

      console.log("service", await provider.getBalance(service.address));
      console.log("user1", await provider.getBalance(user1.address));

      // approve
      await token
        .connect(user1)
        .approve(service.address, ethers.utils.parseEther("10000"));

      // deposit
      await service
        .connect(user1)
        .depositMSToken(ethers.utils.parseEther("10000"));

      // 49000 -> 39000
      expect(await token.balanceOf(user1.address)).to.equal(
        ethers.utils.parseEther("39000")
      );
      // 0 -> 10000
      expect(await service.getUserDeposit(user1.address)).to.equal(
        ethers.utils.parseEther("10000")
      );

      // withdrawalDeposit
      await service
        .connect(user1)
        .withdrawalDeposit(ethers.utils.parseEther("1000"));
      // 39000 -> 40000
      expect(await token.balanceOf(user1.address)).to.equal(
        ethers.utils.parseEther("40000")
      );
      // 10000 -> 0
      expect(await service.getUserDeposit(user1.address)).to.equal(
        ethers.utils.parseEther("9000")
      );

      console.log(await service.getUserDeposit(user1.address));
      console.log(await service.getUserDistribution(user1.address));
    });

    it("asdfasdf", async () => {
      // 토큰구매
      await service
        .connect(user1)
        .buyToken({ value: ethers.utils.parseEther("100") });
      await service
        .connect(user2)
        .buyToken({ value: ethers.utils.parseEther("100") });

      // approve
      await token
        .connect(user1)
        .approve(service.address, ethers.utils.parseEther("50000"));
      await token
        .connect(user2)
        .approve(service.address, ethers.utils.parseEther("50000"));

      // deposit
      await service
        .connect(user1)
        .depositMSToken(ethers.utils.parseEther("10000"));
      await service
        .connect(user2)
        .depositMSToken(ethers.utils.parseEther("20000"));

      await service.deduction(
        [user1.address, user2.address],
        [ethers.utils.parseEther("100"), ethers.utils.parseEther("200")]
      );
      // await service.distributionByAddress(
      //   [user3.address, user4.address],
      //   [ethers.utils.parseEther("170"), ethers.utils.parseEther("130")]
      // );

      console.log(await service.getUserDeposit(user1.address)); // 9900
      console.log(await service.getUserDeposit(user2.address)); // 19800
      console.log(await service.getUserDeposit(user3.address)); // 0
      console.log(await service.getUserDeposit(user4.address)); // 0
      console.log(await service.getUserDistribution(user1.address)); // 0
      console.log(await service.getUserDistribution(user2.address)); // 0
      console.log(await service.getUserDistribution(user3.address)); // 170
      console.log(await service.getUserDistribution(user4.address)); // 130

      // await service
      //   .connect(user3)
      //   .withdrawalDistribution(ethers.utils.parseEther("170"));
      // await service
      //   .connect(user4)
      //   .withdrawalDistribution(ethers.utils.parseEther("130"));

      console.log(await service.getUserDeposit(user1.address)); // 9900
      console.log(await service.getUserDeposit(user2.address)); // 19800
      console.log(await service.getUserDeposit(user3.address)); // 170
      console.log(await service.getUserDeposit(user4.address)); // 130
      console.log(await service.getUserDistribution(user1.address)); // 0
      console.log(await service.getUserDistribution(user2.address)); // 0
      console.log(await service.getUserDistribution(user3.address)); // 0
      console.log(await service.getUserDistribution(user4.address)); // 0
    });

    it("test", async () => {
      /**
       user1   => creator
       user2   => creator
       user3   => player
       user4   => sft user
       user5   => player
       user6   => player
       user7   => sft user
       user8   => player
       */
      await service.addMinter(user1.address);
      await service.addMinter(user2.address);

      // 토큰구매
      await service
        .connect(user3)
        .buyToken({ value: ethers.utils.parseEther("100") });
      await service
        .connect(user4)
        .buyToken({ value: ethers.utils.parseEther("100") });
      await service
        .connect(user5)
        .buyToken({ value: ethers.utils.parseEther("100") });

      // approve
      await token
        .connect(user3)
        .approve(service.address, ethers.utils.parseEther("10000"));
      await token
        .connect(user4)
        .approve(service.address, ethers.utils.parseEther("10000"));
      await token
        .connect(user5)
        .approve(service.address, ethers.utils.parseEther("10000"));

      await service
        .connect(user3)
        .depositMSToken(ethers.utils.parseEther("10000"));
      await service
        .connect(user4)
        .depositMSToken(ethers.utils.parseEther("10000"));
      await service
        .connect(user5)
        .depositMSToken(ethers.utils.parseEther("10000"));

      /**
       * mintSFT
       * 0 3
       * 1 2
       */
      await service.connect(user1).mintSFT(100);
      await service.connect(user2).mintSFT(200);
      // await service.connect(user2).mintSFT(333);
      // await service.connect(user1).mintSFT(500);

      // 판매등록
      await sft.connect(user1).setApprovalForAll(service.address, true);
      await sft.connect(user2).setApprovalForAll(service.address, true);
      await service
        .connect(user1)
        .addItemToMarket(1, ethers.utils.parseEther("1"), 10);
      await service
        .connect(user2)
        .addItemToMarket(2, ethers.utils.parseEther("1"), 100);
      // await service
      //   .connect(user2)
      //   .addItemToMarket(3, ethers.utils.parseEther("1"), 332);
      // await service
      //   .connect(user1)
      //   .addItemToMarket(4, ethers.utils.parseEther("1"), 400);

      // 구매 (sft 소유 늘어남)
      await service
        .connect(user4)
        .purchaseItem(1, 2, { value: ethers.utils.parseEther("2") });
      await service
        .connect(user5)
        .purchaseItem(1, 8, { value: ethers.utils.parseEther("8") });
      // await service
      //   .connect(user4)
      //   .purchaseItem(2, 30, { value: ethers.utils.parseEther("30") });
      // await service
      //   .connect(user4)
      //   .purchaseItem(3, 111, { value: ethers.utils.parseEther("111") });
      // await service
      //   .connect(user4)
      //   .purchaseItem(4, 100, { value: ethers.utils.parseEther("100") });

      // 차감
      await service.deduction(
        [user3.address, user4.address, user5.address],
        [
          ethers.utils.parseEther("50"),
          ethers.utils.parseEther("200"),
          ethers.utils.parseEther("500"),
        ]
      );

      await service.distribution(
        [
          0, 1,
          // 2,
          // 3
        ],
        [
          ethers.utils.parseEther("50"),
          ethers.utils.parseEther("350"),
          // ethers.utils.parseEther("250"),
          // ethers.utils.parseEther("100"),
        ]
      );
      // console.log(await service.getUserDistribution(user1.address)); // 290
      // console.log(await service.getUserDistribution(user2.address)); // 1200
      // console.log(await service.getUserDistribution(user3.address)); // 0
      // console.log(await service.getUserDistribution(user4.address)); // 10
      // console.log(await service.getUserDistribution(user5.address)); // 0

      console.log(await service.getUserSFTs(user1.address, 1));
      console.log(await service.getUserAllSFTs(user1.address));
      // console.log(await service.getUserAllSFTs(user2.address));
      // console.log(await service.getUserAllSFTs(user3.address));
      // console.log(await service.getUserAllSFTs(user4.address));
      // console.log(await service.getUserAllSFTs(user5.address));
    });

    it("mint sft", async () => {
      console.log(await service.isMinter(user1.address));
      console.log(await service.isMinter(user2.address));

      await service.addMinter(user1.address);
      await service.connect(user1).mintSFT(1111);

      console.log(await service.isMinter(user1.address));
      console.log(await service.isMinter(user2.address));

      await service.addMinter(user2.address);
      await service.connect(user2).mintSFT(1234);

      await service.connect(user1).mintSFT(1111);
      await service.connect(user2).mintSFT(123);
      await service.connect(user1).mintSFT(1111);
      await service.connect(user2).mintSFT(12);
      await service.connect(user1).mintSFT(1111);
      await service.connect(user2).mintSFT(1);

      console.log(await service.isMinter(user1.address));
      console.log(await service.isMinter(user2.address));

      console.log(await service.getArtistSfts(user1.address));
      console.log(await service.getArtistSfts(user2.address));

      console.log(await provider.getBalance(user1.address));
      console.log(await provider.getBalance(user2.address));
      console.log(await service.getUserAllSFTs(user1.address));
      console.log(await service.getUserAllSFTs(user2.address));
      console.log(await provider.getBalance(user1.address));
      console.log(await provider.getBalance(user2.address));
    });

    /**
     * user1 1000 개중 500개 등록
     * user2 200, user3 300 구매
     * 목적 : 정상거래 확인
     */
    it("trade sft1", async () => {
      /*
      user1   => creator    [[0,1000], [1,2000], [2,3000], [3,4000]]
      user2   => buyer1
      user3   => buyer2
      */
      await service.addMinter(user1.address);
      await service.connect(user1).mintSFT(1000);
      await service.connect(user1).mintSFT(2000);
      await service.connect(user1).mintSFT(3000);
      await service.connect(user1).mintSFT(4000);
      const artist_sft_1 = await service.getArtistSfts(user1.address);
      expect(artist_sft_1.length).to.equal(4);
      expect(artist_sft_1[0]).to.equal(0);
      expect(artist_sft_1[1]).to.equal(1);
      expect(artist_sft_1[2]).to.equal(2);
      expect(artist_sft_1[3]).to.equal(3);

      /**
       * 권한 요청(setApprovalForAll) -> 판매 등록(addItemToMarket) -> 등록 확인(getMarketItemById) ->
       * user2 200 구매(purchaseItem) -> 등록 확인(getMarketItemById) -> user3 300 구매(purchaseItem) ->
       * 등록 확인(getMarketItemById) -> user1(아티스트) sft 정보 확인(getArtistSfts) ->
       * 모든유저 수량 확인(getOwnerAllSFTs, getBalance)
       */
      // 권한 요청(setApprovalForAll)
      await sft.connect(user1).setApprovalForAll(service.address, true);

      // 판매 등록(addItemToMarket)
      await service
        .connect(user1)
        .addItemToMarket(0, ethers.utils.parseEther("1"), 500); // itemId = 1

      // 등록 확인(getMarketItemById)
      const market_1 = await service.getMarketItemById(1);
      expect(market_1.itemId).to.equal(1);
      expect(market_1.tokenId).to.equal(0);
      expect(market_1.seller).to.equal(user1.address);
      expect(market_1.unit_price).to.equal(ethers.utils.parseEther("1"));
      expect(market_1.total_amount).to.equal(500);
      expect(market_1.remaining_amount).to.equal(500);
      expect(market_1.isOpened).to.equal(true);

      // user2 200 구매(purchaseItem)
      await service
        .connect(user2)
        .purchaseItem(1, 200, { value: ethers.utils.parseEther("200") }); // 성공

      // 등록 확인(getMarketItemById)
      const market_2 = await service.getMarketItemById(1);
      expect(market_2.remaining_amount).to.equal(300);
      expect(market_2.isOpened).to.equal(true);

      // user3 300 구매(purchaseItem)
      await service
        .connect(user3)
        .purchaseItem(1, 300, { value: ethers.utils.parseEther("300") }); // 성공

      // 등록 확인(getMarketItemById)
      const market_3 = await service.getMarketItemById(1);
      expect(market_3.itemId).to.equal(1);
      expect(market_3.tokenId).to.equal(0);
      expect(market_3.seller).to.equal(user1.address);
      expect(market_3.unit_price).to.equal(ethers.utils.parseEther("1"));
      expect(market_3.total_amount).to.equal(500);
      expect(market_3.remaining_amount).to.equal(0);
      expect(market_3.isOpened).to.equal(false);

      // user1(아티스트) sft 정보 확인(getArtistSfts)
      const artist_sft_2 = await service.getArtistSfts(user1.address);
      expect(artist_sft_2.length).to.equal(4);
      expect(artist_sft_2[0]).to.equal(0);
      expect(artist_sft_2[1]).to.equal(1);
      expect(artist_sft_2[2]).to.equal(2);
      expect(artist_sft_2[3]).to.equal(3);

      // 모든유저 수량 확인(getOwnerAllSFTs)
      const user1_sft = await service.getOwnerAllSFTs(user1.address);
      console.log(user1_sft);
      expect(user1_sft[0].id).to.equal(0);
      expect(user1_sft[0].balance).to.equal(500);
      expect(user1_sft[0].totalSupply).to.equal(1000);
      expect(user1_sft[1].id).to.equal(1);
      expect(user1_sft[1].balance).to.equal(2000);
      expect(user1_sft[1].totalSupply).to.equal(2000);
      expect(user1_sft[2].id).to.equal(2);
      expect(user1_sft[2].balance).to.equal(3000);
      expect(user1_sft[2].totalSupply).to.equal(3000);
      expect(user1_sft[3].id).to.equal(3);
      expect(user1_sft[3].balance).to.equal(4000);
      expect(user1_sft[3].totalSupply).to.equal(4000);
      const user2_sft = await service.getOwnerAllSFTs(user2.address);
      expect(user2_sft[0].id).to.equal(0);
      expect(user2_sft[0].balance).to.equal(200);
      expect(user2_sft[0].totalSupply).to.equal(1000);
      const user3_sft = await service.getOwnerAllSFTs(user3.address);
      expect(user3_sft[0].id).to.equal(0);
      expect(user3_sft[0].balance).to.equal(300);
      expect(user3_sft[0].totalSupply).to.equal(1000);

      console.log(await provider.getBalance(user1.address));
      console.log(await provider.getBalance(user2.address));
      console.log(await provider.getBalance(user3.address));
    });

    /**
     * user1 1000 개중 1000개 등록
     * user2 200, user3 800 구매
     * 목적 : user1 의 artist sft 정상인지 확인
     */
    it("trade sft2", async () => {
      /*
      user1   => creator    [[0,1000], [1,2000], [2,3000], [3,4000]]
      user2   => buyer1
      user3   => buyer2
      */
      await service.addMinter(user1.address);
      await service.connect(user1).mintSFT(1000);
      await service.connect(user1).mintSFT(2000);
      await service.connect(user1).mintSFT(3000);
      await service.connect(user1).mintSFT(4000);
      const artist_sft_1 = await service.getArtistSfts(user1.address);
      expect(artist_sft_1.length).to.equal(4);
      expect(artist_sft_1[0]).to.equal(0);
      expect(artist_sft_1[1]).to.equal(1);
      expect(artist_sft_1[2]).to.equal(2);
      expect(artist_sft_1[3]).to.equal(3);

      /**
       * 권한 요청(setApprovalForAll) -> 판매 등록(addItemToMarket) -> 등록 확인(getMarketItemById) ->
       * user2 200 구매(purchaseItem) -> 등록 확인(getMarketItemById) -> user3 300 구매(purchaseItem) ->
       * 등록 확인(getMarketItemById) -> user1(아티스트) sft 정보 확인(getArtistSfts) ->
       * 모든유저 수량 확인(getOwnerAllSFTs, getBalance)
       */
      // 권한 요청(setApprovalForAll)
      await sft.connect(user1).setApprovalForAll(service.address, true);

      // 판매 등록(addItemToMarket)
      await service
        .connect(user1)
        .addItemToMarket(0, ethers.utils.parseEther("1"), 1000); // itemId = 1

      // 등록 확인(getMarketItemById)
      const market_1 = await service.getMarketItemById(1);
      expect(market_1.itemId).to.equal(1);
      expect(market_1.tokenId).to.equal(0);
      expect(market_1.seller).to.equal(user1.address);
      expect(market_1.unit_price).to.equal(ethers.utils.parseEther("1"));
      expect(market_1.total_amount).to.equal(1000);
      expect(market_1.remaining_amount).to.equal(1000);
      expect(market_1.isOpened).to.equal(true);

      // user2 200 구매(purchaseItem)
      await service
        .connect(user2)
        .purchaseItem(1, 200, { value: ethers.utils.parseEther("200") }); // 성공

      // 등록 확인(getMarketItemById)
      const market_2 = await service.getMarketItemById(1);
      expect(market_2.remaining_amount).to.equal(800);
      expect(market_2.isOpened).to.equal(true);

      // user3 300 구매(purchaseItem)
      await service
        .connect(user3)
        .purchaseItem(1, 800, { value: ethers.utils.parseEther("800") }); // 성공

      // 등록 확인(getMarketItemById)
      const market_3 = await service.getMarketItemById(1);
      expect(market_3.itemId).to.equal(1);
      expect(market_3.tokenId).to.equal(0);
      expect(market_3.seller).to.equal(user1.address);
      expect(market_3.unit_price).to.equal(ethers.utils.parseEther("1"));
      expect(market_3.total_amount).to.equal(1000);
      expect(market_3.remaining_amount).to.equal(0);
      expect(market_3.isOpened).to.equal(false);

      // user1(아티스트) sft 정보 확인(getArtistSfts)
      const artist_sft_2 = await service.getArtistSfts(user1.address);
      expect(artist_sft_2.length).to.equal(4);
      expect(artist_sft_2[0]).to.equal(0);
      expect(artist_sft_2[1]).to.equal(1);
      expect(artist_sft_2[2]).to.equal(2);
      expect(artist_sft_2[3]).to.equal(3);

      // 모든유저 수량 확인(getOwnerAllSFTs)
      const user1_sft = await service.getOwnerAllSFTs(user1.address);
      console.log(user1_sft);
      expect(user1_sft[0].id).to.equal(0);
      expect(user1_sft[0].balance).to.equal(0);
      expect(user1_sft[0].totalSupply).to.equal(1000);
      expect(user1_sft[1].id).to.equal(1);
      expect(user1_sft[1].balance).to.equal(2000);
      expect(user1_sft[1].totalSupply).to.equal(2000);
      expect(user1_sft[2].id).to.equal(2);
      expect(user1_sft[2].balance).to.equal(3000);
      expect(user1_sft[2].totalSupply).to.equal(3000);
      expect(user1_sft[3].id).to.equal(3);
      expect(user1_sft[3].balance).to.equal(4000);
      expect(user1_sft[3].totalSupply).to.equal(4000);
      const user2_sft = await service.getOwnerAllSFTs(user2.address);
      expect(user2_sft[0].id).to.equal(0);
      expect(user2_sft[0].balance).to.equal(200);
      expect(user2_sft[0].totalSupply).to.equal(1000);
      const user3_sft = await service.getOwnerAllSFTs(user3.address);
      expect(user3_sft[0].id).to.equal(0);
      expect(user3_sft[0].balance).to.equal(800);
      expect(user3_sft[0].totalSupply).to.equal(1000);

      console.log(await provider.getBalance(user1.address));
      console.log(await provider.getBalance(user2.address));
      console.log(await provider.getBalance(user3.address));
    });

    /**
     * user1 1000 개중 1000개 등록
     * user2 200 구매
     * user1 등록 취소
     * 목적 : user1 에게 남은 수량이 제대로 돌아가는지, user3 이 구매를 못하는지 확인.
     */
    it("trade sft3", async () => {
      /*
          user1   => creator    [[0,1000], [1,2000], [2,3000], [3,4000]]
          user2   => buyer1
          user3   => buyer2
        */
      await service.addMinter(user1.address);
      await service.connect(user1).mintSFT(1000);
      await service.connect(user1).mintSFT(2000);
      await service.connect(user1).mintSFT(3000);
      await service.connect(user1).mintSFT(4000);
      const artist_sft_1 = await service.getArtistSfts(user1.address);
      expect(artist_sft_1.length).to.equal(4);
      expect(artist_sft_1[0]).to.equal(0);
      expect(artist_sft_1[1]).to.equal(1);
      expect(artist_sft_1[2]).to.equal(2);
      expect(artist_sft_1[3]).to.equal(3);

      /**
       * 권한 요청(setApprovalForAll) -> 판매 등록(addItemToMarket) -> 등록 확인(getMarketItemById) ->
       * user2 200 구매(purchaseItem) -> 등록 확인(getMarketItemById) -> 등록 취소() ->
       * user3 300 구매(purchaseItem) ->
       * 등록 확인(getMarketItemById) -> user1(아티스트) sft 정보 확인(getArtistSfts) ->
       * 모든유저 수량 확인(getOwnerAllSFTs, getBalance)
       */
      // 권한 요청(setApprovalForAll)
      await sft.connect(user1).setApprovalForAll(service.address, true);

      // 판매 등록(addItemToMarket)
      await service
        .connect(user1)
        .addItemToMarket(0, ethers.utils.parseEther("1"), 1000); // itemId = 1

      // 등록 확인(getMarketItemById)
      const market_1 = await service.getMarketItemById(1);
      expect(market_1.itemId).to.equal(1);
      expect(market_1.tokenId).to.equal(0);
      expect(market_1.seller).to.equal(user1.address);
      expect(market_1.unit_price).to.equal(ethers.utils.parseEther("1"));
      expect(market_1.total_amount).to.equal(1000);
      expect(market_1.remaining_amount).to.equal(1000);
      expect(market_1.isOpened).to.equal(true);

      // user2 200 구매(purchaseItem)
      await service
        .connect(user2)
        .purchaseItem(1, 200, { value: ethers.utils.parseEther("200") }); // 성공

      await service
        .connect(user3)
        .purchaseItem(1, 200, { value: ethers.utils.parseEther("200") }); // 성공

      for (let i = 0; i < addrs.length; i++) {
        await service
          .connect(addrs[i])
          .purchaseItem(1, 1, { value: ethers.utils.parseEther("1") }); // 성공
      }

      // expect(service.connect(user2).cancelItem(1)).to.revertedWith(
      //   "판매자만 취소 할 수 있습니다."
      // );
      // await service.connect(user1).cancelItem(1);

      // // 등록 확인(getMarketItemById)
      // const market_2 = await service.getMarketItemById(1);
      // expect(market_2.remaining_amount).to.equal(800);
      // expect(market_2.isOpened).to.equal(false);

      // // user3 300 구매(purchaseItem)
      // expect(
      //   service
      //     .connect(user3)
      //     .purchaseItem(1, 800, { value: ethers.utils.parseEther("800") })
      // ).revertedWith("종료된 거래입니다.");

      // // 등록 확인(getMarketItemById)
      // const market_3 = await service.getMarketItemById(1);
      // expect(market_3.itemId).to.equal(1);
      // expect(market_3.tokenId).to.equal(0);
      // expect(market_3.seller).to.equal(user1.address);
      // expect(market_3.unit_price).to.equal(ethers.utils.parseEther("1"));
      // expect(market_3.total_amount).to.equal(1000);
      // expect(market_3.remaining_amount).to.equal(800);
      // expect(market_3.isOpened).to.equal(false);

      // // user1(아티스트) sft 정보 확인(getArtistSfts)
      // const artist_sft_2 = await service.getArtistSfts(user1.address);
      // expect(artist_sft_2.length).to.equal(4);
      // expect(artist_sft_2[0]).to.equal(0);
      // expect(artist_sft_2[1]).to.equal(1);
      // expect(artist_sft_2[2]).to.equal(2);
      // expect(artist_sft_2[3]).to.equal(3);

      // 모든유저 수량 확인(getOwnerAllSFTs)
      // const user1_sft = await service.getOwnerAllSFTs(user1.address);
      // console.log(user1_sft);
      // expect(user1_sft.length).to.equal(4);
      // const user2_sft = await service.getOwnerAllSFTs(user2.address);
      // expect(user2_sft[0].id).to.equal(0);
      // expect(user2_sft[0].balance).to.equal(200);
      // expect(user2_sft[0].totalSupply).to.equal(1000);

      const users_sft = await service.getOwnersAllSFTs([
        user1.address,
        user2.address,
        user3.address,
        addrs[0].address,
        addrs[1].address,
        addrs[2].address,
        addrs[3].address,
        addrs[4].address,
        addrs[5].address,
        addrs[6].address,
        addrs[7].address,
        addrs[8].address,
        addrs[9].address,
        addrs[10].address,
        addrs[11].address,
        addrs[12].address,
        addrs[13].address,
        addrs[14].address,
        addrs[15].address,
      ]);

      console.log(users_sft);

      console.log(await provider.getBalance(user1.address));
      console.log(await provider.getBalance(user2.address));
      console.log(await provider.getBalance(user3.address));
    });
  });
});
/*

참고링크
https://www.youtube.com/watch?v=9Qpi80dQsGU
https://www.youtube.com/watch?v=xbol5PlvYXw
https://www.tutorialspoint.com/solidity/solidity_withdrawal_pattern.htm
https://cryptomarketpool.com/trustless-token-swap-in-a-solidity-smart-contract/
https://stackoverflow.com/questions/67409550/implementing-buying-and-selling-in-solidity
https://ethereum.stackexchange.com/questions/64108/whats-the-difference-between-address-and-address-payable/64109#64109

*/

/*
변수나 함수를 어떤 contract 가 가져야 효율적인지 잘 모름.
지금은 시간에 촉박하게 하느라 문제 생길만한 요지를 다 짚고 넘어가지 못함.
실제 개발할때는 이벤트나 해킹 가능성 염두를 해야함.

1. pause 가 kip37 에서 충돌나서 코드가 크다고 배포가 안되서 주석처리함.
2. kip37 을 수정을 해도 되는지 정확히 모르겠지만 우리는 수정이 필요하기에 수정함. (Authorizable.sol 추가)
3. 
*/

// const provider = waffle.provider;
// const addr1EthBalance = await provider.getBalance(user1.address);
// console.log(addr1EthBalance);

/*

owner 가 바로 실행
  await token.transfer(user1.address, 500);

user1 이 바로 실행
1.
  await token.connect(user1)
  .buy(100, {value: ethers.utils.formatUnits("500", "wei"),});
2.
  await token.connect(user1)
  .purchase({ value: ethers.utils.parseEther("1") });

user1 이 owner 에게 이더 전송하면 함수 실행
  await user1.sendTransaction({
    from: user1.address,
    to: owner.address,
    value: ethers.utils.parseEther("10"),
    data: token.transfer(user1.address, 100).data,
  });

*/

/*

BigNumber
  let ownerBalance = await provider.getBalance(owner.address);

BigNumber -> ether
  let ownerBalance = await provider.getBalance(owner.address);
  ethers.utils.formatEther(ownerBalance);

*/

// assert.notEqual(nftContractAddress, 0x0)
// assert.notEqual(nftContractAddress, '')
// assert.notEqual(nftContractAddress, null)
// assert.notEqual(nftContractAddress, undefined)
