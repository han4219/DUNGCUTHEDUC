import {
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productContants";

// PRODUCT LIST
export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { load: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return {
        load: false,
        page: action.payload.page,
        pages: action.payload.pages,
        products: action.payload.products,
      };
    case PRODUCT_LIST_FAIL:
      return { load: false, error: action.payload };
    default:
      return state;
  }
};

// PRODUCT DETAIL
export const productDetailReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, load: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { load: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { load: false, error: action.payload };
    default:
      return state;
  }
};

// CREATE REVIEW PRODUCT
export const productReviewsReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { load: true };
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { load: false, success: true };
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { load: false, error: action.payload };
    case PRODUCT_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};
