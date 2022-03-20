import { Link } from "react-router-dom";
import musicstonelogo from "../img/musicstonelogo.png";
// import { BsPersonCircle } from "react-icons/bs";
import React from "react";

function Nav({ connectWallet }) {
  return (
    <div id="nav">
      <img id="logo" src={musicstonelogo} alt="logo"></img>
      <span id="title">
        <Link to="/" style={{ textDecoration: "none" }}>
          Music Stone
        </Link>
      </span>
      <span id="musician">
        <Link to="/musician" style={{ textDecoration: "none" }}>
          Musician
        </Link>
      </span>
      <span id="stones">
        <div className='nav-dropdown'>
          <button id="nav-stones-btn">Stones</button>
          <div class="nav-dropdown-content">
            <Link to="/stones/myStone" style={{ textDecoration: "none" }}><div>My Stone</div></Link>
            <Link to="/stones/BuyStone" style={{ textDecoration: "none" }}><div>Buy Stone</div></Link>
          </div>
        </div>
      </span>
      <span id="playlist">
        <Link to="/playlist" style={{ textDecoration: "none" }}>
          PlayList
        </Link>
      </span>
      <span id="my">
        <Link
          to="/mypage"
          style={{ textDecoration: "none" }}
          onClick={() => connectWallet()}
        >
          MY
        </Link>
      </span>
      {/* <BsPersonCircle id="icon" size="22" onClick={() => connectWallet()} /> */}
    </div>
  );
}
export default Nav;
