import { combineReducers } from "redux";
import authReducer from '../slices/authSlice'
import profieReducer from "../slices/profileSlice";


const rootReducer=combineReducers({
    auth:authReducer,
    profile:profieReducer,
   
    
})

export default rootReducer;