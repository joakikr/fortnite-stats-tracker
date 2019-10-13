import ls from 'local-storage';
import * as AT from './actionTypes';

const pending = (actionType) => `${actionType}_PENDING`;
const fulfilled = (actionType) => `${actionType}_FULFILLED`;
const rejected = (actionType) => `${actionType}_REJECTED`;

export const initialState = () => ({
    profiles: {},
    compare: [],
    search: '',
    active: '',
    error: null,
    pending: [],
    isDarkMode: false
});

function updateCompare(compare, profile) {
    var idx = compare.indexOf(profile);
    if (idx !== -1) {
        compare.splice(idx, 1);
    } else {
        compare.push(profile);
    }
    return compare;
}

function updateProfiles(profiles, profile, target) {
    delete profiles[target];
    profiles[profile.epicUserHandle] = profile;

    // Update LocalStorage 
    ls('fst-profiles', JSON.stringify(profiles));

    return profiles;
}

function updateDarkMode(isDarkMode) {
    ls('fst-dark-mode', isDarkMode === true);
    return isDarkMode === true;
}

function clearProfiles() {
    // Clear saved instances in LocalStorage 
    ls.remove('fst-profiles');
    return initialState();
}

const reducer = (state = initialState(), action) => {
    switch (action.type) {
        case fulfilled(AT.FST_FETCH_PROFILE):
            return {
                ...state,
                profiles: updateProfiles(state.profiles, action.payload.data.profile, action.meta.username),
                active: action.payload.data.profile.epicUserHandle,
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
                active: action.profile,
                error: null
            };
        case AT.FST_SET_SEARCH_VALUE:
            return {
                ...state,
                search: action.value
            };
        case AT.FST_TOGGLE_TO_COMPARE:
            return {
                ...state,
                compare: updateCompare(state.compare, action.profile)
            };
        case AT.FST_CLEAR_COMPARE:
            return {
                ...state,
                compare: []
            };
        case AT.FST_CLEAR_RECENTLY_SEARCHED:
            return {
                ...clearProfiles(),
                isDarkMode: state.isDarkMode
            };
        case AT.FST_LOADING_ADD:
                return {
                    ...state,
                    pending: [...state.pending, action.actionType]
                };
        case AT.FST_LOADING_REMOVE:
            return {
                ...state,
                pending: state.pending.filter((elem) => elem !== action.actionType)
            };
        case AT.FST_TOGGLE_DARK_MODE:
            return {
                ...state,
                isDarkMode: updateDarkMode(action.isDarkMode)
            };
        default:
            return state;
    }
};

export default reducer;
