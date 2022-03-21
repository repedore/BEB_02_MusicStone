import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Main, Album, Mypage, PlayList, RegisterMusician } from "./pages";
import BuyToken from "./pages/BuyToken";
import { Musician, MusicianInfo } from "./pages/Musician";
import { MyStone, BuyStone, TradeStone } from "./pages/Stones";
import Nav from "./components/Nav";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.accountReducer);
  const kaikasLogin = async () => {
    if (typeof window.klaytn !== "undefined") {
      const provider = window["klaytn"];
    }
    try {
      const wallet = await window.klaytn.enable();
      dispatch({ type: "ON_CONNECT", account: wallet });
      alert(wallet);
    } catch (ex) {
      console.log(ex);
    }
  };
  const connectWallet = () => {
    if (typeof window.klaytn !== "undefined") {
      const provider = window["klaytn"];
      console.log("connectwallet 실행");
      kaikasLogin();
    } else {
      console.log("connectwallet else");
    }
  };
  return (
    <div>
      <Router>
        <Nav connectWallet={connectWallet} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/musician" element={<Musician />} />
          <Route path="/musician/:id" element={<MusicianInfo />} />
          <Route path="/musician/register" element={<RegisterMusician />} />
          <Route path="/album/:id" element={<Album />} />
          <Route path="/stones/myStone" element={<MyStone />} />
          <Route path="/stones/buyStone" element={<BuyStone />} />
          <Route path="/stones/tradeStone/:id" element={<TradeStone />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/mypage/buyToken" element={<BuyToken />} />
          <Route path="/playlist" element={<PlayList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
