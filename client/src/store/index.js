import { createStore, applyMiddleware, combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../reducer";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
//const store = configureStore({ reducer: rootReducer }, thunk);

export default store;

//----fin de store
//
//
//
//

// //------------
// import thunk from "redux-thunk"; //ayuda  a hacer llamadas asincronas, pero pa poder usarse se necesita el compose:
// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__ || compose;

// const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk))); //aqui lla ma al thunk
// //-----------------------------
