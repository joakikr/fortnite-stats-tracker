import * as AT from './actionTypes';

const pending = (actionType) => `${actionType}_PENDING`;
const fulfilled = (actionType) => `${actionType}_FULFILLED`;
const rejected = (actionType) => `${actionType}_REJECTED`;

const initialState = {
    profiles: {},
    active: '',
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case fulfilled(AT.FST_FETCH_PROFILE):
            return {
                ...state,
                profiles: {
                    ...state.profiles,
                    [action.meta.username]: action.payload.data.profile
                },
                error: null
            };
        case AT.FST_SET_ERROR:
            return {
                ...state,
                error: action.error
            };
        case AT.FST_SET_PROFILE:
            return {
                ...state,
                active: action.profile
            };
        default:
            return state;
    }
};

export default reducer;
