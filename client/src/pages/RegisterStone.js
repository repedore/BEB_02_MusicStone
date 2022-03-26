import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import select from "react-select";

export function RegisterStone() {
  const [stoneName, setStoneName] = useState("");
  const state = useSelector((state) => state.accountReducer);
  const account = state.account;
  const [description, setDescription] = useState("");
  const [stonefile, setStonefile] = useState(null);
  const [lyricist, setLyricist] = useState("");
  const [composer, setComposer] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [category, setCategory] = useState("default");

  const onChangeStoneName = (e) => {
    setStoneName(e.target.value);
  };
  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };
  const onChangeStoneFile = (e) => {
    setStonefile(e.target.files[0]);
  };
  const onChangeLyricist = (e) => {
    setLyricist(e.target.value);
  };
  const onChangeComposer = (e) => {
    setComposer(e.target.value);
  };
  const onChangeLyrics = (e) => {
    setLyrics(e.target.value);
  };

  const saveStone = async () => {
    if (
      stoneName &&
      account &&
      description &&
      stonefile &&
      lyricist &&
      composer &&
      lyrics
    ) {
      const formData = new FormData();
      formData.append("stoneName", stoneName);
      formData.append("account", account);
      formData.append("description", description);
      formData.append("file", stonefile);
      formData.append("lyricist", lyricist);
      formData.append("composer", composer);
      formData.append("lyrics", lyrics);
      await axios
        .post(
          "http://localhost:12367/stones/register",
          {
            stoneName,
            account,
            description,
            stonefile,
            lyricist,
            composer,
            lyrics,
            category,
          },
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          alert(res.data.message);
        });
    } else if (!stoneName) {
      alert("이름을 입력해주세요.");
    } else if (!account) {
      alert("지갑을 연결해주세요.");
    } else if (!description) {
      alert("소개글을 입력해주세요.");
    } else if (!stonefile) {
      alert("음원파일을 선택해주세요");
    } else if (!lyricist) {
      alert("작사가를 입력해주세요");
    } else if (!composer) {
      alert("작곡가를 입력해주세요");
    } else if (!lyrics) {
      alert("가사를 입력해주세요");
    }
  };
  return (
    <div>
      <div id="stoneregisterpage">
        <div className="pagetitle">스톤 등록</div>
        <div>{state.isConnect ? state.account : "지갑을 연결하세요."}</div>
        <div>
          <input
            className="fileinput"
            type="file"
            onChange={(e) => onChangeStoneFile(e)}
            name="stonefile"
          />
        </div>
        <div>
          <div className="registertext">name</div>
          <input
            className="stonenameinput"
            type="text"
            placeholder="스톤 이름을 입력해주세요."
            onChange={onChangeStoneName}
          ></input>
        </div>
        <div>
          <div className="registertext">lyricist</div>
          <input
            className="stonenameinput"
            type="text"
            placeholder="스톤 작사가를 입력해주세요."
            onChange={onChangeLyricist}
          ></input>
        </div>
        <div>
          <div className="registertext">composer</div>
          <input
            className="stonenameinput"
            type="text"
            placeholder="스톤 작곡가를 입력해주세요."
            onChange={onChangeComposer}
          ></input>
        </div>
        <div>
          <div className="registertext">info</div>
          <textarea
            className="stoneinfoinput"
            type="text"
            placeholder="스톤의 소개글을 입력해주세요."
            onChange={onChangeDescription}
          ></textarea>
          <div>
            <div className="registertext">lyrics</div>
            <textarea
              className="lyricsinput"
              type="text"
              placeholder="스톤의 가사를 입력해주세요."
              onChange={onChangeLyrics}
            ></textarea>
          </div>
          <div>
            <div className="registertext">Category</div>
            <div className="selectbox">
              <select
                className="selectbox"
                onChange={(e) => {
                  const selectedCategory = e.target.value;
                  setCategory(selectedCategory);
                }}
              >
                <option key="default" value="default">
                  스톤의 카테고리를 선택해주세요.
                </option>
                <option key="Ballade" value="Ballade">
                  Ballade
                </option>
                <option key="Dance" value="Dance">
                  Dance
                </option>
                <option key="RnB" value="RnB">
                  R&B
                </option>
                <option key="Hiphop" value="Hiphop">
                  Hiphop
                </option>
                <option key="Indie" value="Indie">
                  Indie
                </option>
                <option key="Rock" value="Rock">
                  Rock
                </option>
                <option key="Trot" value="Trot">
                  Trot
                </option>
                <option key="Classic" value="Classic">
                  Classic
                </option>
                <option key="Jazz" value="Jazz">
                  Jazz
                </option>
              </select>
            </div>
          </div>
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
