import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export function RegisterMusician() {
  const [email, setEmail] = useState("");
  const [musicianInfo, setMusicianInfo] = useState("");
  const [KName, setKName] = useState("");
  const [EName, setEName] = useState("");
  const [img, setImg] = useState(null);
  const state = useSelector((state) => state.accountReducer);

  const onChangeMusicianInfo = (e) => {
    setMusicianInfo(e.target.value);
  };
  const onChangeKName = (e) => {
    setKName(e.target.value);
  };
  const onChangeEName = (e) => {
    setEName(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangeImg = (e) => {
    setImg(URL.createObjectURL(e.target.files[0]));
  };
  const account = state.account;
  const saveMusician = async () => {
    if ((KName || EName) && email && account && musicianInfo) {
      await axios
        .post("http://localhost:12367/user/register", {
          KName,
          EName,
          account,
          email,
          img,
          musicianInfo,
        })
        .then((res) => {
          console.log(res.data);
          alert(res.data.message);
        });
    } else if (!account) {
      alert("지갑을 연결해주세요.");
    } else if (!email) {
      alert("이메일을 입력해주세요.");
    } else if (!KName && !EName) {
      alert("이름을 입력해주세요.");
    } else if (!musicianInfo) {
      alert("소개글을 입력해주세요.");
    }
  };
  return (
    <div>
      <div id="registerpage">
        <div className="pagetitle">뮤지션 등록</div>
        <div>
          <div>
            {img && (
              <img
                className="profileimg"
                alt="sample"
                src={img}
                style={{ margin: "auto" }}
              />
            )}
          </div>
          <input className="fileinput" type="file" onChange={onChangeImg} />
        </div>
        <div>
          <div className="registertext">name :</div>
          <input
            className="musicianinput"
            type="text"
            placeholder="뮤지션의 한글 이름을 입력해주세요."
            onChange={onChangeKName}
          ></input>
        </div>
        <div>
          <input
            className="musicianinput"
            type="text"
            placeholder="뮤지션의 영어 이름을 입력해주세요."
            onChange={onChangeEName}
          ></input>
        </div>
        <div>
          <div className="registertext">email:</div>
          <input
            className="musicianinput"
            type="text"
            placeholder="이메일을 입력해주세요."
            onChange={onChangeEmail}
          ></input>
        </div>
        <div>
          <div className="registertext">info:</div>

          <textarea
            className="musicianinfoinput"
            type="text"
            placeholder="뮤지션의 소개글을 입력해주세요."
            onChange={onChangeMusicianInfo}
          ></textarea>
          <div>
            <button id="editbtn" onClick={saveMusician}>
              등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
