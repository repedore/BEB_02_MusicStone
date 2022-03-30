import { LOAD_STONE_LIST, RESET_STONE_LIST } from "../actions";

const initialState = {
    stones: []
};

const buyStoneReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_STONE_LIST:
            state.stones = [...state.stones, ...action.payload];
            return state;
        case RESET_STONE_LIST:
            state.stones = [];
            return state;
        default:
            return state;
    }
};

export default buyStoneReducer;
