import { combineReducers } from "redux";
import musicianReducer from './musicianReducer';
import accountReducer from "./accountReducer";
import buyStoneReducer from './buyStoneReducer';

const rootReducer = combineReducers({
  musicianReducer,
  buyStoneReducer,
  accountReducer,
});

export default rootReducer;
