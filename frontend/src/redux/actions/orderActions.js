import axios from "axios";
import { URL } from "../../url";
import { CART_CLEAR_ITEMS } from "../constants/cartConstants";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_MY_LIST_FAIL,
  ORDER_MY_LIST_REQUEST,
  ORDER_MY_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
} from "../constants/orderConstants";
import { userLogout } from "./userActions";

//CREATE ORDER
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });
    const {
      userLogin: { user },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.post(`${URL}/api/orders`, order, config);
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
    // handle count product in stock...
    order.orderItems.forEach(async (item) => {
      await axios.put(`${URL}/api/products/change-quantity/${item.product}`, {
        count: item.qty,
      });
    });
    dispatch({ type: CART_CLEAR_ITEMS });

    localStorage.removeItem("cartItems");
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed.") {
      dispatch(userLogout());
    }
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: message,
    });
  }
};

//GET ORDER DETAILS
export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    const {
      userLogin: { user },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.get(`${URL}/api/orders/${id}`, config);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed.") {
      dispatch(userLogout());
    }
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: message,
    });
  }
};

//ORDER PAY
export const payOrder =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_PAY_REQUEST });
      const {
        userLogin: { user },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `${URL}/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );
      dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed.") {
        dispatch(userLogout());
      }
      dispatch({
        type: ORDER_PAY_FAIL,
        payload: message,
      });
    }
  };

//USER ORDERS
export const myListOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_MY_LIST_REQUEST });
    const {
      userLogin: { user },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.get(`${URL}/api/orders`, config);
    dispatch({ type: ORDER_MY_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed.") {
      dispatch(userLogout());
    }
    dispatch({
      type: ORDER_MY_LIST_FAIL,
      payload: message,
    });
  }
};
