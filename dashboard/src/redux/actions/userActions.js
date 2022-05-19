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
import axios from 'axios';
import { toast } from 'react-toastify';
import { URL } from './../url';

//LOGIN
export const userLogin = (email, password) => async (dispatch) => {
    const ToastObjects = {
        pauseOnFocusLoss: false,
        draggable: false,
        pauseOnHover: false,
        autoClose: 2000,
    };
    try {
        dispatch({ type: USER_LOGIN_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const { data } = await axios.post(`${URL}/api/users/login`, { email, password }, config);

        if (!data.isAdmin) {
            toast.error('Bạn không phải quản trị viên', ToastObjects);
            dispatch({ type: USER_LOGIN_FAIL });
        } else {
            dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        }
        localStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === 'Not authorized, token failed.') {
            dispatch(userLogout());
        }
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: message,
        });
    }
};

//LOGOUT
export const userLogout = () => (dispatch) => {
    localStorage.removeItem('user');
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: USER_LIST_RESET });
};

export const getListUsers = () => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_LIST_REQUEST });
        const {
            userLogin: { user },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };
        const { data } = await axios.get(`${URL}/api/users`, config);
        dispatch({ type: USER_LIST_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === 'Not authorized, token failed.') {
            dispatch(userLogout());
        }
        dispatch({
            type: USER_LIST_FAIL,
            payload: message,
        });
    }
};
