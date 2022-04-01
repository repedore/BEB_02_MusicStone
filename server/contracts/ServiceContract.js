require("dotenv").config();
const CaverExtKAS = require("caver-js-ext-kas");
const abi = require("./abi/Service");

const caverExt = new CaverExtKAS();
const chainId = 1001;
caverExt.initKASAPI(
  chainId,
  process.env.ACCESS_KEY_ID,
  process.env.SECRET_ACCESS_KEY
);

const keyringContainer = new caverExt.keyringContainer();
const keyring = keyringContainer.keyring.createWithSingleKey(
  process.env.SERVER_ADDRESS,
  process.env.SERVER_PRIVATE_KEY
);
keyringContainer.add(keyring);

const contract = new caverExt.contract(
  abi,
  process.env.SERVICE_CONTRACT_ADDRESS
);

const addMinter = async (address) => {
  contract.setWallet(keyringContainer);
  return contract.methods
    .addMinter(address)
    .send({ from: process.env.SERVER_ADDRESS, gas: 2000000 });
};

const isMinter = async (address) => {
  return contract.methods.isMinter(address).call();
};

const getUserDeposit = async (address) => {
  const deposit = await contract.methods.getUserDeposit(address).call();
  return caverExt.utils.fromPeb(`${deposit}`, "KLAY");
};

const getMySFTs = async (address) => {
  return await contract.methods.getUserAllSFTs(address).call();
};

module.exports = {
  addMinter,
  isMinter,
  getUserDeposit,
  getMySFTs,
};
