import { GENERAL_STATS } from '../consts';

export const getProfiles = (state) => state.profiles || {};
export const getProfileUsernames = (state) => Object.values(getProfiles(state)).map((profile) => profile.epicUserHandle);
export const getErrorMessage = (state) => state.error || null;
export const getActiveProfile = (state) => state.active || '';
export const getSearchValue = (state) => state.search || '';
export const getProfilesToCompare = (state) => state.compare || [];
export const getCompareRows = (state, view) => {
    const createRow = ({ username, matches, wins, win_percentage, kills, kd }) => ({
        username,
        matches,
        wins,
        win_percentage,
        kills,
        kd
    });

    const compare = getProfilesToCompare(state);
    const rows = [];

    compare.forEach(username => {
        const profile = getProfiles(state)[username];
        if (profile) {
            rows.push(
                createRow({ username: profile.epicUserHandle, ...profile.stats[view || 'all'] })
            );
        }
    })
    return rows;
}
export const isDarkMode = (state) => state.isDarkMode === true;
export const getPending = (state) => state.pending || [];
export const isLoading = (state) => getPending(state).length > 0;