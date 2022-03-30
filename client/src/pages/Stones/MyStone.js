import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from 'axios';
import { Link } from "react-router-dom";
import styled from "styled-components";
import MyStoneCard from '../../components/Stones/MyStoneCard';
import MyStoneModal from '../../components/Stones/MyStoneModal';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

//아직 서버데이터 없어서 임의로 만든 dummyData
import dummyData from "../../dummyData/dummyData";

export function MyStone() {
  /*
  stones : 내가 보유한 stone정보
  modalOpen : 판매 modal창 open 여부
  modalStone : 현재 열린 modal창의 stone 정보
  klayPrice : 현재 KLAY의 거래가격(빗썸기준)
  totalPages : 페이지당 8개를 보여주는 기준으로 내 보유 stone들의 페이지 수
  curPage : 현재 선택된 page
  */
  const [stones, setStones] = useState(dummyData.mystones);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStone, setModalStone] = useState("");
  const [klayPrice, setKlayPrice] = useState(0);
  const [totalPages, setTotalPages] = useState(3);
  const [curPage, setCurPage] = useState(1);


  const account = useSelector((state) => state.accountReducer);

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
    return (stones.filter((stone, idx) => (idx >= (curPage - 1) * 8) && idx < (curPage - 1) * 8 + 8).map((stone) => <MyStoneCard stone={stone} handleSellBtn={handleSellBtn} />)
    )
  }

  const pageReduce = () => {
    if (curPage > 1) {
      setCurPage(curPage - 1);
    }
  }
  const pageIncrese = () => {
    if (curPage < totalPages) {
      setCurPage(curPage + 1);
    }
  }

  const changePage = (page) => {
    setCurPage(page);
  }

  const drawPageIndex = () => {
    const result = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === curPage) {
        result.push(<span key={i} ><b> {i}</b> </span>);
      } else {
        result.push(<span key={i} onClick={() => changePage(i)}> {i} </span>);
      }
    }
    return result

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
          {dummyData.mystones.length
            ? showMyStones()
            : <div>보유한 스톤이 없습니다.</div>}
        </StonesWrapper>
        <PageSelector>
          {totalPages > 1
            ? <PagingWapper>
              <span onClick={pageReduce}><ChevronLeftIcon /></span>
              {drawPageIndex()}
              <span onClick={pageIncrese}><ChevronRightIcon /></span>
            </PagingWapper>
            : null}

        </PageSelector>
      </StoneContainer>
      <MyStoneModal modalStone={modalStone} modalOpen={modalOpen} setModalOpen={setModalOpen} klayPrice={klayPrice} account={account} />
    </Body>
  );
}




//여기부터 styled
const Body = styled.div`
height: 100%;
margin-top: 1rem;
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

const PageSelector = styled.div`
width: 980px;
margin: 10px auto;
display: flex;
justify-content: center;
`;
const PagingWapper = styled.div`
display: flex;
align-items: center;
span{
  margin: 0 5px;
  cursor: pointer;
}
`;