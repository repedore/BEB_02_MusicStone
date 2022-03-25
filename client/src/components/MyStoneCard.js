import React from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";


const MyStoneCard = ({ stone, handleSellBtn }) => {

    return (
        <CardContainer>
            <Balance>보유 : {stone.balance}</Balance>

            <Link to={`/stones/tradeStone/${stone.id}`} style={{ textDecoration: "none" }} cursor="pointer">
                <Img src={stone.img} />
                <Name>{stone.name}</Name>
                <Musician>{stone.musician_name}</Musician>
            </Link>
            <TradeBox>
                <TradeBtn onClick={() => handleSellBtn(stone)}>판매</TradeBtn>
            </TradeBox>
        </CardContainer>

    );
}

export default MyStoneCard;

const CardContainer = styled.div`
    margin: 20px;
    width: 200px;
    height: 300px;
    font-family: "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
    `;
const Img = styled.img`
width: 200px;
height: 200px;
-webkit-user-drag: none;
transition:all .2s ease-in-out;
-webkit-transition:all .2s ease-in-out;
-moz-transition:all .2s ease-in-out;
-ms-transition:all .2s ease-in-out;
-o-transition:all .2s ease-in-out;
&:hover
{
transform:scale(1.1);
-webkit-transform:scale(1.1);
-moz-transform:scale(1.1);
-ms-transform:scale(1.1);
-o-transform:scale(1.1)
}
`;
const Name = styled.h5`
margin: 0 auto;
text-align: center;
`;
const Musician = styled.h4`
margin: 0 auto;
text-align: center;
`;
const TradeBox = styled.div`
height: 50px;
display:flex;
flex-direction: column;
`;
const Balance = styled.span`
font-size: 0.7rem;
`;
const TradeBtn = styled.button`
width: 100px;
margin: 0 auto;
cursor: pointer;
`;