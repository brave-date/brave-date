import { combineReducers } from "redux";
import authReducer from "./authReducer";
import commonReducer from "./commonReducer";

const rootReducer = combineReducers({
  commonApp: commonReducer,
  authApp: authReducer,
});

export default rootReducer;
