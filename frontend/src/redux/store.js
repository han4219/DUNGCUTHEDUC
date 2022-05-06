import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailReducer,
  productListReducer,
  productReviewsReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  userDetailReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderListMyReducer,
  orderPayReducer,
} from "./reducers/orderReducers";
import {
  categoryListProductReducer,
  categoryListReducer,
} from "./reducers/categoryReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  productReview: productReviewsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  myListOrders: orderListMyReducer,
  categoryList: categoryListReducer,
  categoryListProduct: categoryListProductReducer,
});

const carrtItemFromLocaleStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

//login
const userInfoFromLocaleStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

//shipping address
const shippingAddressFromLocaleStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

//payment method
const paymentMethodFromLocaleStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : {};

const initialState = {
  cart: {
    cartItems: carrtItemFromLocaleStorage,
    shippingAddress: shippingAddressFromLocaleStorage,
    paymentMethod: paymentMethodFromLocaleStorage,
  },
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
