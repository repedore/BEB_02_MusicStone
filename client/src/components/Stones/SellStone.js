import styled from "styled-components";
import React from "react"
const SellStone = ({ trade, klayPrice, handleBuyBtn }) => {

    const calPrice = () => (trade.price * klayPrice).toFixed(0);

    //현재 user에 대한 정보가 id값만 넘어와서 그거 보여줌
    const showUser = () => {
        return trade.sell_user_id;
    }
    return (
        <Trade>
            <span>{trade.price}</span>
            <span>₩ {calPrice()}</span>
            <span>{trade.amount}</span>
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