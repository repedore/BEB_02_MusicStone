import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react"
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import styled from 'styled-components';
import AlbumStone from '../components/AlbumStone';
import PreviewStream from '../components/PreviewStream';

export const Album = () => {
    const { id } = useParams();
    const server = process.env.REACT_APP_SERVER_ADDRESS || "http://127.0.0.1:12367";

    const [isLike, setIsLike] = useState(false);
    const [selectNum, setSelectNum] = useState(0);
    const [albumData, setAlbumData] = useState(initialState);
    const albumInfo = albumData.albumInfo[0];
    const stoneList = albumData.stoneList.map((stone) => Object.assign(stone, { image: `${albumInfo.image}` }));

    const handleLikeBtn = (type, id) => {
        const req = ``
        console.log(albumInfo.like)
        setIsLike(!isLike);
    }
    const handleStoneClick = (idx) => {
        setSelectNum(idx);
    }

    const showlike = () => {
        return (isLike
            ? <div>
                <FavoriteIcon /><span>좋아요 {albumInfo.like.length}</span>
            </div>

            : <div>
                <FavoriteBorderIcon /><span>좋아요 {albumInfo.like.length}</span>
            </div>)
    }
    const showReleaseDate = () => {
        const tempSplit = albumInfo.release_date.split('-');
        return `${tempSplit[0]}년 ${tempSplit[1]}월 ${tempSplit[2].substr(0, 2)}일`
    }
    const showStones = () => {
        return (stoneList.map((stone, idx) => {
            return <AlbumStone key={idx} stone={stone} selectNum={selectNum} idx={idx} handleStoneClick={handleStoneClick} />
        }))
    }

    useEffect(() => {
        const req = `${server}/album/${id}`;
        axios.get(req)
            .then((res) => {
                setAlbumData(res.data)
            })
    }, [isLike])

    useEffect(() => {
        setIsLike(!albumData.isLike);
    }, [albumData])

    return (
        albumInfo
            ? (
                <Body>
                    <AlbumContainer>
                        <ImgWrapper>
                            <Img src={albumInfo.image} alt={albumInfo.musician_id} />
                        </ImgWrapper>
                        <InfoWrapper>
                            <Title>{albumInfo.name}</Title>
                            <InfoBox>
                                <Info>
                                    {/* 현재 userId값 받아오기 힘들어서 임의로 1로 고정*/}
                                    <Like onClick={() => handleLikeBtn("album", 1)}>
                                        {showlike()}
                                    </Like>
                                    {/* 현재 서버에서 id값만 받아올 수 있어서 임시로 이름대신 */}
                                    <Musician>뮤지션 : {albumInfo.musician_id}</Musician>
                                    <ReleaseDate>발매일 : {showReleaseDate()}</ReleaseDate>
                                    <Desc>소개 : {albumInfo.description}</Desc>
                                </Info>
                                <StoneList>
                                    {showStones()}
                                </StoneList>
                            </InfoBox>
                        </InfoWrapper>
                    </AlbumContainer>
                    <StoneContainer>
                        <PreviewStream stone={stoneList[selectNum]} />
                        <StoneWrapper>
                            <StoneTitle>
                                <h2>{stoneList[selectNum].name}</h2>
                            </StoneTitle>
                            <StoneInfo>
                                {/* 현재 서버에서 장르값만 받아올 수 있어서 임시로 */}
                                <div>작사 : Dummy</div>
                                <div>작곡 : Dummy</div>
                                <div>장르 : {stoneList[selectNum].category}</div>
                                <div>가사 : Dummy </div>
                            </StoneInfo>
                        </StoneWrapper>
                    </StoneContainer>
                </Body>)
            : null
    )
}
//초기 state
const initialState = {
    "albumInfo": [
    ],
    "stoneList": [],
    "isLike": false
};

//여기부터 styled
const Body = styled.div`
box-sizing: border-box;
height: 100%;
font-family: Impact, Charcoal, sans-serif;
`;

const AlbumContainer = styled.article`
width : 1100px;
height : 400px;
display: flex;
align-items: center;
margin: 0 auto;
border-bottom: 2px solid #303030;
`;

const StoneContainer = styled.div`
width : 1100px;
height: 400px;
margin: 0 auto;
display flex;
`;

const ImgWrapper = styled.div`
width: 300px;
height: 300px; 
margin: 50px;
overflow: hidden;
`;

const InfoWrapper = styled.div`
width : 750px;
height: 350px;
margin: 25px;
display: flex;
flex-direction: column;
overflow: scroll;
`;


const Img = styled.img`
width: 100%;
height: 100%;
object-fit: contain;
-webkit-user-drag: none;
`;

const Title = styled.h1`
font-size: 2.5rem;
margin: 0 auto;
`;
const InfoBox = styled.div`
width: 100%;
height: 100%;
display: flex;
overflow: hidden;
`;

const Info = styled.div`
max-width: 250px;
width: 100%;
height: 100%;
margin: 30px 0 0;
font-weight: 500;
`;

const Like = styled.div`
font-weight: bolder;
color: #9c74ad;
cursor: pointer;
user-select: none;
div{
    display: flex;
}
span{
    margin: 0 5px;
}
`;

const Musician = styled.div`
margin : 10px 0 0;
`;

const ReleaseDate = styled.div`
`;
const Desc = styled.div`
`;

const StoneList = styled.li`
width: 100%;
height: 100%;
margin: 10px;
list-style:none;
overflow: scroll;
li {
    margin: 5px 0;
}
`;
const StoneWrapper = styled.div`
width: 100%;
display:flex;
flex-direction: column;
`;

const StoneTitle = styled.div`
width: 100%;
height: 40px;
margin: 0 auto;
h2{
    font-size: 1.5rem;
    text-align: center;
}
`;

const StoneInfo = styled.div`
width: 100%;
height: 100%;
margin: 20px 50px;
overflow: scroll;

`;