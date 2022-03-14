import musicstonelogo from "../img/musicstonelogoblack.png";
import { Link } from "react-router-dom";

function Mypage({ account }) {
  const edit = () => {};
  return (
    <div>
      <div id="mypage">
        <img className="profileimg" src={musicstonelogo}></img>
        <div id="mypageaccount">{account}</div>
        {/* <div>
          <button id="editbtn" onClick={edit}>
            편집
          </button>
        </div> */}
        <div>
          <Link
            id="register"
            to="/registermusician"
            style={{ textDecoration: "none" }}
          >
            <button id="editbtn"> 뮤지션 등록 </button>
          </Link>
        </div>
      </div>
      <div></div>
    </div>
  );
}
export default Mypage;
