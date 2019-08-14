import * as AT from './actionTypes';

const pending = (actionType) => `${actionType}_PENDING`;
const fulfilled = (actionType) => `${actionType}_FULFILLED`;
const rejected = (actionType) => `${actionType}_REJECTED`;

const initialState = {
    profiles: {},
    compare: [],
    search: '',
    active: '',
    error: null
};

function toggle(collection, item) {
    var idx = collection.indexOf(item);
    if (idx !== -1) {
        collection.splice(idx, 1);
    } else {
        collection.push(item);
    }
    return collection;
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case fulfilled(AT.FST_FETCH_PROFILE):
            return {
                ...state,
                profiles: {
                    ...state.profiles,
                    [action.meta.username]: action.payload.data.profile
                },
                active: action.meta.username,
                search: '',
                error: null
            };
        case AT.FST_SET_ERROR:
            return {
                ...state,
                error: action.error,
                active: ''
            };
        case AT.FST_SET_PROFILE:
            return {
                ...state,
                active: action.profile
            };
        case AT.FST_SET_SEARCH_VALUE:
            return {
                ...state,
                search: action.value
            };
        case AT.FST_TOGGLE_TO_COMPARE:
            return {
                ...state,
                compare: toggle(state.compare, action.profile)
            };
        default:
            return state;
    }
};

export default reducer;
