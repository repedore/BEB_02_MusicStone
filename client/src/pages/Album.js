import { useParams } from "react-router-dom";
import React, { useState } from "react"
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import styled from 'styled-components';
import AlbumStone from '../components/AlbumStone';

//아직 서버데이터 없어서 임의로 만든 dummyData
import dummyData from "../dummyData/dummyData";

const Album = () => {
    const { id } = useParams();
    const AlbumData = dummyData.albums[id];
    const [isLike, setIsLike] = useState(false);
    const [selectNum, setSelectNum] = useState(0);

    const handleLikeBtn = (type, id) => {
        setIsLike(!isLike);
    }
    const handleStoneClick = (idx) => {
        setSelectNum(idx);
    }

    const showlike = () => {
        return (isLike
            ? <div>
                <FavoriteIcon /><span>좋아요 {AlbumData.like + 1}</span>
            </div>

            : <div>
                <FavoriteBorderIcon /><span>좋아요 {AlbumData.like}</span>
            </div>)
    }

    const showStones = () => {
        return (AlbumData.stones.map((stone, idx) => {
            return <AlbumStone key={idx} stone={stone} selectNum={selectNum} idx={idx} handleStoneClick={handleStoneClick} />
        }))
    }

    return (
        <Body>
            <AlbumContainer>
                <ImgWrapper>
                    <Img src={AlbumData.img} alt={AlbumData.name} />
                </ImgWrapper>
                <InfoWrapper>
                    <Title>{AlbumData.name}</Title>
                    <InfoBox>
                        <Info>
                            <Like onClick={() => handleLikeBtn()}>
                                {showlike()}
                            </Like>
                            <Musician>뮤지션 : {AlbumData.musicianName}</Musician>
                            <ReleaseDate>발매일 : {AlbumData.releaseDate}</ReleaseDate>
                            <TitleSong>타이틀곡 : {AlbumData.titleSong}</TitleSong>
                        </Info>
                        <StoneList>
                            {showStones()}
                        </StoneList>
                    </InfoBox>
                </InfoWrapper>
            </AlbumContainer>
            <StoneContainer>
                <StreamingWrapper>
                    <Streaming src={AlbumData.stones[selectNum].url} />
                    <Memo>(Streaming 공간 임시로 유튜브로 대체)</Memo>
                </StreamingWrapper>
                <StoneWrapper>
                    <StoneTitle>
                        <h2>{AlbumData.stones[selectNum].name}</h2>
                    </StoneTitle>
                    <StoneInfo>
                        <div>작사 : Dummy</div>
                        <div>작사 : Dummy</div>
                        <div>장르 : Dummy</div>
                        <div>가사 : 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 일단은 복붙 </div>
                    </StoneInfo>
                </StoneWrapper>
            </StoneContainer>
        </Body>
    )
}

export default Album;


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
height: 300px;
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
const TitleSong = styled.div`
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

const StreamingWrapper = styled.div`
width: 100%;
height: 100%;
`;

const Memo = styled.div`
text-align: center;
`;

const Streaming = styled.iframe`
width: 100%;
height: 100%;
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