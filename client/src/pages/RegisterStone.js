import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import select from "react-select";
import { Link } from "react-router-dom";
import Caver from "caver-js";
import service_abi from "../abi/Service";

export default function RegisterStone() {
  const [stoneName, setStoneName] = useState("");
  const state = useSelector((state) => state.accountReducer);
  const account = state.account;
  const [description, setDescription] = useState("");
  const [stonefile, setStonefile] = useState(null);
  const [lyricist, setLyricist] = useState("");
  const [composer, setComposer] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [category, setCategory] = useState("default");
  const [album, setAlbum] = useState("");
  const [albumName, setAlbumName] = useState([]);
  const [SFTAmount, setSFTAmount] = useState(0);
  const caver = new Caver(window.klaytn);
  var tokenAddress = process.env.REACT_APP_TOKEN_ADDRESS;
  var SFTAddress = process.env.REACT_APP_SFT_CONTRACT_ADDRESS;
  var serviceAddress = process.env.REACT_APP_SERVICE_ADDRESS;
  var accessKeyId = process.env.REACT_APP_ACCESS_KEY_ID; //KAS 콘솔 - Security - Credential에서 발급받은 accessKeyId 인증아이디
  var secretAccessKey = process.env.REACT_APP_SECRET_ACCESS_KEY; //KAS 콘솔 - Security - Credential에서 발급받은 secretAccessKey 인증비밀번호
  var walletAddress = process.env.REACT_APP_WALLETADDRESS;
  var walletPrivateKey = process.env.REACT_APP_WALLETPRIVATEKEY;
  const CaverExtKAS = require("caver-js-ext-kas");
  const caverExt = new CaverExtKAS();
  const chainId = 1001; // 클레이튼 테스트 네트워크 접속 ID
  caverExt.initKASAPI(chainId, accessKeyId, secretAccessKey); //KAS console 초기화

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
  const onChangeSFTAmount = (e) => {
    setSFTAmount(Number(e.target.value));
  };
  const mintSFT = async () => {
    const kip37 = new caverExt.kct.kip37(SFTAddress);
    saveStone();
  };
  const saveStone = async () => {
    if (
      // album &&
      stoneName &&
      account &&
      description &&
      stonefile &&
      lyricist &&
      composer &&
      lyrics
    ) {
      const formData = new FormData();
      formData.append("album", album);
      formData.append("stoneName", stoneName);
      formData.append("description", description);
      formData.append("stonefile", stonefile);
      formData.append("lyricist", lyricist);
      formData.append("composer", composer);
      formData.append("lyrics", lyrics);
      formData.append("category", category);
      formData.append("totalBalance", SFTAmount);
      await axios
        .post(`http://localhost:12367/stones/register/${account}`, formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data);
          alert(res.data.message);
        });
      // } else if (!album) {
      //   alert("앨범을 선택해주세요. 원하는 앨범이 없다면 앨범을 등록해주세요.");
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
  // const getAlbum = async () => {
  //   await axios
  //     .get(`http://localhost:12367/stones/${account}`)
  //     .then((res) => {
  //       setAlbumName(res.data.albumName);
  //       console.log("album name " + res.data.albumName);
  //     })
  //     .catch((e) => alert(e));
  // };
  return (
    <div>
      <div id="stoneregisterpage">
        <div>
          <span className="pagetitle">스톤 등록</span>
          <span>
            <Link to="/album/register" style={{ textDecoration: "none" }}>
              <button className="albumbtn"> 앨범 등록 </button>
            </Link>
          </span>
        </div>
        {state.isConnect ? (
          <div>
            <div className="text">지금 연결된 계정 주소 :</div>
            <div>{state.account}</div>
          </div>
        ) : (
          <div className="text">계정을 먼저 연결하세요.</div>
        )}
        <div>
          {/* <button onclick={getAlbum()}>getAlbum</button> */}
          <select
            className="Aselectbox"
            onChange={(e) => {
              const selectedAlbum = e.target.value;
              setAlbum(selectedAlbum);
            }}
          >
            <option value="">앨범을 선택해주세요.</option>
            {albumName.map((albumname) => {
              return <option value={albumname}>{albumname}</option>;
            })}
          </select>
        </div>
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
          <input
            className="stonenameinput"
            placeholder="등록할 SFT 개수를 입력해주세요."
            onChange={onChangeSFTAmount}
          ></input>
          <div>
            <button className="editbtn" onClick={mintSFT}>
              등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
