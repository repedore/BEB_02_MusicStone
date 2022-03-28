import styled from "styled-components";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react"
import axios from "axios";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AlbumCard from '../../components/AlbumCard';

export function MusicianInfo() {
  const { id } = useParams();
  const server = process.env.REACT_APP_SERVER_ADDRESS || "http://127.0.0.1:12367";

  const [isLike, setIsLike] = useState(false);
  const [musicianData, setMusicianData] = useState(initialState);
  const musicianInfo = musicianData.musicianInfo[0];
  const albumInfo = musicianData.albumInfo;


  //Slider 설정
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    //설정값보다 앨범수량이 적으면 페이지 깨져서 4미만은 변경
    slidesToShow: albumInfo.length >= 4 ? 4 : albumInfo.length,
    slidesToScroll: 1,
    centerPadding: '0px',
  };

  const handleLikeBtn = () => {

    axios.post(`${server}/musician/${id}`, {
      "userId": 1,
      "isLike": isLike
    })
      .then((res) => setIsLike(!isLike))
  }

  const showSNS = () => {
    return (musicianInfo.snsList
      ? musicianInfo.snsList.map((sns) => handleSNS(sns))
      : null)
  }

  const showLike = () => {
    return (isLike
      ? <div>
        <FavoriteIcon /><span>좋아요 {musicianInfo.like.length}</span>
      </div>

      : <div>
        <FavoriteBorderIcon /><span>좋아요 {musicianInfo.like.length}</span>
      </div>)
  }
  const showMusicianName = () => {
    const korName = musicianInfo.name_korea;
    const engName = musicianInfo.name_english;
    if (korName && engName) {
      return `${korName} (${engName})`
    } else if (korName) {
      return korName
    } else {
      return engName
    }

  }

  useEffect(() => {
    //현재 userId값 어딨는지 몰라서 임의로 임시값 넣어놓음
    const tempUserId = 1;
    const req = `${server}/musician/${id}?userId=${tempUserId}`

    axios.get(req)
      .then((res) => {
        setMusicianData(res.data.data);
      })
  }, [isLike])

  useEffect(() => {
    setIsLike(musicianData.isLike)
  }, [musicianData])

  return (
    musicianInfo
      ? (
        <Body>
          <InfoContainer>
            <ImgWrapper>
              <Img src={musicianInfo.image} alt={showMusicianName()} />
            </ImgWrapper>
            <InfoWrapper>
              <Name>{showMusicianName()}</Name>
              <SNSandLike>
                <SNS>
                  {showSNS()}
                </SNS>
                <Like onClick={() => handleLikeBtn()}>
                  {showLike()}
                </Like>
              </SNSandLike>
              <DESC>{musicianInfo.description}</DESC>
            </InfoWrapper>
          </InfoContainer>
          <AlbumContainer>
            <StyledSlider {...settings}>
              {/* 나중에 데이터 어차피 받아올꺼라 지금은 그냥 다 아이유 앨범으로 해놓음 */}
              {albumInfo
                ?
                albumInfo.map((album) =>
                  <AlbumCard key={album.id} album={album} />
                )
                : null}
            </StyledSlider>
          </AlbumContainer>
        </Body >
      )
      : null
  );
}
//초기 state
const initialState = {
  "musicianInfo": [
  ],
  "albumInfo": [],
  "isLike": false
};

//SNS 구분 함수
const handleSNS = (sns) => {
  let snsSrc = "";

  switch (sns.type) {
    case "youtube":
      snsSrc = "../img/SNSIcon/youtube.png";
      break;
    case "facebook":
      snsSrc = "../img/SNSIcon/facebook.png";
      break;
    case "twitter":
      snsSrc = "../img/SNSIcon/twitter.png";
      break;
    case "instagram":
      snsSrc = "../img/SNSIcon/instagram.png";
      break;
    case "homepage":
      snsSrc = "../img/SNSIcon/homepage.png";
      break;
    case "tiktok":
      snsSrc = "../img/SNSIcon/tiktok.png";
      break;
    default:
      break;
  }
  return (
    <a href={sns.url}>
      <img src={snsSrc} alt={sns.type} width="30" height="30" />
    </a>
  )
}

//여기부터 styled
const Body = styled.div`
  box-sizing: border-box;
  height: 100%;
  font-family: Impact, Charcoal, sans-serif;
  `;

const InfoContainer = styled.article`
  width : 1100px;
  height : 400px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  border-bottom: 2px solid #303030;
  `;
const AlbumContainer = styled.section`
  width : 1100px;
  margin: 0 auto;
  `;

const ImgWrapper = styled.div`
  width: 300px;
  height: 300px; 
  margin: 50px;
  border-radius: 10%;
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
    object-fit: cover;
    -webkit-user-drag: none;
    `;

const Name = styled.h1`
  font-size: 2.5rem;
  margin: 0 auto;
  `;

const SNSandLike = styled.div`
  height : 30px;
  margin : 10px 0;  
  display: flex;
  justify-content: space-between;
  `;
const SNS = styled.span`
  user-select: none;
  a {
    margin : 5px;
  }
  `

const Like = styled.span`
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

const DESC = styled.div`
  `;


const StyledSlider = styled(Slider)`
margin: 0 auto;
.slick-dots {
  bottom : -40px;
  margin-top: 200px;
  li{
    button::before{
      color: white;
    }
  }
}

  `;