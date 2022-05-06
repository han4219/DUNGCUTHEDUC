import {
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_PRODUCT_FAIL,
  CATEGORY_LIST_PRODUCT_REQUEST,
  CATEGORY_LIST_PRODUCT_RESET,
  CATEGORY_LIST_PRODUCT_SUCCESS,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
} from "../constants/categoryConstants";

// Get all category reducer
export const categoryListReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { load: true, categories: [] };
    case CATEGORY_LIST_SUCCESS:
      return { load: false, categories: action.payload };
    case CATEGORY_LIST_FAIL:
      return { load: false, error: action.payload };
    default:
      return state;
  }
};

// get list product by category
export const categoryListProductReducer = (
  state = { products: [] },
  action
) => {
  switch (action.type) {
    case CATEGORY_LIST_PRODUCT_REQUEST:
      return { load: true, products: [] };
    case CATEGORY_LIST_PRODUCT_SUCCESS:
      return { load: false, products: action.payload };
    case CATEGORY_LIST_PRODUCT_FAIL:
      return { load: false, error: action.payload };
    case CATEGORY_LIST_PRODUCT_RESET:
      return { load: false, products: [] };
    default:
      return state;
  }
};
