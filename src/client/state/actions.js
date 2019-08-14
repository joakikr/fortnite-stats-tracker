import * as AT from './actionTypes';
import axios from 'axios';

const ERROR_MSG = {
    PLAYER_NOT_FOUND: 'Could not find user with given username.',
    TOO_MANY_REQUESTS: 'Too many attempts. Hang on a few sec and try again.',
    GENERAL: 'Something went wrong. Try again later.'
};

const errorHandler = (status) => {
    switch (status) {
        case 429:
            return ERROR_MSG.TOO_MANY_REQUESTS;
        case 404:
            return ERROR_MSG.PLAYER_NOT_FOUND;
        default:
            return ERROR_MSG.GENERAL;
    }
};

export const setError = (error) => ({
    type: AT.FST_SET_ERROR,
    error
});

export const setProfile = (profile) => ({
    type: AT.FST_SET_PROFILE,
    profile
})

export const setSearchValue = (value) => ({
    type: AT.FST_SET_SEARCH_VALUE,
    value
})

export const toggleToCompare = (profile) => ({
    type: AT.FST_TOGGLE_TO_COMPARE,
    profile
})

export const clearCompares = () => ({
    type: AT.FST_CLEAR_COMPARE
});

export const fetchProfile = (username) => dispatch => {
    const promise = axios(`/api/profile/${username}`);

    return dispatch({
        type: AT.FST_FETCH_PROFILE,
        payload: promise,
        meta: {
            username
        }
    })
        .catch((err) => {
            const errorMessage = errorHandler(err.response.status);
            dispatch(setError(errorMessage));
        });
}