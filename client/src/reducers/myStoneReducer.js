import { LOAD_MY_DATA } from "../actions";

const initialState = {
    isMusician: false,
    stoneList: [],
};

const myStoneReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_MY_DATA:
            const tempArr = [];
            for (let i = 0; i < action.payload.myStoneInfo.length; i++) {
                tempArr.push(Object.assign(action.payload.myStoneInfo[i], action.payload.stoneInfo[i]))
            }
            const newState = {
                isMusician: action.payload.isMusician,
                stoneList: tempArr,
            }
            return newState;
        default:
            return state;
    }
};

export default myStoneReducer;
