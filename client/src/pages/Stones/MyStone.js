import React from "react";
import styled from "styled-components";
import MyStoneCard from '../../components/MyStoneCard';

//아직 서버데이터 없어서 임의로 만든 dummyData
import dummyData from "../../dummyData/dummyData";

export function MyStone() {

  return (
    <Body>
      <StoneContainer>
        <Title><h1>My Stones</h1></Title>
        <StonesWrapper>
          {console.log(dummyData.mystones)}
          {showMyStones()}
        </StonesWrapper>
      </StoneContainer>
    </Body>
  );
}

const showMyStones = () => {
  return (dummyData.mystones.map((stone, idx) => {
    return <MyStoneCard stone={stone} />
  }))
}


//여기부터 styled
const Body = styled.div`
height: 100%;
margin-top: 2rem;
`;

const StoneContainer = styled.div`
display:flex;
flex-direction: column;
margin: 0 auto;
`;

const Title = styled.div`
margin: 0 auto;
`;

const StonesWrapper = styled.div`
width: 980px;
margin: 0 auto;
display: flex;
flex-wrap: wrap;
justify-content: space-around;
`;
