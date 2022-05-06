import {
    REVIEW_LIST_FAIL,
    REVIEW_LIST_REQUEST,
    REVIEW_LIST_SUCCESS,
} from '../constants/reviewConstants';

export const reviewListReducer = (state = { reviews: [] }, action) => {
    switch (action.type) {
        case REVIEW_LIST_REQUEST:
            return { load: true, reviews: [] };
        case REVIEW_LIST_SUCCESS:
            return { load: false, reviews: action.payload };
        case REVIEW_LIST_FAIL:
            return { load: false, error: action.payload };
        default:
            return state;
    }
};
