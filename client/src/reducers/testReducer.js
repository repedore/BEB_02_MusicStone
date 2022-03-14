import { TEST_ADD } from '../actions'

const initialState = {
    "count": 0
}

const testReducer = (state = initialState, action) => {
    switch (action.type) {
        case TEST_ADD:
            state.count += 1;
            console.log(state);
            return state;
        default:
            return state;
    }
}

export default testReducer;