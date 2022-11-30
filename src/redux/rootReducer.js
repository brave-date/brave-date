import { combineReducers } from "redux";
import authReducer from "./authReducer";
import commonReducer from "./commonReducer";
import chatReducer from "./chatReducer";
import matchReducer from "./matchReducer";

const rootReducer = combineReducers({
  commonApp: commonReducer,
  authApp: authReducer,
  chatApp: chatReducer,
  matchApp: matchReducer,
});

export default rootReducer;
