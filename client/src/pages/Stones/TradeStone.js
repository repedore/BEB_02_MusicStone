import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SellStone from '../../components/SellStone';
import TradeStoneModal from '../../components/TradeStoneModal';
//아직 서버데이터 없어서 임의로 만든 dummyData
import dummyData from "../../dummyData/dummyData";

export function TradeStone() {
    const { id } = useParams();
    const [klayPrice, setKlayPrice] = useState(0);
    const [isPlay, setIsPlay] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTrade, setModalTrade] = useState("");
    //dummyData
    const StoneData = dummyData.tradeStone.filter((el) => el.id === parseInt(id))[0];

    useEffect(() => {
        const apiUrl = `https://api.bithumb.com/public/ticker/KLAY_KRW`
        axios.get(apiUrl)
            .then(price => setKlayPrice(price.data.data.closing_price))
    }, []);

    const showSellList = () => {
        return (StoneData.sellList.map((trade) => {
            return <SellStone trade={trade} klayPrice={klayPrice} handleBuyBtn={handleBuyBtn} />
        }))
    }
    const showPriceDif = () => {
        const priceDif = (StoneData.minPrice - StoneData.prevPrice).toFixed(2)
        const difPercent = (((StoneData.minPrice / StoneData.prevPrice) - 1) * 100).toFixed(2);
        return (
            <PriceDif color={priceDif > 0 ? "#e81a46" : "#00a1ff"} >
                {priceDif > 0 ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                {`${priceDif} (${difPercent}%)`}
            </PriceDif>)
    }
    const handleBuyBtn = (trade) => {
        setModalTrade(trade);
        setModalOpen(true);
    }
    const handlePlayBtn = () => {
        setIsPlay(!isPlay);
    }
    return (
        <Body>
            {console.log(StoneData)}
            <StoneContainer>
                <StreamingWrapper>
                    <Play>
                        <ImgBox>
                            <Img src={StoneData.img} alt={StoneData.name} animation={isPlay ? "rotate_image 10s linear infinite" : ""} />
                        </ImgBox>
                        <BtnWrapper>
                            <StreamingBtn onClick={() => handlePlayBtn()}>{isPlay ? <PauseIcon /> : <PlayArrowIcon />}</StreamingBtn>
                        </BtnWrapper>
                    </Play>
                    <Timer>나중에 시간 카운트 0:43 / 3:10</Timer>
                </StreamingWrapper>
                <StoneWrapper>
                    <Title>
                        {StoneData.name} - {StoneData.musician_name}
                    </Title>
                    <Info>
                        <Price>
                            <div>최저가 : {StoneData.sellList[0].unitPrice} KLAY</div>
                            <div>전일비 : {showPriceDif()}</div>
                        </Price>
                        <Lyricist>작사가 : {StoneData.lyricist}</Lyricist>
                        <Composer>작곡가 : {StoneData.composer}</Composer>
                        <Desc>
                            {StoneData.desc}
                        </Desc>
                    </Info>
                </StoneWrapper>
            </StoneContainer>
            <TradeContainer>
                <SellListWrapper>
                    <SellNav>
                        <span>가격(Klay)</span><span>가격(원)</span><span>수량</span><span>판매자</span><span>구매</span>
                    </SellNav>
                    <SellList >
                        {showSellList()}
                    </SellList>
                </SellListWrapper>
                <NotifyWrapper>
                    {showRules()}
                </NotifyWrapper>
            </TradeContainer>
            <TradeStoneModal klayPrice={klayPrice} stoneData={StoneData} modalOpen={modalOpen} modalTrade={modalTrade} setModalOpen={setModalOpen} />
        </Body>
    );
}
const showRules = () => {
    return (
        <RulesWrapper>
            <h3> 유의사항</h3>
            <div>
                거래 수수료는 구매 및 판매금액의 1 주당 1.2%(상한 1 주당 300캐쉬 / 소수점 이하 절사) 입니다.</div>
            <div>
                ※ 단, 5 주 이상 구매 주문 시, 거래 수수료가 1.0% (상한 1주당 250캐쉬 / 소수점 이하 절사)로 감면됩니다.
            </div>
            <div>
                구매 주문 시, 구매하신 가격 대비 과거 1년 수익률을 반드시 확인 바랍니다.
            </div>
            <div>
                구매체결 시 수수료를 포함한 결제 금액이 '내 지갑'에서 자동으로 결제됩니다.
            </div>
            <div>
                판매체결 시 수수료를 제외한 판매 금액이 '내 지갑'에 합산됩니다.
            </div>
            <div>
                구매주문금액 전체가 대기금으로 설정되며, 주문취소 시 해제됩니다.
            </div>
            <div>
                과거 저작권료 수익률은 구매가 대비 과거 1년 저작권료입니다. 1년 미만의 자료만 존재할 경우, 연으로 환산됩니다.
            </div>
            <div>
                거래단위 당 판매 차익이 5만원 이하일 경우, 원천징수세액이 없습니다(분리과세). 상세내용은'자주 묻는 질문' 참고바랍니다
            </div>
            <div>
                구매결정은 온전히 회원의 판단으로 이뤄졌으며, 뮤직스톤은 어떠한 경우에도 미래의 저작권료 및 저작권료 참여청구권의 판매 성사여부를 보장하거나 책임지지 않습니다.
            </div>
        </RulesWrapper>
    )
}

