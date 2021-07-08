import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
// reducers
import userReducer from "./reducers/userReducer";
import stationReducer from './reducers/stationReducer';
import dialReducer from "./reducers/dialReducer";
// Middlewares
const middleware = [thunk];

const initialState = {};

const reducers = combineReducers({
  user: userReducer,
  station: stationReducer,
  dial: dialReducer
});

const store = createStore(
  reducers,
  initialState,
  compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

export default store;
