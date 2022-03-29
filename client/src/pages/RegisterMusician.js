import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export function RegisterMusician() {
  const [KName, setKName] = useState("");
  const [EName, setEName] = useState("");
  const state = useSelector((state) => state.accountReducer);
  const account = state.account;
  const [email, setEmail] = useState("");
  const [img, setImg] = useState(null);
  const [imgsrc, setImgsrc] = useState(null);
  const [description, setDescription] = useState("");

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
    setImg(e.target.files[0]);
    setImgsrc(URL.createObjectURL(e.target.files[0]));
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };
  const saveMusician = async (e) => {
    e.preventDefault();
    if ((KName || EName) && account && email && img && description) {
      let formData = new FormData();
      formData.append("KName", KName);
      formData.append("EName", EName);
      formData.append("account", account);
      formData.append("email", email);
      formData.append("description", description);
      formData.append("musicianfile", img);

      await axios
        .post("http://localhost:12367/user/register", formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data);
          alert(res.data.message);
        });
    } else if (!KName && !EName) {
      alert("이름을 입력해주세요.");
    } else if (!account) {
      alert("지갑을 연결해주세요.");
    } else if (!email) {
      alert("이메일을 입력해주세요.");
    } else if (!description) {
      alert("소개글을 입력해주세요.");
    } else if (!img) {
      alert("뮤지션의 사진 선택해주세요.");
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
                src={imgsrc}
                style={{ margin: "auto" }}
              />
            )}
          </div>
          <input
            className="fileinput"
            type="file"
            accept="image/*"
            onChange={(e) => onChangeImg(e)}
            name="musicianfile"
          />
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
            onChange={onChangeDescription}
          ></textarea>
          <div>
            <button id="editbtn" onClick={(e) => saveMusician(e)}>
              등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
