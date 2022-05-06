import {
  USER_DETAIL_FAIL,
  USER_DETAIL_REQUEST,
  USER_DETAIL_RESET,
  USER_DETAIL_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_SUCCESS,
} from "../constants/userConstants";

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
      return {};
    default:
      return state;
  }
};

//REGISTER REDUCER
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { load: true };
    case USER_REGISTER_SUCCESS:
      return { load: false, user: action.payload };
    case USER_REGISTER_FAIL:
      return { load: false, error: action.payload };
    default:
      return state;
  }
};

//USER DETAILS REDUCER
export const userDetailReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAIL_REQUEST:
      return { ...state, load: true };
    case USER_DETAIL_SUCCESS:
      return { load: false, user: action.payload };
    case USER_DETAIL_FAIL:
      return { load: false, error: action.payload };
    case USER_DETAIL_RESET:
      return { user: {} };
    default:
      return state;
  }
};

//USER UPDATE PROFILE REDUCER
export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { load: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { load: false, success: true, user: action.payload };
    case USER_UPDATE_PROFILE_FAIL:
      return { load: false, error: action.payload };
    case USER_UPDATE_PROFILE_RESET:
      return { user: {} };
    default:
      return state;
  }
};
