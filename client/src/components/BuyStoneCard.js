import React from 'react';
import { Link } from "react-router-dom";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import styled from "styled-components";


const BuyStoneCard = ({ stone }) => {

    return (
        <Link to={`/stones/tradeStone/${stone.id}`} style={{ textDecoration: "none" }}>
            <CardContainer>
                <Balance>
                    {stone.myBalance ? `보유 : ${stone.myBalance}` : " "}
                </Balance>
                <Img src={stone.img} />
                <Name>{stone.name}</Name>
                <Musician>{stone.musician_name}</Musician>
                <TradeBox>
                    <Price>{stone.minPrice} klay</Price>
                    <PriceDif color={stone.priceDif > 0 ? "#e81a46" : "#00a1ff"}>
                        {stone.priceDif > 0 ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                        {stone.priceDif} %
                    </PriceDif>
                </TradeBox>
            </CardContainer>
        </Link>
    );
}

export default BuyStoneCard;

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
display:flex;
span {
width: 100%;
text-align: center;
}
`;
const Balance = styled.div`
margin: 5px auto 5px;
color: #FFA556;
font-weight: 500;
white-space: pre;
`;
const Price = styled.span`
`;
const PriceDif = styled.span`
display:flex;
justify-content: center;
color: ${({ color }) => color};
`;