import axios from "axios";
import { URL } from "../../url";
import {
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_PRODUCT_FAIL,
  CATEGORY_LIST_PRODUCT_REQUEST,
  CATEGORY_LIST_PRODUCT_SUCCESS,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
} from "../constants/categoryConstants";

// get all category
export const getAllCategories = () => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_LIST_REQUEST });
    const { data } = await axios.get(`${URL}/api/categorys`);
    dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//get product by category
export const getProductByCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_LIST_PRODUCT_REQUEST });
    const { data } = await axios.get(`${URL}/api/products/category/${id}`);
    dispatch({ type: CATEGORY_LIST_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
