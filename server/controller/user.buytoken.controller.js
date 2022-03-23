require("dotenv").config();
const CaverExtKAS = require("caver-js-ext-kas");

//.env에 아래 주소 및 키 저장
var tokenAddress = process.env.tokenAddress;
var walletAddress = process.env.walletAddress;
var walletPrivateKey = process.env.walletPrivateKey;
var accessKeyId = process.env.accessKeyId; //KAS 콘솔 - Security - Credential에서 발급받은 accessKeyId 인증아이디
var secretAccessKey = process.env.secretAccessKey; //KAS 콘솔 - Security - Credential에서 발급받은 secretAccessKey 인증비밀번호

var transferToken = async (toAddress, amount) => {
  console.log("tokenAddress:" + tokenAddress);
  const caver = new CaverExtKAS();
  const chainId = 1001; // 클레이튼 테스트 네트워크 접속 ID
  caver.initKASAPI(chainId, accessKeyId, secretAccessKey); //KAS console 초기화

  // keyring 등록(서버계정 프라이빗키)
  const keyringContainer = new caver.keyringContainer();
  const keyring =
    keyringContainer.keyring.createFromPrivateKey(walletPrivateKey);
  keyringContainer.add(keyring);

  const kip7 = new caver.kct.kip7(tokenAddress); //생성된 토큰의 Address 입력
  kip7.setWallet(keyringContainer); //kip7 내의 wallet 설정
  //transfer('토큰 받는 주소', 토큰 양, {from:'트랜젝션을 일으키는 주소'})
  const receipt = await kip7.transfer(
    toAddress,
    caver.utils.toPeb(amount, "KLAY"),
    { from: keyring.address }
  );
  console.log(`[Token Transaction]\n` + receipt);

  const receipt2 = await kip7.balanceOf(keyring.address);
  console.log(
    "SERVER BALANCE OF TOKEN: " + caver.utils.fromPeb(receipt2, "KLAY")
  );

  const receipt3 = await kip7.balanceOf(toAddress);
  console.log(
    "user : BALANCE OF TOKEN" + caver.utils.fromPeb(receipt3, "KLAY")
  );
};

module.exports = {
  transferToken: transferToken,
};
