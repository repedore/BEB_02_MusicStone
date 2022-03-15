import { Link } from "react-router-dom";
import musicstonelogo from "../img/musicstonelogo.png";
// import { BsPersonCircle } from "react-icons/bs";

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
        <Link to="/stones" style={{ textDecoration: "none" }}>
          Stones
        </Link>
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
