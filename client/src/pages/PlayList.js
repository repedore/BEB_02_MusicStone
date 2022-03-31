import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  AiOutlinePlayCircle,
  AiFillDelete,
  AiFillCustomerService,
} from "react-icons/ai";

function ShowPlayList({ play, handleStoneId }) {
  console.log("🚀 ~ file: PlayList.js ~ line 8 ~ ShowPlayList ~ play", play);

  return (
    <div className="streamingpage">
      <hr className="stoneline"></hr>
      <div className="stones">
        <span className="stoneName">
          <AiOutlinePlayCircle
            onClick={(e) => handleStoneId(e)}
            value={play.stoneId}
            className="playicon"
            size="30"
          />
          {play.stoneName}
        </span>

        <span className="musicianName">{play.musicianName}</span>
        <span className="deleteicon">
          <AiFillDelete className="deleteicon" size="30" />
        </span>
      </div>
    </div>
  );
}
export function PlayList() {
  const state = useSelector((state) => state.accountReducer);
  const account = state.account;
  const [stoneSrc, setStoneSrc] = useState("");
  const [currentTime, setCurrentTime] = useState(0);
  const [stoneId, setStoneId] = useState(0);
  const audioRef = useRef();
  const [isPaused, setPaused] = useState(false);
  const [playList, setPlayList] = useState([]);
  const server =
    process.env.REACT_APP_SERVER_ADDRESS || "http://127.0.0.1:12367";

  const getPlayList = async () => {
    await axios
      .get(`${server}/playlist/${account}`)
      .then((res) => {
        const length = res.data.length;
        console.log(length);
        const pl = res.data.map((data) => ({
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
    setStoneSrc(`${server}/playlist/streaming/${stoneId}`);
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
      <div className="playlisttext">
        {state.isConnect ? (
          <div>
            <div className="text">지금 연결된 계정 주소 :</div>
            <div>{account}</div>
            <button className="editbtn" onClick={getPlayList}>
              Get My Playlist
            </button>
          </div>
        ) : (
          <div className="text">
            플레이리스트를 불러오려면 계정을 먼저 연결하세요.
          </div>
        )}
      </div>
      <div>
        {playList.map((play) => (
          <ShowPlayList play={play} handleStoneId={handleStoneId} />
        ))}
        <hr className="stoneline"></hr>
      </div>
    </div>
  );
}
