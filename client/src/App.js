import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Musician from "./pages/Musician";
import Stones from "./pages/Stones";
import Mypage from "./pages/Mypage";
import Playlist from "./pages/Playlist";
import Nav from "./components/Nav";
import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/musician" element={<Musician />} />
          <Route path="/stones" element={<Stones />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/playlist" element={<Playlist />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
