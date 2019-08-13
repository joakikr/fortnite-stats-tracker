export const getProfiles = (state) => state.profiles || {};
export const getProfileUsernames = (state) => Object.keys(getProfiles(state));
export const getErrorMessage = (state) => state.error || null;
export const getActiveProfile = (state) => state.active || '';