import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export function RegisterStone() {
  const [stoneInfo, setStoneInfo] = useState("");
  const [stoneName, setStoneName] = useState("");
  const [file, setFile] = useState(null);
  const state = useSelector((state) => state.accountReducer);

  const onChangeStoneInfo = (e) => {
    setStoneInfo(e.target.value);
  };
  const onChangeStoneName = (e) => {
    setStoneName(e.target.value);
  };
  const onChangeStoneFile = (e) => {
    setFile(e.target.files[0]);
  };
  const account = state.account;
  const saveStone = async () => {
    if (stoneName && account && stoneInfo) {
      await axios
        .post("http://localhost:12367/stone/register", {
          stoneName,
          account,
          stoneInfo,
        })
        .then((res) => {
          console.log(res.data);
          alert(res.data.message);
        });
    } else if (!account) {
      alert("지갑을 연결해주세요.");
    } else if (!stoneName) {
      alert("이름을 입력해주세요.");
    } else if (!stoneInfo) {
      alert("소개글을 입력해주세요.");
    }
  };
  const CheckAccount = () => {
    console.log("state.isConnect:" + state.isConnect);
    if (state.isConnect) {
      alert(account);
    } else {
      alert("지갑을 먼저 연결해주세요.");
    }
  };
  return (
    <div>
      <div id="stoneregisterpage">
        <div className="pagetitle">스톤 등록</div>
        <div>
          <button onClick={CheckAccount}>계정 확인</button>
        </div>
        <div>
          <input
            className="fileinput"
            type="file"
            onChange={onChangeStoneFile}
          />
        </div>
        <div>
          <input
            className="stonenameinput"
            type="text"
            placeholder="스톤 이름을 입력해주세요."
            onChange={onChangeStoneName}
          ></input>
        </div>
        <div>
          <div className="registertext">info:</div>
          <textarea
            className="stoneinfoinput"
            type="text"
            placeholder="스톤의 소개글을 입력해주세요."
            onChange={onChangeStoneInfo}
          ></textarea>
          <div>
            <button id="editbtn" onClick={saveStone}>
              등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
