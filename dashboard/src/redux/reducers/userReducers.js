import {
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_RESET,
    USER_LIST_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
} from '../constants/userConstants';

//LOGIN REDUCER
export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { load: true };
        case USER_LOGIN_SUCCESS:
            return { load: false, user: action.payload };
        case USER_LOGIN_FAIL:
            return { load: false, error: action.payload };
        case USER_LOGOUT:
            return { users: [] };
        default:
            return state;
    }
};

//ALL USERS
export const userListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return { load: true };
        case USER_LIST_SUCCESS:
            return { load: false, users: action.payload };
        case USER_LIST_FAIL:
            return { load: false, error: action.payload };
        case USER_LIST_RESET:
            return { users: [] };
        default:
            return state;
    }
};
