import styled from "styled-components";
import MusicianCard from "../../components/MusicianCard";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useSelector, useDispatch } from "react-redux";
import { loadMusicianList, resetMusicianList } from '../../actions';

//아직 서버데이터 없어서 임의로 만든 dummyData
import dummyData from "../../dummyData/dummyData";

export function Musician() {
  const [loading, setLoading] = useState(true);
  //불러오는 시작 Idx
  const [startIdx, setStartIdx] = useState(0);

  const [ref, inView] = useInView();

  const musicianList = useSelector((state) => state.musicianReducer);
  const dispatch = useDispatch();

  const loadMusicians = () => {
    setLoading(true);
    //여기는 dummyData 로딩부분
    const tempArr = [];
    for (let i = startIdx;
      i < (dummyData.musicians.length > startIdx + 20 ? startIdx + 20 : dummyData.musicians.length);
      i++) {
      tempArr.push(dummyData.musicians[i]);
    }
    dispatch(loadMusicianList(tempArr, startIdx));

    setStartIdx(startIdx + 20);
    setLoading(false);
  }

  useEffect(() => {
    //현재 dummyData사용 추후 서버데이터로 변경
    setStartIdx(musicianList.startIdx);
    //추후에 서버랑 통신되면 받아온 개수로 변경
    setLoading(false);
  }, []);
  // 로딩중이 아닐 때 사용자가 마지막 요소를 보면 추가 로드
  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView && !loading) {
      loadMusicians();
    }
  }, [inView, loading])

  return (
    <Body>
      <Nav>
        <h1>Find your Musician</h1>
        <SearchWrap>
          <SearchInput type="text" placeholder="찾는 뮤지션을 검색해 주세요." />
          <SearchButton onClick={() => console.log(startIdx)}>
            <SearchIcon />
          </SearchButton>
        </SearchWrap>
      </Nav>
      <CardsWrap >
        {musicianList.musicians.map((musician, idx) => {
          return <MusicianCard key={musician} musician={musician} />;
        })}
      </CardsWrap>
      <div id="observer" ref={ref}> </div>
    </Body>
  );
}

//여기부터 styled
const Body = styled.div`
  box-sizing: border-box;
  height: 100%;
  font-family: Impact, Charcoal, sans-serif;
`;

const Nav = styled.nav`
  margin: 25px auto;
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
