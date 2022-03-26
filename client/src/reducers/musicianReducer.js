import { LOAD_MUSICIAN_LIST, RESET_MUSICIAN_LIST } from "../actions";

const initialState = {
  musicians: [],
  startIdx: 0
};

const musicianReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_MUSICIAN_LIST:
      state.musicians = [...state.musicians, ...action.payload.musicians];
      state.startIdx = action.payload.startIdx;
      return state;
    case RESET_MUSICIAN_LIST:
      state.musicians = [];
      state.startIdx = 0;
      return state;
    default:
      return state;
  }
};

export default musicianReducer;
