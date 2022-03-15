import styled from "styled-components";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AlbumCard from '../../components/AlbumCard';

//아직 서버데이터 없어서 임의로 만든 dummyData
import dummyData from "../../dummyData/dummyData";

function MusicianInfo() {
  const { id } = useParams();

  //임시 DummyData
  const MusicianData = dummyData.musicians[id];
  const AlbumData = dummyData.albums;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    //설정값보다 앨범수량이 적으면 페이지 깨져서 4미만은 변경
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
  };

  const handleSNS = (sns) => {
    const key = Object.keys(sns)[0];
    let snsSrc = "";

    switch (key) {
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
      <a href={sns[key]}>
        <img src={snsSrc} alt={key} width="30" height="30" />
      </a>
    )
  }

  return (
    <Body>
      <InfoContainer>
        <ImgWrapper>
          <Img src={MusicianData.img} alt={MusicianData.name} />
        </ImgWrapper>
        <InfoWrapper>
          <Name>{MusicianData.name}</Name>
          <SNS>
            {MusicianData.snsList
              ? MusicianData.snsList.map((sns) => handleSNS(sns))
              : null}
          </SNS>
          <DESC>{MusicianData.desc}</DESC>
        </InfoWrapper>
      </InfoContainer>
      <AlbumContainer>
        <StyledSlider {...settings}>
          {/* 나중에 데이터 어차피 받아올꺼라 지금은 그냥 다 아이유 앨범으로 해놓음 */}
          {AlbumData.map((album) => {
            return <AlbumCard album={album} />
          })}

        </StyledSlider>
      </AlbumContainer>
    </Body>
  );
}
export default MusicianInfo;

const Body = styled.div`
  box-sizing: border-box;
  color: #ffffff;
  height: 100vh;
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

const Name = styled.h1`
  font-size: 2.5rem;
  margin: 0 auto;
  `;
const SNS = styled.div`
  height : 30px;
  margin : 10px 0;
  a {
    margin : 5px;
  }
  `;
const DESC = styled.div`
  `;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  `;

const StyledSlider = styled(Slider)`
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