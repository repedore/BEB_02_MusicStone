import styled from "styled-components";
import MusicianCard from "../../components/MusicianCard";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

//아직 서버데이터 없어서 임의로 만든 dummyData
import dummyData from "../../dummyData/dummyData";

function Musician() {
  return (
    <Body>
      <Nav>
        <h1>Find your Musician</h1>
        <SearchWrap>
          <SearchInput type="text" placeholder="찾는 뮤지션을 검색해 주세요." />
          <SearchButton>
            <SearchIcon />
          </SearchButton>
        </SearchWrap>
      </Nav>
      <CardsWrap>
        {dummyData.musicians.map((musician) => {
          return <MusicianCard key={musician.id} musician={musician} />;
        })}
      </CardsWrap>
    </Body>
  );
}
export default Musician;

const Body = styled.div`
  box-sizing: border-box;
  color: #ffffff;
  height: 100vh;
  font-family: Impact, Charcoal, sans-serif;
`;

const Nav = styled.nav`
  margin: 0 auto 50px;
  height: 80px;
  width: 980px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const SearchWrap = styled.div`
  position: relative;
  display: flex;
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

const CardsWrap = styled.section`
  width: 980px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;
