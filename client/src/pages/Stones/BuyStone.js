import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import BuyStoneCard from '../../components/BuyStoneCard';
import SearchIcon from "@mui/icons-material/Search";
import { useInView } from "react-intersection-observer";
import { loadStoneList, resetStoneList } from '../../actions';


//아직 서버데이터 없어서 임의로 만든 dummyData
import dummyData from "../../dummyData/dummyData";

export function BuyStone() {
    const [loading, setLoading] = useState(true);
    //불러오는 시작 Idx
    const [startIdx, setStartIdx] = useState(0);

    const [ref, inView] = useInView();

    const stoneList = useSelector((state) => state.buyStoneReducer);
    const dispatch = useDispatch();

    const loadStones = () => {
        setLoading(true);
        //여기는 dummyData 로딩부분
        const tempArr = [];
        for (let i = startIdx;
            i < (dummyData.buyStone.length > startIdx + 20 ? startIdx + 20 : dummyData.buyStone.length);
            i++) {
            tempArr.push(dummyData.buyStone[i]);
        }
        dispatch(loadStoneList(tempArr, startIdx));

        setStartIdx(startIdx + 20);
        setLoading(false);
    }
    const showStones = () => {
        return (stoneList.stones.map((stone, idx) => {
            return <BuyStoneCard stone={stone} />
        }))
    }


    useEffect(() => {
        //현재 dummyData사용 추후 서버데이터로 변경
        setStartIdx(stoneList.startIdx);
        //추후에 서버랑 통신되면 받아온 개수로 변경
        setLoading(false);
    }, []);

    useEffect(() => {
        // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
        if (inView && !loading) {
            loadStones();
        }
    }, [inView, loading])

    return (
        <Body>
            <StoneContainer>
                <Nav>
                    <Title><h1>Collect Your Stones</h1></Title>
                    <Notify>*가격변동률은 전일의 평균 거래가 기준으로 산출됩니다. </Notify>
                    <SearchWrap>
                        <SearchInput type="text" placeholder="찾는 음원이나 뮤지션을 검색해 주세요." />
                        <SearchButton onClick={() => console.log(stoneList)}>
                            <SearchIcon />
                        </SearchButton>
                    </SearchWrap>
                </Nav>
                <StonesWrapper>
                    {showStones()}
                </StonesWrapper>
            </StoneContainer>
            <div id="observer" ref={ref}> </div>
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
