import { applyMiddleware,  compose, configureStore } from "@reduxjs/toolkit";
import PositionReducer from './positionSlice'
import { getFirestore,  firestoreReducer, reduxFirestore} from "redux-firestore";
import thunk from 'redux-thunk';
import { combineReducers } from "@reduxjs/toolkit";
import { firebaseConfig } from "./firebase";

const reducers = combineReducers({
    Position: PositionReducer, 
    firestore: firestoreReducer,

})
export const store = configureStore({reducer: reducers}, compose(
    applyMiddleware(thunk.withExtraArgument({getFirestore})),
    reduxFirestore(firebaseConfig)
    
    ))




export default store;
