import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Musician from "./pages/Musician";
import MusicianInfo from "./pages/Musician/MusicianInfo";
import Album from "./pages/Album"
import Stones from "./pages/Stones";
import Mypage from "./pages/Mypage";
import Playlist from "./pages/Playlist";
import RegisterMusician from "./pages/RegisterMusician";
import BuyToken from "./pages/BuyToken";
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
          <Route path="/stones" element={<Stones />} />
          <Route path="/stones/myStone" element={<Stones />} />
          <Route path="/stones/buyStone" element={<Stones />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/mypage/buyToken" element={<BuyToken />} />
          <Route path="/playlist" element={<Playlist />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
