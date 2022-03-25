import React from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";


const MyStoneCard = ({ stone }) => {

    return (
        <CardContainer>
            <Img src={stone.img} />
            <Name>{stone.name}</Name>
            <Musician>{stone.musician_name}</Musician>
            <TradeBox>
                <Balance>보유 : {stone.balance}</Balance>
                <Price>{stone.price} klay</Price>
                <TradeBtn>거래</TradeBtn>
            </TradeBox>
        </CardContainer>
    );
}

export default MyStoneCard;

const CardContainer = styled.div`
    margin: 20px;
    width: 200px;
    height: 300px;
    cursor: pointer;
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
`;
const Balance = styled.span`
margin: 10px auto;
`;
const Price = styled.span`
margin: 10px auto;
`;
const TradeBtn = styled.button`
margin: 10px auto;
`;