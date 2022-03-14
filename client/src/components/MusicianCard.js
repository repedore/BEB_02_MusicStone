import styled from "styled-components";

const MusicianCard = ({ musician }) => {
    const CardContainer = styled.div`
    margin: 20px;
    width: 200px;
    height: 250px;
    `;
    const ImgBox = styled.div`
        width: 200px;
        height: 200px; 
        border-radius: 70%;
        overflow: hidden;
    `;
    const MusicianImg = styled.img`
        width: 100%;
        height: 100%;
        object-fit: cover;
    `;

    const MusicianName = styled.h3`
    text-align: center
    `;

    return (
        <CardContainer>
            <ImgBox>
                <MusicianImg src={musician.img} />
            </ImgBox>
            <MusicianName>{musician.name}</MusicianName>
        </CardContainer>
    );
}

export default MusicianCard;