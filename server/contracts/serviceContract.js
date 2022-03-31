// require("dotenv").config();
// const CaverExtKAS = require("caver-js-ext-kas");
// const abi = require("./abi/Service");
// console.log(address);
// const caverExt = new CaverExtKAS();
// const chainId = 1001; // 클레이튼 테스트 네트워크 접속 ID
// caverExt.initKASAPI(
//   chainId,
//   process.env.ACCESS_KEY_ID,
//   process.env.SECRET_ACCESS_KEY
// ); //KAS console 초기화

// // caver.contract will work with KAS Wallet API or KeyringContainer.
// const keyringContainer = new caverExt.keyringContainer();
// const keyring = keyringContainer.keyring.createWithSingleKey(
//   process.env.SERVER_ADDRESS,
//   process.env.SERVER_PRIVATE_KEY
// );
// keyringContainer.add(keyring);

// const contract = new caverExt.contract(
//   abi,
//   process.env.SERVICE_CONTRACT_ADDRESS
// );

// const addMinter = async (address) => {
//   contract.methods.isMinter(address).call().then(console.log);
//   contract.setWallet(keyringContainer);
//   contract.methods
//     .addMinter(address)
//     .send({ from: process.env.SERVER_ADDRESS, gas: 2000000 })
//     .then((res) => {
//       return res;
//     });
// };

// module.exports = {
//   addMinter,
// };
