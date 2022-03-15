import musicstonelogo from "../img/musicstonelogo.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Mypage() {
  const edit = () => {};
  const state = useSelector((state) => state.accountReducer);
  return (
    <div>
      <div id="mypage">
        <img className="profileimg" src={musicstonelogo}></img>
        <div className="mypageaccount">{state.account}</div>
        {/* <div>
          <button id="editbtn" onClick={edit}>
            편집
          </button>
        </div> */}
        <div>
          <Link
            id="register"
            to="/musician/register"
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
