import { Link } from "react-router-dom";
import styled from "styled-components";

const AlbumCard = ({ album }) => {
    const imgSrc = `../img/Album/${album.id}.jpeg`;

    return (
        <CardContainer>
            {console.log(album)}
            <Img src={imgSrc} />
            <Name>{album.name}</Name>
        </CardContainer>
    );
}

export default AlbumCard;

const CardContainer = styled.div`
    margin: 20px;
    width: 200px;
    height: 250px;
    cursor: pointer;
    font-family: "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
    `;
const Img = styled.img`
width: 200px;
height: 200px;
`;

const Name = styled.h3`
margin: 5 auto;
text-align: center;
`;