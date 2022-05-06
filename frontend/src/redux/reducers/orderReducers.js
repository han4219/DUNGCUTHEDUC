import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_MY_LIST_FAIL,
  ORDER_MY_LIST_REQUEST,
  ORDER_MY_LIST_RESET,
  ORDER_MY_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
} from "../constants/orderConstants";

//CREATE ORDER REDUCER
export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { load: true };
    case ORDER_CREATE_SUCCESS:
      return { load: false, success: true, order: action.payload };
    case ORDER_CREATE_FAIL:
      return { load: false, error: action.payload };
    case ORDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

//GET ORDER DETAILS REDUCER
export const orderDetailsReducer = (
  state = { load: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, load: true };
    case ORDER_DETAILS_SUCCESS:
      return { load: false, order: action.payload };
    case ORDER_DETAILS_FAIL:
      return { load: false, error: action.payload };
    default:
      return state;
  }
};

//ORDER PAY REDUCER
export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { load: true };
    case ORDER_PAY_SUCCESS:
      return { load: false, success: true };
    case ORDER_PAY_FAIL:
      return { load: false, error: action.payload };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

//USER ORDERS
export const orderListMyReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_MY_LIST_REQUEST:
      return { load: true };
    case ORDER_MY_LIST_SUCCESS:
      return { load: false, orders: action.payload };
    case ORDER_MY_LIST_FAIL:
      return { load: false, error: action.payload };
    case ORDER_MY_LIST_RESET:
      return { orders: [] };
    default:
      return state;
  }
};