const Body = styled.div`
box-sizing: border-box;
height: 100%;
font-family: Impact, Charcoal, sans-serif;
`;
const StoneContainer = styled.div`
width : 1100px;
height : 400px;
display: flex;
align-items: center;
margin: 0 auto;
border-bottom: 2px solid #303030;
`;
const TradeContainer = styled.div`
width : 1100px;
height: 350px;
margin: 0 auto;
display flex;
`;
const StreamingWrapper = styled.div`
width: 100%;
height: 100%;
display:flex;
flex-direction: column;
`;
const Play = styled.div`
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
`
const ImgBox = styled.div`
margin: 50px;
height: 300px;
width: 300px;
position:absolute;
border-radius: 70%;
overflow: hidden;
`;
const Timer = styled.div`
color: #ABABAB;
height: 50px;
text-align: center;
`;
const BtnWrapper = styled.div`
position:absolute;
`;
const StreamingBtn = styled.button`
background-color:#333333;
width: 60px;
height: 60px;
border-radius: 30px 30px 30px 30px;
cursor: pointer;
color: white;
`;
const Img = styled.img`
width: 300px;
height: 300px;
-webkit-user-drag: none;
animation: ${({ animation }) => animation};
transform-origin: 50% 50%;
`
const StoneWrapper = styled.div`
height: 100%;
width: 100%;
display:flex;
flex-direction: column;
overflow: scroll;
`;
const Title = styled.h2`
margin: 10px auto;
`;
const Info = styled.div`
`;
const Price = styled.div`
div{
    font-weight: 500;
    display:flex;
}
`;
const PriceDif = styled.span`
display:flex;
color: ${({ color }) => color};
`;
const Composer = styled.div`
`;
const Lyricist = styled.div`
`;
const Desc = styled.div`
margin-top: 20px;
`;
const SellListWrapper = styled.div`
width: 55%;
overflow: hidden;
display: flex;
flex-direction: column;
`;
const SellNav = styled.div`
margin: 15px 30px 0;
display: flex;
justify-content: space-between;
align-items: center;
span{
    text-align: center;
    width: 100%;
}
`;
const SellList = styled.li`
margin: 10px;
list-style:none;
overflow: scroll;
li {
    margin: 5px 20px;
}
`;
const NotifyWrapper = styled.div`
width: 45%;
`;
const RulesWrapper = styled.div`
h3{
    text-align: center;
}
div{
    margin: 2px auto;
    font-size: 0.8rem;
}
`;