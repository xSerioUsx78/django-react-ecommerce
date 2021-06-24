import authReducer from './auth';
import errorReducer from './error';
import laodingReducer from './laoding';
import cartReducer from './cart';
import { combineReducers } from 'redux';

const reducers = combineReducers({
    error: errorReducer,
    auth: authReducer,
    loading: laodingReducer,
    cart: cartReducer
})

export default reducers