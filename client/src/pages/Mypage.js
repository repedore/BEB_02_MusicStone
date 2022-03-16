import musicstonelogo from "../img/musicstonelogo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";

function Mypage() {
  // const edit = () => {};
  const state = useSelector((state) => state.accountReducer);
  return (
    <div>
      <div id="mypage">
        <img className="profileimg" src={musicstonelogo} alt="profile"></img>
        <div className="mypageaccount">{state.account}</div>
        {/* <div>
          <button id="editbtn" onClick={edit}>
            편집
          </button>
        </div> */}
        <div>
          <span>
            <Link
              id="register"
              to="/musician/register"
              style={{ textDecoration: "none" }}
            >
              <button id="editbtn"> 뮤지션 등록 </button>
            </Link>
          </span>
          <span>
            <Link to="/mypage/buyToken" style={{ textDecoration: "none" }}>
              <button id="tokenbtn"> 토큰 구매창 </button>
            </Link>
          </span>
        </div>
      </div>
      <div></div>
    </div>
  );
}
export default Mypage;
