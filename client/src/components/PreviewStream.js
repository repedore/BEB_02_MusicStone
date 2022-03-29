import React, { useState, useRef, useEffect } from 'react';
import styled from "styled-components";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

const PreviewStream = ({ stone }) => {
    const audioRef = useRef(null);
    const imgRef = useRef(null);
    const [isPlay, setIsPlay] = useState(false);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [musicLength, setMusicLength] = useState(0);

    const handlePlayBtn = () => {
        isPlay ? audioRef.current.pause() : audioRef.current.play();
        setIsPlay(!isPlay);
    }
    function updateDuration() {
        setMusicLength(audioRef.current.duration);
    }
    function countPlayTime() {
        const curTime = audioRef.current.currentTime.toFixed();
        setSecond(curTime % 60);
        setMinute(Math.floor(curTime / 60));
    }

    //interval 관련

    const interval = useRef();

    useEffect(() => {
        interval.current = countPlayTime;
    }, [countPlayTime])

    useEffect(() => {
        imgRef.current.style.animationPlayState = isPlay ? 'running' : 'paused';

        if (isPlay) {
            function tick() {
                interval.current();
            }
            let id = setInterval(tick, 1000)
            return () => clearInterval(id);
        }
    }, [isPlay])

    return (
        <StreamingWrapper>
            <Play>
                <ImgBox>
                    <Img src={stone.image} alt={stone.name} ref={imgRef} />
                </ImgBox>
                <BtnWrapper>
                    <StreamingBtn onClick={() => handlePlayBtn()}>{isPlay ? <PauseIcon /> : <PlayArrowIcon />}</StreamingBtn>
                </BtnWrapper>
            </Play>
            <Timer>{minute}:{second >= 10 ? second : `0${second}`} / {Math.floor(musicLength / 60)}:{(musicLength % 60).toFixed()}</Timer>
            <audio src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" onLoadedData={updateDuration} ref={audioRef}></audio>
        </StreamingWrapper >
    );
}

export default PreviewStream;

const StreamingWrapper = styled.div`
width: 100%;
height: 100%;
display:flex;
flex-direction: column;
`;
const Play = styled.div`
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
`;
const ImgBox = styled.div`
margin: 50px;
height: 300px;
width: 300px;
position:absolute;
border-radius: 70%;
overflow: hidden;
`;
const Img = styled.img`
width: 300px;
height: 300px;
-webkit-user-drag: none;
animation: rotate_image 10s linear infinite;
transform-origin: 50% 50%;
`
const BtnWrapper = styled.div`
position:absolute;
`;
const StreamingBtn = styled.button`
background-color:#333333;
width: 60px;
height: 60px;
border-radius: 30px 30px 30px 30px;
cursor: pointer;
color: white;
`;
const Timer = styled.div`
color: #ABABAB;
height: 50px;
text-align: center;
`;