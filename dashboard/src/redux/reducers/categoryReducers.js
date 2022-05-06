import {
    CATEGORY_CREATE_FAIL,
    CATEGORY_CREATE_REQUEST,
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_DELETE_FAIL,
    CATEGORY_DELETE_REQUEST,
    CATEGORY_DELETE_SUCCESS,
    CATEGORY_EDIT_FAIL,
    CATEGORY_EDIT_REQUEST,
    CATEGORY_EDIT_RESET,
    CATEGORY_EDIT_SUCCESS,
    CATEGORY_LIST_FAIL,
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_UPDATE_FAIL,
    CATEGORY_UPDATE_REQUEST,
    CATEGORY_UPDATE_RESET,
    CATEGORY_UPDATE_SUCCESS,
} from '../constants/categoryConstant';

// CATEGORY LIST REDUCER
export const categoryListReducer = (state = { categorys: [] }, action) => {
    switch (action.type) {
        case CATEGORY_LIST_REQUEST:
            return { load: true };
        case CATEGORY_LIST_SUCCESS:
            return { load: false, categorys: action.payload };
        case CATEGORY_LIST_FAIL:
            return { load: false, error: action.payload };
        default:
            return state;
    }
};

// CATEGORY DELETE REDUCER
export const categoryDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case CATEGORY_DELETE_REQUEST:
            return { load: true };
        case CATEGORY_DELETE_SUCCESS:
            return { load: false, success: true };
        case CATEGORY_DELETE_FAIL:
            return { load: false, error: action.payload };
        default:
            return state;
    }
};

// CATEGORY CREATE REDUCER
export const categoryCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case CATEGORY_CREATE_REQUEST:
            return { load: true };
        case CATEGORY_CREATE_SUCCESS:
            return { load: false, category: action.payload };
        case CATEGORY_CREATE_FAIL:
            return { load: false, error: action.payload };
        default:
            return state;
    }
};

// CATEGORY EDIT REDUCER
export const categoryEditReducer = (state = { category: {} }, action) => {
    switch (action.type) {
        case CATEGORY_EDIT_REQUEST:
            return { ...state, load: true };
        case CATEGORY_EDIT_SUCCESS:
            return { load: false, category: action.payload };
        case CATEGORY_EDIT_FAIL:
            return { load: false, error: action.payload };
        case CATEGORY_EDIT_RESET:
            return { category: {} };
        default:
            return state;
    }
};

// CATEGORY UPDATE REDUCER
export const categoryUpdateReducer = (state = { category: {} }, action) => {
    switch (action.type) {
        case CATEGORY_UPDATE_REQUEST:
            return { load: true };
        case CATEGORY_UPDATE_SUCCESS:
            return { load: false, success: true, category: action.payload };
        case CATEGORY_UPDATE_FAIL:
            return { load: false, error: action.payload };
        case CATEGORY_UPDATE_RESET:
            return { category: {} };
        default:
            return state;
    }
};
