import { Link } from "react-router-dom";
import styled from "styled-components";
import React from "react";

const MusicianCard = ({ musician }) => {
  return (
    <Link to={`/musician/${musician.id}`} style={{ textDecoration: "none" }}>
      <CardContainer>
        <ImgBox>
          <MusicianImg src={musician.img} alt={musician.name} />
        </ImgBox>
        <MusicianName>{musician.name}</MusicianName>
      </CardContainer>
    </Link>
  );
};

export default MusicianCard;

const CardContainer = styled.a`
  margin: 30px 20px;
  width: 200px;
  height: 250px;
  cursor: pointer;
`;
const ImgBox = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 70%;
  overflow: hidden;
  -webkit-user-drag: none;
`;
const MusicianImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  -webkit-user-drag: none;
  &:hover{
transition:all 0.6s ease-in-out;
-webkit-transition:all 0.6s ease-in-out;
-moz-transition:all 0.6s ease-in-out;
-ms-transition:all 0.6s ease-in-out;
-o-transition:all 0.6s ease-in-out;
  }
`;

const MusicianName = styled.h3`
  text-align: center;
`;
