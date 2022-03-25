import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import styled from "styled-components";
import MyStoneCard from '../../components/MyStoneCard';
import MyStoneModal from '../../components/MyStoneModal';

//아직 서버데이터 없어서 임의로 만든 dummyData
import dummyData from "../../dummyData/dummyData";

export function MyStone() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStone, setModalStone] = useState("");
  const [klayPrice, setKlayPrice] = useState(0);

  const handleSellBtn = (stone) => {
    setModalOpen(true);
    setModalStone(stone);
  }

  useEffect(() => {
    const apiUrl = `https://api.bithumb.com/public/ticker/KLAY_KRW`
    axios.get(apiUrl)
      .then(price => setKlayPrice(price.data.data.closing_price))
  }, []);

  const showMyStones = () => {
    return (dummyData.mystones.map((stone, idx) => {
      return <MyStoneCard stone={stone} handleSellBtn={handleSellBtn} />
    }))
  }

  return (
    <Body>
      <StoneContainer>
        <Header>
          <Title><h1>My Stones</h1></Title>
          <RegisterStone>
            <Link to="/stones/register" style={{ textDecoration: "none" }}>
              <button> 스톤 등록 </button>
            </Link>
          </RegisterStone>
        </Header>
        <StonesWrapper>
          {console.log(dummyData.mystones)}
          {dummyData.mystones.length
            ? showMyStones()
            : <div>보유한 스톤이 없습니다.</div>}
        </StonesWrapper>
      </StoneContainer>
      <MyStoneModal modalStone={modalStone} modalOpen={modalOpen} setModalOpen={setModalOpen} klayPrice={klayPrice} />
    </Body>
  );
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
const Header = styled.div`
width: 980px;
margin: 0 auto 20px;
display:flex;
flex-direction:column;
align-items: center;
`;
const Title = styled.div`
`;
const RegisterStone = styled.div`
width: 100%;
display:flex;
justify-content: right;
padding-right: 130px;
button{
  cursor: pointer;
  padding: 0.5rem 2rem;
  border: 0;
  border-radius: 12px;
  background-color: white;
  color: black;
}
`;
const StonesWrapper = styled.div`
width: 980px;
margin: 0 auto;
display: flex;
flex-wrap: wrap;
justify-content: space-around;
`;
