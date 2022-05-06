import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userListReducer, userLoginReducer } from './reducers/userReducers';
import {
    productCreateReducer,
    productDeleteReducer,
    productEditReducer,
    productListReducer,
    productUpdateReducer,
} from './reducers/productReducers';
import {
    orderDeliveredReducer,
    orderDetailReducer,
    orderListReducer,
} from './reducers/orderReducers';
import {
    categoryCreateReducer,
    categoryDeleteReducer,
    categoryEditReducer,
    categoryListReducer,
    categoryUpdateReducer,
} from './reducers/categoryReducers';
import { reviewListReducer } from './reducers/reviewReducers';

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userList: userListReducer,
    productList: productListReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productEdit: productEditReducer,
    productUpdate: productUpdateReducer,
    orderList: orderListReducer,
    orderDetail: orderDetailReducer,
    orderDelivered: orderDeliveredReducer,
    categoryList: categoryListReducer,
    categoryDelete: categoryDeleteReducer,
    categoryCreate: categoryCreateReducer,
    categoryEdit: categoryEditReducer,
    categoryUpdate: categoryUpdateReducer,
    reviewList: reviewListReducer,
});

//login
const userInfoFromLocaleStorage = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

const initialState = {
    userLogin: {
        user: userInfoFromLocaleStorage,
    },
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
