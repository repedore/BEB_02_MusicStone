import styled from "styled-components";
import React from "react"
const SellStone = ({ trade, klayPrice, handleBuyBtn }) => {

    const calPrice = () => (trade.unitPrice * klayPrice).toFixed(0);
    const showUser = () => {
        //user명이 있는 경우 보여주기
        return trade.seller;
    }
    return (
        <Trade>
            <span>{trade.unitPrice}</span>
            <span>₩ {calPrice()}</span>
            <span>{trade.quantity}</span>
            <span>{showUser()}</span>
            <ButtonBox>
                <button onClick={() => handleBuyBtn(trade)}>구매</button>
            </ButtonBox>
        </Trade>

    );
}

export default SellStone;

const Trade = styled.li`        
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span{
        width: 100%;
    text-align: center;
        overflow: hidden;
        white-space:nowrap;
        text-overflow:ellipsis
    }
    div{
        width:100%;
    }
    &:hover{
        background-color:#222222;
    }
`;
const ButtonBox = styled.div`
text-align: center;
button{
    cursor: pointer;0
}
`;