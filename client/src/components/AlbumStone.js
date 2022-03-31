import styled from "styled-components";
import React, { useState } from "react"
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const AlbumStone = ({ stone, selectNum, idx, handleStoneClick, handleLikeBtn, isConnect }) => {
    const [isLike, setIsLike] = useState(false);

    const showlike = () => {
        return (isLike
            ? <div>
                <FavoriteIcon fontSize='small' /><span>{stone.like.length}</span>
            </div>

            : <div>
                <FavoriteBorderIcon fontSize='small' /><span>{stone.like.length}</span>
            </div>)
    }

    const handleLike = () => {
        if (isConnect) {
            setIsLike(!isLike);
            handleLikeBtn("stone", stone.id, !isLike);
        } else {
            alert("지갑을 연결해주세요.");
        }
    }


    return (
        <Stone color={idx === selectNum ? "#333333" : ""}>
            <Name onClick={() => handleStoneClick(idx)}><b>{idx + 1}.</b> {stone.name}</Name>
            <Like onClick={() => handleLike()}>
                {showlike()}
            </Like>
        </Stone>

    );
}

export default AlbumStone;

const Stone = styled.li`        
    height: 40px;
    cursor: pointer;
    background-color:${props => props.color ? props.color : ""};
    display: flex;
    justify-content: space-between;
    align-items: center;
    span{
        overflow: hidden;
        white-space:nowrap;
        text-overflow:ellipsis
    }
    &:hover{
        background-color:#222222;
    }
`;

const Name = styled.span`
max-width: 320px;
width: 100%;
`;

const Like = styled.span`
min-width: 60px;
color: #9c74ad;
cursor: pointer;
user-select: none;
margin: 0 15px;
display:flex;
div{
    display: flex;
}
span{
    margin: 0 5px;
    font-size: 0.9rem;
}
`;