import React, { useState } from "react"
import styled from "styled-components";


const MyStoneModal = ({ modalStone, klayPrice, modalOpen, setModalOpen }) => {
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const handleClose = () => {
        setQuantity(0);
        setPrice(0);
        setModalOpen(false);
    }
    const handleQuantityInput = (e) => {
        switch (e.target.id) {
            case "price":
                setPrice(e.target.value);
                break;
            case "quantity":
                if (Number(e.target.value) > modalStone.balance) {
                    alert(`현재 보유한 수량은 ${modalStone.balance}개 입니다.`);
                } else {
                    setQuantity(e.target.value)
                }
                break;
            default:
                break;
        }
    }
    const handleSell = () => {
        console.log('판매!')
    }
    return (
        <ModalOverlay display={modalOpen ? "flex" : "none"}  >
            {console.log(modalStone)}
            <ModalWindow>
                <Head>
                    <Close onClick={() => handleClose()}>
                        <span>X</span>
                    </Close>
                </Head>
                <Content>
                    <Nav>
                        <Item>음원</Item>
                        <PriceQuantity>수량</PriceQuantity>
                        <PriceQuantity>가격(KLAY)</PriceQuantity>
                    </Nav>
                    <Cart>
                        <Receipt>
                            <Item>{modalStone.name} - {modalStone.musician_name}</Item>
                            <InputWrapper>
                                <QuantityInput id="quantity" type="number" min="0" value={quantity} onChange={(e) => handleQuantityInput(e)} />
                            </InputWrapper>
                            <InputWrapper>
                                <PriceInput id="price" type="number" min="0" value={price} onChange={(e) => handleQuantityInput(e)} />
                            </InputWrapper>
                        </Receipt>
                        <Total>
                            <div><h3>Total</h3></div>
                            <TotalPrice>
                                <div>{(price * quantity).toFixed(3)} KLAY</div>
                                <div>{(klayPrice * price * quantity).toFixed(0)} 원</div>
                            </TotalPrice>
                        </Total>
                    </Cart>
                    <BtnBox>
                        <BuyBtn onClick={() => handleSell()}>판매 등록</BuyBtn>
                    </BtnBox>
                </Content>
            </ModalWindow>
        </ModalOverlay >
    )
}

export default MyStoneModal;

const ModalOverlay = styled.div`
width: 100%;
height: 100%;
position: absolute;
left: 0;
top: 0;
display:${({ display }) => display};;
flex-direction: column;
align-items: center;
justify-content: center;
box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
backdrop-filter: blur(1.5px);
`;
const ModalWindow = styled.div`
background: #333333;
box-shadow: 0 8px 32px 0 #222222;
backdrop-filter: blur( 13.5px );
-webkit-backdrop-filter: blur( 13.5px );
border-radius: 10px;
border: 1px solid rgba( 255, 255, 255, 0.18 );

width: 450px;
height: 300px;
position: relative;
top: -100px;
padding: 10px;
`;
const Head = styled.div`
width: 100%;
height: 20px;
display:flex;
flex-direction:column;

`;
const Close = styled.div`
span{
    cursor: pointer;
    display: inline;
    float: right;
    padding-right: 10px;
    text-shadow: 1px 1px 2px gray;
}   
`;
const Content = styled.div`
width: 100%;
height: 280px;
display:flex;
flex-direction: column;
`;
const Nav = styled.div`
height: 50px;
border-bottom: 0.5px solid #808080;
display:flex;
span{
    margin: 0 5px;
    text-align:center;
    line-height: 50px;
}
`;
const Item = styled.span`
width:240px;
`;
const PriceQuantity = styled.span`
width: 90px;
`;
const Cart = styled.div`
height: 150px;
border-bottom: 0.5px solid #808080;
display:flex;
flex-direction: column;
div{
    height:75px;
}
`;
const Receipt = styled.div`
display:flex;
span{
    margin: 0 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    line-height: 75px;
}
`;
const InputWrapper = styled.span`
width: 90px;
margin: 0 5px;
display:flex;
align-items: center;
`;
const QuantityInput = styled.input`
width: 80%;
height: 25px;
margin: 0 10px;
padding: 0 5px;
text-align:right;
`;
const PriceInput = styled(QuantityInput)`
-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;  
}
-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
`;
const Total = styled.div`
display:flex;
div{
    width:100%;
}
h3{
    padding: 0 20px;
}
`;
const TotalPrice = styled.div`
display:flex;
flex-direction:column;
div{
    padding-left: 50px;
}
`;
const BtnBox = styled.div`
width: 100%;
height: 80px;
display:flex;
justify-content:center;
align-items: center;
`
const BuyBtn = styled.button`
width: 200px;
height: 50px;
cursor:pointer;
border-radius: 10px;
`;