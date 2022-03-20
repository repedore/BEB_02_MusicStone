import React from "react";
import styled from "styled-components";
import BuyStoneCard from '../../components/BuyStoneCard';
import SearchIcon from "@mui/icons-material/Search";

//아직 서버데이터 없어서 임의로 만든 dummyData
import dummyData from "../../dummyData/dummyData";

export function BuyStone() {

    return (
        <Body>
            <StoneContainer>
                <Nav>
                    <Title><h1>Collect Your Stones</h1></Title>
                    <Notify>*가격변동률은 전일의 평균 거래가 기준으로 산출됩니다. </Notify>
                    <SearchWrap>
                        <SearchInput type="text" placeholder="찾는 음원이나 뮤지션을 검색해 주세요." />
                        <SearchButton>
                            <SearchIcon />
                        </SearchButton>
                    </SearchWrap>
                </Nav>
                <StonesWrapper>
                    {console.log(dummyData.buyStone)}
                    {showStones()}
                </StonesWrapper>
            </StoneContainer>
        </Body>
    );
}

const showStones = () => {
    return (dummyData.buyStone.map((stone, idx) => {
        return <BuyStoneCard stone={stone} />
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
const Nav = styled.div`
display: flex;
flex-direction: column;
width: 980px;
margin: 0 auto;
`;
const Title = styled.div`
margin: 0 auto;
`;
const Notify = styled.span`
font-size: 0.8rem;
`;
const SearchWrap = styled.div`
position: relative;
display: flex;
justify-content: flex-end;
`;

const SearchInput = styled.input`
width: 300px;
border: 3px solid #848cb5;
border-right: none;
padding: 5px;
height: 20px;
border-radius: 10px 0 0 10px;
outline: none;
color: #6b6b84;
&:focus {
color: #3b3b54;
}
`;
const SearchButton = styled.button`
  width: 40px;
  height: 36px;
  border: 1px solid #848cb5;
  background: #848cb5;
  text-align: center;
  color: #fff;
  border-radius: 0 10px 10px 0;
  cursor: pointer;
  font-size: 20px;
`;
const StonesWrapper = styled.div`
width: 980px;
margin: 0 auto;
display: flex;
flex-wrap: wrap;
justify-content: space-around;
`;
