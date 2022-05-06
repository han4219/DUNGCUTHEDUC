import axios from 'axios';
import {
    REVIEW_LIST_FAIL,
    REVIEW_LIST_REQUEST,
    REVIEW_LIST_SUCCESS,
} from '../constants/reviewConstants';
import { URL } from '../url';
import { userLogout } from './userActions';

// GET ALL REVIEWS
export const getListReviews = () => async (dispatch, getState) => {
    try {
        dispatch({ type: REVIEW_LIST_REQUEST });
        const {
            userLogin: { user },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };
        const { data } = await axios.get(`${URL}/api/products/reviews`, config);
        dispatch({ type: REVIEW_LIST_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === 'Not authorized, token failed.') {
            dispatch(userLogout());
        }
        dispatch({
            type: REVIEW_LIST_FAIL,
            payload: message,
        });
    }
};
