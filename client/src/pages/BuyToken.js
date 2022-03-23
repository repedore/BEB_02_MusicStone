import { useSelector } from "react-redux";
import Caver from "caver-js";
import React, { useState } from "react";
import axios from "axios";

function BuyToken() {
  const swapRatio = 1000.0; // 클레이 : 뮤직스톤 토큰 교환비율
  const state = useSelector((state) => state.accountReducer);
  const [klayBalance, setKlayBalance] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [swapAmount, setSwapAmount] = useState({ klay: 0.0, musictStone: 0.0 });
  const { klay, token } = swapAmount;
  // caver-js 연결
  const caver = new Caver(window.klaytn);

  const [transferData, setTransferData] = useState({
    from: state.account,
    to: "0xD48911AAC5853a6cfDe55514dF6DF6C5E0b41DaB",
    value: null,
    gas: 3000000,
    txHash: null,
    receipt: null,
    error: null,
    rawTransaction: null,
  });
  // 토큰 교환을 위한 토큰 수량 입력 이벤트(Klay & Token)
  const onChangeValue = (e) => {
    const { value, name } = e.target;
    //console.log("e.target.value:"+value+"   e.target.name:"+name);
    //klay로 입력되면 Token 입력창에 토큰 교환비율에 따라 값을 계산해서 넣어준다.
    if (name === "klay") {
      setSwapAmount(() => ({
        klay: Number.parseFloat(value),
        token: Number.parseFloat(value) * swapRatio,
      }));
      setTransferData((prevData) => ({
        ...prevData,
        value: swapAmount.klay,
      }));
      //뮤직스톤 Token으로 입력되면 klay입력창에 토큰 교환비율에 따라 값을 계산해서 넣어준다.
    } else if (name === "token") {
      setSwapAmount(() => ({
        token: Number.parseFloat(value),
        klay: Number.parseFloat(value) / swapRatio,
      }));
      setTransferData((prevData) => ({
        ...prevData,
        value: swapAmount.klay,
      }));
    }
  };
  const GetKlayBalance = async () => {
    if (state.isConnect) {
      console.log("account : " + state.account);
      // caver 함수 중 현재 공개키의 klay양을 리턴하는 함수
      let bal = await caver.klay.getBalance(state.account);
      bal = caver.utils.fromPeb(bal, "KLAY");
      setKlayBalance(bal);
      console.log("balance : " + bal);
    } else {
      alert("지갑을 먼저 연결해주세요.");
    }
  };

  //뮤직스톤 토큰 잔액 조회
  var GetTokenBalance = async () => {
    var tokenAddress = process.env.REACT_APP_TOKEN_ADDRESS;
    var accessKeyId = process.env.REACT_APP_ACCESS_KEY_ID; //KAS 콘솔 - Security - Credential에서 발급받은 accessKeyId 인증아이디
    var secretAccessKey = process.env.REACT_APP_SECRET_ACCESS_KEY; //KAS 콘솔 - Security - Credential에서 발급받은 secretAccessKey 인증비밀번호
    const CaverExtKAS = require("caver-js-ext-kas");
    const caverExt = new CaverExtKAS();
    const chainId = 1001; // 클레이튼 테스트 네트워크 접속 ID
    caverExt.initKASAPI(chainId, accessKeyId, secretAccessKey); //KAS console 초기화

    if (state.isConnect) {
      const kip7 = new caverExt.kct.kip7(tokenAddress); //생성된 토큰의 Address 입력
      const receipt = await kip7.balanceOf(state.account); //balanceOf('토큰 조회할 주소')

      console.log(receipt);
      setTokenBalance(caverExt.utils.fromPeb(receipt, "KLAY"));
    } else {
      alert("지갑을 먼저 연결해주세요.");
    }
  };

  const swapKlay2Token = async () => {
    if (
      !state.isConnect ||
      swapAmount.klay === 0.0 ||
      swapAmount.token === 0.0
    ) {
      alert("지갑을 연결하거나 교환할 클레이/토큰 수량을 입력해주세요.");
      return;
    }
    const { from, to, gas } = transferData;
    const klayAmount = String(swapAmount.klay);
    const tokenAmount = String(swapAmount.token);
    console.log(`swapKlay2Token(KLAY:${klayAmount}, TOKEN:${tokenAmount})`);
    caver.klay
      .sendTransaction({
        type: "VALUE_TRANSFER",
        from,
        to,
        value: caver.utils.toPeb(klayAmount, "KLAY"),
        gas,
      })
      .once("transactionHash", (transactionHash) => {
        console.log("txHash", transactionHash);
        setTransferData((prevData) => ({
          ...prevData,
          txHash: transactionHash,
        }));
      })
      .once("receipt", async (receipt) => {
        console.log("receipt", receipt);
        setTransferData((prevData) => ({
          ...prevData,
          receipt: JSON.stringify(receipt),
        }));
        //서버에 클레이 수량을 전달하고, 뮤직스톤 토큰을 사용자에게 전송.

        console.log("toAddress:", from);
        console.log("swapAmount.token:", tokenAmount);
        await axios
          .post("http://localhost:80/user/buytoken", {
            toAccount: from,
            amount: tokenAmount,
          })
          .then((res) => {
            console.log(res.data);
            alert(res.data.message);
          });
      })
      .once("error", (error) => {
        console.log("error", error.message);
        setTransferData((prevData) => ({
          ...prevData,
          error: error.message,
        }));
      });
  };

  //지갑 잔액 확인
  const GetBalance = () => {
    console.log("state.isConnect:" + state.isConnect);
    if (state.isConnect) {
      GetKlayBalance();
      GetTokenBalance();
    } else {
      alert("지갑을 먼저 연결해주세요.");
    }
  };

  return (
    <div id="buytokenpage">
      <div className="pagetitle">토큰 구매</div>
      <div>
        <span className="text">지갑 : {state.account}</span>
      </div>
      <div>
        <span className="text">
          *** 구매할 지갑주소가 맞는지 반드시 확인하세요. ***{" "}
        </span>
      </div>
      <div>
        <button onClick={GetBalance}>지갑 잔액 확인</button>
      </div>
      <div>
        <span className="text">클레이 잔액 : {klayBalance} klays</span>
        <span className="text">뮤직스톤 토큰 잔액 : {tokenBalance} tokens</span>
      </div>
      <input
        id="klayInput"
        className="tokeninput"
        type="number"
        name="klay"
        placeholder="클레이를 입력하세요."
        value={klay}
        onChange={onChangeValue}
      ></input>
      <input
        id="tokenInput"
        className="tokeninput"
        placeholder="토큰 개수를 입력하세요."
        type="number"
        name="token"
        value={token}
        onChange={onChangeValue}
      ></input>
      <button onClick={swapKlay2Token}>교환</button>
    </div>
  );
}
export default BuyToken;
