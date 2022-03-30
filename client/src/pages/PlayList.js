import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

export function PlayList() {
  const state = useSelector((state) => state.accountReducer);
  const account = state.account;
  const [stoneSrc, setStoneSrc] = useState("");
  const [currentTime, setCurrentTime] = useState(0);
  const [stoneId, setStoneId] = useState(0);
  const audioRef = useRef();
  const [isPaused, setPaused] = useState(false);
  const [playList, setPlayList] = useState([]);

  const getPlayList = async () => {
    alert("getplaylist");
    await axios
      .get(`http://localhost:12367/playlist/${account}`)
      .then((res) => {
        setPlayList(res.data);
      })
      .catch((e) => alert(e));
  };

  const handleAudio = () => {
    console.log(audioRef);
    console.log(audioRef.current.currentTime);
  };

  const handleTime = () => {
    console.log(audioRef.current.currentTime);
  };

  const handleStoneId = (e) => {
    console.log(`e.value: ${e.target.value}`);
    setStoneId(e.target.value);
    setStoneSrc(`http://localhost:4000/streaming/{stoneId}`);
  };

  const handleStreaming = (e) => {
    console.log(audioRef.current.currentTime);
    if (audioRef.current.currentTime > 5) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };
  return (
    <div id="playlistpage">
      <div className="text">당신이 듣고싶은 스톤을 찾아보세요.</div>
      <span>
        <Link to="/musician" style={{ textDecoration: "none" }}>
          <button className="editbtn"> 뮤지션 검색 </button>
        </Link>
      </span>
      <span>
        <Link to="/stones/buyStone" style={{ textDecoration: "none" }}>
          <button className="tokenbtn"> Stone 검색 </button>
        </Link>
      </span>
      {state.isConnect ? (
        <div>
          <div className="text">지금 연결된 계정 주소 :</div>
          <div>
            {state.account} {getPlayList()}
          </div>
        </div>
      ) : (
        <div className="text">
          플레이리스트를 불러오려면 계정을 먼저 연결하세요.
        </div>
      )}
      <div>
        <hr className="line"></hr>
      </div>
      <div id="playlisttext">PlayList</div>

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
    </div>
  );
}
