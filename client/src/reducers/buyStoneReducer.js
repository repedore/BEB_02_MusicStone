import { LOAD_STONE_LIST, RESET_STONE_LIST } from "../actions";

const initialState = {
    stones: [],
    startIdx: 0
};

const buyStoneReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_STONE_LIST:
            state.stones = [...state.stones, ...action.payload.stones];
            state.startIdx = action.payload.startIdx;
            return state;
        case RESET_STONE_LIST:
            state.stones = [];
            state.startIdx = 0;
            return state;
        default:
            return state;
    }
};

export default buyStoneReducer;
