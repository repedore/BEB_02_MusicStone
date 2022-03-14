import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Musician from "./pages/Musician";
import Stones from "./pages/Stones";
import Mypage from "./pages/Mypage";
import Playlist from "./pages/Playlist";
import RegisterMusician from "./pages/RegisterMusician";
import Nav from "./components/Nav";
import "./App.css";

function App() {
  const [account, setAccount] = useState("");
  const kaikasLogin = async () => {
    try {
      const wallet = await window.klaytn.enable();
      setAccount(wallet);
      alert(wallet);
    } catch (ex) {
      console.log(ex);
    }
  };
  const connectWallet = () => {
    if (typeof window.klaytn !== "undefined") {
      const provider = window["klaytn"];
      kaikasLogin();
    }
  };
  return (
    <div>
      <Router>
        <Nav connectWallet={connectWallet} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/musician" element={<Musician />} />
          <Route path="/stones" element={<Stones />} />
          <Route path="/mypage" element={<Mypage account={account} />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/registermusician" element={<RegisterMusician />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
