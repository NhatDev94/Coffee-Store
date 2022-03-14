import { combineReducers } from "redux";
import employeeReducer from "./employeeReducer";
import productReducer from "./productReducer";
import popupReducer from "./popupReducer";
import cartReducer from "./cartReducer";
import oderReducer from "./oderReducer";

const rootReducer = combineReducers({
    employeeReducer,
    productReducer,
    popupReducer,
    cartReducer,
    oderReducer
})

export default rootReducer