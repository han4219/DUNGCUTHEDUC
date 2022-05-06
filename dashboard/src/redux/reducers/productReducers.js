import {
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_RESET,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_EDIT_FAIL,
    PRODUCT_EDIT_REQUEST,
    PRODUCT_EDIT_RESET,
    PRODUCT_EDIT_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_RESET,
    PRODUCT_UPDATE_SUCCESS,
} from '../constants/productContants';

// ALL PRODUCTS
export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { load: true, products: [] };
        case PRODUCT_LIST_SUCCESS:
            return { load: false, products: action.payload };
        case PRODUCT_LIST_FAIL:
            return { load: false, error: action.payload };
        default:
            return state;
    }
};

// DELETE PRODUCT
export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return { load: true };
        case PRODUCT_DELETE_SUCCESS:
            return { load: false, success: true };
        case PRODUCT_DELETE_FAIL:
            return { load: false, error: action.payload };
        default:
            return state;
    }
};

// CREATE PRODUCT
export const productCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return { load: true };
        case PRODUCT_CREATE_SUCCESS:
            return { load: false, success: true, product: action.payload };
        case PRODUCT_CREATE_FAIL:
            return { load: false, error: action.payload };
        case PRODUCT_CREATE_RESET:
            return {};
        default:
            return state;
    }
};

// EDIT PRODUCT
export const productEditReducer = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        case PRODUCT_EDIT_REQUEST:
            return { ...state, load: true };
        case PRODUCT_EDIT_SUCCESS:
            return { load: false, product: action.payload };
        case PRODUCT_EDIT_FAIL:
            return { load: false, error: action.payload };
        case PRODUCT_EDIT_RESET:
            return { product: {} };
        default:
            return state;
    }
};

// UPDATE PRODUCT
export const productUpdateReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return { load: true };
        case PRODUCT_UPDATE_SUCCESS:
            return { load: false, success: true, product: action.payload };
        case PRODUCT_UPDATE_FAIL:
            return { load: false, error: action.payload };
        case PRODUCT_UPDATE_RESET:
            return { product: {} };
        default:
            return state;
    }
};
