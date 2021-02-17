import { combineReducers } from "redux";
import allReducer from "./all/reducer";

const reducers = combineReducers({
  allReducer,
});

export default reducers;
