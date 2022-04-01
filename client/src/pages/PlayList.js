import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  AiOutlineCheckSquare,
  AiOutlinePlayCircle,
  AiFillDelete,
  AiFillCustomerService,
} from "react-icons/ai";
import service_abi from "../abi/Service";
import Caver from "caver-js";

export function PlayList() {
  const state = useSelector((state) => state.accountReducer);
  const account = state.account;
  const userId = state.userId;
  const [stoneSrc, setStoneSrc] = useState("");
  const [currentTime, setCurrentTime] = useState(0);
  const [stoneId, setStoneId] = useState(0);
  const audioRef = useRef();
  const [isPaused, setPaused] = useState(false);
  const [playList, setPlayList] = useState([]);
  const [keepingTokenBal, setKeepingTokenBal] = useState(0);
  const caver = new Caver(window.klaytn);
  var serviceAddress = process.env.REACT_APP_SERVICE_ADDRESS;
  const server =
    process.env.REACT_APP_SERVER_ADDRESS || "http://127.0.0.1:12367";

  const getPlayList = async () => {
    await axios
      .get(`${server}/playlist/${userId}`)
      .then((res) => {
        console.log(res.data);
        const pl = res.data.playlist.map((data) => ({
          stoneId: data.id,
          stoneName: data.name,
          musicianName:
            data.musicianInfo[0].name_korea +
            " (" +
            data.musicianInfo[0].name_english +
            ") ",
        }));
        setPlayList(pl);
      })
      .catch((e) => alert(e));
  };
  const deleteStone = async (stoneId, e) => {
    await axios
      .post(`${server}/playlist/delete/${userId}`, { stoneId: stoneId })
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => alert(e));
  };
  const handleTime = () => {
    console.log("55 :   " + audioRef.current.currentTime);
  };

  const GetKeepingTokenBal = async () => {
    var service_contract = new caver.klay.Contract(service_abi, serviceAddress);
    await service_contract.methods
      .getUserDeposit(state.account)
      .call()
      .then((data) => {
        console.log(caver.utils.fromPeb(data));
        setKeepingTokenBal(caver.utils.fromPeb(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleStoneId = async (stoneId, e) => {
    setStoneId(stoneId);
    setStoneSrc(`${server}/playlist/streaming/${stoneId}`);
    await axios
      .get(stoneSrc)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => alert(e));
  };

  const handleStreaming = async (e) => {
    if (
      audioRef.current.currentTime > 59.9 &&
      60.4 > audioRef.current.currentTime
    ) {
      await axios
        .post(`${server}/playlist/streaming/${stoneId}`, { userId: userId })
        .then((res) => {
          console.log(res.data);
        });
    }
  };
  return (
    <div id="playlistpage">
      <div className="playlisttext">
        {state.isConnect ? (
          <div>
            <div className="text">지금 연결된 계정 주소 :</div>
            <div>{account}</div>
          </div>
        ) : (
          <div className="pagetitle">계정을 먼저 연결하세요.</div>
        )}
      </div>
      {state.isConnect ? (
        <div className="playlisttokentext">
          <span>사용가능한 토큰의 수량 : {keepingTokenBal}</span>
          <AiOutlineCheckSquare
            className="checkicon"
            size="30"
            onClick={GetKeepingTokenBal}
          />
        </div>
      ) : (
        ""
      )}
      <div className="text">당신이 듣고싶은 스톤을 찾아보세요.</div>
      <span>
        <Link to="/musician" style={{ textDecoration: "none" }}>
          <button className="btn"> 뮤지션 검색 </button>
        </Link>
      </span>
      <span>
        <Link to="/stones/buyStone" style={{ textDecoration: "none" }}>
          <button className="btn"> Stone 검색 </button>
        </Link>
      </span>
      <div></div>

      <div id="playlisttext">
        <AiFillCustomerService className="playlisticon" size="30" />
        PlayList
        <AiFillCustomerService className="playlisticon" size="30" />
      </div>
      <div id="audio">
        <audio
          onPause={handleTime}
          onTimeUpdate={handleStreaming}
          className="App-button"
          id="audio1"
          src={stoneSrc}
          controls
          controlsList="nodownload"
          ref={audioRef}
        ></audio>
      </div>
      <button className="btn" onClick={getPlayList}>
        Get My Playlist
      </button>

      <div>
        {playList.map((play) => (
          <div className="streamingpage">
            <hr className="stoneline"></hr>
            <div className="stones">
              <span className="stoneName">
                <AiOutlinePlayCircle
                  onClick={(e) => handleStoneId(play.stoneId, e)}
                  className="playicon"
                  size="30"
                />
                {play.stoneName}
              </span>

              <span className="musicianName">{play.musicianName}</span>
              <span className="deleteicon">
                <AiFillDelete
                  onClick={(e) => deleteStone(play.stoneId, e)}
                  className="deleteicon"
                  size="30"
                />
              </span>
            </div>
          </div>
        ))}
        <hr className="stoneline"></hr>
      </div>
    </div>
  );
}
