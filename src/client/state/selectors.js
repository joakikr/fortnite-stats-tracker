import { GENERAL_STATS } from '../consts';

export const getProfiles = (state) => state.profiles || {};
export const getProfileUsernames = (state) => Object.keys(getProfiles(state));
export const getErrorMessage = (state) => state.error || null;
export const getActiveProfile = (state) => state.active || '';
export const getSearchValue = (state) => state.search || '';
export const getProfilesToCompare = (state) => state.compare || [];
export const getCompareRows = (state) => {
    const createRow = (username, matches, wins, win_percentage, kills, kd) => ({
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
            const generalStats = profile.lifeTimeStats.filter(stat =>
                GENERAL_STATS.includes(stat.key)
            );
            rows.push(
                createRow(profile.epicUserHandle, ...generalStats.map(stat => stat.value))
            );
        }
    })
    return rows;
}